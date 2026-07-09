function TrainingPanel({ currentStep, algorithm }) {
  const decisionTreeCalculations = [
    `
Dataset successfully loaded into memory.

Features detected:
• Age
• Salary
• Student

Target column:
• Purchased
    `,

    `
Checking dataset for missing values...

Missing Values Found: 0

Dataset Status:
✓ Clean
✓ Ready for training
    `,

    `
Entropy Calculation

Yes = 6
No = 4

P(Yes) = 0.6
P(No) = 0.4

Entropy(S)
= -(0.6 × log₂(0.6))
  -(0.4 × log₂(0.4))

Entropy = 0.971
    `,

    `
Information Gain Calculation

Age:
IG = 0.35

Salary:
IG = 0.16

Student:
IG = 0.25

Highest Information Gain:
Age = 0.35
    `,

    `
Root Node Selection

Selected Feature:
Age

Reason:
Age produced the highest information gain and reduced uncertainty the most.
    `,

    `
Creating Child Nodes

Split Rule:
Age > 30

Left Branch:
Age <= 30

Right Branch:
Age > 30
    `,

    `
Building Decision Tree...

Age > 30 ?
├── Yes
│   └── Salary > 50000 ?
└── No
    └── Reject
    `,

    `
Training Complete

The model is now ready for predictions.
    `,
  ];

  const kmeansCalculations = [
    `
Dataset Loaded Successfully
    `,

    `
Random Centroid Initialization

C1 = (2,3)
C2 = (8,7)
C3 = (5,1)
    `,

    `
Distance Calculation

Point P1:
Distance to C1 = 1.8
Distance to C2 = 6.2
Distance to C3 = 3.1
    `,

    `
Cluster Assignment

P1 → Cluster 1
P2 → Cluster 2
P3 → Cluster 3
    `,

    `
Centroid Update

Old C1 = (2,3)

New C1 = (2.8,3.6)
    `,

    `
Recalculating Distances Using New Centroids
    `,

    `
Convergence Check

Centroid Movement:
0.02

Threshold:
0.05

Training Stops.
    `,

    `
Final Clusters Generated Successfully
    `,
  ];

  const calculations =
    algorithm === "K-Means Clustering"
      ? kmeansCalculations
      : decisionTreeCalculations;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[350px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">
        Training Calculations
      </h2>

      <pre className="whitespace-pre-wrap text-gray-700">
        {currentStep >= 0
          ? calculations[currentStep]
          : "Start visualization to view calculations."}
      </pre>
    </div>
  );
}

export default TrainingPanel;