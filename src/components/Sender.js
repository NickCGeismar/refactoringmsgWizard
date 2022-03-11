import React, { useEffect, useState } from "react";
import { addInfo, lookupSenators } from "../redux/msgWizard.js";
import { connect } from "react-redux";
import { Button, Card, Form, Modal } from "react-bootstrap";
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

  //Onclick/onSubmit/function functions////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const addressErrorChecker = () => {
    if (!notEmptyValidator(formInfo.address1)) {
      setAddressError("Please input a address");
    }
    if (notEmptyValidator(formInfo.address1)) {
      setAddressError("");
    }
    if (!notEmptyValidator(formInfo.address2)) {
      setApartmentError("Please input an apartment");
    }
    if (notEmptyValidator(formInfo.address2)) {
      setApartmentError("");
    }
    if (!notEmptyValidator(formInfo.city)) {
      setCityError("Please input a city");
    }
    if (notEmptyValidator(formInfo.city)) {
      setCityError("");
    }
    if (!zipCodeValidator(formInfo.zip)) {
      setZipError("Please input a proper zipcode");
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
  }, [formInfo]);

  const handleSubmit = (event) => {
    if (event.type === "click") {
      event.preventDefault();
    }
    addTheSender({ ...formInfo });
    setModalObj({ modalBool: false });
    if (event && event.target.id === "save-address") {
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
      <div
        style={{
          paddingBottom: "20px",
          paddingTop: "15px",
        }}
      >
        <Card
          style={
            !!addressFullError
              ? {
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                }
              : {
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderColor: "red",
                }
          }
        >
          {/* {!addressFullError ? (
            <Card.Body>
              <h3>Address:</h3>
              <Button
                className="btn btn-danger"
                type="button"
                onClick={() =>
                  setModalObj({ modalBool: true, modalType: "address" })
                }
                value="modal-button"
              >
                Edit
              </Button>
              <div>
                <h3 style={{ color: "red" }}>
                  One or more required fields are missing
                </h3>
              </div>
            </Card.Body>
          ) : ( */}
          <div>
            <div className="sender-card">
              <h3>Address:</h3>
              <Button
                className="edit-button"
                variant={
                  !addressFullError ? "outline-danger" : "outline-primary"
                }
                type="button"
                onClick={() =>
                  setModalObj({ modalBool: true, modalType: "address" })
                }
                value="modal-button"
              >
                Edit
              </Button>
            </div>
            {!addressFullError ? (
              <h5
                style={{ color: "red", textAlign: "center", padding: "20px" }}
              >
                One or more required fields are missing.
              </h5>
            ) : (
              <div className="address-complete-section">
                <address>
                  {msgWizardSenderInfo.address1} {msgWizardSenderInfo.address2}
                  <br />
                  {msgWizardSenderInfo.city}, {msgWizardSenderInfo.state}{" "}
                  {msgWizardSenderInfo.zip}
                </address>
              </div>
            )}
            <div style={{ color: "#7a7a7a" }}>
              This is the address that our system will use to determine your
              legislators.
            </div>
          </div>
          {/* onExit={reload} Possible way to reset*/}
          <Modal
            // dialogClassName="modal-component"
            show={modalObj.modalBool && modalObj.modalType === "address"}
            onHide={() => handleSubmit({ target: { id: "save-address" } })}
          >
            <Modal.Header closeButton>
              <Modal.Title
                style={{ color: "#004fa0", fontFamily: "Crimson Text" }}
              >
                Sender Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                This information will be used to show who is sending this
                message.
              </p>
              <Form
                className="modal-form"
                value="address"
                onSubmit={handleSubmit}
              >
                <Form.Group>
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    isInvalid={addressError}
                    isValid={!addressError}
                    type="text"
                    name="address1"
                    onChange={onChange}
                    value={formInfo.address1}
                    minLength="1"
                  />
                  {addressError ? (
                    <span style={{ color: "red" }}>{addressError}</span>
                  ) : null}
                </Form.Group>
                <Form.Group className="pt-10">
                  <Form.Label>Apartment/Suite:</Form.Label>
                  <Form.Control
                    isInvalid={apartmentError}
                    isValid={!apartmentError}
                    type="text"
                    name="address2"
                    onChange={onChange}
                    value={formInfo.address2}
                    minLength="1"
                  />
                  {apartmentError ? (
                    <span style={{ color: "red" }}>{apartmentError}</span>
                  ) : null}
                </Form.Group>
                <Form.Group className="pt-10">
                  <Form.Label>City:</Form.Label>
                  <Form.Control
                    isInvalid={cityError}
                    isValid={!cityError}
                    className="form-control"
                    type="text"
                    name="city"
                    onChange={onChange}
                    value={formInfo.city}
                  />
                  {cityError ? (
                    <span style={{ color: "red" }}>{cityError}</span>
                  ) : null}
                </Form.Group>
                <Form.Group className="pt-10">
                  <Form.Label>State:</Form.Label>
                  <Form.Select
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
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="pt-10"
                  style={{ paddingBottom: "1.5rem" }}
                >
                  <Form.Label>Zip Code:</Form.Label>
                  <Form.Control
                    isInvalid={zipError}
                    isValid={!zipError}
                    className="form-control"
                    type="text"
                    name="zip"
                    onChange={onChange}
                    value={formInfo.zip}
                  />
                  {zipError ? (
                    <span style={{ color: "red" }}>{zipError}</span>
                  ) : null}
                </Form.Group>
                <Button
                  style={{ paddingTop: "10px" }}
                  onClick={handleSubmit}
                  type="submit"
                  id="save-address"
                >
                  Save
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Card>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        <Card
          style={
            !personError
              ? {
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderColor: "red",
                }
              : {
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                }
          }
        >
          <div>
            <div className="sender-card">
              <h3>Sender:</h3>
              <Button
                className="edit-button"
                variant={!personError ? "outline-danger" : "outline-primary"}
                type="button"
                onClick={() =>
                  setModalObj({ modalBool: true, modalType: "sender" })
                }
                value="modal-button"
              >
                Edit
              </Button>
            </div>

            {!personError ? (
              <h5
                style={{ color: "red", textAlign: "center", padding: "20px" }}
              >
                One or more required fields are missing.
              </h5>
            ) : (
              <div className="address-complete-section">
                <address>
                  {msgWizardSenderInfo.salutation}{" "}
                  {msgWizardSenderInfo.firstname} {msgWizardSenderInfo.lastname}
                  <br />
                  {msgWizardSenderInfo.email}
                  <br />
                  {msgWizardSenderInfo.phone}
                </address>
              </div>
            )}
            <div style={{ color: "#7a7a7a" }}>
              This information will be used to show who is sending this message.
            </div>
          </div>
          <Modal
            show={modalObj.modalBool && modalObj.modalType === "sender"}
            onHide={() => handleSubmit({ target: { id: "" } })}
          >
            <Modal.Header closeButton>
              <Modal.Title
                style={{ color: "#004fa0", fontFamily: "Crimson Text" }}
              >
                Sender Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                This information will be used to show who is sending this
                message.
              </p>
              <Form
                className="modal-form"
                value="person"
                onSubmit={handleSubmit}
              >
                {/* <Form.Group>
                  <Form.Label>Salutation:</Form.Label>
                  <Form.Control
                    className="form-control"
                    value={formInfo.salutation}
                    onChange={onChange}
                    type="text"
                    name="salutation"
                  />
                </Form.Group> */}
                <Form.Group className="pt-10">
                  <Form.Label>State:</Form.Label>
                  <Form.Select
                    className="form-control"
                    name="salutation"
                    value={formInfo.salutation}
                    onChange={onChange}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Rev.">Rev.</option>
                    <option value="Hon.">Hon.</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="pt-10">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    isInvalid={firstNameError}
                    isValid={!firstNameError}
                    className="form-control"
                    value={formInfo.firstname}
                    onChange={onChange}
                    type="text"
                    name="firstname"
                  />
                  {firstNameError ? (
                    <p style={{ color: "red" }}>{firstNameError}</p>
                  ) : null}
                </Form.Group>
                <Form.Group className="pt-10">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    isInvalid={lastNameError}
                    isValid={!lastNameError}
                    className="form-control"
                    value={formInfo.lastname}
                    onChange={onChange}
                    type="text"
                    name="lastname"
                  />
                  {lastNameError ? (
                    <p style={{ color: "red" }}>{lastNameError}</p>
                  ) : null}
                </Form.Group>
                <Form.Group className="pt-10">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    isInvalid={emailError}
                    isValid={!emailError}
                    className="form-control"
                    value={formInfo.email}
                    onChange={onChange}
                    type="text"
                    name="email"
                  />
                  {emailError ? (
                    <p style={{ color: "red" }}>{emailError}</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="pt-10"
                  style={{ paddingBottom: "1.5rem" }}
                >
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    isInvalid={phoneError}
                    isValid={!phoneError}
                    className="form-control"
                    value={formInfo.phone}
                    onChange={onChange}
                    type="text"
                    name="phone"
                  />
                  {phoneError ? (
                    <p style={{ color: "red" }}>{phoneError}</p>
                  ) : null}
                </Form.Group>
                <Button
                  style={{ paddingTop: "10px" }}
                  onClick={handleSubmit}
                  id="save-person"
                  type="submit"
                >
                  Save
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Card>
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
