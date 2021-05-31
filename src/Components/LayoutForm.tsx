import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "react-use";
import { Container } from "@material-ui/core";
import reducer, { changeSelectedItem, resetItemValues } from "../Store/reducer";
import useGridSettings from "../hooks/useGridSettings";
import PropertyInspector from "./PropertyInspector";
import ItemCreator from "./ItemCreator";
import ItemsLayout from "./ItemsLayout";
import Grid from "./Grid";
import PropertyPanel from "./PropertyPanel";

const containerPaddingX = "px-2";
const LayoutForm = () => {
  const { gridAreaSize, layoutAreaSize } = reducer.useContainer();
  const scrollAreaStyle: React.CSSProperties = useMemo(
    () => ({
      width: layoutAreaSize.width,
      height: layoutAreaSize.height,
      overflow: "scroll",
      border: "solid 1px",
      position: "relative",
    }),
    [layoutAreaSize.height, layoutAreaSize.width]
  );
  const layoutAreaStyle: React.CSSProperties = useMemo(
    () => ({
      overflow: "hidden",
      width: gridAreaSize.width,
      height: gridAreaSize.height,
      position: "relative",
    }),
    [gridAreaSize.height, gridAreaSize.width]
  );
  const { boxCount, dispatch } = reducer.useContainer();
  const { resetLayoutArea } = useGridSettings();
  const layoutAreaRef = useRef<HTMLDivElement>(null);
  const propertyPanelRef = useRef<HTMLDivElement>(null);
  // ウィンドウサイズの変更時に再レイアウトさせる
  const { width, height } = useWindowSize();
  useEffect(() => {
    resetLayoutArea(layoutAreaRef);
  }, [resetLayoutArea, width, height]);
  const reselectItem: any = useCallback(() => {
    dispatch({ type: changeSelectedItem, payload: null });
    dispatch({ type: resetItemValues });
  }, [dispatch]);
  return (
    <div onClick={reselectItem}>
      <PropertyInspector
        containerPaddingX={containerPaddingX}
        layoutAreaRef={layoutAreaRef}
      />
      <Container
        className={`d-flex justify-content-center ${containerPaddingX}`}
        style={{ marginRight: 0 }}
      >
        <ItemCreator />
        <Container ref={layoutAreaRef} className="p-0" style={layoutAreaStyle}>
          <div style={scrollAreaStyle}>
            <Grid boxCount={boxCount} />
            <ItemsLayout />
          </div>
        </Container>
      </Container>
      <PropertyPanel propertyPanelRef={propertyPanelRef} />
    </div>
  );
};

export default LayoutForm;
