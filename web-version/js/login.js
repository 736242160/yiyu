document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', doLogin);
    }
});

function doLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const login = formData.get('login');
    const password = formData.get('password');

    if (isEmpty(login) || isEmpty(password)) {
        showToast('请输入用户名和密码');
        return;
    }

    // 写死：直接登录成功，不需要验证
    showToast('登录成功');
    setTimeout(() => {
        redirectTo('home.html');
    }, 1000);
}

function goToRegister() {
    redirectTo('register.html');
}

function goToModifyPassword() {
    redirectTo('modify_password.html');
}