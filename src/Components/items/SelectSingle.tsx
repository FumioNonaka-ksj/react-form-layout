import { useCallback, useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import useItemSettings from "../../hooks/useItemSettings";

interface Props {
  text: string;
}
const SelectSingle = ({ text }: Props) => {
  const [item, setItem] = useState("");
  const { getItemListFromText } = useItemSettings();
  const changeHandler = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setItem(event.target.value as string);
    },
    []
  );
  return (
    <Select value={item} onChange={changeHandler}>
      {getItemListFromText(text).map((itemText, id) => (
        <MenuItem value={id} key={id}>
          {itemText}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectSingle;
