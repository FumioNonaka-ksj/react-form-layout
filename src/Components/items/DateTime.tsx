import { useCallback } from "react";
import { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";
import DateTimePicker from "./DateTimePicker";
import DatePicker from "./DatePicker";

type Props = { dateWithTime?: boolean } & ItemProps;
const pickerStyle: React.CSSProperties = {
  width: "auto",
  // height: "auto",
};
const DateTime = ({ dateWithTime, style, id }: Props) => {
  const { itemSelected } = useItemSettings();
  const clickHandler: React.MouseEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.stopPropagation();
      itemSelected(id);
    },
    [id, itemSelected]
  );
  return (
    <form style={{ ...style, ...pickerStyle }} onClick={clickHandler}>
      {dateWithTime ? <DateTimePicker /> : <DatePicker />}
    </form>
  );
};

export default DateTime;
