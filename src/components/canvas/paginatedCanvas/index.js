import React from "react";

const PaginatedCanvas = ({ width, height, side, idx }) => {
  const page_number = idx + 1;
  const paginationStyle = {
    left: {
      side: {
        height: `${height}px`,
        width: "10px",
        right: `${10 * page_number}px`,
        top: `${2 + 10 * page_number}px`
      },
      bottom: {
        height: "10px",
        width: `${width}px`,
        right: `${10 * page_number}px`,
        top: `${2 + 10 * page_number}px`
      }
    },
    right: {
      side: {
        height: `${height}px`,
        width: "10px",
        left: `${268 + 10 * page_number}px`,
        top: `${2 + 10 * page_number}px`
      },
      bottom: {
        height: "10px",
        width: `${width}px`,
        left: `${-8 + 10 * (page_number - 1)}px`,
        top: `${2 + 10 * page_number}px`
      }
    }
  };
  return (
    <div className="paginated-sheet">
      <div className={`side ${side}`} style={paginationStyle[side].side} />
      <div className={`bottom ${side}`} style={paginationStyle[side].bottom} />
    </div>
  );
};

export default PaginatedCanvas;
