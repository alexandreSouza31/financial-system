
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
            return
        } else {
            alert_success.classList.remove("disabled")
            alert_success.innerHTML = `Entrando...`;
            setTimeout(() => {
                window.location.href = "/home.html";
            }, 2000)
        }
    })


   


}//fim curto-circuito do login



