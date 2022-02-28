import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { addCompose } from '../redux/msgWizard.js';
import Modal from 'react-modal';

function Compose(props) {
    const [modalBool, setModalBool] = useState(false)
    const [checkObject, setCheckObject] = useState({ recipients: [] })
    const [msgWizard, setMsgWizard] = useState({
        subject: "",
        message: "",
    })

    const handleToggle = (event) => {
        let index;
        if (event.target.value === "president") {
            index = checkObject.recipients.indexOf("president")
            if (index > -1) {
                checkObject.recipients.splice(index, 1)
            } else {
                checkObject.recipients.push("president")
            }
        }
        if (event.target.value === "senetor") {
            index = checkObject.recipients.indexOf("sen")
            if (index > -1) {
                checkObject.recipients.splice(index, 1)
            } else {
                checkObject.recipients.push("sen")
            }
        }
        if (event.target.value === "representative") {
            index = checkObject.recipients.indexOf("rep")
            if (index > -1) {
                checkObject.recipients.splice(index, 1)
            } else {
                checkObject.recipients.push("rep")
            }
        }
    }

    const handleChange = (event) => {
        event.preventDefault()
        if (event.target.name === "msg-subject") {
            setMsgWizard({ ...msgWizard, subject: event.target.value })
        }
        if (event.target.name === "msg-message") {
            setMsgWizard({ ...msgWizard, message: event.target.value })
        }
    }


    const saveToStore = (event) => {
        event.preventDefault()
        const storeObject = {
            ...checkObject,
            ...msgWizard
        }
        props.addTheCompose(storeObject)
    }

    const addToMessage = (event) => {
        event.preventDefault()
        setMsgWizard({ ...msgWizard, message: msgWizard.message + event.target.innerHTML })
        setModalBool(false)
    }

    Modal.setAppElement('body');

    return (
        <div>
            <h1>Take Action: Should congress pass the Religious Freedom Over Mandates Act?</h1>
            <p>In the text boxes below, type your thoughts, concerns and how you stand on the issue to your elected officials.</p>
            <h3>Message Recipients*</h3>
            <div>
                <input onChange={handleToggle} type="checkbox" name="president" value="president" />President
            </div>
            <div>
                <input onChange={handleToggle} type="checkbox" name="senetor" value="senetor" />Your U.S senators
            </div>
            <div>
                <input onChange={handleToggle} type="checkbox" name="representative" value="representative" />Your U.S representatives
            </div>
            <div>
                <h3>Subject*</h3>
                <form value="subject" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <label>
                        <input onChange={handleChange} value={msgWizard.subject} type="text" name="msg-subject" />
                    </label>
                </form>
            </div>
            <div>
                <h3>Message*</h3>
                <button type="button" onClick={() => setModalBool(true)} value="modal-button">
                    <p>Talking Points</p>
                </button>
                <Modal isOpen={modalBool} onRequestClose={() => setModalBool(false)}>
                    <button onClick={addToMessage} >I think Congress should pass the [insert bill]. </button>
                    <button onClick={addToMessage}>I do not think Congress should pass the [insert bill]. </button>
                    <button onClick={addToMessage}>As a business owner, this legislation will affect me in the following ways. </button>
                    <button onClick={addToMessage}>As a concerned citizen, this legislation will affect me in the following ways. </button>
                    <button onClick={addToMessage}>I also think </button>
                    <button onClick={addToMessage}>As a constituent of yours, I would like to know your thoughts on this issue. </button>
                </Modal>
                <form value="message" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <label>
                        <textarea value={msgWizard.message} onChange={handleChange} type="text" name="msg-message" rows={5} cols={66} />
                    </label>
                </form>
                <button onClick={saveToStore} value="save">save</button>
            </div>
        </div>
    )
}

const mapState = (state) => ({
    msgWizard: state.msgWizard
})

const mapDispatch = (dispatch) => ({
    addTheCompose: (composedInfo) => dispatch(addCompose(composedInfo))
})

export default connect(mapState, mapDispatch)(Compose)