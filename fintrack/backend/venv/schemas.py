# schemas.py
from pydantic import BaseModel
from datetime import date

class ExpenseBase(BaseModel):
    description: str
    amount: float
    date: date

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int

    class Config:
        orm_mode = True
