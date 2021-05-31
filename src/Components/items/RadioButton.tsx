import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import reducer, { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";

const RadioButton = ({ style, text, id }: ItemProps) => {
  const { selectedItem } = reducer.useContainer();
  const { getItemListFromText, itemSelected } = useItemSettings();
  const [value, setValue] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({
    position: "absolute",
    width: itemRef.current?.clientWidth,
    height: itemRef.current?.clientHeight,
    zIndex: 10,
  });
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      itemSelected(id);
    },
    [id, itemSelected]
  );
  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setValue(parseInt(target.value));
    },
    []
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
      <RadioGroup value={value} onChange={changeHandler}>
        {getItemListFromText(text).map((item, id) => (
          <FormControlLabel
            value={id}
            control={<Radio color="primary" />}
            label={item}
            key={id}
            style={{ height: "2em" }}
            className="my-0"
          />
        ))}
      </RadioGroup>
      {id !== selectedItem ? (
        <div style={overlayStyle} onClick={clickHandler} />
      ) : null}
    </FormControl>
  );
};

export default RadioButton;
