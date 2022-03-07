import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Tabs, Tab } from "react-bootstrap";

function Preview({ msgWizardResponse, msgWizardSendingInfo }) {
  // console.log(msgWizardResponse, "response");
  // console.log(msgWizardSendingInfo, "sending");
  const [displayedSenators, setDisplayedSenators] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("");
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
          comparison = legislatorObj.title.slice(0, 3).toLowerCase();
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
        comparison = legislatorObj.title.slice(0, 3).toLowerCase();
        return (
          !!msgWizardSendingInfo.recipients.includes(comparison) ||
          (legislatorObj.title.toLowerCase() === "president" &&
            msgWizardSendingInfo.recipients.includes("president"))
        );
      });
    }
    setDisplayedSenators(senatorDisplay);
  }, [msgWizardResponse, msgWizardSendingInfo.recipients]);

  return !displayedSenators ? (
    <ClipLoader loading={true} size={150} />
  ) : (
    <div>
      <Tabs
        activeKey={currentComponent}
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={function (evt) {
          setCurrentComponent(evt);
        }}
      >
        {displayedSenators.map((senator, i) => (
          <Tab
            key={senator.id}
            eventKey={`${i}`}
            title={
              <span>
                <img
                  style={{
                    borderRadius: "50%",
                    height: "70px",
                    width: "auto",
                  }}
                  src={senator.image_url}
                />
              </span>
            }
            style={{ borderRadius: "50%" }}
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
              Dear: {senator.firstname} {senator.lastname}
            </p>
            <p>Regarding {msgWizardSendingInfo.subject},</p>
            <p>{msgWizardSendingInfo.message}</p>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

const mapState = (state) => ({
  msgWizardResponse: state.msgWizard.response,
  msgWizardSendingInfo: state.msgWizard.sendingInfo,
});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(Preview);
