import React from "react";
import Router from "next/router";
import DropdownSelect from "../../dropdownSelect";
import { getTopBarData } from "../../../store/features/canvas/methods/checkOutData";
import {
  productList,
  sheetDimensions,
  getShippingCost
} from "../../../config/productConfigs";
import features from "../../../config/featureFlags";

import "./canvasTopBar.scss";

const CanvasTopBar = function({ canvas_list, double_sided, dispatch }) {
  const {
    sheet_quantity,
    sign_quantity,
    quantity_subtext1,
    quantity_subtext2,
    subtotal_price
  } = getTopBarData({ canvas_list, double_sided });

  getShippingCost({ sheet_count: canvas_list.length });

  const editableSheetSize = features.variableCanvasSize;
  let sheetSize;

  if (editableSheetSize) {
    sheetSize = (
      <DropdownSelect
        items={sheetDimensions}
        type="canvas"
        dispatch={dispatch}
      />
    );
  } else {
    sheetSize = <div className="sub-text">{sheetDimensions[0].name}</div>;
  }

  function handleReviewOrderBtn(e, canvas_list, double_sided) {
    let readyForReview = false;
    canvas_list.forEach(canvas => {
      canvas.images.forEach(image => {
        if (double_sided) {
          readyForReview = image.pdf_front && image.pdf_back;
        } else {
          readyForReview = image.pdf_front;
        }
      });
    });
    if (readyForReview) {
      Router.push("/reviewOrder");
    } else {
      alert("Please upload images for each image set.");
    }

    //check to see if each block in canvas list has an image associated
    //create pdf lib post obj
    //post to batch_builder api and get pdf file to show on next screen
    //route user to the review order screen
  }
  return (
    <div className="canvas-top-bar-container box">
      <div className="canvas-data-bar">
        <div className="item">
          <div>Product Type</div>
          <DropdownSelect
            items={productList}
            type="images"
            dispatch={dispatch}
          />
        </div>
        <div className="item">
          <div>Sheet Size</div>
          {sheetSize}
        </div>
        <div className="item">
          <div>Quantity</div>
          <div className="sub-text">
            <label className="quantity-highlight">{sheet_quantity}</label>
            {quantity_subtext1}
            <label className="quantity-highlight">{sign_quantity}</label>
            {quantity_subtext2}
          </div>
        </div>
      </div>
      <div className="next-step-container flex-center-content">
        <div className="total-price">${subtotal_price}</div>
        <div
          className="next-step-btn"
          onClick={e => handleReviewOrderBtn(e, canvas_list, double_sided)}
        >
          Review Order
        </div>
      </div>
    </div>
  );
};

export default CanvasTopBar;
