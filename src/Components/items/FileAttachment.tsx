import { useCallback } from "react";
import { Box, Button } from "@material-ui/core";
import { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";

const boxStyle = {
  border: "1px dotted #888",
};
const FileAttachment = ({ style, text = "", id }: ItemProps) => {
  const { itemSelected } = useItemSettings();
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      itemSelected(id);
    },
    [id, itemSelected]
  );
  return (
    <Box
      style={{ ...style, ...boxStyle }}
      className="d-flex justify-content-center align-items-center"
      onClick={clickHandler}
    >
      <Button size="small" variant="contained" color="primary">
        {text}
      </Button>
    </Box>
  );
};

export default FileAttachment;
