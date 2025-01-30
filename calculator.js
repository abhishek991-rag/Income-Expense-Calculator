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
