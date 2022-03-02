import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { addInfo } from "../redux/msgWizard.js";
import { connect } from "react-redux";

//This can incorporate redux functionality instead of having 2 states (removing actualInfoAddress)
//once redux is setup it would prefill from the backend logged in user, two states are no longer necessary.
//Leaving it in now to create dumby component

function Sender({ msgWizard, addTheSender }) {
  //States/////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [modalObj, setModalObj] = useState({
    modalBool: false,
    modalType: "address",
  });
  const [formInfoAddress, setFormInfoAddress] = useState({
    address1: "185 Leonard St",
    address2: "3B",
    city: "New York City",
    state: "NY",
    zip: "10025",
  });

  const [formInfoPerson, setFormInfoPerson] = useState({
    salutation: "Mr.",
    firstname: "Billy",
    lastname: "Bobby",
    email: "foo@bar.com",
    phone: "(555) 555-5555",
  });

  //etc???///// Modal throw an error if I do not use this
  Modal.setAppElement("body");

  //Onclick/onSubmit/function functions////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleAddressSubmit = (event) => {
    event.preventDefault();
    addTheSender({ ...formInfoAddress });
    setModalObj({ modalBool: false });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    addTheSender({ ...formInfoPerson });
    setModalObj({ modalBool: false });
  };

  const onChangeAddress = (event) => {
    event.preventDefault();
    setFormInfoAddress({
      ...formInfoAddress,
      [event.target.name]: event.target.value,
    });
  };
  const onChangePerson = (event) => {
    event.preventDefault();
    setFormInfoPerson({
      ...formInfoPerson,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      "Please confirm that the information below is correct. Click the 'Edit'
      button to change the info."
      <div>
        <h1>Address:</h1>
        <address>
          {msgWizard.address1} {msgWizard.address2}
          <br />
          {msgWizard.city}, {msgWizard.state} {msgWizard.zip}
        </address>
        <button
          type="button"
          onClick={() => setModalObj({ modalBool: true, modalType: "address" })}
          value="modal-button"
        >
          <p>Edit</p>
        </button>
        {/* onExit={reload} Possible way to reset*/}
        <Modal
          isOpen={modalObj.modalBool && modalObj.modalType === "address"}
          onRequestClose={() => setModalObj(false)}
        >
          <form value="address" onSubmit={handleAddressSubmit}>
            <label>
              Address:
              <br />
              <input
                type="text"
                name="address1"
                onChange={onChangeAddress}
                value={formInfoAddress.address1}
                minLength="1"
              />
              <br />
            </label>
            <label>
              Apartment/Suite:
              <br />
              <input
                type="text"
                name="address2"
                onChange={onChangeAddress}
                value={formInfoAddress.address2}
                minLength="1"
              />
              <br />
            </label>
            <label>
              City:
              <br />
              <input
                type="text"
                name="city"
                onChange={onChangeAddress}
                value={formInfoAddress.city}
              />
              <br />
            </label>
            <label>
              State: <br />
              <select
                name="state"
                required=""
                onChange={onChangeAddress}
                value={formInfoAddress.state}
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
                type="text"
                name="zip"
                onChange={onChangeAddress}
                value={formInfoAddress.zip}
              />
              <br />
            </label>
            <input
              onClick={handleAddressSubmit}
              type="submit"
              id="save-address"
              value="Continue"
            />
          </form>
        </Modal>
      </div>
      <div>
        <h1>Sender:</h1>
        <address>
          {msgWizard.salutation} {msgWizard.firstname} {msgWizard.lastname},{" "}
          <br />
          {msgWizard.email}
          <br />
          {msgWizard.phone}
        </address>
        <button
          type="button"
          onClick={() => setModalObj({ modalBool: true, modalType: "sender" })}
          value="modal-button"
        >
          <p>Edit</p>
        </button>
        <Modal
          isOpen={modalObj.modalBool && modalObj.modalType === "sender"}
          onRequestClose={() => setModalObj(false)}
        >
          <form value="person" onSubmit={handlePersonSubmit}>
            <label>
              Salutation:
              <br />
              <input
                value={formInfoPerson.salutation}
                onChange={onChangePerson}
                type="text"
                name="salutation"
              />
              <br />
            </label>
            <label>
              First Name:
              <br />
              <input
                value={formInfoPerson.firstname}
                onChange={onChangePerson}
                type="text"
                name="firstname"
              />
              <br />
            </label>
            <label>
              Last Name:
              <br />
              <input
                value={formInfoPerson.lastname}
                onChange={onChangePerson}
                type="text"
                name="lastname"
              />
              <br />
            </label>
            <label>
              Email:
              <br />
              <input
                value={formInfoPerson.email}
                onChange={onChangePerson}
                type="text"
                name="email"
              />
              <br />
            </label>
            <label>
              Phone Number:
              <br />
              <input
                value={formInfoPerson.phone}
                onChange={onChangePerson}
                type="text"
                name="phone"
              />
              <br />
            </label>
            <input
              onClick={handlePersonSubmit}
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
  msgWizard: state.msgWizard,
});

const mapDispatch = (dispatch) => ({
  addTheSender: (senderInfo) => dispatch(addInfo(senderInfo)),
});

export default connect(mapState, mapDispatch)(Sender);
