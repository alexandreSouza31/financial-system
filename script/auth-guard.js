
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {//se o usuário não estiver logado volta pra login
            window.location.href = "/../index.html";
        } if (!user && body_login) {
            message.style.display = "flex";
        }
    })

    
