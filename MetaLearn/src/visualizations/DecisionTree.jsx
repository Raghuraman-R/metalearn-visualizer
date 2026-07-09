import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

function DecisionTree({
  currentStep,
  trainingResult,
}) {
  // If backend data not available yet
  if (
    !trainingResult ||
    !trainingResult.tree_structure
  ) {
    return (
      <div className="flex justify-center items-center h-[500px] text-gray-500">
        Upload a dataset to generate a decision tree.
      </div>
    );
  }

  /*
    Temporary Dynamic Tree

    Root Node:
    anxiety_score <= 9.5

    Child Node:
    low_mood_score <= 9.5

    Leaf Nodes:
    Good
    Moderate
    At-risk

    Next phase:
    Automatically parse tree_structure
  */

  const allNodes = [
    {
      id: "1",
      position: { x: 250, y: 0 },
      data: {
        label:
          "anxiety_score <= 9.5 ?",
      },
      style: {
        background: "#2563eb",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },

    {
      id: "2",
      position: { x: 100, y: 120 },
      data: {
        label:
          "low_mood_score <= 9.5 ?",
      },
      style: {
        background: "#10b981",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },

    {
      id: "3",
      position: { x: 400, y: 120 },
      data: {
        label:
          "anxiety_score <= 16.5 ?",
      },
      style: {
        background: "#10b981",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },

    {
      id: "4",
      position: { x: 50, y: 250 },
      data: {
        label: "Good ✅",
      },
      style: {
        background: "#22c55e",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },

    {
      id: "5",
      position: { x: 220, y: 250 },
      data: {
        label: "Moderate ⚠️",
      },
      style: {
        background: "#f59e0b",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },

    {
      id: "6",
      position: { x: 350, y: 250 },
      data: {
        label: "Moderate ⚠️",
      },
      style: {
        background: "#f59e0b",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },

    {
      id: "7",
      position: { x: 520, y: 250 },
      data: {
        label: "At-risk 🔴",
      },
      style: {
        background: "#ef4444",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    },
  ];

  const allEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      label: "Yes",
    },

    {
      id: "e1-3",
      source: "1",
      target: "3",
      label: "No",
    },

    {
      id: "e2-4",
      source: "2",
      target: "4",
      label: "Yes",
    },

    {
      id: "e2-5",
      source: "2",
      target: "5",
      label: "No",
    },

    {
      id: "e3-6",
      source: "3",
      target: "6",
      label: "Yes",
    },

    {
      id: "e3-7",
      source: "3",
      target: "7",
      label: "No",
    },
  ];

  let visibleNodes = [];
  let visibleEdges = [];

  if (currentStep >= 0) {
    visibleNodes.push(allNodes[0]);
  }

  if (currentStep >= 2) {
    visibleNodes.push(
      allNodes[1],
      allNodes[2]
    );

    visibleEdges.push(
      allEdges[0],
      allEdges[1]
    );
  }

  if (currentStep >= 4) {
    visibleNodes.push(
      allNodes[3],
      allNodes[4],
      allNodes[5],
      allNodes[6]
    );

    visibleEdges.push(
      allEdges[2],
      allEdges[3],
      allEdges[4],
      allEdges[5]
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        fitView
      />
    </div>
  );
}

export default DecisionTree;