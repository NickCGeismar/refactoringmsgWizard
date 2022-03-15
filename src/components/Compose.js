import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addInfo } from "../redux/msgWizard.js";
import { Button, Form, Modal, ListGroup } from "react-bootstrap";
import { ChatDots, FileX } from "react-bootstrap-icons";

function Compose({
  addTheCompose,
  msgWizardResponse,
  msgWizardSenderInfo,
  setHasNoError,
  composeErrorHandler,
}) {
  const [modalBool, setModalBool] = useState(false);
  const [checkObjectPresident, setCheckObjectPresident] = useState(false);
  const [checkObjectVicePresident, setCheckObjectVicePresident] =
    useState(false);
  const [checkObjectSenator, setCheckObjectSenator] = useState(false);
  const [checkObjectRepresentative, setCheckObjectRepresentative] =
    useState(false);
  const [checkObjectGovernor, setCheckObjectGovernor] = useState(false);
  const [checkObjectStateSen, setCheckObjectStateSen] = useState(false);
  const [checkObjectStateRep, setCheckObjectStateRep] = useState(false);

  const [msgWizardCompose, setMsgWizardCompose] = useState({
    subject: "",
    message: "",
  });
  const [msgWizardSubjectErrors, setMsgWizardSubjectErrors] = useState("");

  const [msgWizardMessageErrors, setMsgWizardMessageErrors] = useState("");
  const [showCheckObjectPresident, setShowCheckObjectPresident] =
    useState(false);
  const [showCheckObjectSenator, setShowCheckObjectSenator] = useState(false);
  const [showCheckObjectRepresentative, setShowCheckObjectRepresentative] =
    useState(false);
  const [showCheckObjectVicePresident, setShowCheckObjectVicePresident] =
    useState(false);
  const [showCheckObjectStateSen, setShowCheckObjectStateSen] = useState(false);
  const [showCheckObjectStateRep, setShowCheckObjectStateRep] = useState(false);
  const [showCheckObjectGovernor, setShowCheckObjectGovernor] = useState(false);

  //predetermines boolean checkObject states from action_alert response
  useEffect(() => {
    if (msgWizardResponse.action_alert) {
      setMsgWizardCompose({
        message:
          msgWizardSenderInfo.message || msgWizardResponse.action_alert.message,
        subject:
          msgWizardSenderInfo.subject || msgWizardResponse.action_alert.subject,
      });
      msgWizardResponse.action_alert.chambers.forEach((element) => {
        if (element === "president") {
          setShowCheckObjectPresident(true);
          if (msgWizardSenderInfo.recipients.includes("president")) {
            setCheckObjectPresident(true);
          }
        }
        if (element === "sen") {
          setShowCheckObjectSenator(true);
          if (msgWizardSenderInfo.recipients.includes("sen")) {
            setCheckObjectSenator(true);
          }
        }
        if (element === "rep") {
          setShowCheckObjectRepresentative(true);
          if (msgWizardSenderInfo.recipients.includes("rep")) {
            setCheckObjectRepresentative(true);
          }
        }
        if (element === "vice-president") {
          setShowCheckObjectVicePresident(true);
          if (msgWizardSenderInfo.recipients.includes("vice-president")) {
            setCheckObjectVicePresident(true);
          }
        }
        if (element === "governor") {
          setShowCheckObjectGovernor(true);
          if (msgWizardSenderInfo.recipients.includes("governor")) {
            setCheckObjectGovernor(true);
          }
        }
        if (element === "state-sen") {
          setShowCheckObjectStateSen(true);
          if (msgWizardSenderInfo.recipients.includes("state-sen")) {
            setCheckObjectStateSen(true);
          }
        }
        if (element === "state-rep") {
          setShowCheckObjectStateRep(true);
          if (msgWizardSenderInfo.recipients.includes("state-rep")) {
            setCheckObjectStateRep(true);
          }
        }
      });
    }
  }, [msgWizardResponse.action_alert]);

  //sends recipients to store
  useEffect(() => {
    let checkObjectRecipients = [];
    if (checkObjectPresident) {
      checkObjectRecipients.push("president");
    }
    if (checkObjectVicePresident) {
      checkObjectRecipients.push("vice-president");
    }
    if (checkObjectSenator) {
      checkObjectRecipients.push("sen");
    }
    if (checkObjectRepresentative) {
      checkObjectRecipients.push("rep");
    }
    if (checkObjectGovernor) {
      checkObjectRecipients.push("governor");
    }
    if (checkObjectStateSen) {
      checkObjectRecipients.push("state-sen");
    }
    if (checkObjectStateRep) {
      checkObjectRecipients.push("state-rep");
    }
    const storeObject = {
      recipients: checkObjectRecipients,
    };
    addTheCompose(storeObject);
  }, [
    checkObjectPresident,
    checkObjectSenator,
    checkObjectRepresentative,
    checkObjectVicePresident,
    checkObjectGovernor,
    checkObjectStateSen,
    checkObjectStateRep,
  ]);

  //sends composed messages to store
  useEffect(() => {
    const storeObject = {
      ...msgWizardCompose,
    };
    addTheCompose(storeObject);
  }, [msgWizardCompose]);

  const errorMessageHandler = () => {
    if (!msgWizardCompose.message) {
      setMsgWizardMessageErrors("Please input a message");
      return false;
    } else setMsgWizardMessageErrors("");
    return true;
  };
  const errorSubjectHandler = () => {
    if (!msgWizardCompose.subject) {
      setMsgWizardSubjectErrors("Please input a subject");
      return false;
    } else setMsgWizardSubjectErrors("");
    return true;
  };

  useEffect(() => {
    errorMessageHandler();
    errorSubjectHandler();
    composeErrorHandler(errorMessageHandler(), errorSubjectHandler());
    // let bool = errorSubjectHandler() && errorMessageHandler();
    // setHasNoError(bool);
  }, [msgWizardCompose]);

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.name === "msg-subject") {
      setMsgWizardCompose({ ...msgWizardCompose, subject: event.target.value });
    }
    if (event.target.name === "msg-message") {
      setMsgWizardCompose({ ...msgWizardCompose, message: event.target.value });
    }
  };

  const addToMessage = (event) => {
    event.preventDefault();
    const newMessage = msgWizardCompose.message
      ? msgWizardCompose.message + "\n \n" + event.target.innerHTML
      : event.target.innerHTML;
    setMsgWizardCompose({
      ...msgWizardCompose,
      message: newMessage,
    });
    setModalBool(false);
  };

  return (
    <div>
      <h1 style={{ color: "#004fa0", fontFamily: "Crimson Text" }}>
        {msgWizardResponse.action_alert &&
        msgWizardResponse.action_alert.message_question
          ? msgWizardResponse.action_alert.message_question
          : null}
      </h1>
      <p>
        In the text boxes below, type your thoughts, concerns and how you stand
        on the issue to your elected officials.
      </p>
      <h3>Message Recipients*</h3>
      {showCheckObjectPresident ? (
        <div>
          <input
            onChange={() => setCheckObjectPresident(!checkObjectPresident)}
            type="checkbox"
            name="president"
            value="president"
            checked={checkObjectPresident}
          />
          &nbsp; President
        </div>
      ) : null}
      {showCheckObjectVicePresident ? (
        <div>
          <input
            onChange={() =>
              setCheckObjectVicePresident(!checkObjectVicePresident)
            }
            type="checkbox"
            name="senator"
            value="senator"
            checked={showCheckObjectVicePresident}
          />
          &nbsp; Your Vice President
        </div>
      ) : null}
      {showCheckObjectSenator ? (
        <div>
          <input
            onChange={() => setCheckObjectSenator(!checkObjectSenator)}
            type="checkbox"
            name="senator"
            value="senator"
            checked={checkObjectSenator}
          />
          &nbsp; Your U.S senators
        </div>
      ) : null}
      {showCheckObjectRepresentative ? (
        <div>
          <input
            onChange={() =>
              setCheckObjectRepresentative(!checkObjectRepresentative)
            }
            type="checkbox"
            name="representative"
            value="representative"
            checked={checkObjectRepresentative}
          />
          &nbsp; Your U.S representatives
        </div>
      ) : null}
      {showCheckObjectGovernor ? (
        <div>
          <input
            onChange={() => setCheckObjectGovernor(!checkObjectGovernor)}
            type="checkbox"
            name="representative"
            value="representative"
            checked={checkObjectGovernor}
          />
          &nbsp; Your State Governor
        </div>
      ) : null}
      {showCheckObjectStateSen ? (
        <div>
          <input
            onChange={() => setCheckObjectStateSen(!checkObjectStateSen)}
            type="checkbox"
            name="representative"
            value="representative"
            checked={checkObjectStateSen}
          />
          &nbsp; Your State Senator
        </div>
      ) : null}
      {showCheckObjectStateRep ? (
        <div>
          <input
            onChange={() => setCheckObjectStateRep(!checkObjectStateRep)}
            type="checkbox"
            name="representative"
            value="representative"
            checked={checkObjectStateRep}
          />
          &nbsp; Your State representatives
        </div>
      ) : null}
      <div style={{ paddingTop: "10px" }}>
        <h3>
          Subject<span style={{ color: "red" }}>*</span>
        </h3>
        <Form
          validated={msgWizardCompose.subject ? true : false}
          value="subject"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Control
            className="form-control form-control-lg"
            onChange={handleInputChange}
            value={msgWizardCompose.subject}
            type="text"
            name="msg-subject"
          />
          <p style={{ color: "red" }}>{msgWizardSubjectErrors}</p>
        </Form>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3>
            Message<span style={{ color: "red" }}>*</span>
          </h3>
          <Button
            style={{
              display: "flex",
              flex: "flex-wrap",
              alignText: "center",
              alignItems: "center",
            }}
            size="sm"
            type="button"
            onClick={() => setModalBool(true)}
            value="modal-button"
            variant="outline-primary"
          >
            <ChatDots className="mr-4" />
            Talking Points
          </Button>
        </div>
        <Modal show={modalBool} onHide={() => setModalBool(false)}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{ color: "#004fa0", fontFamily: "Crimson Text" }}
            >
              Talking Points
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Click a writing prompt to help you compose your message.</p>
            <ListGroup>
              {msgWizardResponse.action_alert &&
              Array.isArray(msgWizardResponse.action_alert.talking_points)
                ? msgWizardResponse.action_alert.talking_points.map(
                    (talkingP, i) => (
                      <ListGroup.Item key={i}>
                        <Button
                          variant="light"
                          className="form-control"
                          onClick={addToMessage}
                          key={i}
                        >
                          {talkingP}
                        </Button>
                      </ListGroup.Item>
                    )
                  )
                : null}
            </ListGroup>
          </Modal.Body>
        </Modal>
        <Form
          validated={msgWizardCompose.message ? true : false}
          value="message"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Control
            as="textarea"
            value={msgWizardCompose.message}
            onChange={handleInputChange}
            type="text"
            className="form-control"
            name="msg-message"
            rows="5"
            cols="55"
          />
          <p style={{ color: "red" }}>{msgWizardMessageErrors}</p>
        </Form>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  msgWizardResponse: state.msgWizard.response,
  msgWizardSenderInfo: state.msgWizard.sendingInfo,
});

const mapDispatch = (dispatch) => ({
  addTheCompose: (composedInfo) => dispatch(addInfo(composedInfo)),
});

export default connect(mapState, mapDispatch)(Compose);
