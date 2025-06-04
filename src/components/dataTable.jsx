import { Box, Typography } from "@mui/material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { NO_RECORDS } from "../constants";

/**
 * DataTable component renders a data grid with customizable columns and rows.
 * Displays a loading state and a custom overlay when there are no rows or an error occurs.
 *
 * @param {Object[]} columns - Array of column definitions for the data grid.
 * @param {Object[]} rows - Array of row data to display in the data grid.
 * @param {boolean} isLoading - Indicates whether the data is currently loading.
 * @param {string} [error] - Optional error message to display in the no rows overlay.
 * @returns {JSX.Element} The rendered DataTable component.
 */
export const DataTable = ({ columns, rows, isLoading, error }) => {
  function CustomNoRowsOverlay() {
    return (
      <GridOverlay>
        <Typography variant="subtitle1" style={{ padding: 16 }}>
          {NO_RECORDS} {error}
        </Typography>
      </GridOverlay>
    );
  }
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        loading={isLoading}
        showToolbar
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </Box>
  );
};
