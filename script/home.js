const body_home = document.querySelector(".body-home")
let message = document.querySelector(".message");

if (body_home) {
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
        message.style.backgroundColor="red"
        message.style.display = "block";
    } 

    firebase.auth().onAuthStateChanged(user => {//matém usuário logado, caso tenha feito login
        if (user) {
            console.log(user)
            // h3.innerHTML=`Olá, ${user}`
        }
    })
}
