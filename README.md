# Income-Expense-Calculator<br>
The Income Expense Calculator is a simple yet effective web application that helps users track their financial transactions. It allows users to add, edit, and delete income and expense entries while <br>providing a real-time overview of their total income,<br> total expenses, and net balance.
<pre>
Features
✅ Add, Edit & Delete Entries – Manage income and expenses using CRUD operations.
✅ Filters – View specific transactions using “All,” “Income,” and “Expense” filters.
✅ Real-time Calculations – Instantly updates total income, total expenses, and net balance.
✅ Local Storage Support – Data is stored in the browser, so it remains even after refreshing the page.
✅ Responsive Design – Works smoothly on both mobile and desktop devices.
</pre>
<pre>
Tech Stack
HTML – For structuring the app
CSS – For styling and responsive UI
JavaScript – For interactivity and functionality
To run this project, simply open the index.html file in any modern browser. 🚀
</pre>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Income Expense Calculator</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container" ; style="width: 500px; height: 400px; margin: auto">
      <h2 style="color:rgb(15, 114, 153);">INCOME & EXPENSE CALCULATOR</h2>
      <div class="summary">
        <p><b style="color: green;">Total Income:</b> <span id="total-income">0</span></p>
        <p><b style="color: red;">Total Expenses:</b> <span id="total-expenses">0</span></p>
        <p><b style="color: blue;">Net Balance:</b><span id="net-balance">0</span></p>
      </div>
      <div class="form">
        <input type="text" id="description" placeholder="Description"/>
        <input type="number" id="amount" placeholder="Amount"/>
        <select id="type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onclick="addEntry()">Add Entry</button>
        <button onclick="resetFields()">Reset</button>
      </div>
      <div class="filters">
        <label
          ><input
            type="radio"
            name="filter"
            value="all"
            checked
            onchange="filterEntries()"
          />
          All</label
        >
        <label
          ><input
            type="radio"
            name="filter"
            value="income"
            onchange="filterEntries()"
          />
          Income</label
        >
        <label
          ><input
            type="radio"
            name="filter"
            value="expense"
            onchange="filterEntries()"
          />
          Expense</label
        >
      </div>
      <ul id="entries-list"></ul>
    </div>
    <script>
      function resetFields() {
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("type").value = "income";
      }
      function addEntry() {
        let description = document.getElementById("description").value.trim();
        let amount = parseFloat(document.getElementById("amount").value.trim());
        let type = document.getElementById("type").value;
        if (!description || isNaN(amount) || amount <= 0) {
          alert("Please enter a valid description and amount.");
          return;
        }
        let entry = { description, amount, type };
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
        displayEntries();
        resetFields();
      }
      function displayEntries() {
        let entriesList = document.getElementById("entries-list");
        entriesList.innerHTML = "";
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.forEach((entry, index) => {
          let listItem = document.createElement("li");
          listItem.innerHTML = `${entry.description} - INR ${entry.amount} (${entry.type}) 
                <button onclick="deleteEntry(${index})">Delete</button>`;
          entriesList.appendChild(listItem);
        });
        updateSummary(entries);
      }
      function deleteEntry(index) {
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.splice(index, 1);
        localStorage.setItem("entries", JSON.stringify(entries));
        displayEntries();
      }
      function updateSummary(entries) {
        let totalIncome = entries
          .filter((e) => e.type === "income")
          .reduce((sum, e) => sum + e.amount, 0);
        let totalExpenses = entries
          .filter((e) => e.type === "expense")
          .reduce((sum, e) => sum + e.amount, 0);
        let netBalance = totalIncome - totalExpenses;
        document.getElementById("total-income").textContent = totalIncome;
        document.getElementById("total-expenses").textContent = totalExpenses;
        document.getElementById("net-balance").textContent = netBalance;
      }
      function filterEntries() {
        let filterValue = document.querySelector(
          'input[name="filter"]:checked'
        ).value;
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        if (filterValue !== "all") {
          entries = entries.filter((entry) => entry.type === filterValue);
        }
        updateSummary(entries);
      }
      document.addEventListener("DOMContentLoaded", displayEntries);
    </script>
  </body>
</html>
