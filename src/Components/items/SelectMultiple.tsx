import React, { useCallback, useState } from "react";
import { Input, MenuItem, Select } from "@material-ui/core";
import useItemSettings from "../../hooks/useItemSettings";

interface Props {
  text: string;
}
const SelectMultiple = ({ text }: Props) => {
  const [items, setItems] = useState<number[]>([]);
  const { getItemListFromText } = useItemSettings();
  const changeHandler = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setItems(event.target.value as number[]);
    },
    []
  );
  return (
    <Select multiple value={items} onChange={changeHandler} input={<Input />}>
      {getItemListFromText(text).map((item, id) => (
        <MenuItem value={id} key={id}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectMultiple;
