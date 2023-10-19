import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { PlusIcon } from "../assets/PlusIcon";
import { ConditionIcon } from "../assets/ConditionIcon";
import { ActionIcon } from "../assets/ActionIcon";
import { useAddNode } from "../utils/NodeOperations";
import useNodesIfClick from "../utils/useNodesIfElse";
import { Tooltip } from "antd";

const PlaceholderNode = ({ currentNode, addNode, editNode, deleteNode }) => {
  const [showdropdown, setShowdropdown] = useState(false);
  const AddNode = useAddNode();
  const AddIfNode = useNodesIfClick();
  const AddOperations = (type) => {
    setShowdropdown(false);
    type === "ifelse"
      ? AddIfNode("CONDITION", currentNode.id)
      : AddNode(type, currentNode.id);
  };

  return (
    <div className="dummy-container">
      <Tooltip title="Add condition or action" placement="bottom">
        <div className={"placeholder-node"}>
          <div onClick={() => setShowdropdown(!showdropdown)}>
            <PlusIcon size={12} />
          </div>
          <Handle
            className="handle"
            type="target"
            position={Position.Top}
            isConnectable={false}
          />
          <Handle
            className="handle"
            type="source"
            position={Position.Bottom}
            isConnectable={false}
          />
        </div>
      </Tooltip>
      {showdropdown && (
        <div className="select-node-type">
          <p onClick={() => AddOperations("CONDITION")}>
            <ConditionIcon />
            Condition
          </p>
          <p onClick={() => AddOperations("ACTION")}>
            <ActionIcon />
            Action
          </p>
          <p onClick={() => AddOperations("ifelse")}>
            <ConditionIcon />
            If/Else
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(PlaceholderNode);
