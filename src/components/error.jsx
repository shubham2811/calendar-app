import { Alert, AlertTitle } from "@mui/material";
import { SOMETHING_WENT_WRONG } from "../constants";

/**
 * ErrorComponent displays an error alert with a title and message.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.title="Error"] - The title of the error alert.
 * @param {string} [props.message=SOMETHING_WENT_WRONG] - The error message to display.
 * @returns {JSX.Element} The rendered error alert component.
 */
export const ErrorComponent = ({
  title = "Error",
  message = SOMETHING_WENT_WRONG,
}) => (
  <Alert severity="error">
    <AlertTitle>{title}</AlertTitle>
    {message}
  </Alert>
);
