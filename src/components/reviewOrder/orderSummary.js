import React from "react";

import { setCanvasGroup } from "../../store/features/canvas/actions";
import { getTopBarData } from "../../store/features/canvas/methods/checkOutData";

const OrderSummary = ({ canvas_list, double_sided, dispatch }) => {
  const {
    sheet_quantity,
    sign_quantity,
    subtotal_price,
    total_price,
    shipping_cost
  } = getTopBarData({ canvas_list, double_sided });

  function handleRadioChanged(e) {
    if (e.currentTarget.checked) {
      const include = e.currentTarget.value === "include";
      dispatch(
        setCanvasGroup({
          canvas_group_id: 0,
          canvas_id: 0,
          payload: {
            include_stakes: include
          }
        })
      );
    }
  }

  return (
    <div className="order-summary-container box">
      <div className="header">Order Summary</div>
      <div className="item">
        <div className="left">
          <div className="detail">Include H Stakes?</div>
        </div>
        <div className="right">
          <label className="radio">
            <input
              className="stake-radio"
              onChange={e => handleRadioChanged(e)}
              type="radio"
              name="h-stakes"
              value="include"
            />
            Yes
          </label>
          <label className="radio">
            <input
              className="stake-radio"
              onChange={e => handleRadioChanged(e)}
              type="radio"
              name="h-stakes"
              value="exclude"
            />
            No
          </label>
        </div>
      </div>
      <div className="item">
        <div className="left">
          <div className="detail">{sheet_quantity} Sheet(s)</div>
          <div className="subtext">{sign_quantity} Sign(s)</div>
        </div>
        <div className="right">
          <div>${subtotal_price}</div>
        </div>
      </div>
      <div className="item">
        <div className="left">
          <div className="detail">Shipping</div>
        </div>
        <div className="right">
          <div>${shipping_cost}</div>
        </div>
      </div>
      <div className="item total">
        <div className="left">
          <div>TOTAL</div>
        </div>
        <div className="right">
          <div>${total_price}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
