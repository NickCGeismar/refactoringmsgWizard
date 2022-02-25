import React, {useEffecct, useState} from "react"
import {connect} from 'react-redux'



function Preview(props){
    console.log(props.msgWizard)
    return(
        "Here is a preview of where your message will be sent"
    )
}


const mapState = (state) =>({
    msgWizard: state.msgWizard
})

const mapDispatch = (dispatch) =>({
})

export default connect(mapState, mapDispatch)(Preview)