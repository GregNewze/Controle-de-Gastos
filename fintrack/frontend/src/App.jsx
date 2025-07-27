import React, { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
// Componente de Ícones Profissionais
const FinanceIcon = ({ icon, color = "currentColor", size = 20 }) => {
  const icons = {
    income: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 19V5m0 0l4 4m-4-4l-4 4"/>
      </svg>
    ),
    expense: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 5v14m0 0l4-4m-4 4l-4-4"/>
      </svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    delete: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
      </svg>
    ),
    food: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <path d="M6 1v3M10 1v3M14 1v3"/>
      </svg>
    ),
    transport: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 3h7a2 2 0 012 2v14a2 2 0 01-2 2h-7m0-18H5a2 2 0 00-2 2v14a2 2 0 002 2h7m0-18v18"/>
      </svg>
    ),
    housing: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
    leisure: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M7 7h10"/>
      </svg>
    ),
    health: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>
      </svg>
    ),
    other: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
    ),
    balance: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2v20M8 10H4a2 2 0 00-2 2v6a2 2 0 002 2h4m8-10h4a2 2 0 012 2v6a2 2 0 01-2 2h-4"/>
      </svg>
    )
  };

  return icons[icon] || icons.other;
};

// Componente de Linha da Tabela
const TransactionRow = ({ transaction, onEdit, onRemove }) => {
  const categoryIcons = {
    alimentacao: "food",
    transporte: "transport",
    moradia: "housing",
    lazer: "leisure",
    saude: "health",
    outros: "other"
  };

  return (
    <div className="transaction-row">
      <div className="transaction-cell type-cell">
        <FinanceIcon 
          icon={transaction.type === "income" ? "income" : "expense"} 
          color={transaction.type === "income" ? "#10B981" : "#EF4444"}
        />
      </div>
      
      <div className="transaction-cell category-cell">
        <FinanceIcon icon={categoryIcons[transaction.category]} />
      </div>
      
      <div className="transaction-cell description-cell">
        {transaction.name}
      </div>
      
      <div className={`transaction-cell amount-cell ${transaction.type}`}>
        R$ {transaction.amount.toFixed(2)}
      </div>
      
      <div className="transaction-cell date-cell">
        {new Date(transaction.date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}
      </div>
      
      <div className="transaction-cell actions-cell">
        <button onClick={() => onEdit(transaction.id)} className="icon-btn" aria-label="Editar">
          <FinanceIcon icon="edit" />
        </button>
        <button onClick={() => onRemove(transaction.id)} className="icon-btn" aria-label="Excluir">
          <FinanceIcon icon="delete" />
        </button>
      </div>
    </div>
  );
};

// Componente de Gráfico em Coroa
const DonutChart = ({ income, expense }) => {
  const total = income + expense;
  const incomePercentage = total > 0 ? (income / total) * 100 : 50;
  const expensePercentage = total > 0 ? (expense / total) * 100 : 50;

  return (
    <div className="donut-chart-container">
      <div className="donut-chart">
        <svg viewBox="0 0 36 36" className="donut">
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            stroke="#10B981"
            strokeWidth="3"
            strokeDasharray={`${incomePercentage} ${100 - incomePercentage}`}
            strokeDashoffset="25"
          />
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            stroke="#EF4444"
            strokeWidth="3"
            strokeDasharray={`${expensePercentage} ${100 - expensePercentage}`}
            strokeDashoffset={25 - incomePercentage}
          />
        </svg>
        <div className="donut-center">
          <span className="donut-total">Total</span>
          <span className="donut-value">R$ {(income + expense).toFixed(2)}</span>
        </div>
      </div>
      <div className="donut-legend">
        <div className="legend-item">
          <span className="legend-color income"></span>
          <span className="legend-label">Receitas</span>
          <span className="legend-value">R$ {income.toFixed(2)}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color expense"></span>
          <span className="legend-label">Despesas</span>
          <span className="legend-value">R$ {expense.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// Componente Principal
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [input, setInput] = useState({ 
    name: "", 
    amount: "", 
    type: "expense",
    date: new Date().toISOString().split('T')[0],
    category: "outros"
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const categories = [
    { id: "alimentacao", name: "Alimentação" },
    { id: "transporte", name: "Transporte" },
    { id: "moradia", name: "Moradia" },
    { id: "lazer", name: "Lazer" },
    { id: "saude", name: "Saúde" },
    { id: "outros", name: "Outros" }
  ];

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("finora-transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("finora-transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const addTransaction = () => {
    if (!input.name.trim()) {
      setError("Por favor, insira uma descrição.");
      return;
    }
    
    if (!input.amount || isNaN(input.amount) || parseFloat(input.amount) <= 0) {
      setError("Por favor, insira um valor válido maior que zero.");
      return;
    }

    const newTransaction = {
      ...input,
      id: Date.now(),
      name: input.name.trim(),
      amount: parseFloat(input.amount),
      date: input.date
    };

    if (editId !== null) {
      setTransactions(transactions.map(t => t.id === editId ? newTransaction : t));
      setEditId(null);
    } else {
      setTransactions([newTransaction, ...transactions]);
    }

    setInput({ 
      name: "", 
      amount: "", 
      type: "expense",
      date: new Date().toISOString().split('T')[0],
      category: "outros"
    });
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (id) => {
    const toEdit = transactions.find(t => t.id === id);
    setInput(toEdit);
    setEditId(id);
  };

  // Cálculos financeiros
  const incomeData = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = incomeData - expenseData;

  // Filtrar transações
  const filteredTransactions = transactions
    .filter(t => filter === "all" ? true : t.type === filter);

  return (
  <div className="app-container">
    <header className="app-header">
      <div className="header-content">
        <img 
          src={Logo} 
          alt="Logo" 
          style={{
            height: '150px', // Altura reduzida para melhor proporção
            width: 'auto',  // Mantém a proporção original
            maxWidth: '100%' // Garante que não ultrapasse o container
          }}
        />
      </div>
    </header>

      <div className="dashboard">
        {/* Cards de Resumo */}
        <div className="summary-cards">
          <div className={`summary-card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
            <div className="card-icon">
              <FinanceIcon icon="balance" size={24} color={balance >= 0 ? "#10B981" : "#EF4444"} />
            </div>
            <div className="card-content">
              <h3>Saldo Atual</h3>
              <p>R$ {balance.toFixed(2)}</p>
            </div>
          </div>
          <div className="summary-card income">
            <div className="card-icon">
              <FinanceIcon icon="income" size={24} color="#10B981" />
            </div>
            <div className="card-content">
              <h3>Receitas</h3>
              <p>R$ {incomeData.toFixed(2)}</p>
            </div>
          </div>
          <div className="summary-card expense">
            <div className="card-icon">
              <FinanceIcon icon="expense" size={24} color="#EF4444" />
            </div>
            <div className="card-content">
              <h3>Despesas</h3>
              <p>R$ {expenseData.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="main-content">
          {/* Seção de Gráficos */}
          <div className="charts-section">
            <div className="chart-card">
              <h3>Distribuição Financeira</h3>
              <DonutChart income={incomeData} expense={expenseData} />
            </div>
          </div>

          {/* Seção de Transações */}
          <div className="transactions-section">
            <div className="section-header">
              <h2>Transações</h2>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filter === "all" ? 'active' : ''}`}
                  onClick={() => setFilter("all")}
                >
                  Todas
                </button>
                <button 
                  className={`filter-btn ${filter === "income" ? 'active' : ''}`}
                  onClick={() => setFilter("income")}
                >
                  Receitas
                </button>
                <button 
                  className={`filter-btn ${filter === "expense" ? 'active' : ''}`}
                  onClick={() => setFilter("expense")}
                >
                  Despesas
                </button>
              </div>
            </div>

            {/* Formulário */}
            <div className="transaction-form">
              <div className="form-group">
                <label htmlFor="name">Descrição</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Ex: Salário, Aluguel..."
                  value={input.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Valor (R$)</label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="0,00"
                  value={input.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Tipo</label>
                <select 
                  id="type"
                  name="type" 
                  value={input.type} 
                  onChange={handleChange}
                >
                  <option value="expense">Despesa</option>
                  <option value="income">Receita</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select 
                  id="category"
                  name="category" 
                  value={input.category} 
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Data</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={input.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="primary-button" onClick={addTransaction}>
                {editId !== null ? "Salvar Edição" : "Adicionar Transação"}
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>

            {/* Tabela de Transações */}
            <div className="transactions-table">
              <div className="table-header">
                <div className="header-cell type-cell">Tipo</div>
                <div className="header-cell category-cell">Categoria</div>
                <div className="header-cell description-cell">Descrição</div>
                <div className="header-cell amount-cell">Valor</div>
                <div className="header-cell date-cell">Data</div>
                <div className="header-cell actions-cell">Ações</div>
              </div>
              
              <div className="table-body">
                {filteredTransactions.length === 0 ? (
                  <div className="empty-message">
                    <span>Nenhuma transação encontrada</span>
                  </div>
                ) : (
                  filteredTransactions.map(transaction => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                      onEdit={editTransaction}
                      onRemove={removeTransaction}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;