import React from "react";

import ImgControls from "../canvas/controls/imgControls";
import CanvasTopBar from "../canvas/canvasTopBar/canvasTopBar";
import CanvasAreaContainer from "../canvas/canvasAreaContainer";

import "./canvasGroup.scss";

function CanvasGroupLayout({
  error,
  canvas_group_id,
  curr_canvas_id,
  canvas_list,
  dispatch
}) {
  if (canvas_list[0]) {
    const first_canvas = "0";
    const images = canvas_list[first_canvas].images;
    const {
      double_sided,
      height,
      width,
      hunit,
      wunit,
      blocks,
      max_spaces
    } = canvas_list[curr_canvas_id];
    return (
      <div className="canvas-layout-container">
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        <ImgControls
          canvas_group_id={canvas_group_id}
          canvas_id={first_canvas}
          images={images}
          double_sided={double_sided}
          dispatch={dispatch}
        />
        <div className="canvas-controls-container">
          <CanvasTopBar
            canvas_list={canvas_list}
            double_sided={double_sided}
            dispatch={dispatch}
          />
          <CanvasAreaContainer
            canvas_list={canvas_list}
            canvas_group_id={canvas_group_id}
            canvas_id={curr_canvas_id}
            height={height}
            width={width}
            hunit={hunit}
            wunit={wunit}
            blocks={blocks}
            double_sided={double_sided}
            max_spaces={max_spaces}
            dispatch={dispatch}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CanvasGroupLayout;
