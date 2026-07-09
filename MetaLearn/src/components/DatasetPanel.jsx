import { useState } from "react";
import Papa from "papaparse";

function DatasetPanel({
  setIsRunning,
  setAlgorithm,
  setTrainingResult,
}) {
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] =
    useState(null);

  const [stats, setStats] = useState(null);

  const [previewData, setPreviewData] =
    useState([]);

  const [selectedAlgorithm,
    setSelectedAlgorithm] =
    useState("Decision Tree");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Store file for later backend upload
    setUploadedFile(file);

    setFileName(file.name);

    /*
    --------------------------------
    LOCAL CSV PROCESSING ONLY
    --------------------------------
    */

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const data = results.data;

        const rows = data.length;

        const columns =
          Object.keys(
            data[0] || {}
          ).length;

        let missingValues = 0;
        let numericalColumns = 0;
        let categoricalColumns = 0;

        const headers =
          Object.keys(
            data[0] || {}
          );

        headers.forEach((header) => {
          const values =
            data.map(
              (row) =>
                row[header]
            );

          values.forEach(
            (value) => {
              if (
                value === "" ||
                value === null ||
                value === undefined
              ) {
                missingValues++;
              }
            }
          );

          const firstValue =
            values.find(
              (v) =>
                v !== "" &&
                v !== null &&
                v !== undefined
            );

          if (
            !isNaN(firstValue)
          ) {
            numericalColumns++;
          } else {
            categoricalColumns++;
          }
        });

        setStats({
          rows,
          columns,
          missingValues,
          numericalColumns,
          categoricalColumns,
        });

        setPreviewData(
          data.slice(0, 5)
        );
      },
    });
  };

  const handleRun = async () => {
    if (!uploadedFile) {
      alert(
        "Please upload a dataset first."
      );
      return;
    }

    setAlgorithm(
      selectedAlgorithm
    );

    const formData =
      new FormData();

    formData.append(
      "file",
      uploadedFile
    );

    try {
      const endpoint =
        selectedAlgorithm ===
        "K-Means Clustering"
          ? "http://127.0.0.1:8000/kmeans"
          : "http://127.0.0.1:8000/train";

      const response =
        await fetch(
          endpoint,
          {
            method: "POST",
            body: formData,
          }
        );

      const backendData =
        await response.json();

      console.log(
        "Backend Response:",
        backendData
      );

      setTrainingResult(
        backendData
      );

      localStorage.setItem(
        "trainingResult",
        JSON.stringify(
          backendData
        )
      );

      setIsRunning(true);

    } catch (error) {
      console.error(
        "Backend Error:",
        error
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[700px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">
        Dataset Panel
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={
          handleFileUpload
        }
        className="hidden"
        id="csvUpload"
      />

      <label
        htmlFor="csvUpload"
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer inline-block"
      >
        Upload CSV
      </label>

      {fileName && (
        <div className="mt-5">
          <h3 className="font-semibold">
            Uploaded File
          </h3>

          <p className="text-gray-600 mt-2">
            {fileName}
          </p>
        </div>
      )}

      {stats && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold text-lg">
            Dataset Statistics
          </h3>

          <p>
            📄 Rows:
            {stats.rows}
          </p>

          <p>
            📊 Columns:
            {stats.columns}
          </p>

          <p>
            ⚠️ Missing Values:
            {stats.missingValues}
          </p>

          <p>
            🔢 Numerical Columns:
            {
              stats.numericalColumns
            }
          </p>

          <p>
            🏷️ Categorical Columns:
            {
              stats.categoricalColumns
            }
          </p>
        </div>
      )}

      {previewData.length >
        0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">
            Dataset Preview
          </h3>

          <div className="overflow-auto max-h-[250px] border rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(
                    previewData[0]
                  ).map(
                    (
                      header
                    ) => (
                      <th
                        key={
                          header
                        }
                        className="border p-2"
                      >
                        {
                          header
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {previewData.map(
                  (
                    row,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                    >
                      {Object.values(
                        row
                      ).map(
                        (
                          value,
                          idx
                        ) => (
                          <td
                            key={
                              idx
                            }
                            className="border p-2"
                          >
                            {
                              value
                            }
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">
          Select Algorithm
        </h3>

        <select
          value={
            selectedAlgorithm
          }
          onChange={(e) =>
            setSelectedAlgorithm(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-2"
        >
          <option>
            Decision Tree
          </option>

          <option>
            K-Means Clustering
          </option>
        </select>

        <button
          onClick={
            handleRun
          }
          className="w-full mt-4 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
        >
          ▶ Run Visualization
        </button>
      </div>
    </div>
  );
}

export default DatasetPanel;