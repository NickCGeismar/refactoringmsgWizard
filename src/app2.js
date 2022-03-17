import "./App.css";
import React, { useEffect, useState } from "react";
import Compose from "./components/Compose.js";
import Preview from "./components/Preview.js";
import Sender from "./components/Sender.js";
import { connect } from "react-redux";
import msgWizard, { prefillActionAlert } from "./redux/msgWizard.js";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Pencil,
  PersonFill,
  FileEarmarkFill,
} from "react-bootstrap-icons";
import { Tabs, Tab, Card, Button } from "react-bootstrap";

function App({ prefillAlert, msgWizardResponse }) {
  useEffect(() => {
    prefillAlert();
  }, []);

  const [currentComponent, setCurrentComponent] = useState("compose");
  const [hasNoComposeError, setHasNoComposeError] = useState(false);
  const [hasNoSenderError, setHasNoSenderError] = useState(false);

  const handleClickNext = (event) => {
    event.preventDefault();
    if (currentComponent === "compose") {
      setCurrentComponent("preview");
    }
  };
  const handleClickPrevious = (event) => {
    console.log(currentComponent);
    event.preventDefault();
    if (currentComponent === "preview") {
      setCurrentComponent("compose");
    }
  };

  const composeErrorHandler = (boolOne, boolTwo) => {
    if (boolOne && boolTwo) {
      setHasNoComposeError(true);
    } else setHasNoComposeError(false);
  };

  const senderErrorHandler = (boolOne, boolTwo) => {
    if (boolOne && boolTwo) {
      setHasNoSenderError(true);
    } else setHasNoSenderError(false);
  };
  return msgWizardResponse.response === null ? (
    "404 not found"
  ) : (
    <div className="app">
      <div className="card-container">
        <Card className="bootstrap-card">
          <div className="action-alert-div">
            <img
              style={{ maxHeight: "10em", maxWidth: "8em" }}
              src="https://nwyc.dev.cvoice.io/static/images/nwyc/action_alert.png?q=1647038371"
            />
          </div>
          {/* <Card.Header className="card-header-action-alert"> */}
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            <span className="h1-final-subject">
              {msgWizardResponse.final_subject}
            </span>
          </h1>
          {/* </Card.Header> */}
          <Card.Body
            style={{ backgroundColor: "whitesmoke", borderRadius: "3%" }}
          >
            {msgWizardResponse.action_alert &&
            msgWizardResponse.action_alert.summary ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: msgWizardResponse.action_alert.summary,
                }}
              />
            ) : null}
          </Card.Body>
        </Card>
        {currentComponent === "compose" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card className="bootstrap-card">
              <Compose
                composeErrorHandler={composeErrorHandler}
                hasNoError={hasNoComposeError}
                setHasNoError={setHasNoComposeError}
              />
            </Card>
            <Card className="bootstrap-card">
              <Sender senderErrorHandler={senderErrorHandler} />
            </Card>
          </div>
        ) : currentComponent === "preview" ? (
          <Card className="bootstrap-card">
            <Preview />
          </Card>
        ) : null}
        <div className="next-button">
          {currentComponent === "compose" ? null : (
            <Button
              variant="outline-primary"
              className="btn"
              id="previous"
              onClick={handleClickPrevious}
            >
              <ArrowLeftCircle className="mr-4" />
              Previous
            </Button>
          )}
          <Button
            variant="outline-primary"
            className="btn"
            style={
              currentComponent === "preview" ? { backgroundColor: "red" } : null
            }
            id="next"
            onClick={currentComponent !== "preview" ? handleClickNext : null}
            disabled={
              (hasNoComposeError &&
                hasNoSenderError &&
                currentComponent === "compose") ||
              currentComponent === "preview"
                ? false
                : true
            }
          >
            {currentComponent === "preview" ? "Send All" : "Next"}
            <ArrowRightCircle className="ml-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  msgWizardResponse: state.msgWizard.response,
});

const mapDispatch = (dispatch) => ({
  prefillAlert: () => dispatch(prefillActionAlert()),
});

export default connect(mapState, mapDispatch)(App);
