// Abrir e fechar o pop-up de login
var loginModal = document.getElementById("loginModal");
var loginBtn = document.getElementById("loginBtn");
var closeLogin = document.getElementsByClassName("close")[0];
var verMaisBtn = document.getElementById("verMaisBtn");
var comeceAgoraBtn = document.getElementById("comeceAgoraBtn");
var inscrevaBtn = document.getElementById("inscrevaBtn");



loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

closeLogin.onclick = function() {
    loginModal.style.display = "none";
}



// Abrir e fechar o pop-up de cadastro
var signupModal = document.getElementById("signupModal");
var createAccountLink = document.getElementById("createAccountLink");
var closeSignup = document.getElementsByClassName("close-signup")[0];

createAccountLink.onclick = function() {
    loginModal.style.display = "none";  
    signupModal.style.display = "block"; 
}

closeSignup.onclick = function() {
    signupModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    } else if (event.target == signupModal) {
        signupModal.style.display = "none";
    }
}


verMaisBtn.onclick = function() {
    loginModal.style.display = "block";  // Abrir o modal de login
}

comeceAgoraBtn.onclick = function() {
    loginModal.style.display = "block";  // Abrir o modal de login
}

inscrevaBtn.onclick = function() {
    signupModal.style.display = "block";  // Abrir o modal de login
}

document.querySelector('a[href="#como-funciona"]').addEventListener('click', function(e) {
    e.preventDefault();  // Evita o comportamento padrão do link
    document.querySelector('#como-funciona').scrollIntoView({
        behavior: 'smooth'
    });
});


document.querySelector('a[href="#sobre-nos"]').addEventListener('click', function(e) {
    e.preventDefault();  // Evita o comportamento padrão do link
    document.querySelector('#sobre-nos').scrollIntoView({
        behavior: 'smooth'
    });
});
  


  document.querySelector('a[href="#pagamentos"]').addEventListener('click', function(e) {
    e.preventDefault();  // Evita o comportamento padrão do link
    document.querySelector('#pagamentos').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('a[href="#faq"]').addEventListener('click', function(e) {
    e.preventDefault();  // Evita o comportamento padrão do link
    document.querySelector('#faq').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('a[href="#contato"]').addEventListener('click', function(e) {
    e.preventDefault();  // Evita o comportamento padrão do link
    document.querySelector('#contato').scrollIntoView({
        behavior: 'smooth'
    });
});


document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});


async function submitSignup() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.querySelector('input[name="user-role-signup"]:checked').value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    const response = await fetch('https://babaja.onrender.com/signup', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'new-username': username,
            'new-password': password,
            'confirm-password': confirmPassword,
            'user-role-signup': role
        })
    });

    const result = await response.json();
    if (response.status === 201) {
        
        // Mostrar o modal de sucesso
        document.getElementById('successModal').style.display = 'block';
    } else {
        alert(result.message || "Erro ao criar usuário.");
    }
}

// Fechar o modal de sucesso
document.querySelector('.close-success').onclick = function() {
    document.getElementById('successModal').style.display = 'none';
}

// Fechar o modal de sucesso ao clicar fora dele
window.onclick = function(event) {
    const successModal = document.getElementById('successModal');
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
}

function openLoginPopup() {
    document.getElementById('successModal').style.display = 'none'; // Fechar o modal de sucesso
    document.getElementById('signupModal').style.display = 'none'; // Fechar o modal de cadastro
    document.getElementById('loginModal').style.display = 'block'; // Abrir o modal de login
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}


async function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="user-role"]:checked').value;

    try {
        const response = await fetch('https://babaja.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, user_role: role })
        });

        const result = await response.json();

        if (response.ok) {
            if (role === "pais") {
                window.location.href = "pais.html";
            } else if (role === "baba") {
                // Armazena o username do backend para uso nas próximas páginas
                localStorage.setItem('username', result.username);

                // Verifica o redirecionamento baseado no login
                if (result.redirect === "confirmacao") {
                    window.location.href = "babas.html"; // Redireciona para a página de confirmação
                } else if (result.redirect === "dashboard") {
                    window.location.href = "babaDashboard.html";
                }
            }
        } else {
            alert(result.error || "Erro ao fazer login.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao tentar fazer login. Tente novamente.");
    }
}


document.addEventListener("DOMContentLoaded", function() {
    closeAllPopups();
});

function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.classList.add('hidden'));
}

document.querySelector('.logo').addEventListener('click', function() {
    closeAllPopups(); // Fecha os pop-ups
    window.location.href = 'index.html'; // Redireciona para o index.html
});



;


  
  