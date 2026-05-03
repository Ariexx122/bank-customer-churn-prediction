from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bank-customer-churn-prediction-tau.vercel.app"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)


class ReviewInput(BaseModel):
    creditscore: int
    geography: str
    gender: str
    age: int
    tenure: float
    balance: float
    numofproducts: int
    hascrcard: int
    isactivemember: int
    estimatedsalary: float


model = joblib.load("rf_churn_model.joblib")


@app.post("/predict/")
def predict(reviewInput: ReviewInput):

    input = pd.DataFrame([reviewInput.model_dump()])

    prediction = model.predict(input)
    probability = model.predict_proba(input)[:, 1]

    return {
        "prediction": int(prediction[0]),
        "probability": round(float(probability[0]), 4)
    }
