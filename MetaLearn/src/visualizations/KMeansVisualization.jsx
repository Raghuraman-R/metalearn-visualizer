import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

function KMeansVisualization({
  trainingResult,
}) {

  console.log(trainingResult);

  if (
    !trainingResult ||
    !trainingResult.centroids
  ) {
    return (
      <div className="flex justify-center items-center h-[500px] text-gray-500">
        Upload a dataset and run K-Means to see the clusters.
      </div>
    );
  }

  const centroidColors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#a855f7",
  ];

  /*
  -------------------------
  DATA POINTS
  -------------------------
  */

  const pointNodes =
    trainingResult.points
      .slice(0, 200)
      .map((point, index) => ({
        id: `point-${index}`,

        position: {
          x: point[0] * 120 + 400,
          y: point[1] * 120 + 300,
        },

        data: {
          label: "",
        },

        style: {
          width: 15,
          height: 15,
          borderRadius: "50%",

          background:
            centroidColors[
              trainingResult.labels[index]
            ],

          border:
            "1px solid white",
        },
      }));

  /*
  -------------------------
  CENTROIDS
  -------------------------
  */

  const centroidNodes =
    trainingResult.centroids.map(
      (
        centroid,
        index
      ) => ({
        id: `centroid-${index}`,

        position: {
          x: centroid[0] * 120 + 400,
          y: centroid[1] * 120 + 300,
        },

        data: {
          label: `Cluster ${
            index + 1
          }

Centroid:
${centroid
  .slice(0, 3)
  .map(
    (value) =>
      value.toFixed(2)
  )
  .join(", ")}`,
        },

        style: {
          background:
            centroidColors[
              index %
              centroidColors.length
            ],

          color: "white",

          width: 180,

          padding: 15,

          borderRadius: 20,

          textAlign: "center",

          fontWeight: "bold",

          whiteSpace: "pre-line",

          border:
            "3px solid white",
        },
      })
    );

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
      }}
    >
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-bold text-blue-700">
          K-Means Training Statistics
        </h2>

        <p>
          Clusters:
          <span className="font-bold ml-2">
            {
              trainingResult.clusters
            }
          </span>
        </p>

        <p>
          Iterations:
          <span className="font-bold ml-2">
            {
              trainingResult.iterations
            }
          </span>
        </p>

        <p>
          Inertia:
          <span className="font-bold ml-2">
            {
              trainingResult.inertia.toFixed(
                2
              )
            }
          </span>
        </p>
      </div>

      <ReactFlow
        nodes={[
          ...pointNodes,
          ...centroidNodes,
        ]}
        edges={[]}
        fitView
      />
    </div>
  );
}

export default KMeansVisualization;