// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)

// Step 2: render() - rebuild the table rows from the array

// Step 3: delete (one listener on #rows - event delegation, by data-id)

// Step 4: total of the expenses that are shown

// Step 5: filter by category

// Step 6: sort by amount (toSorted - the original array keeps its order)

// Step 7: rows with an amount above 100 get the class "big"




// Exercise 3 - Expense Tracker

const expense_form = document.getElementById("expense-form");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const form_error = document.getElementById("form-error");
const rows = document.getElementById("rows");
const no_rows = document.getElementById("no-rows");
const total = document.getElementById("total");
const filter_select = document.getElementById("filter");
const sort_btn = document.getElementById("sort-btn");

let expenses = [];
let nextId = 1;
let sortOn = false;


// Step 1: Add expense
expense_form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (desc.value.trim() == "") {
        form_error.textContent = "Please add a description";
        form_error.hidden = false;
        return;
    }

    if (amount.value == "" || Number(amount.value) <= 0) {
        form_error.textContent = "The amount must be larger than 0";
        form_error.hidden = false;
        return;
    }

    form_error.hidden = true;
    form_error.textContent = "";

    const newExpense = {
        id: nextId,
        desc: desc.value.trim(),
        amount: Number(amount.value),
        category: category.value
    };

    expenses.push(newExpense);
    nextId++;

    desc.value = "";
    amount.value = "";
    desc.focus();

    render();
});


// Step 2 + Step 4 + Step 5 + Step 6 + Step 7
function render() {

    rows.innerHTML = "";

    let showExpenses = expenses.filter((expense) => {
        return filter_select.value == "all" ||
               expense.category == filter_select.value;
    });

    if (sortOn == true) {
        showExpenses = showExpenses.toSorted((a, b) => {
            return b.amount - a.amount;
        });
    }

    let sum = 0;

    for (let i = 0; i < showExpenses.length; i++) {

        const expense = showExpenses[i];

        const tr = document.createElement("tr");

        if (expense.amount > 100) {
            tr.classList.add("big");
        }

        const td_desc = document.createElement("td");
        td_desc.textContent = expense.desc;

        const td_category = document.createElement("td");
        const span = document.createElement("span");
        span.classList.add("badge");
        span.textContent = expense.category;
        td_category.appendChild(span);

        const td_amount = document.createElement("td");
        td_amount.textContent = expense.amount.toFixed(2);

        const td_delete = document.createElement("td");
        const delete_bt = document.createElement("button");
        delete_bt.classList.add("delete");
        delete_bt.textContent = "x";
        delete_bt.dataset.id = expense.id;
        td_delete.appendChild(delete_bt);

        tr.appendChild(td_desc);
        tr.appendChild(td_category);
        tr.appendChild(td_amount);
        tr.appendChild(td_delete);

        rows.appendChild(tr);

        sum += expense.amount;
    }

    total.textContent = sum.toFixed(2);

    if (showExpenses.length == 0) {
        no_rows.hidden = false;
    }
    else {
        no_rows.hidden = true;
    }
}


// Step 3: Delete expense
rows.addEventListener("click", (event) => {

    if (!event.target.classList.contains("delete")) {
        return;
    }

    const id = Number(event.target.dataset.id);

    expenses = expenses.filter((expense) => {
        return expense.id != id;
    });

    render();
});


// Step 5: Filter by category
filter_select.addEventListener("change", () => {
    render();
});


// Step 6: Sort by amount
sort_btn.addEventListener("click", () => {

    sortOn = !sortOn;

    if (sortOn == true) {
        sort_btn.textContent = "Sort by amount: on";
    }
    else {
        sort_btn.textContent = "Sort by amount: off";
    }

    render();
});


// Initial state
render();
