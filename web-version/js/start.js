document.addEventListener('DOMContentLoaded', function() {
    validateSession();
});

function validateSession() {
    // 跳转到登录页面
    showToast('欢迎使用医语小助手');
    setTimeout(() => {
        redirectTo('login.html');
    }, 1500);
}