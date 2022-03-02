//ACTION TYPES
const ADD_INFO = "ADD_INFO";

//ACTION CREATORS
const addedInfo = (passedInfo) => ({ type: ADD_INFO, passedInfo });

//THUNK CREATORS
export const addInfo = (passedInfo) => (dispatch) => {
  try {
    dispatch(addedInfo(passedInfo));
  } catch (error) {
    console.error(error);
  }
};

export const prefillActionAlert = () => async (dispatch) => {
  try {
    const url = "https://nwyc.dev.cvoice.io/v4/action_alerts/1930/response";
    // const response = await fetch(url, {
    //   method: "GET",
    // //   withCredentials: true,
    //   headers: {
    //     Authorization: "Bearer 9gncKxP1Qmr54Clh3budNXaEjiUdgpzX3Cq1JAijgj",
    //   },
    // });
    // console.log(response);
    dispatch(
      addedInfo({
        address1: "185 Leonard St",
        address2: "3B",
        city: "New York City",
        state: "NY",
        zip: "10025",
        salutation: "Mr.",
        firstname: "Billy",
        lastname: "Bobby",
        email: "foo@bar.com",
        phone: "(555) 555-5555",
      })
    );
  } catch (error) {
    console.log(error);
  }
};

//INITIAL STATE
const initialState = {};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_INFO:
      return { ...state, ...action.passedInfo };
    default:
      return state;
  }
}
