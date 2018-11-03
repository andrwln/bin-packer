import React, { Component } from "react";
import ImgControl from "./imgControl";
import AddImgGroup from "./addImgGroup";
import "./imageControls.scss";

import { setCanvasGroup } from "../../../store/features/canvas/actions";

class ImgControls extends Component {
  render() {
    const {
      canvas_group_id,
      canvas_id,
      images,
      double_sided,
      dispatch
    } = this.props;
    return (
      <div ref="scroll-area" className="image-controls-container">
        <div className="double-sided-toggle has-text-centered box has-text-weight-bold">
          <label className="toggle-label">Double Sided</label>
          <input
            id="switchRoundedDanger"
            type="checkbox"
            className="switch is-rounded is-danger"
            checked={double_sided}
            onChange={e =>
              dispatch(
                setCanvasGroup({
                  canvas_group_id,
                  canvas_id,
                  payload: {
                    double_sided: e.currentTarget.checked
                  }
                })
              )
            }
          />
          <label className="toggle" htmlFor="switchRoundedDanger" />
        </div>
        <div className="image-controls-scrollable">
          {images.map((image, index) => (
            <ImgControl
              key={index}
              {...image}
              canvas_id={canvas_id}
              canvas_group_id={canvas_group_id}
              double_sided={double_sided}
              dispatch={dispatch}
            />
          ))}
        </div>
        <AddImgGroup
          canvas_group_id={canvas_group_id}
          canvas_id={canvas_id}
          dispatch={dispatch}
        />
      </div>
    );
  }
}
// const ImgControls = ({
//   canvas_group_id,
//   canvas_id,
//   images,
//   double_sided,
//   dispatch
// }) => {
//   console.log("props updated: ", this);
//   return (
//     <div className="image-controls-container is-scrollable">
//       <div className="double-sided-toggle has-text-centered box">
//         <label className="toggle-label">Double Sided</label>
//         <input
//           id="doubleSidedToggle"
//           type="checkbox"
//           className="switch"
//           onChange={e =>
//             dispatch(
//               setCanvasGroup({
//                 canvas_group_id,
//                 canvas_id,
//                 payload: {
//                   double_sided: e.currentTarget.checked
//                 }
//               })
//             )
//           }
//         />
//         <label className="toggle" htmlFor="doubleSidedToggle" />
//       </div>
//       {images.map((image, index) => (
//         <ImgControl
//           key={index}
//           {...image}
//           canvas_id={canvas_id}
//           canvas_group_id={canvas_group_id}
//           double_sided={double_sided}
//           dispatch={dispatch}
//         />
//       ))}
//       <AddImgGroup
//         canvas_group_id={canvas_group_id}
//         canvas_id={canvas_id}
//         dispatch={dispatch}
//       />
//     </div>
//   );
// };

export default ImgControls;
