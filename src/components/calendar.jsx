import { useState } from "react";
import { DayPicker, TZDate } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { differenceInCalendarDays } from "date-fns";
import { Tooltip } from "./tooltip";
import { CLEAR, GO, MAX_DAYS_MESSAGE, SELECTED_DATE } from "../constants";
import { convertToTzDates, formatDay } from "../utils";
import { Box, Button, Typography } from "@mui/material";

/**
 * Calendar component for selecting date ranges with special enabled/disabled dates and tooltips.
 *
 * @param {Object} props - Component props.
 * @param {number} props.maxDays - Maximum number of days allowed in the selected range.
 * @param {string} props.timeZone - Time zone identifier (e.g., "America/New_York").
 * @param {'single'|'range'} props.mode - Selection mode for the calendar.
 * @param {Object.<string, {disabled?: boolean, status?: string}>} props.specialDates -
 *   Object mapping date strings (in ISO format) to special date info, such as disabled state and status message.
 *
 * @returns {JSX.Element} Calendar date picker component with range selection, tooltips, and special date handling.
 */
export const Calendar = ({
  maxDays,
  timeZone,
  mode,
  specialDates: dates,
  handleSubmit,
}) => {
  const [range, setRange] = useState();
  const [showRangeLimitTooltip, setShowRangeLimitTooltip] = useState(false);
  const [tooltipDate, setTooltipDate] = useState(null);

  // Precompute special dates
  const specialDates = convertToTzDates(dates, timeZone);

  // Prepare enabled and disabled dates
  const specialEnableDates = [];
  const specialDisabledDates = [];
  for (const [dateStr, value] of Object.entries(dates)) {
    const tzDate = new TZDate(new Date(dateStr), timeZone);
    if (value.disabled) specialDisabledDates.push(tzDate);
    else specialEnableDates.push(tzDate);
  }

  // Today and minDate in the specified time zone
  const today = new TZDate(new Date(), timeZone);
  const minDate = new TZDate(
    new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
    timeZone
  );
  const disabledDates = [...specialDisabledDates, { before: minDate }];

  const handleSelect = (newRange) => {
    if (newRange?.from && newRange?.to) {
      const daysSelected =
        differenceInCalendarDays(newRange.to, newRange.from) + 1;
      if (daysSelected > maxDays) {
        setTooltipDate(newRange.to);
        setShowRangeLimitTooltip(true);
        setTimeout(() => setShowRangeLimitTooltip(false), 2000);
        return;
      }
    }
    setRange(newRange);
    setTooltipDate(null);
  };
  const handleGo = () => {
    handleSubmit(range);
  };
  const handleClear = () => {
    setRange(null);
  };
  // Footer text
  let footerText = SELECTED_DATE + " ";
  if (range?.from && range?.to) {
    footerText += `${formatDay(range.from, timeZone, false)} - ${formatDay(
      range.to,
      timeZone,
      true
    )}`;
  } else if (range?.from) {
    footerText += formatDay(range.from, timeZone, true);
  }

  return (
    <DayPicker
      mode={mode}
      timeZone={timeZone}
      selected={range}
      onSelect={handleSelect}
      disabled={disabledDates}
      modifiers={{ tooltip: [...disabledDates, ...specialEnableDates] }}
      footer={
        <Box display="flex" flexDirection="column">
          <Typography variant="caption">{footerText}</Typography>
          <Box display="flex" mt={1}>
            <Button onClick={handleClear} variant="outlined">
              {CLEAR}
            </Button>
            <Button
              disabled={!range}
              sx={{ ml: 1 }}
              onClick={handleGo}
              variant="contained"
            >
              {GO}
            </Button>
          </Box>
        </Box>
      }
      components={{
        Day: (props) => {
          const { day, ...tdProps } = props;
          const dateStr = day.date.toLocaleDateString("en-US");
          const message = specialDates[dateStr]?.status;
          const isTooltipTarget =
            tooltipDate &&
            day.date.toDateString() === tooltipDate.toDateString();
          const tooltipTitle = isTooltipTarget
            ? `${MAX_DAYS_MESSAGE} ${maxDays} days.`
            : message || "";
          const shouldShowTooltip = !!tooltipTitle;
          return shouldShowTooltip ? (
            <Tooltip
              title={tooltipTitle}
              open={isTooltipTarget ? showRangeLimitTooltip : undefined}
            >
              <td {...tdProps} />
            </Tooltip>
          ) : (
            <td {...tdProps} />
          );
        },
      }}
    />
  );
};
