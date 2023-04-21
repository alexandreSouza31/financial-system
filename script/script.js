
let body_login = document.querySelector(".body-login");
let body_register = document.querySelector(".body-register");

let alert_danger = document.querySelector(".alert-danger");
let alert_success = document.querySelector(".alert-success");


if (body_login) {//curto-circuito

    const email_login = document.querySelector(".email-login");
    let label_email_login = document.querySelector(".label-email-login");
    valid_email = false;
    const password_login = document.querySelector(".password-login");
    let label_password_login = document.querySelector(".label-password-login");
    valid_password = false;

    alert_danger.classList.add("disabled");
    alert_success.classList.add("disabled");

    const enter_btn = document.querySelector("#enter-btn");

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
        } else {

            return true
        }
    }


    enter_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateLogin() === false) {
            alert_danger.innerHTML = `preencha os dados corretamente!`;
            alert_danger.classList.remove("disabled");

            setTimeout(() => {
                alert_danger.classList.add("disabled");
            }, 2000)
            return;
        } else {


            firebase.auth().signInWithEmailAndPassword(email_login.value, password_login.value).//retorna uma promisse
                //uma promisse informa que vai retornar, mas não quando,pois é assíncrona.
                then(response => {//que é a resposta. Então consigo tratá-la.
                    alert_success.classList.remove("disabled");
                    alert_success.innerHTML = `Entrando...`;

                    setTimeout(() => {
                        alert_success.classList.add("disabled");
                        window.location.href = "/home.html";
                    }, 2000)
                }).catch(error => {
                    alert_danger.innerHTML = `Usuário não encontrado!`;
                    alert_danger.classList.remove("disabled");

                    setTimeout(() => {
                        alert_danger.classList.add("disabled");
                    }, 2000)
                });

            // setTimeout(() => {
            //     alert_success.classList.add("disabled");
            //     window.location.href = "/home.html";
            // }, 2000)
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


}//fim curto-circuito do login


if (body_register) {//início curto-circuito register
    let label_name_register = document.querySelector(".label-name-register");
    let label_email_register = document.querySelector(".label-email-register");
    let label_password_register = document.querySelector(".label-password-register");
    let label_confirm_register = document.querySelector(".label-confirm-register");

    alert_danger.classList.add("disabled");
    alert_success.classList.add("disabled");

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
            label_email_register.innerHTML = `Email: insira um email válido`;
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

            password_register.setAttribute("style", "border-color:red");
            label_password_register.setAttribute("style", "color:red");
            label_password_register.innerHTML = `Senha: mínimo 6 caracteres`;
            valid_password = false;
        } else {
            password_register.setAttribute("style", "border-color:#04c004;");
            label_password_register.setAttribute("style", "color:black");
            label_password_register.innerHTML = `Senha: <i class="bi bi-check"></i>`;
            valid_password = true;
        }
    })

    confirm_register.addEventListener("keyup", () => {
        if (password_register.value !== confirm_register.value) {

            confirm_register.setAttribute("style", "border-color:red");
            label_confirm_register.setAttribute("style", "color:red");
            label_confirm_register.innerHTML = `Confirme: as senhas não conferem`;
            valid_confirm = false;
        } else {
            confirm_register.setAttribute("style", "border-color:#04c004;");
            label_confirm_register.setAttribute("style", "color:black");
            label_confirm_register.innerHTML = `Confirme sua senha: <i class="bi bi-check"></i>`;
            valid_confirm = true;
        }
    })


    function validateRegister() {
        if (!valid_name || !valid_email || !valid_password || !valid_confirm) {
            return false;
        } else if (name_register.value === "" && email_register.value === "" && password_register.value === "" && confirm_register.value === "") {
            return false;
        } else {

            return true
        }
    }


    register_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateRegister() === false) {
            alert_danger.classList.remove("disabled");
            alert_danger.innerHTML = `preencha os dados corretamente!`;

            setTimeout(() => {
                alert_danger.classList.add("disabled");;
            }, 2000)
            return
        } else {
            alert_success.classList.remove("disabled");
            alert_success.innerHTML = `Usuário cadastrado com sucesso!`;
            setTimeout(() => {
                name_register.value = ""; email_register.value = ""; password_register.value = ""; confirm_register.value = ""
                window.location.href = "/index.html";
            }, 2000)
        }
    })







}