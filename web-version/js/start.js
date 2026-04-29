document.addEventListener('DOMContentLoaded', function() {
    validateSession();
});

function validateSession() {
    // 跳转到登录页面
    showToast('欢迎使用见微知心');
    setTimeout(() => {
        redirectTo('login.html');
    }, 1500);
}