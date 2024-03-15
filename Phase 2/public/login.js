let users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('login-form').onsubmit = function(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = 'main.html';
    } else {
        alert('Invalid username or password.');
    }
};