import reducer from "../Store/reducer";

type Props = {
  boxCount: number;
};
const Grid = ({ boxCount }: Props) => {
  const { boxSize, gridAlpha, layoutAreaWidth, showGrid } =
    reducer.useContainer();
  const gridStyle: React.CSSProperties = {
    width: boxSize,
    height: boxSize,
    opacity: gridAlpha / 100,
    // palette.primary.light: #4791db
    boxShadow: "inset -1px -1px #4791db",
  };
  return (
    <div
      id="grid"
      className="m-0 p-0 d-flex flex-wrap"
      style={{ position: "absolute", width: layoutAreaWidth }}
    >
      {showGrid
        ? Array.from(new Array(boxCount), (_, id) => (
            <div style={gridStyle} key={id} />
          ))
        : null}
    </div>
  );
};

export default Grid;
