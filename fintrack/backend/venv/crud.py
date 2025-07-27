from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas

# Cria todas as tabelas definidas nos modelos, se ainda não existirem
models.Base.metadata.create_all(bind=engine)

# Define um roteador da FastAPI para o grupo de rotas relacionadas a despesas (expenses)
router = APIRouter(
    prefix="/expenses",  # Prefixo da rota (ex: /expenses/)
    tags=["expenses"]    # Categoria para a documentação automática da API
)

# Dependência que cria uma sessão com o banco de dados para cada requisição
def get_db():
    db = SessionLocal()
    try:
        yield db  # A sessão é retornada para uso na rota
    finally:
        db.close()  # Garante que a conexão será fechada após o uso

# Endpoint para criar uma nova despesa
@router.post("/", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    """
    Cria uma nova despesa com base nos dados fornecidos pelo cliente.

    - **expense**: Dados da despesa enviados no corpo da requisição (ex: valor, descrição, data)
    - **db**: Sessão do banco de dados injetada automaticamente
    - **retorna**: A despesa criada, com ID gerado automaticamente
    """
    db_expense = models.Expense(**expense.dict())  # Cria um objeto Expense do SQLAlchemy a partir do schema
    db.add(db_expense)                             # Adiciona o objeto à sessão do banco
    db.commit()                                    # Persiste as alterações no banco de dados
    db.refresh(db_expense)                         # Atualiza o objeto com dados do banco (ex: ID gerado)
    return db_expense

# Endpoint para listar despesas
@router.get("/", response_model=list[schemas.Expense])
def read_expenses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retorna uma lista de despesas com suporte a paginação.

    - **skip**: Quantidade de registros a pular (útil para paginação)
    - **limit**: Quantidade máxima de registros retornados
    - **retorna**: Lista de objetos de despesa
    """
    expenses = db.query(models.Expense).offset(skip).limit(limit).all()
    return expenses

# Endpoint para deletar uma despesa
@router.delete("/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    """
    Deleta uma despesa com base no seu ID.

    - **expense_id**: ID da despesa a ser deletada
    - **retorna**: Mensagem de confirmação ou erro caso o ID não seja encontrado
    """
    expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")
    db.delete(expense)
    db.commit()
    return {"message": "Despesa deletada com sucesso"}

# Endpoint para atualizar uma despesa
@router.put("/{expense_id}", response_model=schemas.Expense)
def update_expense(expense_id: int, expense_update: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    """
    Atualiza os dados de uma despesa existente.

    - **expense_id**: ID da despesa que será atualizada
    - **expense_update**: Novos dados da despesa
    - **retorna**: A despesa atualizada
    """
    expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")
    
    # Atualiza os atributos da despesa com os dados fornecidos
    for key, value in expense_update.dict().items():
        setattr(expense, key, value)
    
    db.commit()           # Salva as alterações
    db.refresh(expense)   # Atualiza o objeto com os dados do banco
    return expense
