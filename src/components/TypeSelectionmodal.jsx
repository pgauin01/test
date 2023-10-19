import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { PlusIcon } from "../assets/PlusIcon";

export const TypeSelectionModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeType, setNodeType] = useState("");
  const showModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };
  const handleOk = () => {
    props.getNodeType(nodeType);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip placement="left" title={"Add condition or action"}>
        <button className="edgebutton" onClick={showModal}>
          <PlusIcon size={10} />
        </button>
      </Tooltip>
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Select the node type to create</h2>
        <input
          type="radio"
          id="Condition"
          name="node_type"
          value="Condition"
          onChange={() => setNodeType("CONDITION")}
        />
        <label>Condition</label>
        <br />
        <input
          type="radio"
          id="Action"
          name="node_type"
          value="Action"
          onChange={() => setNodeType("ACTION")}
        />
        <label>Action</label>
        <br />
      </Modal>
    </>
  );
};
