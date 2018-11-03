import React from "react";
import { addNewImageGroup } from "../../../store/features/canvas/actions";

const ImgControls = ({ canvas_group_id, canvas_id, dispatch }) => (
  <div className="add-image-container box">
    <button
      className="button is-danger is-outlined"
      onClick={() => dispatch(addNewImageGroup({ canvas_group_id, canvas_id }))}
    >
      ADD IMAGE SET
    </button>
  </div>
);

export default ImgControls;
