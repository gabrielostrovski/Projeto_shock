function logar() {
    var user = document.getElementById('usuario').value;
    var pass = document.getElementById('senha').value;
    var msg = document.getElementById('mensagem');

    if (user == "" || pass == "") {
        msg.innerText = "Preencha todos os campos!";
    } 
    else if (user == "admin" && pass == "1234") {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html";
    } 
    else {
        msg.innerText = "Usuário ou senha incorretos!";
    }
}