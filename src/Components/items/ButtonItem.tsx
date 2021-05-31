import { useCallback } from "react";
import { Button } from "@material-ui/core";
import { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";

const ButtonItem = ({ style, text, id }: ItemProps) => {
  const { itemSelected } = useItemSettings();
  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      console.log("clicked:", event);
      event.stopPropagation();
      itemSelected(id);
    },
    [id, itemSelected]
  );
  return (
    <Button
      style={style}
      id={String(id)}
      variant="contained"
      color="primary"
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
};

export default ButtonItem;
