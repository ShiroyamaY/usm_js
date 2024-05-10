/**
 * Represents the table element in the document.
 * @type {HTMLTableElement}
 */
const table = document.querySelector("table");

/**
 * Represents the tbody element within the table.
 * @type {HTMLTableSectionElement}
 */
const tableBody = document.querySelector("table tbody");

/**
 * Represents the element displaying the total amount.
 * @type {HTMLElement}
 */
const totalAmountElement = document.querySelector(".total-amount");

/**
 * Represents the element displaying transaction description.
 * @type {HTMLElement}
 */
const transactionDescription = document.querySelector(".transaction-description");

/**
 * Represents the form element.
 * @type {HTMLFormElement}
 */
const form = document.querySelector("form");

/**
 * Represents the input element for transaction ID.
 * @type {HTMLInputElement}
 */
const id = document.getElementById("id");

/**
 * Represents the input element for transaction date.
 * @type {HTMLInputElement}
 */
const date = document.getElementById("date");

/**
 * Represents the input element for transaction category.
 * @type {HTMLInputElement}
 */
const category = document.getElementById("category");

/**
 * Represents the input element for transaction description.
 * @type {HTMLInputElement}
 */
const description = document.getElementById("description");

/**
 * Array to store transactions.
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Adds a transaction to the transactions array.
 * @param {Event} event - The submit event.
 */
function addTransaction(event) {
  event.preventDefault();
  const transaction = {
    id: id.value,
    date: new Date(date.value).toUTCString(),
    category: category.value,
    amount: amount.value,
    description: description.value,
  };
  transactions.push(transaction);
  addRowToTransactions(transaction);
}

/**
 * Adds a row to the transactions table.
 * @param {Object} transaction - The transaction object.
 */
function addRowToTransactions(transaction) {
  let color = transaction.amount >= 0 ? "green" : "red";
  tableBody.innerHTML += `<tr color="${color}">
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${getNWords(4,transaction.description) + "..."}</td>
        <td>
            <button type="button" value="${transaction.id}">Delete Row</button>
        </td>
    </tr>`;
    updateTotalAmount();
}

/**
 * Returns the first N words of a string.
 * @param {number} n - The number of words.
 * @param {string} str - The input string.
 * @returns {string} The first N words of the string.
 */
function getNWords(n,str){
    return str.trim().split(" ").slice(0,n).join(" ");
}

/**
 * Handles click events on the table.
 * @param {Event} event - The click event.
 */
function handleClickOnTable(event) {
    if(event.target.tagName !== "BUTTON"){
        if(event.target.tagName !== "TD"){
            return;
        }
        transactionId = event.target.parentNode.firstElementChild.innerText;
        showTransactionDescription(transactionId);
    }

    let button = event.target;

    transactions = transactions.filter((transaction) => button.value !== transaction.id);
    deleteElementFromTable(button.value);
    updateTotalAmount();
}

/**
 * Displays transaction description.
 * @param {string} transactionId - The ID of the transaction.
 */
function showTransactionDescription(transactionId){
    let transaction = transactions.find((transaction) => {
        return Number(transaction.id) === Number(transactionId)
    });
    console.log(transaction);
    transactionDescription.innerHTML = 
    `<span>Selected Transaction description:</span>
    ${transaction.description}`;
}

/**
 * Deletes a row from the table.
 * @param {string} id - The ID of the transaction to delete.
 */
function deleteElementFromTable(id){
    for(let child of tableBody.children){
        if(child.firstElementChild.innerText === id){
            child.remove();
            break;
        }
    }
}

/**
 * Updates the total amount displayed.
 */
function updateTotalAmount(){
    totalAmountElement.innerText = `Total Amount: ${calculateTotal()}`;
}

/**
 * Calculates the total amount of transactions.
 * @returns {number} The total amount.
 */
function calculateTotal(){
    return transactions.reduce(
        (acc,transaction) => acc + Number(transaction.amount),
        0
    )
}

form.addEventListener("submit", addTransaction);
table.addEventListener("click", handleClickOnTable);
