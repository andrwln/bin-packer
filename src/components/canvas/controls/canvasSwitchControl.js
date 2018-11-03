import React from "react";

import { switchCanvasInView } from "../../../store/features/canvas/actions";

const CanvasSwitchControl = ({
  canvas_list,
  canvas_group_id,
  curr_canvas_id,
  dispatch
}) => {
  const next_canvas_id = Number(curr_canvas_id) + 1;
  const prev_canvas_id = Number(curr_canvas_id) - 1;
  const next_canvas = canvas_list[next_canvas_id];
  const prev_canvas = canvas_list[prev_canvas_id];
  const total_canvas_count = canvas_list.length;
  return (
    <div>
      <button
        className="button"
        disabled={!prev_canvas}
        onClick={e =>
          dispatch(
            switchCanvasInView({
              id: canvas_group_id,
              payload: {
                curr_canvas_id: prev_canvas_id
              }
            })
          )
        }
      >
        Previous Canvas
      </button>
      <label>
        Canvas {next_canvas_id} of {total_canvas_count}
      </label>
      <button
        className="button"
        disabled={!next_canvas}
        onClick={e =>
          dispatch(
            switchCanvasInView({
              id: canvas_group_id,
              payload: {
                curr_canvas_id: next_canvas_id
              }
            })
          )
        }
      >
        Next Canvas
      </button>
    </div>
  );
};

export default CanvasSwitchControl;
