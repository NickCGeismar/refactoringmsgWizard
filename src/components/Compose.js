import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addInfo } from "../redux/msgWizard.js";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { ChatDots } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

function Compose({ addTheCompose, msgWizardResponse, hasError, setHasError }) {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //predetermines boolean checkObject states from action_alert response
  useEffect(() => {
    if (msgWizardResponse.action_alert) {
      msgWizardResponse.action_alert.chambers.forEach((element) => {
        if (element === "president") {
          setShowCheckObjectPresident(true);
          setCheckObjectPresident(true);
        }
        if (element === "sen") {
          setShowCheckObjectSenator(true);
          setCheckObjectSenator(true);
        }
        if (element === "rep") {
          setShowCheckObjectRepresentative(true);
          setCheckObjectRepresentative(true);
        }
        if (element === "vice-president") {
          setShowCheckObjectVicePresident(true);
          setCheckObjectVicePresident(true);
        }
        if (element === "governor") {
          setShowCheckObjectGovernor(true);
          setCheckObjectGovernor(true);
        }
        if (element === "state-sen") {
          setShowCheckObjectStateSen(true);
          setCheckObjectStateSen(true);
        }
        if (element === "state-rep") {
          setShowCheckObjectStateRep(true);
          setCheckObjectStateRep(true);
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
    setMsgWizardCompose({
      ...msgWizardCompose,
      message: msgWizardCompose.message + event.target.innerHTML,
    });
    setModalBool(false);
  };

  Modal.setAppElement("body");

  return (
    <div>
      <h1>
        Take Action: Should congress pass the Religious Freedom Over Mandates
        Act?
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
          President
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
          Your Vice President
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
          Your U.S senators
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
          Your U.S representatives
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
          Your State Governor
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
          Your State Senator
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
          Your State representatives
        </div>
      ) : null}
      <div>
        <h3>Subject*</h3>
        <form
          value="subject"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>
            <input
              className="form-control form-control-lg"
              onChange={handleInputChange}
              value={msgWizardCompose.subject}
              type="text"
              name="msg-subject"
            />
          </label>
        </form>
      </div>
      <div>
        <h3>Message*</h3>
        <Button
          className=""
          type="button"
          onClick={() => setModalBool(true)}
          value="modal-button"
          variant="outline-primary"
        >
          <ChatDots className="ml-4" />
          <p>Talking Points</p>
        </Button>
        <Modal isOpen={modalBool} onRequestClose={() => setModalBool(false)}>
          {msgWizardResponse.action_alert &&
          Array.isArray(msgWizardResponse.action_alert.talking_points)
            ? msgWizardResponse.action_alert.talking_points.map(
                (talkingP, i) => (
                  <Button
                    variant="light"
                    className="form-control"
                    onClick={addToMessage}
                    key={i}
                  >
                    {talkingP}
                  </Button>
                )
              )
            : null}
        </Modal>
        <form
          value="message"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>
            <textarea
              value={msgWizardCompose.message}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              name="msg-message"
              rows="5"
              cols="55"
            />
          </label>
        </form>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  msgWizardResponse: state.msgWizard.response,
});

const mapDispatch = (dispatch) => ({
  addTheCompose: (composedInfo) => dispatch(addInfo(composedInfo)),
});

export default connect(mapState, mapDispatch)(Compose);
