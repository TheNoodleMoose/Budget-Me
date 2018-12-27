class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("budget-sidebox-balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseName = document.getElementById("expense-name");
    this.expenseInput = document.getElementById("expense-input");
    this.expenseList = document.getElementById("expenses-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value === "" || value <= 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerText = `Budget Value Cannot Be Empty Or Negative`;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }

  //Show Balance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showPositive", "showBlack");
      this.balance.classList.add("showNegative");
    } else if (total > 0) {
      this.balance.classList.remove("showNegative", "showBlack");
      this.balance.classList.add("showPositive");
    } else if (total === 0) {
      this.balance.classList.remove("showNegative", "showPositive");
      this.balance.classList.add("showBlack");
    }
  }
  // Submit Expense Method
  submitExpenseForm() {
    const expenseNameValue = this.expenseName.value;
    const amountValue = this.expenseInput.value;
    console.log(amountValue);
    console.log(expenseNameValue);
    if (expenseNameValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerText = `Values Cannot Be Empty Or Negative`;
      setTimeout(() => {
        this.expenseFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = parseInt(amountValue);

      this.expenseName.value = "";
      this.expenseInput.value = "";

      let expense = {
        id: this.itemID,
        title: expenseNameValue,
        amount: amount
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  //Add expense method
  addExpense(expense) {
    const div = document.createElement("div");

    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item">
        <h6 class="expense-title">- ${expense.title}</h6>
        <h6 class="expense-amount">$${expense.amount}</h6>
        <div class="expense-icons">
            <a href="#" class="edit-icon" data-id="${expense.id}">
            <img src="https://img.icons8.com/color/48/000000/multi-edit.png">
            </a>
            <a href="#" class="delete-icon" data-id="${expense.id}">
            <img src="https://img.icons8.com/color/48/000000/trash.png">
            </a>
        </div>
    </div>`;
    this.expenseList.appendChild(div);
  }
  //Element Expense Method
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom
    this.expenseList.removeChild(parent);
    //remove from the dom
    let expense = this.itemList.filter(item => {
      return item.id === id;
    });
    //Put values back into inputs
    this.expenseName.value = expense[0].title;
    this.expenseInput.value = expense[0].amount;

    //remove from list
    let tempList = this.itemList.filter(item => {
      return item.id != id;
    });
    this.itemList = tempList;
    this.showBalance();
  }

  deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom
    this.expenseList.removeChild(parent);
    //remove from the dom
    let expense = this.itemList.filter(item => {
      return item.id === id;
    });
    //remove from list
    let tempList = this.itemList.filter(item => {
      return item.id != id;
    });
    this.itemList = tempList;
    this.showBalance();
  }

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        console.log(`Total is ${acc} and current value is ${curr.amount}`);
        acc += curr.amount;
        return acc;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }
}

eventListeners = () => {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expenses-list");

  //New instance of UI Class
  const ui = new UI();

  //Budget Form Submit listener
  budgetForm.addEventListener("submit", event => {
    event.preventDefault();
    ui.submitBudgetForm();
  });
  //Expense Form Submit listener
  expenseForm.addEventListener("submit", event => {
    event.preventDefault();
    ui.submitExpenseForm();
  });
  //Expense list click listener
  expenseList.addEventListener("click", event => {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(event.target.parentElement);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
