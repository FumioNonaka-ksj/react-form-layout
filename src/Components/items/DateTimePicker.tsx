import { TextField } from "@material-ui/core";

const date = new Date();
const dateTimeValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}T${String(
    date.getHours()
  ).padStart(2, "0")}:00`;
const DateTimePicker = () => {
  const defaultDateValue = dateTimeValue(date);
  return (
    <TextField
      type="datetime-local"
      defaultValue={defaultDateValue}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateTimePicker;
