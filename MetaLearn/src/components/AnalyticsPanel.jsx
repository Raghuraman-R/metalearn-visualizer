import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AnalyticsPanel({
  trainingResult,
}) {
  if (!trainingResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-5 h-[700px]">
        <h2 className="text-xl font-semibold mb-4">
          Analytics Dashboard
        </h2>

        <p className="text-gray-500">
          Upload a dataset to view analytics.
        </p>
      </div>
    );
  }

  const COLORS = [
    "#60A5FA",
    "#34D399",
    "#FBBF24",
    "#F87171",
    "#A78BFA",
  ];

  /*
  ====================================
  DECISION TREE ANALYTICS
  ====================================
  */

  const classData =
    trainingResult.class_distribution
      ? Object.entries(
          trainingResult.class_distribution
        ).map(([name, value]) => ({
          name,
          value,
        }))
      : [];

  const featureData =
    trainingResult.feature_importance
      ? Object.entries(
          trainingResult.feature_importance
        )
          .map(([name, value]) => ({
            name,
            value,
          }))
          .sort(
            (a, b) =>
              b.value - a.value
          )
          .slice(0, 10)
      : [];

  /*
  ====================================
  KMEANS ANALYTICS
  ====================================
  */

  let clusterData = [];

  if (trainingResult.labels) {
    const counts = {};

    trainingResult.labels.forEach(
      (label) => {
        counts[label] =
          (counts[label] || 0) + 1;
      }
    );

    clusterData = Object.entries(
      counts
    ).map(([cluster, count]) => ({
      name: `Cluster ${cluster}`,
      value: count,
    }));
  }

  const centroidData =
    trainingResult.centroids
      ? trainingResult.centroids.map(
          (
            centroid,
            index
          ) => ({
            name: `C${index}`,
            value:
              centroid[0],
          })
        )
      : [];

  const isKMeans =
    trainingResult.centroids;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[700px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">
        Analytics Dashboard
      </h2>

      {/* ===================== */}
      {/* KMEANS ANALYTICS */}
      {/* ===================== */}

      {isKMeans ? (
        <>
          <h3 className="text-lg font-semibold mb-2">
            Cluster Distribution
          </h3>

          <div className="w-full h-[280px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={clusterData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {clusterData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-4">
            Cluster Centers
          </h3>

          <div className="w-full h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={
                  centroidData
                }
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#3B82F6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <>
          {/* ===================== */}
          {/* DECISION TREE */}
          {/* ===================== */}

          <h3 className="text-lg font-semibold mb-2">
            Class Distribution
          </h3>

          <div className="w-full h-[280px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={classData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {classData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-4">
            Feature Importance
          </h3>

          <div className="w-full h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={
                  featureData
                }
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" />

                <YAxis
                  dataKey="name"
                  type="category"
                  width={140}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#3B82F6"
                  radius={[
                    0,
                    10,
                    10,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyticsPanel;