(function () {
  "use strict";

  const state = {
    incomes: [
      { description: "Diagnostico de seguridad", amount: 850 },
      { description: "Hardening de sistemas", amount: 1450 },
      { description: "Monitoreo SOC mensual", amount: 1200 }
    ],
    expenses: [
      { description: "Licencias de seguridad", amount: 350 },
      { description: "Marketing digital", amount: 420 },
      { description: "Servicios cloud", amount: 280 }
    ]
  };

  const accountCatalog = [
    {
      category: "Activo",
      accounts: ["Caja", "Bancos", "Equipo tecnologico", "Cuentas por cobrar"]
    },
    {
      category: "Pasivo",
      accounts: ["Prestamos", "Cuentas por pagar", "Servicios pendientes"]
    },
    {
      category: "Patrimonio",
      accounts: ["Capital social", "Utilidad retenida", "Utilidad neta"]
    },
    {
      category: "Ingresos",
      accounts: ["Servicios SOC", "Diagnosticos", "Hardening"]
    },
    {
      category: "Gastos",
      accounts: ["Licencias", "Publicidad", "Cloud", "Capacitacion"]
    }
  ];

  const currency = new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "PAB",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2
  });

  function getNumber(id) {
    const element = document.getElementById(id);
    const value = Number(element ? element.value : 0);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }

  function getText(id, fallback) {
    const element = document.getElementById(id);
    const value = element ? element.value.trim() : "";
    return value || fallback;
  }

  function formatMoney(value) {
    return currency.format(value).replace("PAB", "B/.");
  }

  function sumEntries(entries) {
    return entries.reduce((total, entry) => total + Number(entry.amount || 0), 0);
  }

  function addIncome() {
    const description = getText("incomeDescription", "Ingreso por servicio");
    const amount = getNumber("incomeAmount");

    if (amount <= 0) return;

    state.incomes.push({ description, amount });
    document.getElementById("incomeDescription").value = "";
    document.getElementById("incomeAmount").value = "";
    renderTables();
  }

  function addExpense() {
    const description = getText("expenseDescription", "Gasto operativo");
    const amount = getNumber("expenseAmount");

    if (amount <= 0) return;

    state.expenses.push({ description, amount });
    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";
    renderTables();
  }

  function calculateIncomeStatement() {
    const totalIncome = sumEntries(state.incomes);
    const totalExpenses = sumEntries(state.expenses);
    const netProfit = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netProfit
    };
  }

  function calculateBalanceSheet() {
    const initialCapital = getNumber("initialCapital");
    const debts = getNumber("debtAmount");
    const statement = calculateIncomeStatement();
    const cash = initialCapital - statement.totalExpenses + debts;
    const accumulatedIncome = statement.totalIncome;
    const assets = cash + accumulatedIncome;
    const liabilities = debts;
    const equity = initialCapital + statement.netProfit;

    return {
      cash,
      accumulatedIncome,
      assets,
      liabilities,
      initialCapital,
      netProfit: statement.netProfit,
      equity,
      balancedDifference: assets - (liabilities + equity)
    };
  }

  function tableRows(entries) {
    if (!entries.length) {
      return '<tr><td colspan="2" class="text-center text-secondary">Sin registros</td></tr>';
    }

    return entries
      .map(
        (entry) => `
          <tr>
            <td>${entry.description}</td>
            <td class="text-end">${formatMoney(entry.amount)}</td>
          </tr>
        `
      )
      .join("");
  }

  function valueClass(value) {
    if (value > 0) return "positive-value";
    if (value < 0) return "negative-value";
    return "neutral-value";
  }

  function renderTables() {
    const statement = calculateIncomeStatement();
    const balance = calculateBalanceSheet();

    const incomeRows = document.getElementById("incomeRows");
    const expenseRows = document.getElementById("expenseRows");
    const incomeStatementTable = document.getElementById("incomeStatementTable");
    const balanceSheetTable = document.getElementById("balanceSheetTable");
    const accountCatalogEl = document.getElementById("accountCatalog");

    if (incomeRows) incomeRows.innerHTML = tableRows(state.incomes);
    if (expenseRows) expenseRows.innerHTML = tableRows(state.expenses);

    if (incomeStatementTable) {
      incomeStatementTable.innerHTML = `
        <tr>
          <td>Ingresos totales</td>
          <td class="text-end positive-value">${formatMoney(statement.totalIncome)}</td>
        </tr>
        <tr>
          <td>Gastos totales</td>
          <td class="text-end negative-value">${formatMoney(statement.totalExpenses)}</td>
        </tr>
        <tr>
          <td><strong>Utilidad neta</strong></td>
          <td class="text-end ${valueClass(statement.netProfit)}"><strong>${formatMoney(statement.netProfit)}</strong></td>
        </tr>
      `;
    }

    if (balanceSheetTable) {
      balanceSheetTable.innerHTML = `
        <tr>
          <td>Caja</td>
          <td class="text-end">${formatMoney(balance.cash)}</td>
        </tr>
        <tr>
          <td>Ingresos acumulados</td>
          <td class="text-end">${formatMoney(balance.accumulatedIncome)}</td>
        </tr>
        <tr>
          <td><strong>Total activos</strong></td>
          <td class="text-end neutral-value"><strong>${formatMoney(balance.assets)}</strong></td>
        </tr>
        <tr>
          <td>Deudas</td>
          <td class="text-end">${formatMoney(balance.liabilities)}</td>
        </tr>
        <tr>
          <td>Capital inicial + utilidad neta</td>
          <td class="text-end">${formatMoney(balance.equity)}</td>
        </tr>
        <tr>
          <td><strong>Pasivos + patrimonio</strong></td>
          <td class="text-end neutral-value"><strong>${formatMoney(balance.liabilities + balance.equity)}</strong></td>
        </tr>
      `;
    }

    if (accountCatalogEl) {
      accountCatalogEl.innerHTML = accountCatalog
        .map(
          (group) => `
            <article class="catalog-item">
              <strong>${group.category}</strong>
              ${group.accounts.map((account) => `<span>${account}</span>`).join("")}
            </article>
          `
        )
        .join("");
    }

    setText("totalIncome", formatMoney(statement.totalIncome));
    setText("totalExpenses", formatMoney(statement.totalExpenses));
    setText("totalEquity", formatMoney(balance.equity));
    setText("netProfitHero", formatMoney(statement.netProfit));
    setText("incomeCount", `${state.incomes.length} registros`);
    setText("expenseCount", `${state.expenses.length} registros`);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const capitalInput = document.getElementById("initialCapital");
    const debtInput = document.getElementById("debtAmount");

    if (capitalInput) capitalInput.addEventListener("input", renderTables);
    if (debtInput) debtInput.addEventListener("input", renderTables);

    renderTables();
  });

  window.addIncome = addIncome;
  window.addExpense = addExpense;
  window.calculateIncomeStatement = calculateIncomeStatement;
  window.calculateBalanceSheet = calculateBalanceSheet;
  window.renderTables = renderTables;
})();
