import React, { useCallback, useState, useMemo, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
  useStore,
  ConnectionLineType
} from "reactflow";
import "reactflow/dist/style.css";
import CustomInputNodes from "./CustomInputNodes";
import CustomConditionNodes from "./CustomConditionNodes";
import CustomOutputNodes from "./CustomOutputNode";
import { DummyTriggerNode } from "./DummyTriggerNode";
import { initailNodes } from "./InitialNodes";
import { initialEdges } from "./InitialEdges";
import dagre from "dagre";
import { CustomEdge } from "./customEdge";
import PlaceholderEdge from "./PlaceholderEdge";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import useAutoLayout from "./useAutoLayout";
import PlaceholderNode from "./PlaceholderNode";
import useAddNode from "../utils/NodeOperations";

const nodeWidth = 300;
const nodeHeight = 170;
const createGraphLayout = (nodes, edges) => {
  const Graph = new dagre.graphlib.Graph();
  Graph.setDefaultEdgeLabel(() => ({}));
  Graph.setGraph({ rankdir: "TB" });
  nodes.forEach((node) => {
    Graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    Graph.setEdge(edge.source, edge.target);
  });
  dagre.layout(Graph);
  nodes.forEach((node) => {
    const nodeWithPosition = Graph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };
    return node;
  });
  return { nodes, edges };
};

export const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initailNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const flowKey = "example-flow";
  const nodeCountSelector = (state) => state.nodeInternals.size;
  const nodeCount = useStore(nodeCountSelector);

  useAutoLayout();
  const onEdgesChange = useCallback((changes) => {
    setEdges((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes]);

  const edgeTypes = useMemo(
    () => ({
      buttonedge: CustomEdge,
      placeholder: PlaceholderEdge
    }),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      nodeWithButton: (nodeWithButton) => (
        <CustomInputNodes
          currentNode={nodeWithButton}
          addNode={useAddNode}
          deleteNode={deleteNode}
          editNode={editNode}
        />
      ),
      CustomConditionNode: (CustomConditionNode) => (
        <CustomConditionNodes
          currentNode={CustomConditionNode}
          addNode={useAddNode}
          deleteNode={deleteNode}
          editNode={editNode}
        />
      ),
      CustomOutputNode: (CustomOutputNode) => (
        <CustomOutputNodes
          currentNode={CustomOutputNode}
          addNode={useAddNode}
          deleteNode={deleteNode}
          editNode={editNode}
        />
      ),
      placeholder: (placeholder) => (
        <PlaceholderNode
          currentNode={placeholder}
          addNode={useAddNode}
          deleteNode={deleteNode}
          editNode={editNode}
        />
      ),
      DummyTrigger: (DummyTrigger) => (
        <DummyTriggerNode currentNode={DummyTrigger} addTrigger={addTrigger} />
      )
    }),
    []
  );

  useEffect(() => {
    // createGraphLayout(nodes, edges);
    rfInstance?.fitView({ duration: 400 });
  }, [nodeCount]);

  const addTrigger = (nodeId) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.type = "nodeWithButton";
        }
        return node;
      })
    );
  };

  // const addNode = (type, parentId) => {
  //   const newId = `${uuidv4()}`;
  //   let newNode = {
  //     id: newId,
  //     data: {
  //       label: `${type} node`,
  //       type: `${type}`,
  //       children: { current: newId, previous: parentId, next: [] }
  //     },
  //     position: {
  //       x: 0,
  //       y: 0
  //     },
  //     draggable: false
  //   };
  //   if (type === "ACTION") {
  //     newNode["type"] = "CustomOutputNode";
  //   } else {
  //     newNode["type"] = "CustomConditionNode";
  //   }
  //   let newEdge = {
  //     id: `edge ${parentId}-${newNode.id}`,
  //     source: parentId,
  //     target: newNode.id,
  //     type: "buttonedge",
  //     data: { addNodeBetweenNodes }
  //   };
  //   setNodes((nds) =>
  //     nds
  //       .map((node) => {
  //         if (
  //           node.id === parentId &&
  //           !node.data.children.next.includes(newNode.id)
  //         ) {
  //           node.data.children.next.push(newNode.id);
  //         }
  //         return node;
  //       })
  //       .concat([newNode])
  //   );
  //   // setNodes((nds) => nds);
  //   setEdges((edgs) => edgs.concat([newEdge]));
  //   message.info(`${type} added`);
  // };

  // const addXNodes = (type, parentId, nodesQuantity) => {
  //   while (nodesQuantity > 0) {
  //     console.log(nodesQuantity);
  //     addNode(type, parentId);
  //     nodesQuantity--;
  //   }
  // };

  const deleteNode = (node_id, node_type) => {
    if (node_type === "TRIGGER") {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === node_id) {
            node.type = "DummyTrigger";
            node.position.y = -100;
          }
          return node;
        })
      );
      return;
    }
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.children?.next?.includes(node_id)) {
          let filterednext = node.data.children.next.filter(
            (nxtnodes) => nxtnodes !== node_id
          );
          node.data.children.next = filterednext;
        }
        return node;
      })
    );
    setNodes((nds) => nds.filter((node) => node.id !== node_id));
    setEdges((edg) => edg.filter(({ target }) => target !== node_id));
    message.info(`${node_type} deleted`);
  };

  const editNode = (node_id, newlable) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === node_id) {
          node.data = {
            ...node.data,
            label: newlable
          };
        }
        return node;
      })
    );
  };

  const addNodeBetweenNodes = (sourceId, targetId, edgeId, type) => {
    const newId = `${uuidv4()}`;
    let newNode = {
      id: newId,
      data: {
        label: `${type} node`,
        type: `${type}`,
        children: { current: newId, previous: sourceId, next: [targetId] }
      },
      position: {
        x: 0,
        y: 0
      },
      draggable: false
    };
    if (type === "Action") {
      newNode["type"] = "CustomOutputNode";
    } else {
      newNode["type"] = "CustomConditionNode";
    }
    let newEdge1 = {
      id: `edge ${newNode.id}-${targetId}`,
      source: newNode.id,
      target: targetId,
      type: "buttonedge",
      data: { addNodeBetweenNodes }
    };
    setNodes((nds) =>
      nds
        .map((node) => {
          if (node.id === sourceId) {
            const childNodes = node.data.children.next;
            let filteredChildNodes = childNodes.filter(
              (nxtNode) => nxtNode !== targetId
            );
            filteredChildNodes.push(newId);
            node.data.children.next = filteredChildNodes;
          }
          if (node.id === targetId) {
            node.data.children.previous = newId;
          }
          return node;
        })
        .concat([newNode])
    );
    setEdges((edgs) =>
      edgs
        .map((edge) => {
          if (edge.id === edgeId) {
            edge.target = newNode.id;
          }
          return edge;
        })
        .concat([newEdge1])
    );
  };

  const proOptions = { hideAttribution: true };
  const fitViewOptions = {
    padding: 0.95
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={setRfInstance}
      fitView
      proOptions={proOptions}
      minZoom={0.2}
      fitViewOptions={fitViewOptions}
      nodesDraggable={false}
      nodesConnectable={false}
      zoomOnDoubleClick={false}
    >
      <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
      </div>
      <Background />
      <Controls />
    </ReactFlow>
  );
};
