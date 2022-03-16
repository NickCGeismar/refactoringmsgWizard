//ACTION TYPES
const ADD_INFO = "ADD_INFO";
const FETCH_INFO_RESPONSE = "FETCH_INFO_RESPONSE";
const FETCH_INFO_ACTION_ALERT = "FETCH_INFO_ACTION_ALERT";
const FETCH_SENATORS = "FETCH_SENATORS";

//ACTION CREATORS
const addedInfo = (passedInfo) => ({ type: ADD_INFO, passedInfo });
const fetchedInfoResponse = (fetchedInfo) => ({
  type: FETCH_INFO_RESPONSE,
  fetchedInfo,
});
const fetchedInfoActionAlert = (fetchedInfo) => ({
  type: FETCH_INFO_ACTION_ALERT,
  fetchedInfo,
});
const fetchedsenator = (fetchedSenators) => ({
  type: FETCH_SENATORS,
  fetchedSenators,
});

//THUNK CREATORS
export const addInfo = (passedInfo) => (dispatch) => {
  try {
    dispatch(addedInfo(passedInfo));
  } catch (error) {
    console.error(error);
  }
};

//real actionAlert = 1767
//fake actionAlert = 928
export const prefillActionAlert =
  (actionId = 1767) =>
  async (dispatch) => {
    try {
      const actionAlert = await fetch(
        `https://nwyc.dev.cvoice.io/v4/action_alerts/${actionId}`,
        {
          method: "GET",
          // withCredentials: true,
          headers: {
            Authorization: "Bearer 9gncKxP1Qmr54Clh3budNXaEjiUdgpzX3Cq1JAijgj",
          },
        }
      );
      const actionResponse = await fetch(
        `https://nwyc.dev.cvoice.io/v4/action_alerts/${actionId}/response`,
        {
          method: "GET",
          // withCredentials: true,
          headers: {
            Authorization: "Bearer 9gncKxP1Qmr54Clh3budNXaEjiUdgpzX3Cq1JAijgj",
          },
        }
      );
      const dataAlert = await actionAlert.json();
      const dataResponse = await actionResponse.json();
      if (
        Object.keys(dataAlert).length !== 0 &&
        dataResponse.response !== null
      ) {
        dispatch(fetchedInfoResponse(dataResponse));
        dispatch(fetchedInfoActionAlert(dataAlert));
      } else {
        dispatch(fetchedInfoResponse({ response: null }));
        throw Error("404 Action Alert Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const lookupSenators = (senderInfo) => async (dispatch) => {
  try {
    const url = `https://nwyc.dev.cvoice.io/v4/legislators/address_lookup/?street=${senderInfo.address1}&city=${senderInfo.city}&state=${senderInfo.city}&zipcode=${senderInfo.zip}`;
    const response = await fetch(url, {
      method: "GET",
      // withCredentials: true,
      headers: {
        Authorization: "Bearer 9gncKxP1Qmr54Clh3budNXaEjiUdgpzX3Cq1JAijgj",
      },
    });
    const data = await response.json();
    if (response.status === 404) {
      throw Error("Legislators not found.");
    }
    if (data.legislators) {
      dispatch(
        fetchedsenator({ legislatorsByAddress: data.legislators, senderInfo })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

//INITIAL STATE
const initialState = {
  response: { form: {}, legislators: [], legislatorsByAddress: [] },
  sendingInfo: {},
};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SENATORS:
      return {
        ...state,
        sendingInfo: { ...state.sendingInfo, ...action.senderInfo },
        response: {
          ...state.response,
          legislatorsByAddress: action.fetchedSenators.legislatorsByAddress,
        },
      };
    case FETCH_INFO_RESPONSE:
      return {
        ...state,
        sendingInfo: { ...state.senderInfo, ...action.fetchedInfo.form },
        response: { ...state.response, ...action.fetchedInfo },
      };
    case FETCH_INFO_ACTION_ALERT:
      return {
        ...state,
        response: { ...state.response, ...action.fetchedInfo },
      };
    case ADD_INFO:
      return {
        ...state,
        sendingInfo: { ...state.sendingInfo, ...action.passedInfo },
      };
    default:
      return state;
  }
}
