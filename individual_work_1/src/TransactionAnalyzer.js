class TransactionAnalyzer{
    #transactions;
    #transactionsTypes;
    /**
     * Создает экземпляр TransactionAnalyzer.
     * @param {Array<Object>} transactions Массив транзакций.
     */
    constructor(transactions){
        this.#transactions = transactions.map(transaction => {
            transaction.string = () => JSON.parse(this);
            return transaction
        })
    }
    /**
     * Добавляет новую транзакцию.
     * @param {Object} transaction Новая транзакция.
     */
    addTransaction(transaction){
        this.#transactions.push(transaction);
    }
    /**
     * Возвращает все транзакции.
     * @returns {Array<Object>} Массив всех транзакций.
     */
    getAllTransactions(){
        return this.#transactions;
    }
    getFirstTransaction(){
        return this.#transactions[0];
    }
    /**
     * Возвращает массив уникальных типов транзакций.
     * @returns {Array<String>} Массив уникальных типов транзакций.
     */
    getUniqueTransactionsType(){
        if(this.#transactionsTypes !== undefined){
            return this.#transactionsTypes;
        }
        this.#transactionsTypes = new Set();
        for (let transaction of this.#transactions){
            this.#transactionsTypes.add(transaction.transaction_type)
        }
        return this.#transactionsTypes;
    }
    /**
     * Рассчитывает общую сумму всех транзакций.
     * @returns {number} Общая сумма транзакций.
     */
    calculateTotalAmount(){
        return this.#transactions.reduce((acc,currentTransaction)=>{
            return acc + currentTransaction.transaction_amount;
        },0);
    }
    /**
     * Рассчитывает общую сумму транзакций за указанный год, месяц и день.
     * @param {number} year Год.
     * @param {number} month Месяц (от 1 до 12).
     * @param {number} day День (от 1 до 31).
     * @returns {number} Общая сумма транзакций за указанный день, месяц и год.
     */
    calculateTotalAmountByDate(year,month,day){
        return this.#transactions.reduce((acc,currentTransaction)=>
        {
            const transactionDate = new Date(currentTransaction.transaction_date);
            
            if(
                (year && year !== transactionDate.getFullYear()) ||
                (month && month !== transactionDate.getMonth() + 1) ||
                (day && day !== transactionDate.getDate())
            ){
                return acc;
            }
            
            return acc + currentTransaction.transaction_amount;
        },0);
    }
    /**
     * Возвращает транзакции указанного типа.
     * @param {string} type Тип транзакции (debit или credit).
     * @returns {Array<Object>} Массив транзакций указанного типа.
     */
    getTransactionByType(type){
        return this.#transactions.filter(
            current => current.transaction_type === type
        );
    }
    /**
     * Возвращает транзакции, проведенные в указанном диапазоне дат.
     * @param {Date} startDate Начальная дата.
     * @param {Date} endDate Конечная дата.
     * @returns {Array<Object>} Массив транзакций в указанном диапазоне дат.
     */
    getTransactionsInDateRange(startDate,endDate){
        return this.#transactions.filter(
            current =>{
                let transactionDate = new Date(current.transaction_date).getTime();
                let transactionStartDate = new Date(startDate);
                let transactionEndDate = new Date(endDate);
                
                return transactionStartDate.getTime() <= transactionDate 
                && transactionEndDate.getTime() >= transactionDate;
            }
        );  
    }
    /**
     * Возвращает транзакции, совершенные с указанным торговым местом или компанией.
     * @param {string} merchantName Название торгового места или компании.
     * @returns {Array<Object>} Массив транзакций с указанным торговым местом или компанией.
     */
    getTransactionsByMerchant(merchantName){
        return this.#transactions.filter(
            current => current.merchant_name === merchantName
        );
    }
    /**
     * Рассчитывает среднее значение транзакций.
     * @returns {number} Среднее значение транзакций.
     */
    calculateAverageTransactionAmount(){
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.#transactions.length;
    }
    /**
     * Возвращает транзакции с суммой в заданном диапазоне.
     * @param {number} minAmount Минимальная сумма транзакции.
     * @param {number} maxAmount Максимальная сумма транзакции.
     * @returns {Array<Object>} Массив транзакций с суммой в заданном диапазоне.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.#transactions.filter(transaction => {
            const amount = transaction.transaction_amount;
            return amount >= minAmount && amount <= maxAmount;
        });
    }
    
    /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @returns {number} Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionByType('debit');
        return debitTransactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
    }
    
    /**
     * Возвращает месяц, в котором было больше всего транзакций,
     * если есть несколько таких месяцев возвращает последний.
     * @returns {number} Месяц с наибольшим количеством транзакций.
     */
    findMostTransactionsMonth() {
        const transactionsByMonth = {};
        this.#transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            transactionsByMonth[month] = (transactionsByMonth[month] || 0) + 1;
        });
        
        return Object.keys(transactionsByMonth).reduce((a, b) =>  transactionsByMonth[a] > transactionsByMonth[b] ? a : b, 1);
    }
    
    /**
     * Возвращает месяц, в котором было больше дебетовых транзакций.
     * @returns {number} Месяц с наибольшим количеством дебетовых транзакций.
     */
    findMostDebitTransactionMonth() {
        const debitTransactionsByMonth = {};
        const debitTransactions = this.getTransactionByType('debit');
        debitTransactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            debitTransactionsByMonth[month] = (debitTransactionsByMonth[month] || 0) + 1;
        });
        return Object.keys(debitTransactionsByMonth).reduce((a, b) => debitTransactionsByMonth[a] > debitTransactionsByMonth[b] ? a : b);
    }
    /**
    * Возвращает, каких транзакций больше всего.
    * @returns {string} 'debit', если дебетовых больше, 'credit', если кредитовых больше, 'equal', если количество равно.
    */
    mostTransactionTypes() {
        const debitCount = this.getTransactionByType('debit').length;
        const creditCount = this.getTransactionByType('credit').length;

        if (debitCount > creditCount) {
            return 'debit';
        } else if (creditCount > debitCount) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    /**
     * Возвращает транзакции, совершенные до указанной даты.
     * @param {Date} date Дата.
     * @returns {Array<Object>} Массив транзакций, совершенных до указанной даты.
     */
    getTransactionsBeforeDate(date) {
        return this.#transactions.filter(
                transaction => new Date(transaction.transaction_date) < new Date(date)
            );
    }

    /**
     * Возвращает транзакцию по ее уникальному идентификатору.
     * @param {string} id Уникальный идентификатор транзакции.
     * @returns {Object|null} Транзакция с указанным идентификатором или null, если транзакция не найдена.
     */
    findTransactionById(id) {
        return this.#transactions.find(transaction => Number(transaction.transaction_id) === id) || null;
    }

    /**
     * Возвращает новый массив, содержащий только описания транзакций.
     * @returns {Array<string>} Массив описаний транзакций.
     */
    mapTransactionDescriptions() {
        return this.#transactions.map(transaction => transaction.transaction_description);
    }
}

export default TransactionAnalyzer;