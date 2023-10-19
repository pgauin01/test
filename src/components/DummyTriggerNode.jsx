import { Handle, Position } from "reactflow";
import { PlusIcon } from "../assets/PlusIcon";
import { TriggerSelection } from "./TriggerSelctionModal";

export const DummyTriggerNode = ({ currentNode, addTrigger }) => {
  return (
    <div className="dummy-container">
      <div className="Dummy-trigger-node">
        <TriggerSelection />
        <Handle className="handle" type="source" position={Position.Bottom} />
      </div>
    </div>
  );
};
