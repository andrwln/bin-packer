import React from "react";
import { connect } from "react-redux";
import CanvasGroups from "../src/components/canvasGroups";
import { addNewCanvasGroup } from "../src/store/features/canvas/actions";
import { makeGetCanvasGroup } from "../src/store/features/canvas/selectors";
import { getUser } from "../src/store/features/canvas/methods/auth";

import "../src/components/bulma-var-override.scss";

class Index extends React.Component {
  componentDidMount() {
    //initialize default state
    getUser();
    if (!this.props.canvas_group.length) {
      this.props.dispatch(addNewCanvasGroup());
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-page-container">
          <CanvasGroups
            canvas_group={this.props.canvas_group}
            title="BIN BATCH UI"
          />
        </div>
        <div />
      </React.Fragment>
    );
  }
}

const getCanvasGroup = makeGetCanvasGroup();

const mapStateToProps = state => {
  return { canvas_group: getCanvasGroup(state.canvas) };
};

export default connect(mapStateToProps)(Index);
