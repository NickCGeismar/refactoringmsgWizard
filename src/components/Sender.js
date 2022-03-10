import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { addInfo, lookupSenators } from "../redux/msgWizard.js";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { isValidPhoneNumber } from "libphonenumber-js";
import { validate as emailValidator } from "email-validator";
import { notEmptyValidator, zipCodeValidator } from "../validations.js";

//This can incorporate redux functionality instead of having 2 states (removing actualInfoAddress)
//once redux is setup it would prefill from the backend logged in user, two states are no longer necessary.
//Leaving it in now to create dumby component

function Sender({
  msgWizardSenderInfo,
  msgWizardResponse,
  addTheSender,
  lookupTheSenators,
  senderErrorHandler,
}) {
  //States/useEffect Hooks////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [modalObj, setModalObj] = useState({
    modalBool: false,
    modalType: "address",
  });
  const [addressError, setAddressError] = useState("");
  const [apartmentError, setApartmentError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipError, setZipError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressFullError, setAddressFullError] = useState(true);
  const [personError, setPersonError] = useState(true);

  const [formInfo, setFormInfo] = useState({});

  useEffect(() => {
    setFormInfo({ ...msgWizardSenderInfo });
  }, [msgWizardSenderInfo]);
  useEffect(() => {
    senderErrorHandler(addressFullError, personError);
    // let bool = errorSubjectHandler() && errorMessageHandler();
    // setHasNoError(bool);
  }, [personError, addressFullError]);
  //etc???///// Modal throw an error if I do not use this
  Modal.setAppElement("body");

  //Onclick/onSubmit/function functions////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const addressErrorChecker = () => {
    if (!notEmptyValidator(formInfo.address1)) {
      setAddressError("Please input a Address");
    }
    if (notEmptyValidator(formInfo.address1)) {
      setAddressError("");
    }
    if (!notEmptyValidator(formInfo.address2)) {
      setApartmentError("Please input an Apartment");
    }
    if (notEmptyValidator(formInfo.address2)) {
      setApartmentError("");
    }
    if (!notEmptyValidator(formInfo.city)) {
      setCityError("Please Input a City");
    }
    if (notEmptyValidator(formInfo.city)) {
      setCityError("");
    }
    if (!zipCodeValidator(formInfo.zip)) {
      setZipError("Please input a proper Zipcode");
    }
    if (zipCodeValidator(formInfo.zip)) {
      setZipError("");
    }
    if (
      !notEmptyValidator(formInfo.address1) ||
      !notEmptyValidator(formInfo.address2) ||
      !notEmptyValidator(formInfo.city) ||
      !zipCodeValidator(formInfo.zip)
    ) {
      setAddressFullError(false);
    } else setAddressFullError(true);
  };

  const personErrorChecker = () => {
    if (!notEmptyValidator(formInfo.firstname)) {
      setFirstNameError("Please input your first name");
    }
    if (notEmptyValidator(formInfo.firstname)) {
      setFirstNameError("");
    }
    if (!notEmptyValidator(formInfo.lastname)) {
      setLastNameError("Please input your last name");
    }
    if (notEmptyValidator(formInfo.lastname)) {
      setLastNameError("");
    }
    if (!emailValidator(formInfo.email)) {
      setEmailError("Please input a valid email");
    }
    if (emailValidator(formInfo.email)) {
      setEmailError("");
    }
    if (formInfo.phone && !isValidPhoneNumber(formInfo.phone, "US")) {
      setPhoneError("Please input a valid phone number");
    }
    if (formInfo.phone && isValidPhoneNumber(formInfo.phone, "US")) {
      setPhoneError("");
    }
    if (
      !notEmptyValidator(formInfo.firstname) ||
      !notEmptyValidator(formInfo.lastname) ||
      !emailValidator(formInfo.email) ||
      !isValidPhoneNumber(formInfo.phone, "US")
    ) {
      setPersonError(false);
    } else {
      setPersonError(true);
    }
  };
  useEffect(() => {
    personErrorChecker();
    addressErrorChecker();
    // let bool = errorSubjectHandler() && errorMessageHandler();
    // setHasNoError(bool);
  }, [msgWizardSenderInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(isValidPhoneNumber(formInfo.phone, "US"), formInfo.phone);
    // console.log(emailValidator(formInfo.email));
    addTheSender({ ...formInfo });
    setModalObj({ modalBool: false });
    if (event.target.id === "save-address") {
      lookupTheSenators({ ...formInfo });
    }
  };

  const onChange = (event) => {
    event.preventDefault();
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      Please confirm that the information below is correct. Click the 'Edit'
      button to change the info.
      <div>
        <h1>Address:</h1>
        {!addressFullError ? (
          <div>
            <h3 style={{ color: "red" }}>
              One or more required fields are missing
            </h3>
            <Button
              className="btn btn-danger"
              type="button"
              onClick={() =>
                setModalObj({ modalBool: true, modalType: "address" })
              }
              value="modal-button"
            >
              <p>Edit</p>
            </Button>
          </div>
        ) : (
          <div>
            <address>
              {msgWizardSenderInfo.address1} {msgWizardSenderInfo.address2}
              <br />
              {msgWizardSenderInfo.city}, {msgWizardSenderInfo.state}{" "}
              {msgWizardSenderInfo.zip}
            </address>
            <Button
              type="button"
              onClick={() =>
                setModalObj({ modalBool: true, modalType: "address" })
              }
              value="modal-button"
            >
              <p>Edit</p>
            </Button>{" "}
          </div>
        )}
        {/* onExit={reload} Possible way to reset*/}
        <Modal
          isOpen={modalObj.modalBool && modalObj.modalType === "address"}
          onRequestClose={() => setModalObj(false)}
        >
          <form value="address" onSubmit={handleSubmit}>
            <label>
              Address:
              <br />
              <input
                className="form-control"
                type="text"
                name="address1"
                onChange={onChange}
                value={formInfo.address1}
                minLength="1"
              />
              {addressError ? (
                <p style={{ color: "red" }}>{addressError}</p>
              ) : null}
              <br />
            </label>
            <label>
              Apartment/Suite:
              <br />
              <input
                className="form-control"
                type="text"
                name="address2"
                onChange={onChange}
                value={formInfo.address2}
                minLength="1"
              />
              {apartmentError ? (
                <p style={{ color: "red" }}>{apartmentError}</p>
              ) : null}
              <br />
            </label>
            <label>
              City:
              <br />
              <input
                className="form-control"
                type="text"
                name="city"
                onChange={onChange}
                value={formInfo.city}
              />
              {cityError ? <p style={{ color: "red" }}>{cityError}</p> : null}
              <br />
            </label>
            <label>
              State: <br />
              <select
                className="form-control"
                name="state"
                required=""
                onChange={onChange}
                value={formInfo.state}
              >
                <option value=""></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AS">American Samoa</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="GU">Guam</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="PR">Puerto Rico</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VI">Virgin Islands</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
            <br />
            <label>
              Zip Code:
              <br />
              <input
                className="form-control"
                type="text"
                name="zip"
                onChange={onChange}
                value={formInfo.zip}
              />
              {zipError ? <p style={{ color: "red" }}>{zipError}</p> : null}
              <br />
            </label>
            <input
              onClick={handleSubmit}
              type="submit"
              id="save-address"
              value="Continue"
            />
          </form>
        </Modal>
      </div>
      <div>
        <h1>Sender:</h1>
        {!personError ? (
          <div>
            <h3 style={{ color: "red" }}>
              One or more required fields are missing
            </h3>
            <Button
              className="btn btn-danger"
              type="button"
              onClick={() =>
                setModalObj({ modalBool: true, modalType: "sender" })
              }
              value="modal-button"
            >
              <p>Edit</p>
            </Button>
          </div>
        ) : (
          <div>
            <address>
              {msgWizardSenderInfo.salutation} {msgWizardSenderInfo.firstname}{" "}
              {msgWizardSenderInfo.lastname}, <br />
              {msgWizardSenderInfo.email}
              <br />
              {msgWizardSenderInfo.phone}
            </address>
            <Button
              type="button"
              onClick={() =>
                setModalObj({ modalBool: true, modalType: "sender" })
              }
              value="modal-button"
            >
              <p>Edit</p>
            </Button>
          </div>
        )}
        <Modal
          isOpen={modalObj.modalBool && modalObj.modalType === "sender"}
          onRequestClose={() => setModalObj(false)}
        >
          <form value="person" onSubmit={handleSubmit}>
            <label>
              Salutation:
              <br />
              <input
                value={formInfo.salutation}
                onChange={onChange}
                type="text"
                name="salutation"
              />
              <br />
            </label>
            <label>
              First Name:
              <br />
              <input
                value={formInfo.firstname}
                onChange={onChange}
                type="text"
                name="firstname"
              />
              {firstNameError ? (
                <p style={{ color: "red" }}>{firstNameError}</p>
              ) : null}
              <br />
            </label>
            <label>
              Last Name:
              <br />
              <input
                value={formInfo.lastname}
                onChange={onChange}
                type="text"
                name="lastname"
              />
              {lastNameError ? (
                <p style={{ color: "red" }}>{lastNameError}</p>
              ) : null}
              <br />
            </label>
            <label>
              Email:
              <br />
              <input
                value={formInfo.email}
                onChange={onChange}
                type="text"
                name="email"
              />
              {emailError ? <p style={{ color: "red" }}>{emailError}</p> : null}
              <br />
            </label>
            <label>
              Phone Number:
              <br />
              <input
                value={formInfo.phone}
                onChange={onChange}
                type="text"
                name="phone"
              />
              {phoneError ? <p style={{ color: "red" }}>{phoneError}</p> : null}
              <br />
            </label>
            <input
              onClick={handleSubmit}
              id="save-person"
              type="submit"
              value="Continue"
            />
          </form>
        </Modal>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  msgWizardResponse: state.msgWizard.response.form,
  msgWizardSenderInfo: state.msgWizard.sendingInfo,
});

const mapDispatch = (dispatch) => ({
  addTheSender: (senderInfo) => dispatch(addInfo(senderInfo)),
  lookupTheSenators: (senderInfo) => dispatch(lookupSenators(senderInfo)),
});

export default connect(mapState, mapDispatch)(Sender);
