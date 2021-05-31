import { useCallback } from "react";
import { createContainer } from "unstated-next";
import reducer, {
  changeBoxCount,
  changeBoxSize,
  changeGridAlpha,
  changeLayoutAreaSize,
  changeLayoutAreaWidth,
  changeShowGrid,
  Size,
} from "../Store/reducer";

const useLayoutContainer = () => {
  const { dispatch } = reducer.useContainer();
  const setGridAlpha = useCallback(
    (alpha: number) => dispatch({ type: changeGridAlpha, payload: alpha }),
    [dispatch]
  );
  const setBoxCount = useCallback(
    (count: number) => dispatch({ type: changeBoxCount, payload: count }),
    [dispatch]
  );
  const setBoxSize = useCallback(
    (size: number) => dispatch({ type: changeBoxSize, payload: size }),
    [dispatch]
  );
  const setLayoutAreaSize = useCallback(
    (areaSize: Size) =>
      dispatch({ type: changeLayoutAreaSize, payload: areaSize }),
    [dispatch]
  );
  const setLayoutAreaWidth = useCallback(
    (width: number) =>
      dispatch({ type: changeLayoutAreaWidth, payload: width }),
    [dispatch]
  );
  const setShowGrid = useCallback(
    (show: boolean) => dispatch({ type: changeShowGrid, payload: show }),
    [dispatch]
  );
  return {
    setGridAlpha,
    setBoxCount,
    setBoxSize,
    setLayoutAreaSize,
    setLayoutAreaWidth,
    setShowGrid,
  };
};

export const LayoutContainer = createContainer(useLayoutContainer);
