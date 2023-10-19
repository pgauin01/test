import { Handle, Position } from "reactflow";
import { useState, memo } from "react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import { message } from "antd";
import { TriggerIcon } from "../assets/TriggerIcon";
import { TagIcon } from "../assets/TagIcon";

const CustomInputNodes = ({ currentNode, addNode, editNode, deleteNode }) => {
  const editNodeText = (id) => {
    let newlabel = prompt(
      "Enter new label for node",
      `${currentNode.data.label}`
    );
    editNode(id, newlabel);
    message.info("Trigger updated");
  };
  return (
    <div className={"node-" + currentNode.data.type + "-container"}>
      <div className="node-body">
        <p className="node-type">
          <TriggerIcon />
          {currentNode.data.type}
        </p>
        <div className="custom-node">
          <div className="title-btns">
            <p className="node-title">
              <TagIcon />
              {currentNode.data.label}
            </p>
            <div className="btns-box">
              <button
                className="edit-button"
                onClick={() => editNodeText(currentNode.id)}
              >
                <EditIcon />
              </button>
              <button
                className="delete-button"
                onClick={() =>
                  deleteNode(currentNode.id, currentNode.data.type)
                }
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <div className="node-info">{currentNode.data.description}</div>
          <Handle className="handle" type="source" position={Position.Bottom} />
        </div>
      </div>
    </div>
  );
};

export default memo(CustomInputNodes);
