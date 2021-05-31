import { useCallback, useEffect, useRef, useState } from "react";
import { FormGroup } from "@material-ui/core";
import reducer, { ItemProps } from "../../Store/reducer";
import useItemSettings from "../../hooks/useItemSettings";
import SelectSingle from "./SelectSingle";

const CooperatedPulldown = ({ style, id }: ItemProps) => {
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
      top: 0 /* なぜか必要 */,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemRef.current?.clientWidth, itemRef.current?.clientHeight]);
  return (
    <div
      style={style}
      id={String(id)}
      onClick={(event) => event.stopPropagation()}
      ref={itemRef}
    >
      <FormGroup>
        <SelectSingle text="1階層項目1, 1階層項目2, 1階層項目3" />
        <SelectSingle text="2階層項目1, 2階層項目2, 2階層項目3" />
        <SelectSingle text="3階層項目1, 3階層項目2, 3階層項目3" />
      </FormGroup>
      {id !== selectedItem ? (
        <div style={overlayStyle} onClick={clickHandler} />
      ) : null}
    </div>
  );
};

export default CooperatedPulldown;
