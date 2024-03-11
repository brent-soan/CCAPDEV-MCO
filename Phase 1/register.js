document.getElementById('register-form').onsubmit = function(event) {
    event.preventDefault();
    let username = document.getElementById('new-username').value;
    let password = document.getElementById('new-password').value;
    let cpass = document.getElementById('confirm-password').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username)) {
        alert('Username already exists. Choose another one.');
    } else if(password != cpass){
        alert('Please confirm your password');
    }
    else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href="login.html";

        document.getElementById('register-form').reset();
    }
};