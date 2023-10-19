import React from "react";
import { getBezierPath, EdgeLabelRenderer } from "reactflow";
import { TypeSelectionModal } from "./TypeSelectionmodal";
import { Tooltip } from "antd";
const foreignObjectSize = 42;

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  source,
  target,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const AddOperations = (type) => {
    data.addNodeBetweenNodes(source, target, id, type);
  };
  const getPosition = (labelX, labelY) => {
    let transform = `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`;
    let x = labelX - foreignObjectSize / 2;
    let y = labelY - foreignObjectSize / 2;
    if (data?.text === "YES") {
      transform = `translate(-50%, -60%) translate(${labelX + 45}px,${
        labelY - 10
      }px)`;
      x = labelX - 1.75 * foreignObjectSize;
      y = labelY - foreignObjectSize / 8;
    } else if (data?.text === "NO") {
      transform = `translate(-50%, -60%) translate(${labelX - 45}px,${
        labelY - 10
      }px)`;
      x = labelX + foreignObjectSize / 1.3;
      y = labelY - foreignObjectSize / 8;
    }
    return { transform, x, y };
  };
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.text && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: getPosition(labelX, labelY).transform,
              background: "#eee",
              padding: "2px 8px",
              borderRadius: 5,
              fontSize: 16,
              fontWeight: 600,
              color: style.stroke
            }}
            className="nodrag nopan"
          >
            {data?.text}
          </div>
        </EdgeLabelRenderer>
      )}
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={getPosition(labelX, labelY).x}
        y={getPosition(labelX, labelY).y}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <TypeSelectionModal
            title="Select Node Type"
            getNodeType={AddOperations}
          />
        </div>
      </foreignObject>
    </>
  );
};
