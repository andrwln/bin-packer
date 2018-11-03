import React from "react";
import Router from "next/router";

import { createPDF } from "../../store/features/canvas/actions";
import { getTopBarData } from "../../store/features/canvas/methods/checkOutData";

const ReviewOrderTopBar = function({ canvas_list, double_sided, dispatch }) {
  const {
    product_size,
    sheet_size,
    sheet_quantity,
    quantity_subtext1,
    quantity_subtext2,
    sign_quantity,
    turnaround_time
  } = getTopBarData({
    canvas_list,
    double_sided
  });
  function handleBackToUpload(e) {
    Router.push("/");
  }
  return (
    <div className="review-top-bar-container">
      <div className="product-detail">
        <div className="item" onClick={e => handleBackToUpload(e)}>
          <div className="back-to-upload">Back to Upload</div>
        </div>
        <div className="item">
          <div>Product Type</div>
          <div className="sub-text">{product_size}</div>
        </div>
        <div className="item">
          <div>Sheet Size</div>
          <div className="sub-text">{sheet_size}</div>
        </div>
        <div className="item quantity">
          <div>Quantity</div>
          <div className="sub-text">
            <label className="quantity-highlight">{sheet_quantity}</label>
            {quantity_subtext1}
            <label className="quantity-highlight">{sign_quantity}</label>
            {quantity_subtext2}
          </div>
        </div>
        <div className="item">
          <div>Turnaround Time</div>
          <div className="sub-text">{turnaround_time}</div>
        </div>
      </div>
      <div
        className="item cart-header"
        onClick={e => {
          dispatch(createPDF({ canvas_list, double_sided }));
        }}
      >
        <div className="add-to-cart-btn">Add To Cart</div>
      </div>
    </div>
  );
};

export default ReviewOrderTopBar;
