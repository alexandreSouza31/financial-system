
let body_login = document.querySelector(".body-login");
let body_register = document.querySelector(".body-register");

let message = document.querySelector(".message");
let alert_danger = document.querySelector(".alert-danger");
let alert_success = document.querySelector(".alert-success");


if (body_login) {//curto-circuito

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
        message.style.display = "block";//fazer no cadastro
        alert_danger.classList.remove("disabled");
        setTimeout(() => {
            message.style.display = "none";
            alert_danger.classList.add("disabled");
        }, 2000)
    }

    function setTimeOutSuccess(location) {
        if (location !== "") {
            alert_success.classList.remove("disabled");
            message.style.display = "block";//fazer no cadastro
            setTimeout(() => {
                message.style.display = "none";
                alert_success.classList.add("disabled");
                return window.location.href = location;
            }, 3000)
        } else {
            alert_success.classList.remove("disabled");
            message.style.display = "block";//fazer no cadastro
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
        message.style.display = "block";
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
        setTimeOutSuccess();
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
            }
        })
    }

    forgot.addEventListener("click", () => {
        invalidPassword()
        recoveryPassowrd()
    });


}//fim curto-circuito do login


if (body_register) {//início curto-circuito register
    let label_name_register = document.querySelector(".label-name-register");
    let label_email_register = document.querySelector(".label-email-register");
    let label_password_register = document.querySelector(".label-password-register");
    let label_confirm_register = document.querySelector(".label-confirm-register");

    const name_register = document.querySelector(".name-register");
    let valid_name = false;
    const email_register = document.querySelector(".email-register");
    let valid_email = false;
    const password_register = document.querySelector(".password-register");
    let valid_password = false;
    const confirm_register = document.querySelector(".confirm-register");
    let valid_confirm = false;

    const register_btn = document.querySelector("#register-btn");

    name_register.addEventListener("keyup", () => {
        if (name_register.value.length < 3) {

            name_register.setAttribute("style", "border-color:red");
            label_name_register.setAttribute("style", "color:red");
            label_name_register.innerHTML = `Nome: mínimo 3 caracteres`;
            valid_name = false;
        } else {
            label_name_register.setAttribute("style", "color:black");
            label_name_register.innerHTML = `Nome: <i class="bi bi-check"></i>`;
            name_register.setAttribute("style", "border-color:#04c004;");
            valid_name = true;
        }
    })

    email_register.addEventListener("keyup", function () {
        const standard_email = /^[\w._-]+@[\w_.-]+\.[\w]+[\w]+[\w]/;
        let text = this.value;
        if (!standard_email.test(text)) {

            email_register.setAttribute("style", "border-color:red");
            label_email_register.setAttribute("style", "color:red");
            label_email_register.innerHTML = `Email: insira um email válido <i class="bi"></i>`;
            valid_email = false;
        } else {
            email_register.setAttribute("style", "border-color:#04c004;");
            label_email_register.setAttribute("style", "color:black");
            label_email_register.innerHTML = `Email: <i class="bi bi-check"></i>`;
            valid_email = true;
        }
    })

    password_register.addEventListener("keyup", () => {
        if (password_register.value.length < 6) {
            label_password_register.innerHTML = `Senha: mínimo 6 caracteres`;
            passwordIncorrect()
        }
        validatePasswordsMatch()
    })

    confirm_register.addEventListener("keyup", () => {
        validatePasswordsMatch()
    })


    function passwordCorrect() {
        password_register.setAttribute("style", "border-color:#04c004;");
        label_password_register.setAttribute("style", "color:black");
        label_password_register.innerHTML = `Senha: <i class="bi bi-check"></i>`;
        valid_password = true;
    }

    function confirmCorrect() {
        confirm_register.setAttribute("style", "border-color:#04c004;");
        label_confirm_register.setAttribute("style", "color:black");
        label_confirm_register.innerHTML = `Confirme sua senha: <i class="bi bi-check"></i>`;
        valid_confirm = true;
    }

    function passwordIncorrect() {
        password_register.setAttribute("style", "border-color:red");
        label_password_register.setAttribute("style", "color:red");
        valid_password = false;
    }

    function confirmIncorrect() {
        confirm_register.setAttribute("style", "border-color:red");
        label_confirm_register.setAttribute("style", "color:red");
        valid_confirm = false;
    }

    function validatePasswordsMatch() {//validar se as senhas batem não importando a ordem de digitação
        if (password_register.value.length < 6 && password_register.value !== confirm_register.value) {
            label_password_register.innerHTML = `Senha: mínimo 6 caracteres<i class="bi></i>`;
            label_confirm_register.innerHTML = `Confirm: mínimo 6 caracteres<i class="bi></i>`;
            passwordIncorrect()
            confirmIncorrect()
            return

        } else if (password_register.value.length >= 6 && password_register.value === confirm_register.value) {
            passwordCorrect()
            confirmCorrect()
            return
        }
        else if (password_register.value.length < 6 && password_register.value === confirm_register.value) {
            label_password_register.innerHTML = `Senha: mínimo 6 caracteres<i class="bi></i>`;
            label_confirm_register.innerHTML = `Confirm: mínimo 6 caracteres<i class="bi></i>`;
            return
        } else {
            label_password_register.innerHTML = `Senha: as senhas não conferem<i class="bi></i>`;
            label_confirm_register.innerHTML = `Confirm: as senhas não conferem<i class="bi></i>`;
            passwordIncorrect()
            confirmIncorrect()
            return
        }
    }

    function validateRegister() {
        if (!valid_name || !valid_email || !valid_password || !valid_confirm) {
            return false;
        } else if (name_register.value === "" && email_register.value === "" && password_register.value === "" && confirm_register.value === "") {
            return false;
        } else {

            return true
        }
    }

    alert_danger.classList.add("disabled");
    alert_success.classList.add("disabled");

    function setTimeOutDanger() {
        message.style.display = "block";
        alert_danger.classList.remove("disabled");
        setTimeout(() => {
            message.style.display = "none";
            alert_danger.classList.add("disabled");
        }, 2000)
    }

    function setTimeOutSuccess(location) {//quero que mostre que o email foi enviado mesmo que não exista. Questões de segurança.
        if (location !== "") {
            alert_success.classList.remove("disabled");
            message.style.display = "block";
            console.log("primeiro")
            setTimeout(() => {
                message.style.display = "none";
                alert_success.classList.add("disabled");
                return window.location.href = location;
            }, 3000)
        } else {
            alert_success.classList.remove("disabled");

            console.log("segundo")
            setTimeout(() => {
                message.style.display = "none";
                alert_success.classList.add("disabled");
                return window.location.href = "";
            }, 5000)
        }
    }


    register_btn.addEventListener("click", (e) => {
        e.preventDefault();
        message.style.display = "block";
        if (validateRegister() === false) {

            alert_danger.innerHTML = `preencha os dados corretamente!`;

            setTimeOutDanger();
            return
        } else {
            firebase.auth().createUserWithEmailAndPassword(
                email_register.value, password_register.value
            ).then(() => {
                alert_success.innerHTML = `Usuário cadastrado com sucesso!`;
                setTimeOutSuccess("/index.html");

            }).catch(error => {
                //alert(error)

                if (error.code == "auth/email-already-in-use") {
                    alert_danger.innerHTML = `usuário já cadastrado! faça login`;
                

                    setTimeOutDanger();
                } else {
                    console.log("erro inesperado");
                }
            })
        }
    })







}