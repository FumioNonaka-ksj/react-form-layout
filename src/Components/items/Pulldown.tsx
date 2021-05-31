import { useCallback, useEffect, useRef, useState } from "react";
import { FormControl } from "@material-ui/core";
import reducer, { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";
import SelectSingle from "./SelectSingle";
import SelectMultiple from "./SelectMultiple";

type Props = { multiple?: boolean } & ItemProps;
const Pulldown = ({ style, text, id, multiple }: Props) => {
  const { selectedItem } = reducer.useContainer();
  const { itemSelected } = useItemSettings();
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
      id={String(id)}
      onClick={(event) => event.stopPropagation()}
      ref={itemRef}
    >
      {multiple ? (
        <SelectMultiple text={text ?? ""} />
      ) : (
        <SelectSingle text={text ?? ""} />
      )}
      {id !== selectedItem ? (
        <div style={overlayStyle} onClick={clickHandler} />
      ) : null}
    </FormControl>
  );
};

export default Pulldown;
