import { useCallback } from "react";
import reducer, { changeGridAreaSize, Size } from "../Store/reducer";
import { LayoutContainer } from "./useLayoutContainer";
import useItemSettings from "./useItemSettings";

const useLayoutSettings = () => {
  const propertyPanelWidth = 250;
  const { boxSize, dispatch, gridAreaSize, layoutAreaSize } =
    reducer.useContainer();
  const { setBoxCount, setBoxSize, setLayoutAreaSize, setLayoutAreaWidth } =
    LayoutContainer.useContainer();
  const { isItemSelected } = useItemSettings();
  const resetBoxCount = useCallback(
    (width: number, height: number) => {
      if (boxSize < 10 || 100 < boxSize) {
        return;
      }
      const countX = Math.floor(width / boxSize) + 1;
      const countY = Math.floor(height / boxSize) + 1;
      setBoxCount(countX * countY);
    },
    [boxSize, setBoxCount]
  );
  const changeBoxSize = useCallback(
    (size: number) => {
      setBoxSize(size);
      const width = layoutAreaSize.width || 0;
      const height = layoutAreaSize.height || 0;
      setLayoutAreaWidth(width + boxSize);
      resetBoxCount(width, height);
    },
    [
      boxSize,
      layoutAreaSize.height,
      layoutAreaSize.width,
      resetBoxCount,
      setBoxSize,
      setLayoutAreaWidth,
    ]
  );
  const resetLayoutArea = useCallback(
    (layoutAreaRef: React.RefObject<HTMLDivElement>) => {
      const layoutArea = layoutAreaRef.current;
      if (!layoutArea) return;
      const layoutWidth =
        layoutArea.clientWidth - (isItemSelected ? propertyPanelWidth : 0);
      const layoutHeight = layoutArea.clientHeight;
      setLayoutAreaSize({ width: layoutWidth, height: layoutHeight });
      setLayoutAreaWidth(gridAreaSize.width + boxSize);
      resetBoxCount(gridAreaSize.width, gridAreaSize.height);
    },
    [
      boxSize,
      gridAreaSize.height,
      gridAreaSize.width,
      isItemSelected,
      resetBoxCount,
      setLayoutAreaSize,
      setLayoutAreaWidth,
    ]
  );
  const setGridAreaSize = useCallback(
    (gridAreaSize: Size) => {
      dispatch({ type: changeGridAreaSize, payload: gridAreaSize });
    },
    [dispatch]
  );
  return {
    changeBoxSize,
    propertyPanelWidth,
    resetBoxCount,
    resetLayoutArea,
    setGridAreaSize,
  };
};

export default useLayoutSettings;
