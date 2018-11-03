import React from "react";

const CanvasReport = ({ ratio, remaining_area, double_sided }) => {
  const reportColor = remaining_area > 0 ? "is-warning" : "is-success";
  let canvasMessage;

  if (double_sided) {
    canvasMessage = `You have a surface area of ${(remaining_area * 2).toFixed(
      0
    )} square inches (${100 - ratio}%) remaining on this double-sided canvas.`;
  } else {
    canvasMessage = `You have a surface area of ${remaining_area.toFixed(
      0
    )} square inches (${100 - ratio}%) remaining on this canvas.`;
  }
  return (
    <article className={`message ${reportColor}`}>
      <div className="message-header">
        <p>Canvas Fit Report</p>
      </div>
      <div className="message-body">{canvasMessage}</div>
    </article>
  );
};

export default CanvasReport;
