# Importa os principais componentes do SQLAlchemy necessários para ORM
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define a URL do banco de dados. Neste caso, é um banco SQLite local chamado 'fintrack.db'
SQLALCHEMY_DATABASE_URL = "sqlite:///./fintrack.db"

# Cria o mecanismo de conexão (engine) com o banco.
# 'check_same_thread=False' permite que múltiplas threads acessem o SQLite — necessário no FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Cria uma fábrica de sessões do SQLAlchemy.
# Estas sessões serão usadas para realizar operações (CRUD) no banco de dados.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe base a ser herdada pelos modelos ORM.
# Ela permite que o SQLAlchemy reconheça as classes como tabelas do banco.
Base = declarative_base()
