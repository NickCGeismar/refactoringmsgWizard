import {combineReducers} from 'redux'
import msgWizardReducer from './msgWizard.js'

const combinedReducer = combineReducers({
    msgWizard: msgWizardReducer,
})

export default combinedReducer
export * from './msgWizard.js'