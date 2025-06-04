# Calendar Table App

A React application built with Vite that provides an interactive calendar with date range selection, special date tooltips, and a data table for displaying records. The app supports time zone selection, configurable maximum date ranges, and displays data in a user-friendly grid.

## Features

- **Calendar with Range Selection:**  
  Select a single date or a range of dates, with a configurable maximum range.

- **Time Zone Support:**  
  Choose your preferred time zone for accurate date display and selection.

- **Special Dates with Tooltips:**  
  Highlight special dates (e.g., holidays, deadlines) with custom tooltips and enable/disable specific dates.

- **Data Table:**  
  View and filter records in a responsive data grid with custom columns and error handling.

- **Manual and Automatic Data Fetching:**  
  Fetch data automatically on load or manually with custom query parameters.

- **Customizable UI:**  
  Built with Material-UI (MUI) for a modern, responsive interface.

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/calendar-table-app.git
   cd calendar-table-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/components/Calendar.jsx` — Calendar component with range selection and tooltips.
- `src/components/DataTable.jsx` — Data grid for displaying records.
- `src/Layout/landingPage.jsx` — Main page layout with controls and data display.
- `src/hooks/useFetch.js` — Custom hook for fetching data with support for query parameters and manual refetch.
- `src/constants.js` — App-wide constants and column definitions.
- `src/utils.js` — Utility functions for date formatting and conversions.

## Usage

- **Select a time zone and max days** using the dropdowns.
- **Pick a date range** in the calendar. Special dates will show tooltips.
- **View data** in the table below. Errors and loading states are handled gracefully.
- **Manually refetch data** (if implemented) using the provided button.

## Customization

- **Add special dates:**  
  Update `toolTipDates` in `src/constants.js` with your own dates and messages.
- **Change columns:**  
  Edit `getColumns` in `src/constants.js` to customize the data table columns.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material-UI (MUI)](https://mui.com/)
- [date-fns](https://date-fns.org/) (for date calculations)

## License

MIT

---

**Developed by [Shubham Sharma]**