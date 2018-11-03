import React from "react";

import features from "../../../config/featureFlags";
import { setCanvasImgData } from "../../../store/features/canvas/actions";

const ImgSizeControl = ({
  width,
  height,
  canvas_group_id,
  canvas_id,
  img_id,
  dispatch
}) => {
  let imageSizeEls;
  if (features.variableImageSize) {
    imageSizeEls = (
      <React.Fragment>
        <div className="width-container">
          <label className="dimension-label">W </label>
          <input
            className="image-input"
            type="text"
            name="image-width"
            value={width}
            placeholder="width"
            onChange={e =>
              dispatch(
                setCanvasImgData({
                  canvas_group_id,
                  canvas_id,
                  img_id,
                  payload: {
                    width: e.currentTarget.value
                      ? parseInt(e.currentTarget.value)
                      : undefined
                  }
                })
              )
            }
          />
        </div>
        <div className="height-container">
          <label className="dimension-label">H </label>
          <input
            className="image-input"
            type="text"
            name="image-height"
            value={height}
            placeholder="height"
            onChange={e =>
              dispatch(
                setCanvasImgData({
                  canvas_group_id,
                  canvas_id,
                  img_id,
                  payload: {
                    height: e.currentTarget.value
                      ? parseInt(e.currentTarget.value)
                      : undefined
                  }
                })
              )
            }
          />
        </div>
      </React.Fragment>
    );
  } else {
    imageSizeEls = (
      <React.Fragment>
        <div className="width-container">
          <label className="dimension-label">W </label> {width}'
        </div>
        <div className="height-container">
          <label className="dimension-label">H </label> {height}'
        </div>
      </React.Fragment>
    );
  }
  return <div className="image-size">{imageSizeEls}</div>;
};

export default ImgSizeControl;
