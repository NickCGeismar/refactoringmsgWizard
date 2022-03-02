import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function Preview(props) {
  return <p>preview section</p>;
}

const mapState = (state) => ({
  msgWizard: state.msgWizard,
});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(Preview);
