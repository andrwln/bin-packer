import React from "react";

import { connect } from "react-redux";

import CheckAuth from "../hoc/auth/authCheck";
import CanvasGroupLayout from "./canvasGroupLayout";
function CanvasGroups({ canvas_group, dispatch }) {
  return canvas_group.map(
    ({ canvas_group_id, curr_canvas_id, canvas_list }, index) => {
      return (
        <div key={index}>
          <CanvasGroupLayout
            title={`Canvas Group ${index}`}
            canvas_group_id={canvas_group_id}
            curr_canvas_id={curr_canvas_id}
            canvas_list={canvas_list}
            dispatch={dispatch}
          />
        </div>
      );
    }
  );
}

const wrappedCanvasGroups = CheckAuth(CanvasGroups);

export default connect()(wrappedCanvasGroups);
