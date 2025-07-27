# 💸 Controle de Gastos / Expense Tracker

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
</div>

---

## Português (PT-BR)

Aplicação pessoal de controle financeiro construída com React.js no frontend e FastAPI no backend, usando SQLite para armazenamento local.

### 🚀 Funcionalidades

- Dashboard com resumo de receitas, despesas e saldo  
- Adição e edição de transações  
- Filtro por tipo de transação (receita, despesa, todas)  
- Visualização de transações em tabela  
- Gráfico de distribuição financeira  
- Interface responsiva e limpa  
- Autenticação e funcionalidades extras em desenvolvimento  

### 🛠️ Setup

1. Crie e ative o ambiente virtual para o backend:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```
###  2.Instale as dependências do backend:
```bash
pip install -r requirements.txt
```
###  3.Execute a API FastAPI em modo desenvolvimento:
```bash
uvicorn main:app --reload
```
### 4.No diretório frontend, instale as dependências e rode o React:
```bash
npm install
npm start
```
### 5. Abra no navegador
(Algo como:  http://localhost:3000)

### 📂 Banco de Dados
Utiliza SQLite local (arquivo fintrack.db).

O arquivo é criado automaticamente ao rodar a aplicação

### 👨‍💻 Autor
Érico Nunes — github.com/GregNewze

