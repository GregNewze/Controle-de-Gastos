from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from crud import router as expense_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ajuste para seu frontend em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expense_router)

@app.get("/")
def root():
    return {"msg": "API Fintrack rodando!"}
