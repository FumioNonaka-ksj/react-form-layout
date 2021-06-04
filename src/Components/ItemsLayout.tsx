import { useKey, useLatest } from "react-use";
import { Handler } from "react-use/lib/useKey";
import reducer, { ItemData } from "../Store/reducer";
import useItemSettings from "../hooks/useItemSettings";
import Label from "./items/Label";
import TextBox from "./items/TextBox";
import TextArea from "./items/TextArea";
import Pulldown from "./items/Pulldown";
import CheckBox from "./items/CheckBox";
import RadioButton from "./items/RadioButton";
import FileAttachment from "./items/FileAttachment";
import DateTime from "./items/DateTime";
import CooperatedPulldown from "./items/CooperatedPulldown";
import React from "react";

const selectedStyle = {
  // Default values: https://material-ui.com/customization/palette/#default-values
  // primary.main: 1976d2
  border: "1px solid rgba(25, 118, 210, 0.6)",
  boxShadow: "0 0 10px rgba(25, 118, 210, 0.8)",
};
const getItems = (itemsLaidOut: ItemData[], selectedItem: number | null) => {
  return itemsLaidOut.map((item) => {
    const { itemType, itemStyle } = item;
    // const { position } = itemStyle;
    const { position, size } = itemStyle;
    const baseStyle: React.CSSProperties = {
      left: position.x,
      top: position.y,
      position: "absolute",
    };
    const style: React.CSSProperties =
      item.itemId === selectedItem
        ? { ...baseStyle, ...selectedStyle }
        : baseStyle;
    let text = "";
    switch (itemType) {
      case "Label":
        if (itemStyle.text) {
          text = itemStyle.text;
        }
        return (
          // <Label style={style} text={text} id={item.itemId} key={item.itemId} />
          <Label
            style={{ ...style, width: size?.width }}
            text={text}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "TextBox":
        if (itemStyle.text) {
          text = itemStyle.text;
        }
        return (
          <TextBox
            style={{ ...style, width: size?.width }}
            text={text}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "TextArea":
        if (itemStyle.text) {
          text = itemStyle.text;
        }
        return (
          <TextArea
            style={{ ...style, width: size?.width, height: size?.height }}
            text={text}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "Pulldown":
        return (
          <Pulldown
            style={style}
            text={itemStyle.text ?? ""}
            multiple={itemStyle.multiple}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "CheckBox":
        return (
          <CheckBox
            style={style}
            text={itemStyle.text ?? ""}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "RadioButton":
        return (
          <RadioButton
            style={style}
            text={itemStyle.text ?? ""}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "FileAttachment":
        return (
          <FileAttachment
            style={{ ...style, ...itemStyle.size }}
            text={!itemStyle.text ? "ファイル選択" : itemStyle.text}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "DateTime":
        return (
          <DateTime
            style={style}
            dateWithTime={itemStyle.dateWithTime}
            id={item.itemId}
            key={item.itemId}
          />
        );
      case "CooperatedPulldown":
        return (
          <CooperatedPulldown
            style={style}
            id={item.itemId}
            key={item.itemId}
          />
        );
      default:
        return null;
    }
  });
};
const ItemsLayout = () => {
  const {
    arrowKeyControllable,
    itemsLaidOut,
    layoutAreaWidth,
    selectedItem,
    selectedItemPosition,
  } = reducer.useContainer();
  const { setSelectedItemPosition, setSelectedItemSettings } =
    useItemSettings();
  const latestSelectedItem = useLatest(selectedItem);
  const latestSelectedItemPosition = useLatest(selectedItemPosition);
  const latestArrowKeyControllable = useLatest(arrowKeyControllable);
  const layoutStyle: React.CSSProperties = {
    position: "absolute",
    width: layoutAreaWidth,
  };
  const arrowPress: Handler = (event: KeyboardEvent) => {
    if (typeof latestSelectedItem.current !== "number") return;
    if (!latestArrowKeyControllable.current) return;
    event.preventDefault();
    const _selectedItemPosition = latestSelectedItemPosition.current;
    const px = event.shiftKey ? 10 : 1;
    switch (event.key) {
      case "ArrowUp":
        _selectedItemPosition.y = _selectedItemPosition.y - px;
        break;
      case "ArrowDown":
        _selectedItemPosition.y = _selectedItemPosition.y + px;
        break;
      case "ArrowLeft":
        _selectedItemPosition.x = _selectedItemPosition.x - px;
        break;
      case "ArrowRight":
        _selectedItemPosition.x = _selectedItemPosition.x + px;
        break;
      default:
        console.log("not arrow key:", event.key);
        break;
    }
    setSelectedItemPosition(_selectedItemPosition);
    setSelectedItemSettings({ position: _selectedItemPosition });
  };
  useKey("ArrowUp", arrowPress);
  useKey("ArrowDown", arrowPress);
  useKey("ArrowLeft", arrowPress);
  useKey("ArrowRight", arrowPress);
  return <div style={layoutStyle}>{getItems(itemsLaidOut, selectedItem)}</div>;
};

export default ItemsLayout;
