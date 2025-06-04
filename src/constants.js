import { epochDateToLocal } from "./utils";
export const DEFAULT_TIMEZONE = "Asia/Calcutta";
export const DEFAULT_MAX_DAYS = 10;
export const MAX_DAYS_MESSAGE = "You can only select up to";
export const SELECTED_DATE = "Selected date:";
export const SOMETHING_WENT_WRONG = "Something went wrong.";
export const NO_RECORDS = "No records";
export const GO = "Go";
export const CLEAR = "Clear";
export const toolTipDates = {
  "2025-06-05": { status: "Project Deadline", disabled: false },
  "2025-06-10": { status: "Team Meeting", disabled: false },
  "2025-06-13": { status: "Holiday", disabled: true },
};
export const getColumns = (timeZone) => [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    sortable: false,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    filterable: false,
    sortable: false,
    valueGetter: (params) => epochDateToLocal(params, timeZone),
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 1,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 110,
    editable: true,
    flex: 1,
    sortable: false,
  },
];
