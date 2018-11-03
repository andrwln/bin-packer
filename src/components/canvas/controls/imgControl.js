import React, { Component } from "react";
import Dropzone from "react-dropzone";

import ImgSizeControl from "./imgSizeControl";
import ImgQuantityControl from "./imgQuantityControl";

import {
  fileUpload,
  deleteImageGroup,
  fillRemainingCanvas
} from "../../../store/features/canvas/actions";

class ImgControl extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this);
    this.handleClickImgSet = this.handleClickImgSet.bind(this);
    this.state = {
      isHovered: false,
      isUploadingFront: false,
      isUploadingBack: false,
      isCollapsed: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.img_front !== prevProps.img_front) {
      this.setState({ isUploadingFront: false });
      if (!this.props.double_sided) {
        return this.toggleImgsUploaded({ done: true });
      } else if (this.props.img_back) {
        return this.toggleImgsUploaded({ done: true });
      }
    }
    if (this.props.img_back !== prevProps.img_back) {
      this.setState({ isUploadingBack: false });
      if (this.props.double_sided && this.props.img_back)
        return this.toggleImgsUploaded({ done: true });
    }

    if (this.props.double_sided !== prevProps.double_sided) {
      return this.toggleImgsUploaded({ done: false });
    }
  }

  toggleImgsUploaded({ done }) {
    if (this.state.isCollapsed !== done) {
      this.setState({ isCollapsed: done });
    }
  }

  handleImgUpload({ acceptedFiles, back_side }) {
    const { canvas_group_id, canvas_id, id: img_id, dispatch } = this.props;
    if (back_side) {
      this.setState({ isUploadingBack: true });
    } else {
      this.setState({ isUploadingFront: true });
    }

    dispatch(
      fileUpload({
        canvas_group_id,
        canvas_id,
        img_id,
        back_side: back_side,
        files: acceptedFiles
      })
    );
  }

  handleHover(isEntering) {
    this.setState({ isHovered: isEntering });
  }

  handleClickImgSet() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }));
  }

  render() {
    const {
      canvas_group_id,
      id: img_id,
      canvas_id,
      img_front,
      img_back,
      height,
      width,
      total_quantity,
      double_sided,
      dispatch
    } = this.props;
    const showBtnClass = this.state.isHovered ? "on-hover" : "";
    let imageArea = [];
    let front_placeholder, back_placeholder;

    if (img_front) {
      front_placeholder = <img src={img_front} />;
    } else if (this.state.isUploadingFront) {
      front_placeholder = (
        <div className="is-loading">
          <label>Uploading...</label>
        </div>
      );
    } else {
      front_placeholder = (
        <div>
          <label className="dropzone-placeholder-text">
            Click Here to Upload Front Image
          </label>
        </div>
      );
    }

    if (img_back) {
      back_placeholder = <img src={img_back} />;
    } else if (this.state.isUploadingBack) {
      back_placeholder = (
        <div className="is-loading">
          <label>Uploading...</label>
        </div>
      );
    } else {
      back_placeholder = (
        <div>
          <label className="dropzone-placeholder-text">
            Click Here to Upload Back Image
          </label>
        </div>
      );
    }

    imageArea.push(
      <Dropzone
        key="front"
        className="dropzone"
        onDrop={acceptedFiles =>
          this.handleImgUpload({ acceptedFiles, back_side: false })
        }
      >
        {front_placeholder}
      </Dropzone>
    );

    if (double_sided) {
      imageArea.push(
        <Dropzone
          key="back"
          className="dropzone"
          onDrop={acceptedFiles =>
            this.handleImgUpload({ acceptedFiles, back_side: true })
          }
        >
          {back_placeholder}
        </Dropzone>
      );
    }

    return (
      <div
        className={
          this.state.isCollapsed
            ? "image-control-container has-text-centered collapsed"
            : "image-control-container has-text-centered"
        }
        onMouseEnter={e => this.handleHover(true)}
        onMouseLeave={e => this.handleHover(false)}
      >
        <div className="box image-set-toggle" onClick={this.handleClickImgSet}>
          {/* <div className="carrot-icon"> </div> */}
          <div className="level image-set-container">
            <div className="level-left image-set-header">
              Image Set {Number(img_id) + 1}
              <label className="carrot-icon"> </label>
            </div>
          </div>
          <div className="image-inputs-container">
            <ImgSizeControl
              width={width}
              height={height}
              canvas_group_id={canvas_group_id}
              canvas_id={canvas_id}
              img_id={img_id}
              dispatch={dispatch}
            />
            <ImgQuantityControl
              total_quantity={total_quantity}
              canvas_group_id={canvas_group_id}
              canvas_id={canvas_id}
              img_id={img_id}
              dispatch={dispatch}
            />
          </div>
        </div>
        <div className="box dropzone-container">
          <div className="delete-btn-container">
            <button
              className={`button is-small is-outlined is-danger ${showBtnClass}`}
              onClick={e =>
                dispatch(
                  deleteImageGroup({ canvas_group_id, canvas_id, img_id })
                )
              }
            >
              Delete
            </button>
          </div>
          <div className="flex-center-content">{imageArea}</div>
          <div className="fill-btn-container">
            <button
              className={`button is-small is-outlined is-danger ${showBtnClass}`}
              onClick={e =>
                dispatch(fillRemainingCanvas({ img_id, canvas_group_id }))
              }
            >
              Fill
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgControl;
