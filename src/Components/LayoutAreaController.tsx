import React, { useCallback, useRef, useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Slider,
  TextField,
} from "@material-ui/core";
import reducer, { Size } from "../Store/reducer";
import { LayoutContainer } from "../hooks/useLayoutContainer";
import usePropertySettings from "../hooks/usePropertySettings";
import useItemSettings from "../hooks/useItemSettings";
import useGridSettings from "../hooks/useGridSettings";

type Props = {
  containerPaddingX: string;
  layoutAreaRef: React.RefObject<HTMLDivElement>;
};
const labelStyle: React.CSSProperties = { whiteSpace: "nowrap" };
const controllerStyle = "d-flex align-items-center";
const GridController = (containerPaddingX: string) => {
  const { boxSize, gridAlpha, gridAreaSize, showGrid } = reducer.useContainer();
  const { boxSizeChanged, gridAlphaChanged, showGridChanged } =
    usePropertySettings();
  const { resetBoxCount, setGridAreaSize } = useGridSettings();
  const { setLayoutAreaWidth } = LayoutContainer.useContainer();
  const gridAreaSizeChanged = useCallback(
    (size: Size) => {
      setGridAreaSize(size);
      setLayoutAreaWidth(size.width + boxSize);
      const height = typeof size.height === "number" ? size.height : 0;
      // resetBoxCount(size.width, size.height);
      resetBoxCount(size.width, height);
    },
    [boxSize, resetBoxCount, setGridAreaSize, setLayoutAreaWidth]
  );
  const gridWidthChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const _width = event.target.value;
      const width = typeof _width === "number" ? _width : parseInt(_width);
      gridAreaSizeChanged({ ...gridAreaSize, width });
    },
    [gridAreaSize, gridAreaSizeChanged]
  );
  const gridHeightChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const _height = event.target.value;
      const height = typeof _height === "number" ? _height : parseInt(_height);
      gridAreaSizeChanged({ ...gridAreaSize, height });
    },
    [gridAreaSize, gridAreaSizeChanged]
  );
  return (
    <Container className={`${controllerStyle} ${containerPaddingX}`}>
      <span style={labelStyle} className="mr-2">
        幅
      </span>
      <TextField
        type="number"
        margin="dense"
        value={gridAreaSize.width}
        onChange={gridWidthChanged}
      />
      <span style={labelStyle} className="mx-2">
        高さ
      </span>
      <TextField
        type="number"
        margin="dense"
        value={gridAreaSize.height}
        onChange={gridHeightChanged}
      />
      <FormControlLabel
        control={<Checkbox color="primary" />}
        label="方眼"
        checked={showGrid}
        onChange={showGridChanged}
        style={labelStyle}
        className="my-0 ml-n2"
      />
      {showGrid ? (
        <>
          <span style={labelStyle} className="pr-2">
            濃さ
          </span>
          <Slider
            defaultValue={gridAlpha}
            value={gridAlpha}
            onChange={gridAlphaChanged}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
            className="mr-3"
          />
          <span style={labelStyle} className="mr-2">
            大きさ
          </span>
          <TextField
            type="number"
            margin="dense"
            value={boxSize}
            onChange={boxSizeChanged}
          />
        </>
      ) : null}
    </Container>
  );
};

const LayoutAreaController = ({ containerPaddingX }: Props) => {
  const { width, height } = useWindowSize();
  const { isItemSelected, setArrowKeyControllable } = useItemSettings();
  const { propertyPanelWidth } = useGridSettings();
  const controllerRef = useRef<HTMLDivElement>(null);
  const [controllerStyle, setControllerStyle] = useState<React.CSSProperties>({
    width: "auto",
  });
  useEffect(() => {
    setControllerStyle({ width: "auto" });
    if (isItemSelected) {
      setTimeout(() => {
        if (controllerRef.current) {
          setControllerStyle({
            width: controllerRef.current.clientWidth - propertyPanelWidth,
          });
        }
      }, 10);
    }
  }, [height, isItemSelected, propertyPanelWidth, width]);
  const clickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );
  const panelFocused = useCallback(() => {
    setArrowKeyControllable(false);
  }, [setArrowKeyControllable]);
  const panelBlurred = useCallback(() => {
    setArrowKeyControllable(true);
  }, [setArrowKeyControllable]);
  return (
    <div
      onClick={clickHandler}
      onFocus={panelFocused}
      onBlur={panelBlurred}
      ref={controllerRef}
      style={controllerStyle}
    >
      {GridController(containerPaddingX)}
    </div>
  );
};

export default LayoutAreaController;
