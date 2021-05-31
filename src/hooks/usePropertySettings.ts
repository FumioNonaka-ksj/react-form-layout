import { useCallback } from "react";
import { LayoutContainer } from "./useLayoutContainer";
import useLayoutSettings from "./useGridSettings";

const usePropertySettings = () => {
  const { setGridAlpha, setShowGrid } = LayoutContainer.useContainer();
  const { changeBoxSize } = useLayoutSettings();
  const gridAlphaChanged = useCallback(
    (_: React.ChangeEvent<{}>, value: number | number[]) => {
      const alpha: number =
        typeof value === "number" ? value : value.length === 0 ? 0 : value[0];
      setGridAlpha(alpha);
    },
    [setGridAlpha]
  );
  const boxSizeChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget;
      const size: number = parseInt(target.value, 10);
      if (Number.isNaN(size)) return;
      changeBoxSize(size);
    },
    [changeBoxSize]
  );
  const showGridChanged = useCallback(
    (_: React.ChangeEvent<{}>, checked: boolean) => {
      setShowGrid(checked);
    },
    [setShowGrid]
  );
  return { boxSizeChanged, gridAlphaChanged, showGridChanged };
};

export default usePropertySettings;
