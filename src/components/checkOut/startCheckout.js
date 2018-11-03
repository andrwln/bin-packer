import React from "react";

const startCheckout = ({ canvas_list }) => {
  function getCanvasPostObj() {
    console.log("canvas List: ", canvas_list);
  }
  return (
    <div>
      <button className="button" onClick={e => getCanvasPostObj()}>
        Begin Checkout
      </button>
    </div>
  );
};

export default startCheckout;
