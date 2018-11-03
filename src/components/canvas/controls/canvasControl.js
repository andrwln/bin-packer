import React from "react";

import { setCanvasSize } from "../../../store/features/canvas/actions";

const canvasSizes = {
  0: {
    w: 18,
    h: 24,
    p: 30
  },
  1: {
    w: 48,
    h: 48,
    p: 22
  },
  2: {
    w: 20,
    h: 40,
    p: 25
  }
};

const changedCanvas = ({ e, canvas_group_id, canvas_id, dispatch }) => {
  const { w, h, p } = canvasSizes[e.currentTarget.value];
  const payload = {
    width: w,
    height: h,
    ratio: p
  };

  dispatch(
    setCanvasSize({
      canvas_group_id: canvas_group_id,
      canvas_id: canvas_id,
      payload: payload
    })
  );
};

const CanvasControls = ({ canvas_group_id, canvas_id, title, dispatch }) => {
  return (
    <div className="canvas-controls-container">
      <div className="canvas-control-line subtitle is-5">{title} Controls</div>
      <div className="level canvas-controls">
        <div className="select">
          <select
            id="size"
            onChange={e =>
              changedCanvas({ e, canvas_group_id, canvas_id, dispatch })
            }
          >
            <option value="0">18x24</option>
            <option value="1">48x48</option>
            <option value="2">20x40</option>
          </select>
        </div>
        <div>
          <button
            className="button"
            onClick={e => dispatch(addNewCanvas({ canvas_group_id }))}
          >
            Add New Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasControls;
