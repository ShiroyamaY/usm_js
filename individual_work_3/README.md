# Отчет по индивидуальной работе

## 🕵️‍♀️[Project tasks](task.md)

## 🏢  Install project
```shell
npm install
```
## 🏃 Run project
```shell
npm start
```
## 🧞‍♂️ Generate documentation
```shell
npm run docs
```
## 🥸 my functions:
```js
addRowToTransactions()
addTransaction()
calculateTotal()
deleteElementFromTable()
getNWords()
handleClickOnTable()
showTransactionDescription()
updateTotalAmount()
```

## 👷 Project structure
```
individual_work_3
┃ node_modules/
┣ src
┃ ┣ index.html
┃ ┣ script.js
┃ ┗ style.css
┣ .gitignore
┣ package-lock.json
┣ package.json
┣ README.md
┗ TASK.md
 ```

## Общая сумма
Общая сумма высчитывается исходя из количества каждой в транзакции
```js
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
```
---

##  Ответы на котрольные вопросы 

    1. Для получения элемента на веб-странице можно использовать методы getElementBy_, а также querySelector,querySelectorAll, указывая их id, class, name.
---
    2. Этот метод обработки событий заключается в привязке события к родительскому элементу, что полезно при необходимости обработать множество схожих элементов. 
---
    3. Это улучшает эффективность обработки событий, так как слушатель применяется к одному элементу вместо всей группы.
---
    4. Возможности полей (inner|outer)Html и textContent заключаются в изменении внутренней разметки и текстового содержимого соответственно.
---
    5. Манипулируя разметкой html, можно добавлять содержимое с помощью .innerHtml += ... или использовать методы, такие как appendChild, insert(Before|After), для вставки элементов.
