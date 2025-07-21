// Get DOM elements
const expenseForm = document.getElementById("expenseForm");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");


// Dark mode toggle
const darkToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  if (darkToggle) darkToggle.checked = true;
}

darkToggle?.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});



// Retrieve from localStorage or use empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function calculateTotals() {
  const amounts = transactions.map(t => t.amount);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  const expense = amounts.filter(a => a < 0).reduce((a, b) => a + b, 0);
  const balance = income + expense;

  incomeDisplay.innerText = income.toFixed(2);
  expenseDisplay.innerText = Math.abs(expense).toFixed(2);
  balanceDisplay.innerText = balance.toFixed(2);
}

function addTransactionToDOM(transaction) {
  const li = document.createElement("li");
  li.classList.add(transaction.amount > 0 ? "income-item" : "expense-item");
  li.setAttribute("data-id", transaction.id);
  li.innerHTML = `
    ${transaction.desc}
    <span>₹${transaction.amount > 0 ? '+' : ''}${transaction.amount}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">❌</button>
  `;
  expenseList.prepend(li);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function init() {
  expenseList.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  calculateTotals();
}

expenseForm.addEventListener("submit", e => {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amount = +amountInput.value.trim();

  if (desc === "" || isNaN(amount)) {
    alert("Please enter valid description and amount.");
    return;
  }

  const transaction = { id: Date.now(), desc, amount };
  transactions.push(transaction);
  updateLocalStorage();
  addTransactionToDOM(transaction);
  calculateTotals();

  descInput.value = "";
  amountInput.value = "";
});

function logout() {
  localStorage.removeItem("transactions"); // Clear stored data (optional)
  alert("Logged out successfully!");
  window.location.href = "login.html"; // Redirect to login page (change if needed)
}

init();
