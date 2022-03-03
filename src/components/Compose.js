import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addInfo } from "../redux/msgWizard.js";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { ChatDots } from "react-bootstrap-icons";

function Compose({ addTheCompose, msgWizard }) {
  const [modalBool, setModalBool] = useState(false);
  const [checkObject, setCheckObject] = useState([]);
  const [msgWizardCompose, setMsgWizardCompose] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {}, [msgWizard]);

  useEffect(() => {
    const storeObject = {
      recipients: checkObject,
      ...msgWizardCompose,
    };
    addTheCompose(storeObject);
  }, [checkObject, msgWizardCompose]);

  const handleToggleRecipients = (event) => {
    let index;
    let newArray;
    if (event.target.value === "president") {
      index = checkObject.indexOf("president");
      if (index > -1) {
        checkObject.splice(index, 1);
        setCheckObject([...checkObject]);
      } else {
        newArray = [...checkObject, "president"];
        setCheckObject([...newArray]);
      }
    }
    if (event.target.value === "senetor") {
      index = checkObject.indexOf("sen");
      if (index > -1) {
        checkObject.splice(index, 1);
        setCheckObject([...checkObject]);
      } else {
        newArray = [...checkObject, "sen"];
        setCheckObject([...newArray]);
      }
    }
    if (event.target.value === "representative") {
      index = checkObject.indexOf("rep");
      if (index > -1) {
        checkObject.splice(index, 1);
        setCheckObject([...checkObject]);
      } else {
        newArray = [...checkObject, "rep"];
        setCheckObject([...newArray]);
      }
    }
  };

  const handleChange = (event) => {
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
          onChange={handleToggleRecipients}
          type="checkbox"
          name="president"
          value="president"
          checked={false}
        />
        President
      </div>
      <div>
        <input
          onChange={handleToggleRecipients}
          type="checkbox"
          name="senetor"
          value="senetor"
        />
        Your U.S senators
      </div>
      <div>
        <input
          onChange={handleToggleRecipients}
          type="checkbox"
          name="representative"
          value="representative"
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
              onChange={handleChange}
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
              onChange={handleChange}
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
  msgWizard: state.msgWizard,
});

const mapDispatch = (dispatch) => ({
  addTheCompose: (composedInfo) => dispatch(addInfo(composedInfo)),
});

export default connect(mapState, mapDispatch)(Compose);
