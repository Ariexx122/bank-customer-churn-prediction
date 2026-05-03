# 🏦 BankGuard — Customer Churn Prediction

👉 **Live Demo:** https://bank-customer-churn-prediction-tau.vercel.app/

---

## 🚀 Overview

BankGuard is an end-to-end machine learning application designed to predict **customer churn risk** for a bank.

The system analyzes customer data and estimates the probability that a client will leave the bank, enabling proactive retention strategies.

Unlike static notebooks, this project is deployed as a **real interactive product**, combining:

* A trained ML model
* A production-ready API
* A modern frontend interface

---

## 💡 Why This Matters

Customer retention is significantly cheaper than customer acquisition.

This project focuses on:

* Identifying **high-risk customers early**
* Reducing **false negatives** (missed churners)
* Supporting **data-driven retention strategies**

From a business perspective:

> Missing a churner = lost revenue
> Correctly identifying one = opportunity to retain

---

## 🧠 Model Performance

| Metric          | Score                        |
| --------------- | ---------------------------- |
| F1 Score        | **0.609**                    |
| ROC-AUC         | **0.863**                    |
| Accuracy        | ~0.80                        |
| False Negatives | **87 (lowest among models)** |

✔️ Meets project requirement (F1 ≥ 0.59)
✔️ Optimized for **recall of churners**, not just accuracy

---

## ⚙️ Approach

### 1. Data Preparation

* Removed irrelevant columns (`CustomerId`, `Surname`, etc.)
* Handled missing values (median imputation for tenure)
* Standardized column names

---

### 2. Class Imbalance Handling

The dataset is highly imbalanced (~80% non-churners).

To address this, three strategies were tested:

* No sampling (baseline)
* **Oversampling (RandomOverSampler)**
* **Undersampling (RandomUnderSampler)**

---

### 3. Models Tested

* Logistic Regression
* Random Forest Classifier

Each model was evaluated under all sampling strategies using:

* Cross-validation
* Randomized hyperparameter search

---

### 4. Final Model Selection

🏆 **Random Forest (Downsampled)** was selected because:

* Lowest false negatives (critical for business)
* Strong ROC-AUC (0.863)
* Good balance between precision and recall

---

## 🔍 Key Insights

* **Age** is the strongest predictor (~30% importance)
* Customers with **2 products** show higher churn risk
* **Inactive members** churn significantly more
* **Germany** has the highest churn rate

---

## 🧪 Tech Stack

### Backend

* FastAPI
* Scikit-learn
* Pandas / NumPy
* Joblib

### Frontend

* HTML, CSS, JavaScript (no frameworks)
* Custom UI with dynamic risk visualization

### Deployment

* API: Render
* Frontend: Vercel

---

## 🖥️ Features

* Real-time churn prediction
* Probability-based risk scoring
* Interactive UI with visual feedback
* Clean separation between frontend and backend

---

## 📡 API Example

**Endpoint:**
POST /predict/

**Request:**

```json
{
  "creditscore": 673,
  "geography": "France",
  "gender": "Male",
  "age": 59,
  "tenure": 0,
  "balance": 178058.06,
  "numofproducts": 2,
  "hascrcard": 0,
  "isactivemember": 1,
  "estimatedsalary": 21063.71
}
```

**Response:**

```json
{
  "prediction": 1,
  "probability": 0.581
}
```

---

## 🧱 Project Structure

```
├── api/
│   ├── main.py
│   ├── rf_churn_model.joblib
│
├── notebooks/
│   └── bank_churn_prediction.ipynb
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│
└── README.md
```

---

## 🎯 What Makes This Project Different

Most churn projects stop at model training.

This one:

* Deploys the model as an API
* Builds a real user interface
* Focuses on **business impact**, not just metrics

---

## 📌 Future Improvements

* Add feature-level explanations (SHAP)
* Store predictions for analytics
* Add authentication for internal tools
* Improve model calibration

---

## 👤 Author

**Ariel Hern**

Aspiring Data Scientist focused on building real-world, end-to-end ML systems.
