import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@material-ui/core";
import reducer, { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";

const CheckBox = ({ style, text, id }: ItemProps) => {
  const { selectedItem } = reducer.useContainer();
  const { getItemListFromText, itemSelected } = useItemSettings();
  const itemRef = useRef<HTMLDivElement>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({
    position: "absolute",
    width: itemRef.current?.clientWidth,
    height: itemRef.current?.clientHeight,
  });
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      itemSelected(id);
    },
    [id, itemSelected]
  );
  useEffect(() => {
    if (!itemRef.current) return;
    setOverlayStyle({
      ...overlayStyle,
      width: itemRef.current.clientWidth,
      height: itemRef.current.clientHeight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemRef.current?.clientWidth, itemRef.current?.clientHeight]);
  return (
    <FormControl
      style={style}
      onClick={(event) => event.stopPropagation()}
      ref={itemRef}
    >
      <FormGroup>
        {getItemListFromText(text).map((item, id) => (
          <FormControlLabel
            control={<Switch color="primary" />}
            label={item}
            key={id}
            style={{ height: "2em" }}
            className="my-0"
          />
        ))}
      </FormGroup>
      {id !== selectedItem ? (
        <div style={overlayStyle} onClick={clickHandler} />
      ) : null}
    </FormControl>
  );
};

export default CheckBox;
