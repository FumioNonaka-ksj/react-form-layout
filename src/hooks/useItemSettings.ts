import { useCallback, useMemo } from "react";
import { useLatest } from "react-use";
import reducer, {
  changeItemsLaidOut,
  changeSelectedItem,
  changeSelectedItemMultiple,
  changeSelectedItemPosition,
  changeSelectedItemText,
  changeSelectedItemWithTime,
  changeArrowKeyControllable,
  ItemData,
  ItemStyle,
  ItemType,
  Position,
  resetItemValues,
} from "../Store/reducer";

const getNextItemId = (items: ItemData[]) => {
  const usedIds = items.reduce((accumulator: boolean[], item) => {
    accumulator[item.itemId] = true;
    return accumulator;
  }, []);
  const nextid = usedIds.findIndex((exists) => !exists);
  return nextid < 0 ? usedIds.length : nextid;
};
const getDefaultItemStyle = (itemType: ItemType): ItemStyle => {
  const position = { x: 0, y: 0 };
  switch (itemType) {
    case "Label":
      return { position, text: "ラベル" };
    case "TextBox":
      return { position, text: "" };
    case "Pulldown":
      return {
        position,
        text: "選択項目1, 選択項目2, 選択項目3",
        multiple: false,
      };
    case "CheckBox":
      return { position, text: "選択項目1, 選択項目2, 選択項目3" };
    case "RadioButton":
      return { position, text: "選択項目1, 選択項目2, 選択項目3" };
    case "TextArea":
      return { position, text: "" };
    case "FileAttachment":
      return { position, size: { width: 200, height: 150 }, text: "" };
    case "DateTime":
      return { position, dateWithTime: true };
    case "CooperatedPulldown":
      return { position };
    default:
      return { position };
  }
};

const useItemSettings = () => {
  const { dispatch, itemsLaidOut, selectedItem } = reducer.useContainer();
  const latestSelectedItem = useLatest(selectedItem);
  const latestItemsLaidOut = useLatest(itemsLaidOut);
  const itemSelected = useCallback(
    (id: number) => {
      const selectedItemProps = itemsLaidOut.find((item) => item.itemId === id);
      if (selectedItemProps) {
        const { dateWithTime, multiple, position, text } =
          selectedItemProps.itemStyle;
        dispatch({ type: changeSelectedItemPosition, payload: position });
        if (typeof text === "string") {
          dispatch({ type: changeSelectedItemText, payload: text });
        }
        if (typeof dateWithTime === "boolean") {
          dispatch({ type: changeSelectedItemWithTime, payload: dateWithTime });
        }
        if (typeof multiple === "boolean") {
          dispatch({ type: changeSelectedItemMultiple, payload: multiple });
        }
      }
      dispatch({ type: changeSelectedItem, payload: id });
    },
    [dispatch, itemsLaidOut]
  );
  const setSelectedItemPosition = useCallback(
    (position: Position) => {
      dispatch({ type: changeSelectedItemPosition, payload: position });
    },
    [dispatch]
  );
  const setSelectedItemText = useCallback(
    (text: string) => {
      dispatch({ type: changeSelectedItemText, payload: text });
    },
    [dispatch]
  );
  const setSelectedItemWithTime = useCallback(
    (withTime: boolean) => {
      dispatch({ type: changeSelectedItemWithTime, payload: withTime });
    },
    [dispatch]
  );
  const setSelectedItemMultiple = useCallback(
    (multiple: boolean) => {
      dispatch({ type: changeSelectedItemMultiple, payload: multiple });
    },
    [dispatch]
  );
  const setSelectedItemSettings = useCallback(
    (itemStyle: Partial<ItemStyle>) => {
      const _selectedItem = latestSelectedItem.current;
      const _itemsLaidOut = latestItemsLaidOut.current;
      const selectedItemSettings = _itemsLaidOut.find(
        (item) => item.itemId === _selectedItem
      );
      const newItemStyle = {
        ...selectedItemSettings?.itemStyle,
        ...itemStyle,
      };
      const newItemSettings = {
        ...selectedItemSettings,
        itemStyle: newItemStyle,
      };
      const newItemsLaidOut = _itemsLaidOut.map((item) =>
        item.itemId === _selectedItem ? newItemSettings : item
      );
      dispatch({
        type: changeItemsLaidOut,
        payload: newItemsLaidOut as ItemData[],
      });
    },
    [dispatch, latestItemsLaidOut, latestSelectedItem]
  );
  const addSelectedItem = useCallback(
    (itemType: ItemType) => {
      const newItemProps: ItemData = {
        itemId: getNextItemId(itemsLaidOut),
        itemType: itemType,
        itemStyle: getDefaultItemStyle(itemType),
      };
      dispatch({
        type: changeItemsLaidOut,
        payload: [...itemsLaidOut, newItemProps],
      });
    },
    [dispatch, itemsLaidOut]
  );
  const getItemListFromText = (stringList?: string) => {
    if (!stringList) return [];
    const commaSeparatedList = stringList.split(",");
    return commaSeparatedList.map((item) => item.trim());
  };
  const removeSelectedItem = useCallback(() => {
    const restItems = itemsLaidOut.filter(
      (item) => item.itemId !== selectedItem
    );
    dispatch({ type: changeItemsLaidOut, payload: restItems });
    dispatch({ type: changeSelectedItem, payload: null });
    dispatch({ type: resetItemValues });
  }, [dispatch, itemsLaidOut, selectedItem]);
  const setArrowKeyControllable = useCallback(
    (state: boolean) => {
      dispatch({ type: changeArrowKeyControllable, payload: state });
    },
    [dispatch]
  );
  const isItemSelected = useMemo(
    () => typeof selectedItem === "number",
    [selectedItem]
  );
  const selectedItemType = useMemo(() => {
    if (!isItemSelected) return null;
    const selectedItemData = itemsLaidOut.find(
      (itemData) => itemData.itemId === selectedItem
    );
    return selectedItemData?.itemType;
  }, [isItemSelected, itemsLaidOut, selectedItem]);
  return {
    addSelectedItem,
    getItemListFromText,
    itemSelected,
    isItemSelected,
    removeSelectedItem,
    selectedItemType,
    setSelectedItemPosition,
    setSelectedItemSettings,
    setSelectedItemText,
    setSelectedItemWithTime,
    setSelectedItemMultiple,
    setArrowKeyControllable,
  };
};

export default useItemSettings;
