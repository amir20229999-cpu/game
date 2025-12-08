// توابع مشترک بین صفحات

// بررسی اینکه آیا کاربر لاگین کرده
function isLoggedIn() {
    return localStorage.getItem('current_user') !== null;
}

// دریافت کاربر فعلی
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('current_user'));
}

// بررسی اینکه آیا کاربر ادمین است
function isAdmin() {
    const user = getCurrentUser();
    return user && user.isAdmin === true;
}

// لاگ‌اوت
function logout() {
    localStorage.removeItem('current_user');
    window.location.reload();
}

// نمایش پیام
function showMessage(message, type = 'info') {
    const colors = {
        success: '#00b894',
        error: '#d63031',
        warning: '#fdcb6e',
        info: '#0984e3'
    };
    
    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 9999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    div.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// استایل برای انیمیشن
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('فایل script.js بارگذاری شد');
