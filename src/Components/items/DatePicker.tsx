import { TextField } from "@material-ui/core";

const date = new Date();
const dateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
const DatePicker = () => {
  const defaultDateValue = dateValue(date);
  return (
    <TextField
      type="date"
      defaultValue={defaultDateValue}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DatePicker;
