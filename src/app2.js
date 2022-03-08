import "./App.css";
import React, { useEffect, useState } from "react";
import Compose from "./components/Compose.js";
import Preview from "./components/Preview.js";
import Sender from "./components/Sender.js";
import { connect } from "react-redux";
import { prefillActionAlert } from "./redux/msgWizard.js";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Pencil,
  PersonFill,
  FileEarmarkFill,
} from "react-bootstrap-icons";
import { Tabs, Tab, Card, Button } from "react-bootstrap";

function App({ prefillAlert, msgWizard }) {
  useEffect(() => {
    prefillAlert();
  }, []);

  const [currentComponent, setCurrentComponent] = useState("compose");
  const [hasError, setHasError] = useState(true);
  const handleClickNext = (event) => {
    event.preventDefault();
    if (currentComponent === "compose") {
      setCurrentComponent("sender");
    }
    if (currentComponent === "sender") {
      setCurrentComponent("preview");
    }
  };
  const handleClickPrevious = (event) => {
    event.preventDefault();
    if (currentComponent === "preview") {
      setCurrentComponent("sender");
    }
    if (currentComponent === "sender") {
      setCurrentComponent("compose");
    }
  };
  return (
    <div className="app">
      <div className="card-container">
        <Card className="bootstrap-card">
          <Tabs
            activeKey={currentComponent}
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={function (evt) {
              setCurrentComponent(evt);
            }}
          >
            <Tab
              eventKey="compose"
              title={
                <span>
                  <Pencil className="mr-3" /> Compose
                </span>
              }
            >
              <Compose hasError={hasError} setHasError={setHasError} />
            </Tab>
            <Tab
              title={
                <span>
                  <ArrowRightCircle />
                </span>
              }
              disabled={currentComponent !== "compose" ? false : true}
            ></Tab>
            <Tab
              eventKey="sender"
              title={
                <span>
                  <PersonFill className="mr-3" /> Sender
                </span>
              }
              disabled={currentComponent === "preview" ? false : true}
            >
              <Sender />
            </Tab>
            <Tab
              title={
                <span>
                  <ArrowRightCircle />
                </span>
              }
              disabled={currentComponent === "preview" ? false : true}
            ></Tab>

            <Tab
              eventKey="preview"
              title={
                <span>
                  <FileEarmarkFill className="mr-3" /> Preview
                </span>
              }
              disabled={currentComponent !== "preview" ? true : false}
            >
              <Preview />
            </Tab>
          </Tabs>
          <div className="next-button">
            {/* Add state that handles disable button */}
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
                currentComponent === "preview"
                  ? { backgroundColor: "red" }
                  : null
              }
              id="next"
              onClick={currentComponent !== "preview" ? handleClickNext : null}
              disabled={hasError ? false : true}
            >
              {currentComponent === "preview" ? "Send All" : "Next"}
              <ArrowRightCircle className="ml-4" />
            </Button>
          </div>
        </Card>
        {/* <Card className="bootstrap-card">
          <Tabs
            activeKey={currentComponent}
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={function (evt) {
              setCurrentComponent(evt);
            }}
          >
            <Tab eventKey="compose" title="compose">
              <Compose />
            </Tab>
            <Tab
              eventKey="sender"
              title="sender"
              disabled={currentComponent === "preview" ? false : true}
            >
              <Sender />
            </Tab>

            <Tab
              eventKey="preview"
              title="preview"
              disabled={currentComponent !== "preview" ? true : false}
            >
              <Preview />
            </Tab>
          </Tabs>
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
                currentComponent === "preview"
                  ? { backgroundColor: "red" }
                  : null
              }
              id="next"
              onClick={currentComponent !== "preview" ? handleClickNext : null}
            >
              {currentComponent === "preview" ? "Send All" : "Next"}
              <ArrowRightCircle className="ml-4" />
            </Button>
          </div>
        </Card> */}
      </div>
    </div>
  );
}

const mapState = (state) => ({
  msgWizard: state.msgWizard,
});

const mapDispatch = (dispatch) => ({
  prefillAlert: () => dispatch(prefillActionAlert()),
});

export default connect(mapState, mapDispatch)(App);
