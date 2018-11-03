import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import ReviewOrder from "../src/components/reviewOrder";
import { makeGetCanvasGroup } from "../src/store/features/canvas/selectors";

import "../src/components/reviewOrder/reviewOrder.scss";

class ReviewOrderPage extends Component {
  componentDidMount() {
    if (!this.props.canvas_group.length) {
      Router.push("/");
    }
  }
  render() {
    return (
      <ReviewOrder
        canvas_group={this.props.canvas_group}
        dispatch={this.props.dispatch}
      />
    );
  }
}

const getCanvasGroup = makeGetCanvasGroup();

const mapStateToProps = state => {
  return { canvas_group: getCanvasGroup(state.canvas) };
};

export default connect(mapStateToProps)(ReviewOrderPage);
