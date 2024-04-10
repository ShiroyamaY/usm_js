# Report of individual work
### 🕵️‍♀️ Project tasks

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

## 👷 Project structure
```
individual_work_1
 ┣ docs/
 ┣ src
 ┃ ┣ TransactionAnalyzer.js
 ┃ ┣ index.js
 ┃ ┗ transaction.json
 ┣ .gitignore
 ┣ package-lock.json
 ┣ package.json
 ┗ README.md
 ```

## 🥸 Example:
- [transactions.json](./src/transactions.json)
- [TransactionAnalyzer.js](src/TransactionAnalyzer.js)
 ```js
import TransactionAnalyzer from "./TransactionAnalyzer.js";
import * as fs from 'fs';
const transactions = JSON.parse(fs.readFileSync('src/transactions.json'));
const analyzer = new TransactionAnalyzer(transactions);

console.log("getAllTransactions:", analyzer.getAllTransactions());
 ```

##  ❓ Ответы на котрольные вопросы 👀

#### 1. Какие примитивные типы данных существуют в JavaScript?
```
🐒 The Primitive Data types in JavaScript include: Number, String, Boolean, BigInt, Symbol, Undefined, Null (специальный тип данных)
```
#### 2. Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?
```
✍ filter: Метод filter() создает новый массив, содержащий все элементы исходного массива, для которых функция обратного вызова возвращает true

✍ map: Метод map() создает новый массив, содержащий результат вызова указанной функции для каждого элемента исходного массива.

✍ reduce: Метод reduce() применяет функцию к аккумулятору и каждому значению массива (слева направо), чтобы свести его к одному значению.

✍ sort: Метод sort() сортирует элементы массива на месте и возвращает отсортированный массив.

✍ find: Метод find() возвращает значение первого найденного в массиве элемента, который удовлетворяет условию переданной функции.
``` 
#### 3. В чем состоит роль конструктора класса?
```
🏗 Конструктор выполняет инициализацию начального состояния объекта, устанавливая начальные значения переменных экземпляра класса и выполняя другие необходимые действия для подготовки объекта к использованию.
```
#### 4. Каким образом вы можете создать новый экземпляр класса в JavaScript?
```
🤰 Создать новый экземпляр класса при помощи оператора new 
```