import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function Preview({ msgWizard }) {
  console.log(msgWizard);
  const [displayedSenators, setDisplayedSenators] = useState([]);
  useEffect(() => {
    // if (msgWizard.legislatorsByAddress[0]) {
    // }
  }, [msgWizard]);

  return <p>preview section</p>;
}

const mapState = (state) => ({
  msgWizard: state.msgWizard,
});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(Preview);
