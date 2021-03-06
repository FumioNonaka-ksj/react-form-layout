import React, { useCallback, useMemo } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  TextField,
  Tooltip,
} from "@material-ui/core";
import reducer from "../Store/reducer";
import useItemSettings from "../hooks/useItemSettings";
import useGridSettings from "../hooks/useGridSettings";

type Props = {
  propertyPanelRef: React.RefObject<HTMLDivElement>;
};
type TextFieldProps = {
  label: string;
  itemText?: string;
  fullWidth?: boolean;
};
const fieldClass = "mx-1 mt-1 mb-0";
const PropertyPanel = ({ propertyPanelRef }: Props) => {
  const {
    selectedItemMultiple,
    selectedItemPosition,
    selectedItemSize,
    selectedItemText,
    selectedItemWithTime,
  } = reducer.useContainer();
  const {
    getItemListFromText,
    isItemSelected,
    removeSelectedItem,
    selectedItemType,
    setSelectedItemMultiple,
    setSelectedItemPosition,
    setSelectedItemSize,
    setSelectedItemSettings,
    setSelectedItemText,
    setSelectedItemWithTime,
    setArrowKeyControllable,
    setMouseDownOnPanel,
  } = useItemSettings();
  const { propertyPanelWidth } = useGridSettings();
  const { x: left, y: top } = selectedItemPosition;
  const { width, height } = selectedItemSize;
  const clickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );
  const itemLeftChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isItemSelected) return;
      const target = event.currentTarget;
      const x: number = parseInt(target.value, 10);
      if (Number.isNaN(x)) return;
      const newPosition = { ...selectedItemPosition, x };
      setSelectedItemPosition(newPosition);
      setSelectedItemSettings({ position: newPosition });
    },
    [
      isItemSelected,
      selectedItemPosition,
      setSelectedItemPosition,
      setSelectedItemSettings,
    ]
  );
  const itemTopChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isItemSelected) return;
      const target = event.currentTarget;
      const y: number = parseInt(target.value, 10);
      if (Number.isNaN(y)) return;
      const newPosition = { ...selectedItemPosition, y };
      setSelectedItemPosition(newPosition);
      setSelectedItemSettings({ position: newPosition });
    },
    [
      isItemSelected,
      selectedItemPosition,
      setSelectedItemPosition,
      setSelectedItemSettings,
    ]
  );
  const itemWidthChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isItemSelected) return;
      const target = event.currentTarget;
      const width: number = parseInt(target.value, 10);
      if (Number.isNaN(width)) return;
      const newSize = { ...selectedItemSize, width };
      setSelectedItemSize(newSize);
      setSelectedItemSettings({ size: newSize });
    },
    [
      isItemSelected,
      selectedItemSize,
      setSelectedItemSettings,
      setSelectedItemSize,
    ]
  );
  const itemHeightChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isItemSelected) return;
      const target = event.currentTarget;
      const height: number = parseInt(target.value, 10);
      if (Number.isNaN(height)) return;
      const newSize = { ...selectedItemSize, height };
      setSelectedItemSize(newSize);
      setSelectedItemSettings({ size: newSize });
    },
    [
      isItemSelected,
      selectedItemSize,
      setSelectedItemSettings,
      setSelectedItemSize,
    ]
  );
  const itemTexChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isItemSelected) return;
      const target = event.currentTarget;
      const text = target.value;
      setSelectedItemText(text);
      setSelectedItemSettings({ text: text });
    },
    [isItemSelected, setSelectedItemSettings, setSelectedItemText]
  );
  const itemListChanged = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: number
    ) => {
      if (!isItemSelected) return;
      const target = event.currentTarget;
      const itemList = getItemListFromText(selectedItemText);
      itemList[id] = target.value;
      const text = itemList.join(",");
      setSelectedItemText(text);
      setSelectedItemSettings({ text: text });
    },
    [
      getItemListFromText,
      isItemSelected,
      selectedItemText,
      setSelectedItemSettings,
      setSelectedItemText,
    ]
  );
  const withTimeChanged = useCallback(
    (event: React.ChangeEvent<{}>, checked: boolean) => {
      if (!isItemSelected) return;
      setSelectedItemWithTime(checked);
      setSelectedItemSettings({ dateWithTime: checked });
    },
    [isItemSelected, setSelectedItemSettings, setSelectedItemWithTime]
  );
  const multipleChanged = useCallback(
    (event: React.ChangeEvent<{}>, checked: boolean) => {
      if (!isItemSelected) return;
      setSelectedItemMultiple(checked);
      setSelectedItemSettings({ multiple: checked });
    },
    [isItemSelected, setSelectedItemMultiple, setSelectedItemSettings]
  );
  const itemRemoved = useCallback(() => {
    if (!isItemSelected) return;
    removeSelectedItem();
    setArrowKeyControllable(true);
  }, [isItemSelected, removeSelectedItem, setArrowKeyControllable]);
  const textField = useCallback(
    ({ label, itemText, fullWidth }: TextFieldProps) => (
      <FormControl fullWidth={fullWidth}>
        <TextField
          type="text"
          label={label}
          margin="dense"
          value={itemText}
          onChange={itemTexChanged}
          disabled={!isItemSelected}
          className={fieldClass}
        />
      </FormControl>
    ),
    [isItemSelected, itemTexChanged]
  );
  const textFieldList = useCallback(
    ({ label, fullWidth }: TextFieldProps) => {
      const itemList = getItemListFromText(selectedItemText);
      return itemList.map((item, id) => (
        <div key={id}>
          <FormControl fullWidth={fullWidth}>
            <TextField
              type="text"
              label={`${label}${id + 1}`}
              margin="dense"
              value={item}
              onChange={(event) => itemListChanged(event, id)}
              disabled={!isItemSelected}
              className={fieldClass}
              key={id}
            />
          </FormControl>
        </div>
      ));
    },
    [getItemListFromText, isItemSelected, itemListChanged, selectedItemText]
  );
  const panelFocused = useCallback(() => {
    setArrowKeyControllable(false);
  }, [setArrowKeyControllable]);
  const panelBlurred = useCallback(() => {
    setArrowKeyControllable(true);
  }, [setArrowKeyControllable]);
  const mouseDownOnPanel = useCallback(
    () => setMouseDownOnPanel(true),
    [setMouseDownOnPanel]
  );
  const mouseUpOnPanel = useCallback(
    () => setMouseDownOnPanel(false),
    [setMouseDownOnPanel]
  );
  const itemListOptions = useMemo(
    () => textFieldList({ label: "??????", fullWidth: true }),
    [textFieldList]
  );
  const pulldownOptions = useMemo(
    () => (
      <div>
        {itemListOptions}
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="????????????"
          checked={selectedItemMultiple}
          onChange={multipleChanged}
          className="mt-0 mb-n2 ml-n2 mr-2"
        />
      </div>
    ),
    [itemListOptions, multipleChanged, selectedItemMultiple]
  );
  const dateTimeOptions = useMemo(
    () => (
      <FormControlLabel
        control={<Checkbox color="primary" />}
        label="??????"
        checked={selectedItemWithTime}
        onChange={withTimeChanged}
        className="mt-0 mb-n2 ml-n2 mr-2"
      />
    ),
    [selectedItemWithTime, withTimeChanged]
  );
  const fileAttachmentOptions = useMemo(
    () => (
      <div>
        <div>
          <TextField
            type="number"
            label="???"
            margin="dense"
            value={width}
            onChange={itemWidthChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
        <div>
          <TextField
            type="number"
            label="??????"
            margin="dense"
            value={height}
            onChange={itemHeightChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
      </div>
    ),
    [height, isItemSelected, itemHeightChanged, itemWidthChanged, width]
  );
  const labelOptions = useMemo(
    () => (
      <div>
        <div>
          <TextField
            type="number"
            label="???"
            margin="dense"
            value={width}
            onChange={itemWidthChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
        {textField({
          label: "????????????",
          itemText: selectedItemText,
          fullWidth: true,
        })}
      </div>
    ),
    [isItemSelected, itemWidthChanged, selectedItemText, textField, width]
  );
  const textBoxOptions = useMemo(
    () => (
      <div>
        <TextField
          type="number"
          label="???"
          margin="dense"
          value={width}
          onChange={itemWidthChanged}
          disabled={!isItemSelected}
          className={fieldClass}
        />
      </div>
    ),
    [isItemSelected, itemWidthChanged, width]
  );
  const textAreaOptions = useMemo(
    () => (
      <div>
        <div>
          <TextField
            type="number"
            label="???"
            margin="dense"
            value={width}
            onChange={itemWidthChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
        <div>
          <TextField
            type="number"
            label="??????"
            margin="dense"
            value={height}
            onChange={itemHeightChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
      </div>
    ),
    [height, isItemSelected, itemHeightChanged, itemWidthChanged, width]
  );
  const settingOptions = useMemo(() => {
    switch (selectedItemType) {
      case "CheckBox":
      case "RadioButton":
        return itemListOptions;
      case "Pulldown":
        return pulldownOptions;
      case "DateTime":
        return dateTimeOptions;
      case "FileAttachment":
        return fileAttachmentOptions;
      case "Label":
        return labelOptions;
      case "TextBox":
        return textBoxOptions;
      case "TextArea":
        return textAreaOptions;
      default:
        return null;
    }
  }, [
    selectedItemType,
    itemListOptions,
    pulldownOptions,
    dateTimeOptions,
    fileAttachmentOptions,
    labelOptions,
    textBoxOptions,
    textAreaOptions,
  ]);
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isItemSelected}
      onClick={clickHandler}
      onFocus={panelFocused}
      onBlur={panelBlurred}
      onMouseDown={mouseDownOnPanel}
      onMouseUp={mouseUpOnPanel}
      className="d-flex flex-column"
    >
      <div style={{ width: propertyPanelWidth }} ref={propertyPanelRef}>
        <div>
          <TextField
            type="number"
            label="?????????"
            margin="dense"
            value={left}
            onChange={itemLeftChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
        <div>
          <TextField
            type="number"
            label="?????????"
            margin="dense"
            value={top}
            onChange={itemTopChanged}
            disabled={!isItemSelected}
            className={fieldClass}
          />
        </div>
      </div>
      {settingOptions}
      <div className="m-1">
        <Tooltip title="??????" arrow>
          <span style={isItemSelected ? {} : { pointerEvents: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={itemRemoved}
              disabled={!isItemSelected}
            >
              <i className="far fa-trash-alt" />
            </Button>
          </span>
        </Tooltip>
      </div>
    </Drawer>
  );
};

export default PropertyPanel;
