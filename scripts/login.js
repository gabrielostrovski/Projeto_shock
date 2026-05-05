let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function mostrarAba(aba) {
    const loginTab = document.getElementById('formLogin');
    const cadastroTab = document.getElementById('formCadastro');
    const botoes = document.querySelectorAll('.aba');
    
    if (aba === 'login') {
        loginTab.classList.add('ativo');
        cadastroTab.classList.remove('ativo');
        botoes[0].classList.add('ativa');
        botoes[1].classList.remove('ativa');
    } else {
        loginTab.classList.remove('ativo');
        cadastroTab.classList.add('ativo');
        botoes[0].classList.remove('ativa');
        botoes[1].classList.add('ativa');
    }
}

function cadastrarUsuario(usuario, senha, confirmarSenha) {
    if (!usuario || !senha || !confirmarSenha) {
        return { sucesso: false, mensagem: 'Preencha todos os campos' };
    }
    
    if (senha !== confirmarSenha) {
        return { sucesso: false, mensagem: 'As senhas nao coincidem' };
    }
    
    if (senha.length < 4) {
        return { sucesso: false, mensagem: 'A senha deve ter no minimo 4 caracteres' };
    }
    
    const usuarioExiste = usuarios.find(u => u.usuario === usuario);
    if (usuarioExiste) {
        return { sucesso: false, mensagem: 'Este usuario ja existe' };
    }
    
    usuarios.push({ usuario: usuario, senha: senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    return { sucesso: true, mensagem: 'Conta criada com sucesso' };
}

function fazerLogin(usuario, senha) {
    if (!usuario || !senha) {
        return { sucesso: false, mensagem: 'Preencha usuario e senha' };
    }
    
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    
    if (usuarioEncontrado) {
        return { sucesso: true, mensagem: 'Login realizado com sucesso' };
    } else {
        return { sucesso: false, mensagem: 'Usuario ou senha incorretos' };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('login.html')) {
        if (localStorage.getItem('usuarioLogado')) {
            window.location.href = 'home.html';
        }
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('loginUsuario').value;
            const senha = document.getElementById('loginSenha').value;
            const mensagemDiv = document.getElementById('loginMensagem');
            
            const resultado = fazerLogin(usuario, senha);
            
            if (resultado.sucesso) {
                mensagemDiv.className = 'mensagem sucesso';
                mensagemDiv.textContent = resultado.mensagem;
                mensagemDiv.classList.remove('d-none');
                
                localStorage.setItem('usuarioLogado', usuario);
                
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                mensagemDiv.className = 'mensagem erro';
                mensagemDiv.textContent = resultado.mensagem;
                mensagemDiv.classList.remove('d-none');
                document.getElementById('loginSenha').value = '';
            }
        });
    }
    
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('novoUsuario').value;
            const senha = document.getElementById('novaSenha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            const mensagemDiv = document.getElementById('cadastroMensagem');
            
            const resultado = cadastrarUsuario(usuario, senha, confirmarSenha);
            
            if (resultado.sucesso) {
                mensagemDiv.className = 'mensagem sucesso';
                mensagemDiv.textContent = resultado.mensagem;
                mensagemDiv.classList.remove('d-none');
                
                document.getElementById('novoUsuario').value = '';
                document.getElementById('novaSenha').value = '';
                document.getElementById('confirmarSenha').value = '';
                
                setTimeout(() => {
                    mostrarAba('login');
                    mensagemDiv.classList.add('d-none');
                }, 1500);
            } else {
                mensagemDiv.className = 'mensagem erro';
                mensagemDiv.textContent = resultado.mensagem;
                mensagemDiv.classList.remove('d-none');
                document.getElementById('novaSenha').value = '';
                document.getElementById('confirmarSenha').value = '';
            }
        });
    }
});