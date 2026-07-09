function Timeline({ currentStep }) {
  const steps = [
    "Dataset Loaded",
    "Checking Missing Values",
    "Calculating Entropy",
    "Calculating Information Gain",
    "Selecting Root Node",
    "Creating Child Nodes",
    "Building Decision Tree",
    "Prediction Ready",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[300px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">
        Execution Timeline
      </h2>

      <div className="space-y-3">
        {steps.slice(0, currentStep + 1).map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-green-50 border border-green-300 rounded-lg"
          >
            <div className="w-3 h-3 rounded-full bg-green-500"></div>

            <div>
              <p className="font-semibold">
                {new Date().toLocaleTimeString()}
              </p>

              <p className="text-gray-600">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;