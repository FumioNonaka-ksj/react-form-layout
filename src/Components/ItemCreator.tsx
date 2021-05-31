import { useCallback } from "react";
import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import useItemSettings from "../hooks/useItemSettings";

const ItemCreator = () => {
  const { addSelectedItem } = useItemSettings();
  const addLabel = useCallback(() => {
    addSelectedItem("Label");
  }, [addSelectedItem]);
  const addTextBox = useCallback(() => {
    addSelectedItem("TextBox");
  }, [addSelectedItem]);
  const addPulldown = useCallback(() => {
    addSelectedItem("Pulldown");
  }, [addSelectedItem]);
  const addCooperatedPulldown = useCallback(() => {
    addSelectedItem("CooperatedPulldown");
  }, [addSelectedItem]);
  const addCheckBox = useCallback(() => {
    addSelectedItem("CheckBox");
  }, [addSelectedItem]);
  const addRadioButton = useCallback(() => {
    addSelectedItem("RadioButton");
  }, [addSelectedItem]);
  const addTextArea = useCallback(() => {
    addSelectedItem("TextArea");
  }, [addSelectedItem]);
  const addFileAttachment = useCallback(() => {
    addSelectedItem("FileAttachment");
  }, [addSelectedItem]);
  const addDateTime = useCallback(() => {
    addSelectedItem("DateTime");
  }, [addSelectedItem]);
  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="item creator button group"
      className="mr-1"
    >
      {/* Pulldown */}
      <Tooltip title="プルダウン" arrow>
        <Button>
          <i className={"far fa-list-alt"} onClick={addPulldown} />
        </Button>
      </Tooltip>
      {/* CooperatedPulldown */}
      <Tooltip title="連携プルダウン" arrow>
        <Button>
          <i className={"fas fa-th-list"} onClick={addCooperatedPulldown} />
        </Button>
      </Tooltip>
      {/* CheckBox */}
      <Tooltip title="チェックボックス" arrow>
        <Button>
          <i className={"fas fa-toggle-on"} onClick={addCheckBox} />
        </Button>
      </Tooltip>
      {/* RadioButton */}
      <Tooltip title="ラジオボタン" arrow>
        <Button>
          <i className={"fas fa-bullseye"} onClick={addRadioButton} />
        </Button>
      </Tooltip>
      {/* LabelItem */}
      <Tooltip title="ラベル" arrow>
        <Button>
          <i className={"far fa-newspaper"} onClick={addLabel} />
        </Button>
      </Tooltip>
      {/* TextBox */}
      <Tooltip title="テキストボックス" arrow>
        <Button>
          <i className={"far fa-edit"} onClick={addTextBox} />
        </Button>
      </Tooltip>
      {/* TextArea */}
      <Tooltip title="テキストエリア" arrow>
        <Button>
          <i className={"fas fa-file-signature"} onClick={addTextArea} />
        </Button>
      </Tooltip>
      {/* FileAttachment */}
      <Tooltip title="添付ファイル" arrow>
        <Button>
          <i className={"fas fa-file-upload"} onClick={addFileAttachment} />
        </Button>
      </Tooltip>
      <Tooltip title="日付・時間" arrow>
        <Button>
          {/* <i class="far fa-calendar-alt"></i> */}
          <i className={"far fa-calendar-alt"} onClick={addDateTime} />
        </Button>
      </Tooltip>
      {/* <Button>
        <i className={"far fa-arrow-alt-circle-down"} />
      </Button> */}
    </ButtonGroup>
  );
};

export default ItemCreator;
