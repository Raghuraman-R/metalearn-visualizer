import { useEffect } from "react";
import DecisionTree from "../visualizations/DecisionTree";
import KMeansVisualization from "../visualizations/KMeansVisualization";

function VisualizationPanel({
  isRunning,
  currentStep,
  setCurrentStep,
  algorithm,
  isPaused,
  setIsPaused,
  trainingResult,
}) {
  const decisionTreeSteps = [
    "Dataset Loaded",
    "Checking Missing Values",
    "Calculating Entropy",
    "Calculating Information Gain",
    "Selecting Root Node",
    "Creating Child Nodes",
    "Building Decision Tree",
    "Prediction Ready",
  ];

  const kmeansSteps = [
    "Dataset Loaded",
    "Initializing Random Centroids",
    "Calculating Distances",
    "Assigning Points to Clusters",
    "Updating Centroids",
    "Recalculating Distances",
    "Checking Convergence",
    "Final Clusters Generated",
  ];

  const steps =
    algorithm === "K-Means Clustering"
      ? kmeansSteps
      : decisionTreeSteps;

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }

        clearInterval(interval);
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [
    isRunning,
    isPaused,
    algorithm,
    setCurrentStep,
    steps.length,
  ]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[700px] overflow-auto">

      <h2 className="text-2xl font-semibold mb-4">
        {algorithm === "K-Means Clustering"
          ? "K-Means Clustering Visualization"
          : "Decision Tree Visualization"}

        {trainingResult && (
          <div className="text-sm text-gray-600 mt-2">
            Target Column:
            <span className="font-bold ml-2">
              {trainingResult.target_column}
            </span>
          </div>
        )}
      </h2>

      {trainingResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <h3 className="font-bold text-blue-700">
            Dataset Entropy
          </h3>

          <p className="text-gray-700">
            Entropy:
            <span className="font-bold ml-2">
              {trainingResult.entropy}
            </span>
          </p>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() =>
            setCurrentStep((prev) =>
              Math.max(prev - 1, 0)
            )
          }
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          ⬅ Previous
        </button>

        <button
          onClick={() =>
            setIsPaused(!isPaused)
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          {isPaused ? "▶ Resume" : "⏸ Pause"}
        </button>

        <button
          onClick={() =>
            setCurrentStep((prev) =>
              Math.min(
                prev + 1,
                steps.length - 1
              )
            )
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Next ➡
        </button>
      </div>

      {/* Step Counter */}
      <div className="mb-5 text-lg font-semibold text-blue-600">
        Step {Math.max(currentStep + 1, 0)} of {steps.length}
      </div>

      {/* Training Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 border rounded-lg shadow-sm transition-all duration-500 ${
              index <= currentStep
                ? "bg-green-100 border-green-500"
                : "bg-white border-gray-300"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold ${
                index <= currentStep
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {index + 1}
            </div>

            <div>
              <h3 className="font-bold">
                Step {index + 1}
              </h3>

              <p className="text-gray-600">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Visualization */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          {algorithm === "K-Means Clustering"
            ? "K-Means Cluster Structure"
            : "Decision Tree Structure"}
        </h2>

        {algorithm === "Decision Tree" ? (
          <DecisionTree
            currentStep={currentStep}
            trainingResult={trainingResult}
          />
        ) : (
          <KMeansVisualization
  currentStep={currentStep}
  trainingResult={trainingResult}
/>
        )}
      </div>

    </div>
  );
}

export default VisualizationPanel;