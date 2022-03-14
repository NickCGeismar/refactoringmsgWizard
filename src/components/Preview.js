import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Tabs, Tab, Button, Form } from "react-bootstrap";
import { EnvelopeDash } from "react-bootstrap-icons";
import { addInfo } from "../redux/msgWizard.js";

function Preview({ msgWizardResponse, msgWizardSendingInfo, addTheCompose }) {
  // console.log(msgWizardResponse, "response");
  // console.log(msgWizardSendingInfo, "sending");
  const [displayedSenators, setDisplayedSenators] = useState([]);
  const [excludedSenators, setExcludedSenators] = useState([]);
  const [sendCopy, setSendCopy] = useState(true);
  // const [sendBoolean, setSendBoolean] = useState({});

  useEffect(() => {
    let senatorDisplay;
    if (
      Array.isArray(msgWizardResponse.legislatorsByAddress) &&
      msgWizardResponse.legislatorsByAddress.length
    ) {
      let comparison;
      senatorDisplay = msgWizardResponse.legislatorsByAddress.filter(
        (legislatorObj) => {
          comparison = legislatorObj.district.type;
          return (
            !!msgWizardSendingInfo.recipients.includes(comparison) ||
            (legislatorObj.title.toLowerCase() === "president" &&
              msgWizardSendingInfo.recipients.includes("president"))
          );
        }
      );
    } else {
      senatorDisplay = msgWizardResponse.legislators.filter((legislatorObj) => {
        let comparison;
        comparison = legislatorObj.type;
        return (
          !!msgWizardSendingInfo.recipients.includes(comparison) ||
          (legislatorObj.title.toLowerCase() === "president" &&
            msgWizardSendingInfo.recipients.includes("president"))
        );
      });
    }
    setDisplayedSenators(senatorDisplay.sort((a, b) => a.id - b.id));
  }, [msgWizardResponse, msgWizardSendingInfo.recipients]);

  useEffect(() => {
    addTheCompose({ exclude: [...excludedSenators], send_copy: sendCopy });
  }, [excludedSenators, sendCopy]);

  const excludeButton = (event) => {
    event.preventDefault();
    let index = excludedSenators.indexOf(+event.target.id);
    if (index !== -1) {
      let newArray = excludedSenators.filter((id) => id !== +event.target.id);
      setExcludedSenators(newArray);
    } else {
      setExcludedSenators([...excludedSenators, +event.target.id]);
    }
  };

  return !displayedSenators ? (
    <ClipLoader loading={true} size={150} />
  ) : (
    <div>
      <Tabs defaultActiveKey={0} id="uncontrolled-tab-example" className="mb-3">
        {displayedSenators.map((senator, i) => (
          <Tab
            key={senator.id}
            eventKey={i}
            title={
              <span>
                <div>
                  <img
                    style={
                      msgWizardSendingInfo.exclude.includes(senator.id)
                        ? {
                            borderRadius: "50%",
                            height: "70px",
                            width: "auto",
                            opacity: "0.4",
                          }
                        : {
                            borderRadius: "50%",
                            height: "70px",
                            width: "auto",
                          }
                    }
                    src={senator.image_url}
                  />
                </div>
                {/* <div>
                  {!!msgWizardSendingInfo.exclude.includes(senator.id) ? (
                    <EnvelopeDash style={{ color: "red" }} />
                  ) : null}
                </div> */}
              </span>
            }
            style={{ borderRadius: "50%" }}
          >
            {!!msgWizardSendingInfo.exclude.includes(senator.id) ? (
              <p
                style={{
                  backgroundColor: "#fbf8e3",
                  padding: "10px",
                  color: "#a89269",
                }}
              >
                Letter is excluded and will not be sent. Click "Include" to
                include this representative.
              </p>
            ) : null}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3
                style={
                  msgWizardSendingInfo.exclude.includes(senator.id)
                    ? { opacity: "0.4" }
                    : null
                }
              >
                {senator.firstname} {senator.lastname}
              </h3>
              <Button
                id={senator.id}
                variant="outline-danger"
                onClick={excludeButton}
              >
                {msgWizardSendingInfo.exclude.includes(senator.id)
                  ? "Include"
                  : "Exclude"}
              </Button>
            </div>
            <div
              style={
                msgWizardSendingInfo.exclude.includes(senator.id)
                  ? { opacity: "0.4" }
                  : null
              }
            >
              <p>
                The Honorable {senator.firstname} {senator.lastname}
              </p>
              <address>
                {senator.addresses[0].address1} {senator.addresses[0].address2}{" "}
                <br />
                {senator.addresses[0].city}, {senator.addresses[0].state}{" "}
                {senator.addresses[0].zip}
              </address>
              <p>
                Dear {senator.firstname} {senator.lastname}:
              </p>
              <p>Regarding {msgWizardSendingInfo.subject},</p>
              <br />
              <p>{msgWizardSendingInfo.message}</p>
              <br />
              <p>
                Sincerely, <br />
                {msgWizardSendingInfo.firstname} {msgWizardSendingInfo.lastname}
              </p>
            </div>
          </Tab>
        ))}
      </Tabs>
      <div>
        <Form.Group>
          <Form.Check
            onChange={() => setSendCopy(!sendCopy)}
            type="checkbox"
            name="president"
            label="Send a copy of the letter to me"
            checked={sendCopy}
          />
        </Form.Group>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  msgWizardResponse: state.msgWizard.response,
  msgWizardSendingInfo: state.msgWizard.sendingInfo,
});

const mapDispatch = (dispatch) => ({
  addTheCompose: (composedInfo) => dispatch(addInfo(composedInfo)),
});

export default connect(mapState, mapDispatch)(Preview);
