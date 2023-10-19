import { useCallback } from "react";
import { useReactFlow, getOutgoers } from "reactflow";
import { v4 as uuid } from "uuid";

export function useNodesIfClick() {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();
  const onClick = useCallback(
    (type, id) => {
      const parentNode = getNode(getNode(id).data.children.previous);

      if (!parentNode) {
        return;
      }

      const childNodeId = uuid();
      const childPlaceholder1Id = uuid();
      const childPlaceholder2Id = uuid();

      const childNode = {
        id: childNodeId,
        position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
        type: "CustomConditionNode",
        data: {
          label: `${type} node`,
          type: `${type}`,
          description: `${type} node`,
          children: {
            current: childNodeId,
            previous: parentNode.id,
            next: []
          }
        }
      };

      const childPlaceholderNode1 = {
        id: childPlaceholder1Id,
        position: { x: childNode.position.x, y: childNode.position.y + 150 },
        type: "placeholder",
        data: { label: "+" }
      };

      const childPlaceholderNode2 = {
        id: childPlaceholder2Id,
        position: { x: childNode.position.x, y: childNode.position.y + 150 },
        type: "placeholder",
        data: { label: "+" }
      };

      const childEdge = {
        id: `${parentNode.id}=>${childNodeId}`,
        source: parentNode.id,
        target: childNodeId,
        type: "buttonedge"
      };

      const childPlaceholderEdge1 = {
        id: `${childNodeId}=>${childPlaceholder1Id}`,
        source: childNodeId,
        target: childPlaceholder1Id,
        type: "placeholder",
        style: {
          stroke: "#13C2C2"
        },
        data: {
          text: "YES"
        }
      };

      const childPlaceholderEdge2 = {
        id: `${childNodeId}=>${childPlaceholder2Id}`,
        source: childNodeId,
        target: childPlaceholder2Id,
        type: "placeholder",
        style: {
          stroke: "#CF1322"
        },
        data: {
          text: "NO"
        }
      };

      const existingPlaceholders = getOutgoers(
        parentNode,
        getNodes(),
        getEdges()
      )
        .filter((node) => node.type === "placeholder")
        .map((node) => node.id);

      // add the new nodes (child and placeholder), filter out the existing placeholder nodes of the clicked node
      setNodes((nodes) =>
        nodes
          .filter((node) => !existingPlaceholders.includes(node.id))
          .filter((node) => {
            if (node.id === parentNode.id) {
              node.data.children.next
                .filter(
                  (children) => !existingPlaceholders.includes(children.id)
                )
                .push(childNode.id);
            }
            return node;
          })
          .concat([childNode, childPlaceholderNode1, childPlaceholderNode2])
      );

      // add the new edges (node -> child, child -> placeholder), filter out any placeholder edges
      setEdges((edges) =>
        edges
          .filter((edge) => !existingPlaceholders.includes(edge.target))
          .concat([childEdge, childPlaceholderEdge1, childPlaceholderEdge2])
      );
    },
    [getEdges, getNode, getNodes, setEdges, setNodes]
  );

  return onClick;
}

export default useNodesIfClick;
