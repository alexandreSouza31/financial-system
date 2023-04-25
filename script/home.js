const body_home = document.querySelector(".body-home")
let message = document.querySelector(".message");

if (body_home) {
    //configs sessão
    const out_btn = document.querySelector("#out-btn");
    const h3 = document.querySelector(".h3-home");

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
        message.style.display = "block";
    }

    firebase.auth().onAuthStateChanged(user => {//matém usuário logado, caso tenha feito login
        if (user) {
            //console.log(user)
            // h3.innerHTML=`Olá, ${user}`
        }
    })
    //fim das configs da sessão

    //transação

    const input_description = document.querySelector(".description");
    const input_amount = document.querySelector(".amount");
    const input_type = document.querySelector("#type");
    const include_btn = document.querySelector("#include-btn");

    const tbody_income = document.querySelector(".tbody-income");
    const tbody_expense = document.querySelector(".tbody-expense");

    //resume
    const span_income = document.querySelector(".span-credit");
    const span_expense = document.querySelector(".span-expense");
    const balance = document.querySelector(".balance");

    //agr preciso acessar somente os registros daquele usuário em específico:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            findTransactions_expense(user);
            findTransactions_income(user);
            //findUser(user)
            
        }
    })
    
    
    function findTransactions_income(user) {//busca as transações de entrada do usuário
        message.style.display = "block";
        firebase.firestore()
            .collection("transactions_income")
            .orderBy("date", "desc")
            .where("user.uid", "==", user.uid)
            .get()
            .then(snapshot => {
                console.log(user.uid)
                message.style.display = "none";
                const transactions_income = snapshot.docs.map(doc => doc.data())//o doc faz parte do que é retornado do firestore
                
                addTransactionsIncomeToScreen(transactions_income);
            })
            .catch(error => {
                message.style.display = "none";
                //console.log(error)
        })
    }
    

    function findTransactions_expense(user) {//busca as transações de saída do usuário
        message.style.display = "block";
        firebase.firestore()
            .collection("transactions_expense")
            .orderBy("date", "desc")//ordem do mais novo pro antigo
            .where("user.uid", "==", user.uid)
            .get()
            .then(snapshot => {
                message.style.display = "none";
                const transactions_expense = snapshot.docs.map(doc => doc.data())
                console.log(transactions_expense)
                addTransactionsExpenseToScreen(transactions_expense);
        })
    }

    
    // function findUser(user) {//busca o usuário
    //     firebase.firestore()
    //         .collection("users")
    //         //.where("user.uid", "==", user.uid)
    //         .get()
    //         .then(snapshot => {
    //             const user=snapshot.docs.map(doc => doc.data())
    //             addUserInScreen(user);
                
    //     })
    // }


    // function addUserInScreen(user) {
    //     user.forEach(user => {
    //         h3.innerHTML = `Olá, ${user.name}`
    //     })
    // }

    function addTransactionsIncomeToScreen(transactions) {//recebe as transações e adiciona na tela
        transactions.forEach(transaction => {
            
            const tr_income = document.createElement("tr");
            tr_income.classList.add(transaction.type);
            tr_income.innerHTML =
                `<td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${formatDate(transaction.date)}</td>
                <i class="bi bi-trash3">
                `
            tbody_income.appendChild(tr_income)

        });
    }
    function addTransactionsExpenseToScreen(transactions) {//recebe as transações e adiciona na tela
        transactions.forEach(transaction => {
            const tr_expense = document.createElement("tr");
            tr_expense.classList.add(transaction.type);
            tr_expense.innerHTML =
                `<td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${formatDate(transaction.date)}</td>
                <i class="bi bi-trash3">
                `
            tbody_expense.appendChild(tr_expense)

        });
    }


    function formatDate(date) {
        return new Date(date).toLocaleDateString("pt-br")
    }

    include_btn.addEventListener("click", (e) => {
        e.preventDefault();
        
    })


}
