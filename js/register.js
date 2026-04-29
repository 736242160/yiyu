document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', doRegister);
    }
});

function doRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const login = formData.get('login');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (isEmpty(login)) {
        showToast('请输入用户名');
        return;
    }

    if (isEmpty(password)) {
        showToast('请输入密码');
        return;
    }

    if (isEmpty(confirmPassword)) {
        showToast('请确认密码');
        return;
    }

    if (password !== confirmPassword) {
        showToast('两次输入的密码不一致');
        return;
    }

    // 写死：直接注册成功，不需要和后台交互
    showToast('注册成功');
    setTimeout(() => {
        redirectTo('login.html');
    }, 1000);
}

function goToLogin() {
    redirectTo('login.html');
}