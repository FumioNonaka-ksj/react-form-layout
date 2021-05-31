import { useCallback } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";

const TextArea = ({ style, text, id }: ItemProps) => {
  const { itemSelected } = useItemSettings();
  const clickHandler: React.MouseEventHandler<HTMLTextAreaElement> =
    useCallback(
      (event) => {
        event.stopPropagation();
        itemSelected(id);
      },
      [id, itemSelected]
    );
  return (
    <TextareaAutosize
      placeholder="テキストエリア"
      style={style}
      value={text}
      id={String(id)}
      onClick={clickHandler}
    />
  );
};

export default TextArea;
