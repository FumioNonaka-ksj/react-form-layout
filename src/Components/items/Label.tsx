import { useCallback } from "react";
import { TextField } from "@material-ui/core";
import { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";

const Label = ({ style, text, id /* inputProps */ }: ItemProps) => {
  const { itemSelected } = useItemSettings();
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      itemSelected(id);
    },
    [id, itemSelected]
  );
  console.log("label:", style);
  return (
    <TextField
      style={style}
      value={text}
      inputProps={{
        readOnly: true,
        disabled: true,
      }}
      id={String(id)}
      onClick={clickHandler}
    />
  );
};

export default Label;
