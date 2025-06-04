import { Tooltip as MuiTooltip } from "@mui/material";

/**
 * Tooltip component that wraps its children with a Material-UI Tooltip.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the tooltip.
 * @param {React.ReactNode} props.title - The text or element to display inside the tooltip.
 * @param {boolean} props.open - Controls the visibility of the tooltip.
 * @returns {JSX.Element} The Tooltip component.
 */
export const Tooltip = ({ children, title, open }) => {
  return (
    <MuiTooltip title={title} open={open}>
      {children}
    </MuiTooltip>
  );
};
