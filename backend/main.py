from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier, export_text
import numpy as np
from collections import Counter

app = FastAPI()

# Store trained model globally
trained_model = None
trained_columns = None

# -------------------------------
# CORS CONFIGURATION
# -------------------------------

origins = [
    "http://localhost:5173",
    "https://metalearn-visualizer.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def calculate_entropy(labels):
    counts = Counter(labels)

    total = len(labels)

    entropy = 0

    for count in counts.values():
        probability = count / total
        entropy -= probability * np.log2(probability)

    return round(entropy, 4)



# DECISION TREE ENDPOINT


@app.post("/train")
async def train_model(file: UploadFile = File(...)):
    global trained_model
    global trained_columns

    # Read CSV
    df = pd.read_csv(file.file)

    # Render free tier optimization
    if len(df) > 5000:
        df = df.sample(
            n=5000,
            random_state=42
        )

    # Remove completely empty rows
    df = df.dropna(how="all")

    # Last column becomes target
    target_column = df.columns[-1]

    # Features and labels
    X = df.iloc[:, :-1]
    y = df[target_column]

    # Replace missing target values
    y = y.fillna("Unknown")

    # Calculate entropy
    entropy = calculate_entropy(y)

    # Class distribution
    class_distribution = y.value_counts().to_dict()

    # Encode categorical features
    X_encoded = pd.get_dummies(X)

    # Handle missing values
    X_encoded = X_encoded.fillna(0)

    # Convert to numeric
    X_encoded = X_encoded.astype(float)

    # Render optimization for large one-hot encoded datasets
    if X_encoded.shape[1] > 100:
        X_encoded = X_encoded.iloc[:, :100]

    # Train Decision Tree
    model = DecisionTreeClassifier(
        max_depth=5,
        random_state=42
    )

    model.fit(X_encoded, y)

    # Save model
    trained_model = model
    trained_columns = X_encoded.columns

    # Feature importance
    feature_importance = {
        feature: round(score, 4)
        for feature, score in zip(
            X_encoded.columns,
            model.feature_importances_
        )
        if score > 0
    }

    # Tree structure
    tree_structure = export_text(
        model,
        feature_names=list(X_encoded.columns)
    )

    return {
        "rows": len(df),
        "columns": len(df.columns),
        "target_column": target_column,
        "features": list(X.columns),
        "entropy": entropy,
        "class_distribution": class_distribution,
        "feature_importance": feature_importance,
        "tree_structure": tree_structure
    }



# KMEANS ENDPOINT


@app.post("/kmeans")
async def train_kmeans(file: UploadFile = File(...)):
    # Read dataset
    df = pd.read_csv(file.file)

    # Select numerical columns only
    numerical_df = df.select_dtypes(
        include=["int64", "float64"]
    )

    # Fill missing values
    numerical_df = numerical_df.fillna(
        numerical_df.mean()
    )

    # Standardize data
    scaler = StandardScaler()

    scaled_data = scaler.fit_transform(
        numerical_df
    )

    # Train KMeans
    kmeans = KMeans(
        n_clusters=3,
        random_state=42,
        n_init=10
    )

    labels = kmeans.fit_predict(
        scaled_data
    )

    return {
    "rows": len(df),
    "columns": len(df.columns),

    "numerical_features":
        list(numerical_df.columns),

    "clusters": 3,

    "iterations":
        int(kmeans.n_iter_),

    "inertia":
        float(kmeans.inertia_),

    "centroids":
        kmeans.cluster_centers_.tolist(),

    "labels":
        labels.tolist(),

    "points":
        scaled_data.tolist()
}