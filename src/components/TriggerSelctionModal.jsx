import { useState } from "react";
import { Modal } from "antd";
import { PlusIcon } from "../assets/PlusIcon";
import { TriggerIcon } from "../assets/TriggerIcon";
import { ModalTitle } from "./ModalTitle";
import { TagIcon } from "../assets/TagIcon";
import { InfoIcon } from "../assets/InfoIcon";

export const TriggerSelection = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [helpText, setHelpText] = useState("");

  const TriggerConfigurations = [
    {
      icon: "tag_icon",
      text: "Tag added",
      configuration_name: "Tag_added",
      id: 1,
      dropdowns: ["a Tag"],
      dropdown_name: "Tag",
      help_text: ""
    },
    {
      icon: "tag_icon",
      text: "Tag removed",
      configuration_name: "Tag_removed",
      id: 2,
      dropdowns: ["a Tag"],
      dropdown_name: "Tag",
      help_text: ""
    },
    {
      icon: "tag_icon",
      text: "Call completed",
      configuration_name: "Call_completed",
      id: 3,
      dropdowns: ["campaign type", "a campaign"],
      dropdown_name: "Campaign",
      help_text:
        "Workflow triggers everytime when a call completes. A call is considered complete when the call ends, and moves to the next call. It is irrespective of the call's outcome and disposition."
    },
    {
      icon: "tag_icon",
      text: "Outreach completed",
      configuration_name: "Outreach_completed",
      id: 4,
      dropdowns: ["campaign type", "a campaign"],
      dropdown_name: "Campaign",
      help_text:
        "Workflow triggers only when an outreach is completed for a contact. It is considered complete when the call's retry attempts and scheduled callbacks are exhausted."
    },
    {
      icon: "tag_icon",
      text: "Message is sent",
      configuration_name: "Message_is_sent",
      id: 5,
      dropdowns: ["campaign type", "a campaign"],
      dropdown_name: "Campaign",
      help_text: ""
    },
    {
      icon: "tag_icon",
      text: "Message is received",
      configuration_name: "Message_is_received",
      id: 6,
      dropdowns: ["campaign type", "a campaign"],
      dropdown_name: "Campaign",
      help_text: ""
    }
  ];
  const showModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };
  const selectTrigger = (trigger) => {
    setTrigger(trigger.text);
    setHelpText(trigger.help_text);
  };
  const handleOk = () => {
    // props.getNodeType(nodeType);
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTrigger("");
  };
  return (
    <>
      <button className="add-Trigger" onClick={showModal}>
        <PlusIcon />
        Add Trigger
      </button>
      <Modal
        title={
          <ModalTitle
            icon={<TriggerIcon />}
            title={"Select a Trigger"}
            // help_text={helpText}
          />
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="workflow-modal trigger-selection-modal"
        okText="Set trigger"
      >
        {!trigger ? (
          <div className="grid">
            {TriggerConfigurations.map((trigger) => (
              <div key={trigger.id} onClick={() => selectTrigger(trigger)}>
                {trigger.icon === "tag_icon" && <TagIcon />}
                <p>{trigger.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p></p>
            <InfoIcon />
          </div>
        )}
      </Modal>
    </>
  );
};
