function isEmpty(value) {
    return value === null || value === undefined || value === '' || value === 'undefined';
}

function isNotEmpty(value) {
    return !isEmpty(value);
}

function isFalse(value) {
    return value === false || value === 'false' || value === 0 || value === '0';
}

function isTrue(value) {
    return value === true || value === 'true' || value === 1 || value === '1';
}

function showToast(message, icon = 'none', duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 9999;
        font-size: 14px;
        max-width: 80%;
        text-align: center;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, duration);
}

function navigateTo(url) {
    window.location.href = url;
}

function redirectTo(url) {
    window.location.replace(url);
}

function switchTab(url) {
    window.location.href = url;
}

function getStorageSync(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.error('getStorageSync error:', e);
        return '';
    }
}

function setStorageSync(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error('setStorageSync error:', e);
    }
}

function removeStorageSync(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('removeStorageSync error:', e);
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}