import { useReducer } from "react";
import { createContainer } from "unstated-next";

export type ItemType =
  | "Label"
  | "TextBox"
  | "Pulldown"
  | "CheckBox"
  | "RadioButton"
  | "TextArea"
  | "FileAttachment"
  | "DateTime"
  | "CooperatedPulldown";
export interface Position {
  x: number;
  y: number;
}
export interface Size {
  width: number;
  height?: number;
}
export interface ItemStyle {
  position: Position;
  size?: Size;
  text?: string;
  dateWithTime?: boolean;
  multiple?: boolean;
}
export interface ItemValues {
  selectedItemPosition: Position;
  selectedItemSize?: Size;
  selectedItemText?: string;
  selectedItemWithTime?: boolean;
  selectedItemMultiple?: boolean;
}
export interface ItemData {
  itemId: number;
  itemType: ItemType;
  itemStyle: ItemStyle;
}
export interface ItemProps {
  id: number;
  style: React.CSSProperties;
  text?: string;
}
export interface State {
  // grid control
  boxCount: number;
  boxSize: number;
  gridAlpha: number;
  layoutAreaSize: Size;
  gridAreaSize: Size;
  layoutAreaWidth: number;
  selectedItem: number | null;
  showGrid: boolean;
  // item control
  itemsLaidOut: ItemData[];
  selectedItemPosition: Position;
  selectedItemSize: Size;
  selectedItemText: string;
  selectedItemWithTime: boolean;
  selectedItemMultiple: boolean;
  arrowKeyControllable: boolean;
  mouseDownOnPanel: boolean;
}
// actions
// grid control
export const changeBoxCount = Symbol("changeBoxCount");
export const changeBoxSize = Symbol("changeBoxSize");
export const changeGridAlpha = Symbol("changeGridAlpha");
export const changeLayoutAreaSize = Symbol("changeLayoutAreaSize");
export const changeGridAreaSize = Symbol("changeGridAreaSize");
export const changeLayoutAreaWidth = Symbol("changeLayoutAreaWidth");
export const changeSelectedItem = Symbol("changeSelectedItem");
export const changeShowGrid = Symbol("changeShowGrid");
// item control
export const changeItemsLaidOut = Symbol("changeItemsLaidOut");
export const changeSelectedItemPosition = Symbol("changeSelectedItemPosition");
export const changeSelectedItemSize = Symbol("changeSelectedItemSize");
export const changeSelectedItemText = Symbol("changeSelectedItemText");
export const changeSelectedItemWithTime = Symbol("changeSelectedItemWithTime");
export const changeSelectedItemMultiple = Symbol("changeSelectedItemMultiple");
export const changeArrowKeyControllable = Symbol("changeArrowKeyControllable");
export const changeMouseDownOnPanel = Symbol("changeMouseDownOnPanel");
export const resetItemValues = Symbol("resetItemValues");
export type Action =
  | { type: typeof changeBoxCount; payload: number }
  | { type: typeof changeBoxSize; payload: number }
  | { type: typeof changeGridAlpha; payload: number }
  | { type: typeof changeLayoutAreaSize; payload: Size }
  | { type: typeof changeGridAreaSize; payload: Size }
  | { type: typeof changeLayoutAreaWidth; payload: number }
  | { type: typeof changeSelectedItem; payload: number | null }
  | { type: typeof changeShowGrid; payload: boolean }
  | { type: typeof changeItemsLaidOut; payload: ItemData[] }
  | { type: typeof changeSelectedItemPosition; payload: Position }
  | { type: typeof changeSelectedItemSize; payload: Size }
  | { type: typeof changeSelectedItemText; payload: string }
  | { type: typeof changeSelectedItemWithTime; payload: boolean }
  | { type: typeof changeSelectedItemMultiple; payload: boolean }
  | { type: typeof changeArrowKeyControllable; payload: boolean }
  | { type: typeof changeMouseDownOnPanel; payload: boolean }
  | { type: typeof resetItemValues };
const defaultItemValues: ItemValues = {
  selectedItemPosition: { x: 0, y: 0 },
  selectedItemText: "",
  selectedItemWithTime: true,
  selectedItemMultiple: false,
};
const getIntInRange = (value: number, min: number, max: number) => {
  const valueInRange = Math.max(Math.min(max, value), min);
  return Math.floor(valueInRange);
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    // grid controll
    case changeBoxCount:
      return { ...state, boxCount: action.payload };
    case changeBoxSize:
      const boxSize = getIntInRange(action.payload, 10, 100);
      return { ...state, boxSize: boxSize };
    case changeGridAlpha:
      const alpha = getIntInRange(action.payload, 10, 100);
      return { ...state, gridAlpha: alpha };
    case changeLayoutAreaSize:
      return { ...state, layoutAreaSize: action.payload };
    case changeGridAreaSize:
      return { ...state, gridAreaSize: action.payload };
    case changeLayoutAreaWidth:
      return { ...state, layoutAreaWidth: action.payload };
    case changeSelectedItem:
      return { ...state, selectedItem: action.payload };
    case changeShowGrid:
      return { ...state, showGrid: action.payload };
    // item control
    case changeItemsLaidOut:
      return { ...state, itemsLaidOut: action.payload };
    case changeSelectedItemPosition:
      const { x, y } = action.payload;
      const position = { x: Math.max(x, 0), y: Math.max(y, 0) };
      return { ...state, selectedItemPosition: position };
    case changeSelectedItemSize:
      const { width, height } = action.payload;
      const itemSize =
        typeof height === "number"
          ? {
              width: Math.max(width, 0),
              height: Math.max(height, 0),
            }
          : {
              width: Math.max(width, 0),
            };
      return { ...state, selectedItemSize: itemSize };
    case changeSelectedItemText:
      return { ...state, selectedItemText: action.payload };
    case changeSelectedItemWithTime:
      return { ...state, selectedItemWithTime: action.payload };
    case changeSelectedItemMultiple:
      return { ...state, selectedItemMultiple: action.payload };
    case changeArrowKeyControllable:
      return { ...state, arrowKeyControllable: action.payload };
    case changeMouseDownOnPanel:
      return { ...state, mouseDownOnPanel: action.payload };
    case resetItemValues:
      return { ...state, ...defaultItemValues };
    default:
      return state;
  }
};

const defaultItems: ItemData[] = [
  {
    itemId: 0,
    itemType: "Label",
    itemStyle: {
      position: { x: 240, y: 100 },
      size: { width: 180 },
      text: "ラベル",
    },
  },
  {
    itemId: 1,
    itemType: "TextBox",
    itemStyle: {
      position: { x: 140, y: 60 },
      size: { width: 180 },
      text: "",
    },
  },
  {
    itemId: 2,
    itemType: "Pulldown",
    itemStyle: {
      position: { x: 200, y: 200 },
      text: "選択項目1, 選択項目2, 選択項目3",
      multiple: false,
    },
  },
  {
    itemId: 3,
    itemType: "CheckBox",
    itemStyle: {
      position: { x: 60, y: 160 },
      text: "選択項目1, 選択項目2, 選択項目3",
    },
  },
  {
    itemId: 4,
    itemType: "RadioButton",
    itemStyle: {
      position: { x: 300, y: 0 },
      text: "選択項目1, 選択項目2, 選択項目3",
    },
  },
  {
    itemId: 5,
    itemType: "TextArea",
    itemStyle: {
      position: { x: 200, y: 160 },
      size: { width: 180, height: 30 },
      text: "",
    },
  },
  {
    itemId: 6,
    itemType: "FileAttachment",
    itemStyle: {
      position: { x: 0, y: 260 },
      size: { width: 200, height: 150 },
      text: "ファイル選択",
    },
  },
  {
    itemId: 7,
    itemType: "DateTime",
    itemStyle: {
      position: { x: 0, y: 100 },
      dateWithTime: true,
    },
  },
  {
    itemId: 8,
    itemType: "CooperatedPulldown",
    itemStyle: {
      position: { x: 0, y: 40 },
    },
  },
];

const initialState: State = {
  boxCount: 0,
  boxSize: 20,
  gridAlpha: 40,
  layoutAreaSize: { width: 0, height: 0 },
  gridAreaSize: { width: 800, height: 700 },
  layoutAreaWidth: 20,
  selectedItem: null,
  showGrid: true,
  itemsLaidOut: defaultItems,
  selectedItemPosition: { x: 0, y: 0 },
  selectedItemSize: { width: 0, height: 0 },
  selectedItemText: "",
  selectedItemWithTime: true,
  selectedItemMultiple: false,
  arrowKeyControllable: true,
  mouseDownOnPanel: false,
};
const useLayoutReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    dispatch,
    boxCount: state.boxCount,
    boxSize: state.boxSize,
    gridAlpha: state.gridAlpha,
    layoutAreaSize: state.layoutAreaSize,
    gridAreaSize: state.gridAreaSize,
    layoutAreaWidth: state.layoutAreaWidth,
    selectedItem: state.selectedItem,
    showGrid: state.showGrid,
    itemsLaidOut: state.itemsLaidOut,
    selectedItemPosition: state.selectedItemPosition,
    selectedItemSize: state.selectedItemSize,
    selectedItemText: state.selectedItemText,
    selectedItemWithTime: state.selectedItemWithTime,
    selectedItemMultiple: state.selectedItemMultiple,
    arrowKeyControllable: state.arrowKeyControllable,
    mouseDownOnPanel: state.mouseDownOnPanel,
  };
};

export default createContainer(useLayoutReducer);
