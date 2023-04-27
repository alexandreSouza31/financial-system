
let body_login = document.querySelector(".body-login");

if (body_login) {

    let message = document.querySelector(".message");
    message.innerHTML="carregando..."
    let alert_danger = document.querySelector(".alert-danger");
    let alert_success = document.querySelector(".alert-success");

    const email_login = document.querySelector(".email-login");
    let label_email_login = document.querySelector(".label-email-login");
    valid_email = false;
    const password_login = document.querySelector(".password-login");
    let label_password_login = document.querySelector(".label-password-login");
    valid_password = false;


    const enter_btn = document.querySelector("#enter-btn");
    const forgot = document.querySelector("#forgot");

    email_login.addEventListener("keyup", function () {
        const standard_email = /^[\w._-]+@[\w_.-]+\.[\w]+[\w]+[\w]/;//espressão regular
        let text = this.value;

        if (!standard_email.test(text)) {
            email_login.setAttribute("style", "border-color:red");
            label_email_login.setAttribute("style", "color:red");
            label_email_login.innerHTML = `Email: insira um email válido`;
            valid_email = false;
        } else {
            email_login.setAttribute("style", "border-color:#04c004;");
            label_email_login.setAttribute("style", "color:black");
            label_email_login.innerHTML = `Email: <i class="bi bi-check"></i>`;
            valid_email = true;
        }
    })

    password_login.addEventListener("keyup", () => {

        if (password_login.value.length < 6) {
            password_login.setAttribute("style", "border-color:red");
            label_password_login.setAttribute("style", "color:red");
            label_password_login.innerHTML = `Senha: mínimo 6 caracteres`;
            valid_password = false;
        } else {
            password_login.setAttribute("style", "border-color:#04c004;");
            label_password_login.setAttribute("style", "color:black");
            label_password_login.innerHTML = `Senha: <i class="bi bi-check"></i>`;
            valid_password = true;
        }
    })

    function validateLogin() {
        if (!valid_email || !valid_password) {
            return false;
        } else { return true }
    }

    function validateEmail() {
        if (!valid_email) {
            return false;
        } else { return true }
    }

    function setTimeOutDanger() {
        message.style.display = "flex";//fazer no cadastro
        alert_danger.classList.remove("disabled");
        setTimeout(() => {
            message.style.display = "none";
            alert_danger.classList.add("disabled");
        }, 2000)
    }

    function setTimeOutSuccess(location) {
        if (location !== "") {
            alert_success.classList.remove("disabled");
            message.style.display = "flex";
            setTimeout(() => {
                message.style.display = "none";
                alert_success.classList.add("disabled");
                return window.location.href = location;
            }, 3000)
        } else {
            alert_success.classList.remove("disabled");
            message.style.display = "flex";
            setTimeout(() => {
                message.style.display = "none";
                alert_success.classList.add("disabled");
                return window.location.href = "";
            }, 5000)
            console.log("caiu no falso")
        }
    }

    alert_danger.classList.add("disabled");
    alert_success.classList.add("disabled");


    enter_btn.addEventListener("click", (e) => {
        message.style.display = "flex";
        e.preventDefault();
        if (validateLogin() === false) {
            alert_danger.innerHTML = `preencha os dados corretamente!`;

            setTimeOutDanger()
            return;
        } else {

            firebase.auth().signInWithEmailAndPassword(email_login.value, password_login.value).//retorna uma promisse
                //uma promisse informa que vai retornar, mas não quando,pois é assíncrona.
                then(response => {//que é a resposta. Então consigo tratá-la.

                    alert_success.innerHTML = `Entrando...`;

                    setTimeOutSuccess("/home.html");
                }).catch(error => {
                    if (error.code == "auth/wrong-password") {
                        alert_danger.innerHTML = `Senha inválida!`;

                        setTimeOutDanger();

                        console.log(error)
                    } else if (error.code == "auth/user-not-found") {
                        alert_danger.innerHTML = `Usuário não cadastrado!`;

                        setTimeOutDanger();
                    } else {
                        console.log("outro erro");
                    }
                });
        }
    })

    const openEye = document.querySelector(".bi-eye");
    const closeEye = document.querySelector(".bi-eye-slash");
    openEye.classList.add("disabled");
    password_login.setAttribute("type", "password");

    openEye.addEventListener("click", () => {
        password_login.setAttribute("type", "password");
        openEye.classList.add("disabled");
        closeEye.classList.remove("disabled");
        //password_login.setAttribute("type", "password");
    })

    closeEye.addEventListener("click", () => {
        //closeEye.classList.toggle("disabled");
        password_login.setAttribute("type", "text");
        openEye.classList.remove("disabled");
        closeEye.classList.add("disabled");
    })

    function sendEmailRecovery() {
        alert_success.innerHTML = `caso haja esse email em nosso banco de dados você receberá um link em breve!(verifique a caixa de spam também)`;
        
        message.style.display = "flex";
        setTimeout(() => {
            setTimeOutSuccess("/index.html");
        }, 5000)
        
    }

    function recoveryPassowrd() {
        if (validateEmail() === false) {
            return
        }
        firebase.auth().sendPasswordResetEmail(email_login.value).then(() => {
            sendEmailRecovery();
        }).catch(error => {
            sendEmailRecovery();
        });
    }

    function invalidPassword() {
        firebase.auth().sendPasswordResetEmail(email_login.value).then(() => {
            if (error.code == "auth/wrong-password") {
                return "Senha inválida!"
            } else {
                //console.log("Senha correta")
            }
        })
    }

    forgot.addEventListener("click", () => {
        invalidPassword()
        recoveryPassowrd()
    });

    
    // firebase.auth().onAuthStateChanged(user => {//matém usuário logado, caso tenha feito login
    //     if (user) {
    //         window.location.href = "/home.html";
    //     }
    // })


}
