const body_home = document.querySelector(".body-home")
let message = document.querySelector(".message");
let alert_danger = document.querySelector(".alert-danger");
let alert_success = document.querySelector(".alert-success");

if (body_home) {
    //configs sessão
    message.innerHTML="carregando..."
    const out_btn = document.querySelector("#out-btn");

    function logout() {
        firebase.auth().signOut().then(() => {
            window.location.href = "/../index.html";
        }).catch(() => {
            alert("Erro no logout")
        })
    }

    out_btn.addEventListener("click", (e) => {
        e.preventDefault();
        logout()

    })

    if (body_home && window.location.href == "/index.html") {
        message.style.backgroundColor = "red"
        message.style.display = "flex";
    }

    // firebase.auth().onAuthStateChanged(user => {//se não tiver logado vai pra tela de login
    //     if (user) {
    //         //window.location.href = "/index.html";
    //     }
    // })
    //fim das configs da sessão

    //transação

    const input_description = document.querySelector(".description");
    const input_amount = document.querySelector(".amount");
    const input_date = document.querySelector(".date");
    const input_type = document.querySelector("#type")
    const include_btn = document.querySelector("#include-btn");

    const tbody_income = document.querySelector(".tbody-income");
    const tbody_expense = document.querySelector(".tbody-expense");

    function setTimeOutDanger() {
        message.style.display = "flex";
        alert_danger.classList.remove("disabled");
        setTimeout(() => {
            message.style.display = "none";
            alert_danger.classList.add("disabled");
        }, 2000)
    }

    function setTimeOutSuccess() {

        alert_success.classList.remove("disabled");
        message.style.display = "flex";
        setTimeout(() => {
            message.style.display = "none";
            alert_success.classList.add("disabled");
        }, 2000)
    }

    //agr preciso acessar somente os registros daquele usuário em específico:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            findTransactions_expense(user);
            findTransactions_income(user);
        }
    })


    function findTransactions_income(user) {//busca as transações de entrada do usuário
        message.style.display = "flex";

        firebase.firestore()
            .collection("transactions_income")
            .orderBy("date", "desc")
            .where("user.uid", "==", user.uid)
            .get()
            .then(snapshot => {
                
                message.style.display = "none";

                const transactions_income = snapshot.docs.map(doc => ({
                    ...doc.data(),//o doc faz parte do que é retornado do firestore
                    uid: doc.id
                }))


                addTransactionsIncomeToScreen(transactions_income);
            })
            .catch(error => {
                message.style.display = "none";
            })
    }

    function findTransactions_expense(user) {//busca as transações de saída do usuário
        message.style.display = "flex";

        firebase.firestore()
            .collection("transactions_expense")
            .orderBy("date", "desc")//ordem do mais novo pro antigo
            .where("user.uid", "==", user.uid)
            .get()
            .then(snapshot => {
                message.style.display = "none";
                const transactions_expense = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }))
                addTransactionsExpenseToScreen(transactions_expense);
            })
    }

    function addTransactionsIncomeToScreen(transactions) {//recebe as transações e adiciona na tela
        transactions.forEach(transaction => {

            const tr_income = document.createElement("tr");
            let trash = document.createElement("i");
            trash = trash.innerHTML = "<i class='bi bi-trash3'>";

            tr_income.classList.add(transaction.type);
            tr_income.id = transaction.uid;
            tr_income.innerHTML =
                `<td>${transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>${formatDate(transaction.date)}</td>
                ${trash}
                `
            tbody_income.appendChild(tr_income)

        });
    }
    
    const tr_expense = document.createElement("tr");
    function addTransactionsExpenseToScreen(transactions) {//recebe as transações e adiciona na tela
        transactions.forEach(transaction => {

            let trash = document.createElement("i");
            trash = trash.innerHTML = "<i class='bi bi-trash3' onclick='removeTransaction()'>";

            tr_expense.classList.add(transaction.type);

            tr_expense.id = transaction.uid;//criando id pra cada transação
            tr_expense.innerHTML =
                `<td>${transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>${formatDate(transaction.date)}</td>
                ${trash}
                  `
            tbody_expense.appendChild(tr_expense)
        });
    }


    function formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }


    let type = input_type.addEventListener("change", () => {
        if (input_type.value == "Entrada") {
            console.log("transacao de entrada")

        }
        if (input_type.value == "Saída") {
            console.log("transacao de saida")

        }
        return input_type.value
    })

    function validNew() {
        if (input_description.value === "" || input_amount.value === "" || input_amount.value < 1 || input_date.value === "" || input_type.value == "Digite o tipo da transação") {
            alert_danger.innerHTML = `preencha os dados corretamente!`;
            setTimeOutDanger()
            return false
        }
        else {
            setTimeOutSuccess();
            alert_success.innerHTML = `transação salva com sucesso!`;
            return true
        }
    }

    function transactionInclude() {
        message.style.display = "flex";
        const transaction = {
            type: input_type.value,
            date: input_date.value,
            amount: parseFloat(input_amount.value),
            description: input_description.value,
            user: {
                uid: firebase.auth().currentUser.uid,
            }
        }

        if (input_type.value == "Entrada") {
            firebase.firestore()
                .collection("transactions_income")
                .add(transaction)
                .then(() => {
                    message.style.display = "none";

                })
                .catch(() => {
                    message.style.display = "none";
                    console.log("erro ao salvar transação")
                })

        } else {
            firebase.firestore()
                .collection("transactions_expense")
                .add(transaction)
                .then(() => {
                    message.style.display = "none";

                })
                .catch(() => {
                    message.style.display = "none";
                    console.log("erro ao salvar transação")
                })
        }

        alert("transação salva!")
        console.log(transaction)
    }

    include_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (validNew() === false) {
            return
        } else {
            transactionInclude()
            type

            input_description.value = "";
            input_description.focus();
            input_amount.value = "";
            input_date.value = "";
            input_type.value = "Digite o tipo da transação"
        }

    })


}
