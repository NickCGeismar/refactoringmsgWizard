import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addInfo } from "../redux/msgWizard.js";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { ChatDots } from "react-bootstrap-icons";

function Compose({ addTheCompose, msgWizardResponse, hasError, setHasError }) {
  const [modalBool, setModalBool] = useState(false);
  const [checkObjectPresident, setCheckObjectPresident] = useState(true);
  const [showCheckObjectPresident, setShowCheckObjectPresident] =
    useState(true);
  const [checkObjectSenator, setCheckObjectSenator] = useState(true);
  const [showCheckObjectSenator, setShowCheckObjectSenator] = useState(true);
  const [checkObjectRepresentative, setCheckObjectRepresentative] =
    useState(true);
  const [showCheckObjectRepresentative, setShowCheckObjectRepresentative] =
    useState(true);
  const [msgWizardCompose, setMsgWizardCompose] = useState({
    subject: "",
    message: "",
  });

  //predetermines boolean checkObject states from action_alert response
  useEffect(() => {
    // console.log(msgWizardResponse.form.recipients);
  }, [msgWizardResponse.form.recipients]);

  //sends recipients to store
  useEffect(() => {
    let checkObjectRecipients = [];
    if (checkObjectPresident) {
      checkObjectRecipients.push("president");
    }
    if (checkObjectSenator) {
      checkObjectRecipients.push("sen");
    }
    if (checkObjectRepresentative) {
      checkObjectRecipients.push("rep");
    }
    const storeObject = {
      recipients: checkObjectRecipients,
    };
    addTheCompose(storeObject);
  }, [checkObjectPresident, checkObjectSenator, checkObjectRepresentative]);

  //sends composedmessages to store
  useEffect(() => {
    const storeObject = {
      ...msgWizardCompose,
    };
    addTheCompose(storeObject);
  }, [msgWizardCompose]);

  const handleTogglePresident = (event) => {
    setCheckObjectPresident(!checkObjectPresident);
  };

  const handleToggleSenator = (event) => {
    setCheckObjectSenator(!checkObjectSenator);
  };

  const handleToggleRepresentative = (event) => {
    setCheckObjectRepresentative(!checkObjectRepresentative);
  };

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
      <div>
        <input
          onChange={handleTogglePresident}
          type="checkbox"
          name="president"
          value="president"
          checked={checkObjectPresident}
        />
        President
      </div>
      <div>
        <input
          onChange={handleToggleSenator}
          type="checkbox"
          name="senator"
          value="senator"
          checked={checkObjectSenator}
        />
        Your U.S senators
      </div>
      <div>
        <input
          onChange={handleToggleRepresentative}
          type="checkbox"
          name="representative"
          value="representative"
          checked={checkObjectRepresentative}
        />
        Your U.S representatives
      </div>
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
          <Button
            variant="light"
            className="form-control"
            onClick={addToMessage}
          >
            I think Congress should pass the [insert bill].{" "}
          </Button>
          <Button
            variant="light"
            className="form-control"
            onClick={addToMessage}
          >
            I do not think Congress should pass the [insert bill].{" "}
          </Button>
          <Button
            variant="light"
            className="form-control"
            onClick={addToMessage}
          >
            As a business owner, this legislation will affect me in the
            following ways.{" "}
          </Button>
          <Button
            variant="light"
            className="form-control"
            onClick={addToMessage}
          >
            As a concerned citizen, this legislation will affect me in the
            following ways.{" "}
          </Button>
          <Button
            variant="light"
            className="form-control"
            onClick={addToMessage}
          >
            I also think{" "}
          </Button>
          <Button
            variant="light"
            className="form-control"
            onClick={addToMessage}
          >
            As a constituent of yours, I would like to know your thoughts on
            this issue.{" "}
          </Button>
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
