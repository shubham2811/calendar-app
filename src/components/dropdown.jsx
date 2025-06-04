import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
/**
 * Dropdown component renders a Material-UI Select dropdown with customizable options.
 *
 * @param {Object} props - Component props.
 * @param {string} props.id - The id and name for the Select component.
 * @param {string} props.inputLabel - The label to display for the dropdown.
 * @param {string|number} props.value - The currently selected value.
 * @param {function} props.handleChange - Callback fired when the selected value changes.
 * @param {Array<{ label: string, value: string|number }>} [props.items=[]] - Array of items to display as options.
 * @param {number} [props.minWidth=120] - Minimum width of the dropdown in pixels.
 * @param {boolean} [props.fullWidth] - If true, the dropdown will take up the full width of its container.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export const Dropdown = ({
  id,
  inputLabel,
  value,
  handleChange,
  items = [],
  minWidth = 120,
  fullWidth,
}) => {
  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel>{inputLabel}</InputLabel>
        <Select
          name={id}
          id={id}
          value={value}
          label={inputLabel}
          onChange={handleChange}
        >
          {items?.map((item) => {
            return (
              <MenuItem key={item.label} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
