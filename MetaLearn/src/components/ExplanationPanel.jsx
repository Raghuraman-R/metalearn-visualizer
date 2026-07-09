function ExplanationPanel({
  currentStep,
  trainingResult,
}) {
  const explanations = [
    trainingResult
      ? `Dataset loaded successfully.

Rows: ${trainingResult.rows}
Columns: ${trainingResult.columns}

Target Column:
${trainingResult.target_column}`
      : "Dataset successfully loaded.",

    `The algorithm scans the dataset for missing values.

Missing values can reduce model quality and
must be handled before training begins.`,

    trainingResult
      ? `Entropy = ${trainingResult.entropy}

Class Distribution:

${Object.entries(
  trainingResult.class_distribution || {}
)
  .map(
    ([label, count]) =>
      `${label}: ${count}`
  )
  .join("\n")}

A higher entropy means the classes are mixed
and harder to separate.`
      : "Entropy is calculated.",

    `The algorithm evaluates every feature
to determine which feature reduces uncertainty
the most.

The feature with the highest reduction becomes
the root node.`,

    `Selected Root Node:

anxiety_score_0to27 <= 9.50

This feature provides the best separation
between wellbeing categories.`,

    `The algorithm recursively creates child
nodes using the remaining samples and
remaining features.`,

    `The decision tree continues growing until
all leaves become pure or a stopping condition
is reached.`,

    `Training completed successfully.

The model can now make predictions on unseen
data.`
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[350px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">
        Explanation
      </h2>

      {currentStep >= 0 ? (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3">
            Step {currentStep + 1}
          </h3>

          <p className="text-gray-700 whitespace-pre-line">
            {explanations[currentStep]}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">
          Click "Run Visualization" to begin the training explanation.
        </p>
      )}
    </div>
  );
}

export default ExplanationPanel;