import { useMemo } from "react";
import { CustomInputNodes } from "./CustomInputNodes";
import { CustomConditionNodes } from "./CustomConditionNodes";
import { CustomOutputNodes } from "./CustomOutputNode";

export const nodeTypes = useMemo(
  () => ({
    nodeWithButton: (nodeWithButton) => (
      <CustomInputNodes
        currentNode={nodeWithButton}
        addNode={addNode}
        deleteNode={deleteNode}
      />
    ),
    CustomConditionNode: (CustomConditionNode) => (
      <CustomConditionNodes
        currentNode={CustomConditionNode}
        addNode={addNode}
        deleteNode={deleteNode}
      />
    ),
    CustomOutputNode: (CustomOutputNode) => (
      <CustomOutputNodes
        currentNode={CustomOutputNode}
        deleteNode={deleteNode}
      />
    )
  }),
  []
);
