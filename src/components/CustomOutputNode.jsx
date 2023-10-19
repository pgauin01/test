import { Handle, Position } from "reactflow";
import { useState, memo } from "react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import { message } from "antd";
import { ActionIcon } from "../assets/ActionIcon";
import { TagIcon } from "../assets/TagIcon";

const CustomOutputNodes = ({ currentNode, deleteNode, editNode, addNode }) => {
  const AddOperations = (type) => {
    addNode(type, currentNode.id);
  };
  const editNodeText = (id) => {
    let newlabel = prompt(
      "Enter new label for node",
      `${currentNode.data.label}`
    );
    editNode(id, newlabel);
    message.info("Action updated");
  };
  return (
    <div className={"node-" + currentNode.data.type + "-container"}>
      <div className="node-body">
        <p className="node-type">
          <ActionIcon />
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
          <Handle className="handle" type="target" position={Position.Top} />
          <div className="node-info">{currentNode.data.label}</div>
          <Handle className="handle" type="source" position={Position.Bottom} />
        </div>
      </div>
    </div>
  );
};

export default memo(CustomOutputNodes);
