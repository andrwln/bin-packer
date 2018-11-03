import React from "react";
import Canvas from "./";

const CanvasAreaContainer = function({
  canvas_id,
  height,
  width,
  hunit,
  wunit,
  blocks,
  double_sided,
  max_spaces,
  canvas_list,
  canvas_group_id,
  dispatch
}) {
  return (
    <div className="canvas-area-container">
      <div className="batch-detail">
        <label>
          Sheet <label className="highlight">{Number(canvas_id) + 1}</label> of{" "}
          {canvas_list.length}
        </label>
      </div>
      <div className="canvas-area">
        <Canvas
          canvas_id={canvas_id}
          height={height}
          width={width}
          hunit={hunit}
          wunit={wunit}
          blocks={blocks}
          double_sided={double_sided}
          max_spaces={max_spaces}
          canvas_list={canvas_list}
          canvas_group_id={canvas_group_id}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default CanvasAreaContainer;
