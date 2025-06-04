import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  Dropdown,
  LoadingSpinner,
  ErrorComponent,
  Calendar,
  DataTable,
} from "../components";

import { useFetch } from "../hooks/useFetch";
import { TIMEZONE_API, TRANSACTIONS_API } from "../api/getDataApi";
import {
  DEFAULT_MAX_DAYS,
  DEFAULT_TIMEZONE,
  getColumns,
  toolTipDates,
} from "../constants";
import { convertToEpochTime, maxDaysList } from "../utils";

export const LandingPage = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [maxDays, setMaxDays] = useState("");

  const {
    data: tzList,
    loading: tzLoading,
    error: errorTzApi,
  } = useFetch(TIMEZONE_API);

  const {
    data: txnData,
    loading: txnLoading,
    refetch: fetchTxn,
    error: txnError,
  } = useFetch(TRANSACTIONS_API);
  const handleTzChange = (timezone) => {
    setSelectedTimezone(timezone.target.value);
  };

  const handleMaxDaysChange = (maxDays) => {
    setMaxDays(maxDays.target.value);
  };
  const handleDateRangeSubmit = (range) => {
    const epochSeconds = convertToEpochTime(range.from);
    fetchTxn({ date: epochSeconds });
  };
  useEffect(() => {
    setSelectedTimezone(DEFAULT_TIMEZONE);
    setMaxDays(DEFAULT_MAX_DAYS);
  }, [tzList?.length]);

  if (errorTzApi) {
    return <ErrorComponent message={errorTzApi} />;
  }
  return (
    <Grid container spacing={2}>
      {tzLoading ? (
        <Grid size={12}>
          <LoadingSpinner />
        </Grid>
      ) : (
        <>
          <Grid size={2}>
            <Dropdown
              id="timezone-select"
              inputLabel="Choose Timezone"
              items={tzList}
              handleChange={handleTzChange}
              value={selectedTimezone}
              fullWidth
            />
          </Grid>
          <Grid size={2}>
            <Dropdown
              id="maxDays-select"
              inputLabel="Choose Max Days"
              items={maxDaysList}
              handleChange={handleMaxDaysChange}
              value={maxDays}
              fullWidth
            />
          </Grid>

          <Grid size={3}>
            <Calendar
              mode="range"
              maxDays={maxDays}
              timeZone={selectedTimezone}
              specialDates={toolTipDates}
              handleSubmit={handleDateRangeSubmit}
            />
          </Grid>
        </>
      )}
      <Grid size={12}>
        <DataTable
          columns={getColumns(selectedTimezone)}
          rows={txnData}
          isLoading={txnLoading}
          error={txnError}
        />
      </Grid>
    </Grid>
  );
};
