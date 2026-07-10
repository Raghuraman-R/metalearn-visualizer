import { useState } from "react";

import Header from "./components/Header";
import DatasetPanel from "./components/DatasetPanel";
import VisualizationPanel from "./components/VisualizationPanel";
import AnalyticsPanel from "./components/AnalyticsPanel";
import Timeline from "./components/Timeline";
import ExplanationPanel from "./components/ExplanationPanel";
import TrainingPanel from "./components/TrainingPanel";

function App() {
  const [isRunning, setIsRunning] = useState(false);

  const [currentStep, setCurrentStep] = useState(-1);

  const [isPaused, setIsPaused] = useState(false);

  const [algorithm, setAlgorithm] =
    useState("Decision Tree");

  const [trainingResult, setTrainingResult] =
    useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">

        {/* Dataset Panel */}
        <div className="col-span-1 lg:col-span-3">
          <DatasetPanel
            setIsRunning={setIsRunning}
            setAlgorithm={setAlgorithm}
            setTrainingResult={setTrainingResult}
          />
        </div>

        {/* Visualization Panel */}
        <div className="col-span-1 lg:col-span-6">
          <VisualizationPanel
            isRunning={isRunning}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            algorithm={algorithm}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            trainingResult={trainingResult}
          />
        </div>

        {/* Analytics Panel */}
        <div className="col-span-1 lg:col-span-3">
          <AnalyticsPanel
            trainingResult={trainingResult}
          />
        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">

        {/* Timeline */}
        <div className="col-span-1 lg:col-span-8">
          <Timeline
            currentStep={currentStep}
          />
        </div>

        {/* Explanation Panel */}
        <div className="col-span-1 lg:col-span-2">
          <ExplanationPanel
            currentStep={currentStep}
            trainingResult={trainingResult}
          />
        </div>

        {/* Training Calculations */}
        <div className="col-span-1 lg:col-span-2">
          <TrainingPanel
            currentStep={currentStep}
            algorithm={algorithm}
          />
        </div>

      </div>
    </div>
  );
}

export default App;