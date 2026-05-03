const API_URL =
  "https://bank-customer-churn-prediction-f82d.onrender.com/predict/";

document.getElementById("churn-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // UI State Management
  toggleState("loading");

  const formData = new FormData(e.target);
  const payload = {
    creditscore: parseInt(formData.get("creditscore")),
    geography: formData.get("geography"),
    gender: formData.get("gender"),
    age: parseInt(formData.get("age")),
    tenure: parseInt(formData.get("tenure")),
    balance: parseFloat(formData.get("balance")),
    numofproducts: parseInt(formData.get("numofproducts")),
    hascrcard: parseInt(formData.get("hascrcard")),
    isactivemember: parseInt(formData.get("isactivemember")),
    estimatedsalary: parseFloat(formData.get("estimatedsalary")),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    updateUI(result);
  } catch (error) {
    console.error("Analysis Failed", error);
    toggleState("idle");
    alert("Error connecting to the risk engine.");
  }
});

function toggleState(state) {
  document.getElementById("idle-state").classList.add("hidden");
  document.getElementById("loading-state").classList.add("hidden");
  document.getElementById("result-state").classList.add("hidden");
  document.getElementById(`${state}-state`).classList.remove("hidden");
}

function updateUI(data) {
  toggleState("result");
  const prob = (data.probability * 100).toFixed(1);
  const isChurn = data.prediction === 1;

  const textEl = document.getElementById("prediction-text");
  const fillEl = document.getElementById("probability-fill");

  textEl.textContent = isChurn ? "High Churn Risk" : "Likely to Stay";
  textEl.style.color = isChurn ? "#e74c3c" : "#2ecc71";

  fillEl.style.width = `${prob}%`;
  fillEl.style.backgroundColor = isChurn ? "#e74c3c" : "#2ecc71";
  document.getElementById("probability-value").textContent =
    `${prob}% Probability`;
}
