import React, { useCallback } from "react";
import { useReactFlow, getOutgoers } from "reactflow";
import { v4 as uuidv4 } from "uuid";

export const useAddNode = () => {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();
  const newPlaceholderId = `${uuidv4()}`;
  const onClick = (type, parentId) => {
    const parent = getNode(parentId);
    let newPlaceholderNode = {
      id: newPlaceholderId,
      data: {
        label: `${type} node`,
        description: `${type} node`,
        type: `${type}`,
        children: { current: newPlaceholderId, previous: parentId, next: [] }
      },
      position: {
        x: parent.position.x,
        y: parent.position.y + 150
      },
      type: "placeholder"
    };

    let newPlaceholderEdge = {
      id: `edge ${parentId}-${newPlaceholderId}`,
      source: parentId,
      target: newPlaceholderId,
      type: "placeholder"
    };
    setNodes((nodes) =>
      nodes
        .map((node) => {
          if (node.id === parentId) {
            node["type"] =
              type === "ACTION" ? "CustomOutputNode" : "CustomConditionNode";
            node["data"] = {
              label: `${type} node`,
              type: `${type}`,
              description: `${type} node`,
              children: {
                current: newPlaceholderId,
                previous: parentId,
                next: []
              }
            };
            if (!node.data.children.next.includes(newPlaceholderId)) {
              node.data.children.next.push(newPlaceholderId);
            }
          }
          return node;
        })
        .concat([newPlaceholderNode])
    );
    setEdges((edges) =>
      edges
        .map((edge) => {
          if (edge.target === parentId) {
            return {
              ...edge,
              type: "buttonedge"
            };
          }
          return edge;
        })
        .concat([newPlaceholderEdge])
    );
  };
  return onClick;
};

// const addXNodes = (type, parentId, nodesQuantity) => {
//   while (nodesQuantity > 0) {
//     console.log(nodesQuantity);
//     AddNode(type, parentId);
//     nodesQuantity--;
//   }
// };

// const deleteNode = (node_id, node_type) => {
//   if (node_type === "TRIGGER") {
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id === node_id) {
//           node.type = "DummyTrigger";
//           node.position.y = -100;
//         }
//         return node;
//       })
//     );
//     return;
//   }
//   setNodes((nds) =>
//     nds.map((node) => {
//       if (node.data.children?.next?.includes(node_id)) {
//         let filterednext = node.data.children.next.filter(
//           (nxtnodes) => nxtnodes !== node_id
//         );
//         node.data.children.next = filterednext;
//       }
//       return node;
//     })
//   );
//   setNodes((nds) => nds.filter((node) => node.id !== node_id));
//   setEdges((edg) => edg.filter(({ target }) => target !== node_id));
//   message.info(`${node_type} deleted`);
// };

// const editNode = (node_id, newlable) => {
//   setNodes((nds) =>
//     nds.map((node) => {
//       if (node.id === node_id) {
//         node.data = {
//           ...node.data,
//           label: newlable
//         };
//       }
//       return node;
//     })
//   );
// };

// const addNodeBetweenNodes = (sourceId, targetId, edgeId, type) => {
//   const newId = `${uuidv4()}`;
//   let newNode = {
//     id: newId,
//     data: {
//       label: `${type} node`,
//       type: `${type}`,
//       children: { current: newId, previous: sourceId, next: [targetId] }
//     },
//     position: {
//       x: 0,
//       y: 0
//     },
//     draggable: false
//   };
//   if (type === "Action") {
//     newNode["type"] = "CustomOutputNode";
//   } else {
//     newNode["type"] = "CustomConditionNode";
//   }
//   let newEdge1 = {
//     id: `edge ${newNode.id}-${targetId}`,
//     source: newNode.id,
//     target: targetId,
//     type: "buttonedge",
//     data: { addNodeBetweenNodes }
//   };
//   setNodes((nds) =>
//     nds
//       .map((node) => {
//         if (node.id === sourceId) {
//           const childNodes = node.data.children.next;
//           let filteredChildNodes = childNodes.filter(
//             (nxtNode) => nxtNode !== targetId
//           );
//           filteredChildNodes.push(newId);
//           node.data.children.next = filteredChildNodes;
//         }
//         if (node.id === targetId) {
//           node.data.children.previous = newId;
//         }
//         return node;
//       })
//       .concat([newNode])
//   );
//   setEdges((edgs) =>
//     edgs
//       .map((edge) => {
//         if (edge.id === edgeId) {
//           edge.target = newNode.id;
//         }
//         return edge;
//       })
//       .concat([newEdge1])
//   );
// };
