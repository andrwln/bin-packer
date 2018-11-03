import React from "react";

import features from "../../../config/featureFlags";
import { setCanvasImgData } from "../../../store/features/canvas/actions";

const ImgQuantityControl = ({
  total_quantity,
  canvas_group_id,
  canvas_id,
  img_id,
  dispatch
}) => {
  function handleQuantityInputChange(e) {
    e.stopPropagation();
    let inputVal = e.currentTarget.value;
    if (inputVal.trim().length && /^(\s*|\d+)$/.test(inputVal)) {
      // Limit value input to 1000
      inputVal = inputVal > 1000 ? 1000 : inputVal;
      dispatch(
        setCanvasImgData({
          canvas_group_id,
          canvas_id,
          img_id,
          payload: {
            quantity: {
              [canvas_id]: inputVal ? parseInt(inputVal) : undefined
            },
            total_quantity: inputVal ? parseInt(inputVal) : undefined
          }
        })
      );
    }
  }
  let imageQuantityEls;
  if (features.variableQuantitySize) {
    imageQuantityEls = (
      <React.Fragment>
        <input
          className="image-input"
          type="text"
          name="image-quantity"
          value={total_quantity}
          placeholder="quantity"
          onChange={e => handleQuantityInputChange(e)}
          onClick={e => e.stopPropagation()}
        />
      </React.Fragment>
    );
  } else {
    imageQuantityEls = <React.Fragment>{total_quantity}</React.Fragment>;
  }
  return (
    <div className="image-quantity has-text-weight-bold">
      Quantity
      <div
        className="quantity-btn decrease"
        onClick={e => {
          e.stopPropagation();
          dispatch(
            setCanvasImgData({
              canvas_group_id,
              canvas_id,
              img_id,
              payload: {
                quantity: {
                  [canvas_id]: total_quantity > 0 ? total_quantity - 1 : 0
                },
                total_quantity: total_quantity > 0 ? total_quantity - 1 : 0
              }
            })
          );
        }}
      >
        -
      </div>
      {imageQuantityEls}
      <div
        className="quantity-btn increase"
        onClick={e => {
          e.stopPropagation();
          dispatch(
            setCanvasImgData({
              canvas_group_id,
              canvas_id,
              img_id,
              payload: {
                quantity: {
                  [canvas_id]: total_quantity + 1
                },
                total_quantity: total_quantity + 1
              }
            })
          );
        }}
      >
        +
      </div>
    </div>
  );
};

export default ImgQuantityControl;
