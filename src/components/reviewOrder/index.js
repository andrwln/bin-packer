import React from "react";

import ReviewOrderTopBar from "./reviewOrderTopBar";
import CanvasAreaContainer from "../canvas/canvasAreaContainer";
import OrderSummary from "./orderSummary";

const ReviewOrder = ({ canvas_group, dispatch }) => {
  return canvas_group.map(
    ({ canvas_group_id, curr_canvas_id, canvas_list }, index) => {
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
        <div className="review-page-container" key={index}>
          <ReviewOrderTopBar
            canvas_list={canvas_list}
            double_sided={double_sided}
            dispatch={dispatch}
          />
          <div className="review-main-content">
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
            <OrderSummary
              canvas_list={canvas_list}
              double_sided={double_sided}
              dispatch={dispatch}
            />
          </div>
        </div>
      );
    }
  );
};

export default ReviewOrder;
