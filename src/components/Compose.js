import React, {useEffect, useState } from "react"
import { connect } from 'react-redux'
import {addCompose} from '../redux/msgWizard.js'

function Compose(props){
    const [checkObject, setCheckObject] = useState({recipients: []})

    const [msgWizard, setMsgWizard] = useState({
        subject: "",
        message: "",
    })

    const handleToggle = (event) =>{
        let index;
        if(event.target.value === "president"){
            index = checkObject.recipients.indexOf("president")
            if(index > -1){
                checkObject.recipients.splice(index, 1)
            } else{
                checkObject.recipients.push("president")
            }
        } 
        if(event.target.value === "senetor"){
            index = checkObject.recipients.indexOf("sen")
            if(index > -1){
                checkObject.recipients.splice(index, 1)
            } else{
                checkObject.recipients.push("sen")
            }
        } 
        if(event.target.value === "representative"){
            index = checkObject.recipients.indexOf("rep")
            if(index > -1){
                checkObject.recipients.splice(index, 1)
            } else{
                checkObject.recipients.push("rep")
            }
                }
    }

    const handleSubmit = (event) =>{
        console.log("handlesubmit")
        event.preventDefault()
        if(event.target.name === "msg-subject"){
            msgWizard.subject = event.target.value
        }
        if(event.target.name === "msg-message"){
            msgWizard.message = event.target.value
        }
    }

    const saveToStore = (event) =>{
        console.log("is this happening when i hit enter")
        event.preventDefault()
        const storeObject = {
            ...checkObject,
            ...msgWizard
        }
        // console.log(props)
        props.addTheCompose(storeObject)
    }
    return(
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
                <form value="subject" onChange={handleSubmit}>
                    <label>
                        <input type="text" name="msg-subject" />
                    </label>
                </form>
            </div>
            <div>
                <h3>Message*</h3>
                <form value="message" onChange={handleSubmit}>
                    <label>
                        <input type="text" name="msg-message" />
                    </label>
                </form>
                <button onClick={saveToStore} value="save">save</button>
            </div>
        </div>
    )
}

const mapState = (state) =>({
    msgWizard: state.msgWizard
})

const mapDispatch = (dispatch) =>({
    addTheCompose : (composedInfo)=> dispatch(addCompose(composedInfo))
})

export default connect(mapState, mapDispatch)(Compose)