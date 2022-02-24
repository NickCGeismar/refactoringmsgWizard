
//ACTION TYPES
const COMPOSE_INFO = "COMPOSE_INFO"
const SENDER_INFO = "SENDER_INFO"

//ACTION CREATORS
const addedCompose = (composedInfo) => ({type: COMPOSE_INFO, composedInfo})
const addedSender = (senderInfo) => ({type: SENDER_INFO, senderInfo})

//THUNK CREATORS
export const addCompose = (composedInfo) => (dispatch) => {
    try {
        dispatch(addedCompose(composedInfo))
    } catch (error) {
        console.error(error)
    }
}

export const addSender = (senderInfo) => (dispatch) =>{
    try {
        dispatch(addedSender(senderInfo))
    } catch (error) {
        console.error(error)
    }
}

//INITIAL STATE 
const initialState = {
    message: "",
    recipients: [],
    subject: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    salutation: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
}

//REDUCER
export default function (state = initialState, action){
    switch (action.type){
        case COMPOSE_INFO:
            return {...state, ...action.composedInfo}
        case SENDER_INFO:
            return {...state, ...action.senderInfo}
        default:
            return state
    }
}