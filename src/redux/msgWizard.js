//ACTION TYPES
const ADD_INFO = "ADD_INFO";
const FETCH_INFO = "FETCH_INFO";
const FETCH_SENATORS = "FETCH_SENATORS";

//ACTION CREATORS
const addedInfo = (passedInfo) => ({ type: ADD_INFO, passedInfo });
const fetchedInfo = (fetchedInfo) => ({ type: FETCH_INFO, fetchedInfo });
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

export const prefillActionAlert =
  (actionId = 1930) =>
  async (dispatch) => {
    try {
      const url = `https://nwyc.dev.cvoice.io/v4/action_alerts/${actionId}/response`;
      const response = await fetch(url, {
        method: "GET",
        // withCredentials: true,
        headers: {
          Authorization: "Bearer 9gncKxP1Qmr54Clh3budNXaEjiUdgpzX3Cq1JAijgj",
        },
      });
      const data = await response.json();
      const senatorInfo = data.legislators.map((info) => info.full_name);
      // console.log(senatorInfo);
      dispatch(fetchedInfo(data));
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
    dispatch(fetchedsenator({ legislatorsByAddress: data.legislators }));
  } catch (error) {}
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
        response: { ...state.response, ...action.fetchedSenators },
      };
    case FETCH_INFO:
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
