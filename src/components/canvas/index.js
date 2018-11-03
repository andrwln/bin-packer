import React, { Component } from "react";

import "./canvas.scss";
import PaginatedCanvas from "./paginatedCanvas";
import { switchCanvasInView } from "../../store/features/canvas/actions";
import { drawPacker, drawPackerBackside } from "../../canvas";

class Canvas extends Component {
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate() {
    this.draw();
  }
  handleChangeCanvasInView({ canvas_group_id, canvas_id }) {
    this.props.dispatch(
      switchCanvasInView({
        id: canvas_group_id,
        payload: {
          curr_canvas_id: canvas_id
        }
      })
    );
  }
  draw = () => {
    const {
      canvas_id,
      blocks,
      width,
      height,
      wunit,
      hunit,
      double_sided
    } = this.props;
    drawPacker(this.refs[`canvas_${canvas_id}`], {
      blocks,
      width,
      height,
      wunit,
      hunit
    });
    if (double_sided) {
      drawPackerBackside(this.refs[`canvas_back_${canvas_id}`], {
        blocks,
        width,
        height,
        wunit,
        hunit
      });
    }
  };
  render() {
    const {
      canvas_id,
      width,
      height,
      double_sided,
      max_spaces,
      blocks,
      canvas_list,
      canvas_group_id,
      dispatch
    } = this.props;
    const next_canvas_id = Number(canvas_id) + 1;
    const prev_canvas_id = Number(canvas_id) - 1;
    const previous_pagination_count = canvas_id > 3 ? 3 : Number(canvas_id); // This will always be same as number of canvases user can scroll in previous direction
    const next_pagination_count =
      canvas_list.length - next_canvas_id > 3
        ? 3
        : canvas_list.length - next_canvas_id;
    const next_canvas = canvas_list[next_canvas_id];
    const prev_canvas = canvas_list[prev_canvas_id];
    const available_spaces = max_spaces - blocks.length;
    const batch_info_message =
      available_spaces > 0
        ? `${available_spaces} more available spaces on this Sheet`
        : `This Sheet is full`;
    let prevPaginationEls = [];
    let backSide, frontSide, front_left_info, front_right_info, back_right_info;

    front_left_info = prev_canvas ? `Previous` : "";
    front_right_info = !double_sided && next_canvas ? `Next` : "";
    back_right_info = double_sided && next_canvas ? `Next` : "";

    if (double_sided) {
      frontSide = (
        <div className="sheet-group">
          {[...Array(previous_pagination_count)].map((e, i) => {
            return (
              <PaginatedCanvas
                width={width}
                height={height}
                side="left"
                idx={i}
                key={i}
              />
            );
          })}
          <canvas
            className="canvas"
            ref={`canvas_${canvas_id}`}
            width={`${width}px`}
            height={`${height}px`}
          />
        </div>
      );
      backSide = (
        <div className="canvas-container">
          <div className="canvas-label">BACK</div>
          <div className="canvas-info">
            <div className="canvas-info-left" />
            {/* <div className="canvas-info-middle">{batch_info_message}</div> */}
            <div
              className={
                back_right_info
                  ? "canvas-info-right clickable"
                  : "canvas-info-right"
              }
            >
              <a
                onClick={e =>
                  this.handleChangeCanvasInView({
                    canvas_group_id,
                    canvas_id: next_canvas_id
                  })
                }
              >
                {back_right_info}
              </a>
              <label className={back_right_info ? "pointer" : ""}> </label>
            </div>
          </div>
          <div className="sheet-group">
            {[...Array(next_pagination_count)].map((e, i) => {
              return (
                <PaginatedCanvas
                  width={width}
                  height={height}
                  side="right"
                  idx={i}
                  key={i}
                />
              );
            })}
            <canvas
              className="canvas"
              ref={`canvas_back_${canvas_id}`}
              width={`${width}px`}
              height={`${height}px`}
            />
          </div>
        </div>
      );
    } else {
      frontSide = (
        <div className="sheet-group">
          {[...Array(next_pagination_count)].map((e, i) => {
            return (
              <PaginatedCanvas
                width={width}
                height={height}
                side="right"
                idx={i}
                key={i}
              />
            );
          })}
          {/* {[...Array(next_pagination_count)].map((e, i) => {
            return (
              <PaginatedCanvas
                width={width}
                height={height}
                side="back"
                idx={i}
                key={i}
              />
            );
          })} */}
          <canvas
            className="canvas"
            ref={`canvas_${canvas_id}`}
            width={`${width}px`}
            height={`${height}px`}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="canvases-container">
          <div className="canvas-container">
            <div className="canvas-label">FRONT</div>
            <div className="canvas-info">
              <div
                className={
                  front_left_info
                    ? "canvas-info-left clickable"
                    : "canvas-info-left"
                }
              >
                <label className={front_left_info ? "pointer" : ""}> </label>
                <a
                  onClick={e =>
                    this.handleChangeCanvasInView({
                      canvas_group_id,
                      canvas_id: prev_canvas_id
                    })
                  }
                >
                  {front_left_info}
                </a>
              </div>
              {/* <div className="canvas-info-middle">{batch_info_message}</div> */}
              <div
                className={
                  front_right_info
                    ? "canvas-info-right clickable"
                    : "canvas-info-right"
                }
              >
                <a
                  onClick={e =>
                    this.handleChangeCanvasInView({
                      canvas_group_id,
                      canvas_id: next_canvas_id
                    })
                  }
                >
                  {front_right_info}
                </a>
                <label className={front_right_info ? "pointer" : ""}> </label>
              </div>
            </div>
            {frontSide}
          </div>
          {backSide}
        </div>
      </div>
    );
  }
}

export default Canvas;
