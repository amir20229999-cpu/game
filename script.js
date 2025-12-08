// فایل اسکریپت مشترک
// تمام توابع مهم از index.html در اینجا قرار گرفته‌اند

// توابع اصلی مدیریت محصولات
window.Products = {
    getAll: function() {
        return JSON.parse(localStorage.getItem('monaco_products')) || [];
    },
    
    add: function(product) {
        const products = this.getAll();
        product.id = Date.now();
        products.push(product);
        localStorage.setItem('monaco_products', JSON.stringify(products));
        return product;
    },
    
    update: function(productId, updates) {
        const products = this.getAll();
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = {...products[index], ...updates};
            localStorage.setItem('monaco_products', JSON.stringify(products));
            return products[index];
        }
        return null;
    },
    
    delete: function(productId) {
        const products = this.getAll();
        const filtered = products.filter(p => p.id !== productId);
        localStorage.setItem('monaco_products', JSON.stringify(filtered));
        return filtered;
    }
};

// توابع مدیریت کاربران
window.Users = {
    getAll: function() {
        return JSON.parse(localStorage.getItem('monaco_users')) || [];
    },
    
    add: function(user) {
        const users = this.getAll();
        user.id = Date.now();
        users.push(user);
        localStorage.setItem('monaco_users', JSON.stringify(users));
        return user;
    },
    
    find: function(email, password) {
        const users = this.getAll();
        return users.find(u => u.email === email && u.password === password);
    },
    
    exists: function(email) {
        const users = this.getAll();
        return users.some(u => u.email === email);
    }
};

// تابع کمکی برای اعتبارسنجی ایمیل
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// تابع کمکی برای فرمت کردن قیمت
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

// مدیریت پخش موسیقی (در صورت نیاز)
window.MusicPlayer = {
    audio: null,
    isPlaying: false,
    
    init: function() {
        this.audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-sunny-happy-joyful-312.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.3;
    },
    
    toggle: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },
    
    play: function() {
        if (this.audio) {
            this.audio.play().then(() => {
                this.isPlaying = true;
            }).catch(e => {
                console.log('خطا در پخش موسیقی:', e);
            });
        }
    },
    
    pause: function() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
    },
    
    setVolume: function(volume) {
        if (this.audio) {
            this.audio.volume = volume;
        }
    }
};

// مدیریت تصاویر محصول
window.ImageManager = {
    uploadedImages: [],
    
    setupUploader: function(uploadAreaId, uploadInputId, previewContainerId) {
        const uploadArea = document.getElementById(uploadAreaId);
        const uploadInput = document.getElementById(uploadInputId);
        const previewContainer = document.getElementById(previewContainerId);
        
        if (!uploadArea || !uploadInput) return;
        
        uploadArea.addEventListener('click', () => uploadInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#28a745';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#dee2e6';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#dee2e6';
            this.handleFiles(e.dataTransfer.files, previewContainer);
        });
        
        uploadInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files, previewContainer);
        });
    },
    
    handleFiles: function(files, previewContainer) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                alert('فقط فایل‌های تصویری مجاز هستند');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImages.push(e.target.result);
                this.updatePreview(previewContainer);
            };
            reader.readAsDataURL(file);
        });
    },
    
    updatePreview: function(previewContainer) {
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';
        this.uploadedImages.forEach((imgData, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.style.cssText = `
                position: relative;
                width: 100px;
                height: 100px;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid #eee;
            `;
            imgDiv.innerHTML = `
                <img src="${imgData}" style="width: 100%; height: 100%; object-fit: cover;">
                <button onclick="ImageManager.removeImage(${index})" 
                        style="position: absolute; top: 5px; left: 5px; 
                               background: rgba(220, 53, 69, 0.9); 
                               color: white; border: none; border-radius: 50%; 
                               width: 24px; height: 24px; cursor: pointer;">
                    ×
                </button>
            `;
            previewContainer.appendChild(imgDiv);
        });
    },
    
    removeImage: function(index) {
        this.uploadedImages.splice(index, 1);
        const previewContainer = document.getElementById('uploadedImages');
        if (previewContainer) {
            this.updatePreview(previewContainer);
        }
    },
    
    clear: function() {
        this.uploadedImages = [];
        const previewContainer = document.getElementById('uploadedImages');
        if (previewContainer) {
            previewContainer.innerHTML = '';
        }
    }
};

// مدیریت رنگ‌ها
window.ColorManager = {
    selectedColors: [],
    
    addColor: function(nameInputId, pickerId, containerId) {
        const nameInput = document.getElementById(nameInputId);
        const picker = document.getElementById(pickerId);
        const container = document.getElementById(containerId);
        
        if (!nameInput || !picker || !container) return;
        
        const name = nameInput.value.trim();
        const value = picker.value;
        
        if (!name) {
            alert('لطفاً نام رنگ را وارد کنید');
            return;
        }
        
        if (this.selectedColors.some(c => c.name === name || c.value === value)) {
            alert('این رنگ قبلاً اضافه شده است');
            return;
        }
        
        this.selectedColors.push({ name, value });
        this.updateDisplay(container);
        
        nameInput.value = '';
        picker.value = '#000000';
    },
    
    updateDisplay: function(container) {
        if (!container) return;
        
        container.innerHTML = '';
        this.selectedColors.forEach((color, index) => {
            const colorItem = document.createElement('div');
            colorItem.style.cssText = `
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: #f8f9fa;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.9rem;
            `;
            colorItem.innerHTML = `
                <div style="width: 20px; height: 20px; border-radius: 50%; 
                           background-color: ${color.value}; border: 2px solid #fff;
                           box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
                <span>${color.name}</span>
                <button onclick="ColorManager.removeColor(${index})" 
                        style="background: none; border: none; 
                               color: #dc3545; cursor: pointer;
                               font-size: 0.8rem; padding: 0 0.3rem;">
                    ×
                </button>
            `;
            container.appendChild(colorItem);
        });
    },
    
    removeColor: function(index) {
        this.selectedColors.splice(index, 1);
        const container = document.getElementById('selectedColors');
        if (container) {
            this.updateDisplay(container);
        }
    },
    
    clear: function() {
        this.selectedColors = [];
        const container = document.getElementById('selectedColors');
        if (container) {
            container.innerHTML = '';
        }
    }
};

// تابع راهنمای خرید
window.showBuyGuide = function() {
    alert("🛍️ راهنمای خرید از بوتیک موناکو:\n\n" +
          "1️⃣ محصول مورد نظر خود را انتخاب کنید\n" +
          "2️⃣ روی دکمه 'واتس‌اپ' یا 'تلگرام' کلیک کنید\n" +
          "3️⃣ پیام پیش‌فرض را ارسال کنید\n" +
          "4️⃣ کارشناسان ما با شما تماس خواهند گرفت\n\n" +
          "📞 شماره تماس: ۰۹۱۲۹۵۷۳۰۹۶\n" +
          "💬 واتس‌اپ: همین شماره\n" +
          "📱 تلگرام: همین شماره");
};

// تابع نمایش اطلاعات تماس
window.showContactInfo = function() {
    alert("📞 اطلاعات تماس بوتیک موناکو:\n\n" +
          "شماره تماس: ۰۹۱۲۹۵۷۳۰۹۶\n" +
          "واتس‌اپ: همین شماره\n" +
          "تلگرام: همین شماره\n\n" +
          "ساعات پاسخگویی:\n" +
          "📅 همه روزه\n" +
          "⏰ ۹ صبح تا ۹ شب");
};

// تابع ارسال پیام واتس‌اپ
window.sendWhatsAppMessage = function() {
    const phoneNumber = "989129573096";
    const message = "سلام! 👋\nمی‌خواهم از بوتیک موناکو خرید کنم.\nلطفاً راهنمایی ام کنید.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// تابع ارسال پیام تلگرام
window.sendTelegramMessage = function() {
    const phoneNumber = "989129573096";
    const message = "سلام! 👋\nمی‌خواهم از بوتیک موناکو خرید کنم.\nلطفاً راهنمایی ام کنید.";
    const url = `https://t.me/+${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// مدیریت لاگین/لاگ‌اوت
window.Auth = {
    login: function(email, password) {
        // بررسی مدیر سیستم
        if (email === "admin_shaian@gmail.com" && password === "shaian_112233") {
            return {
                name: 'مدیر سیستم',
                email: email,
                isAdmin: true
            };
        }
        
        // بررسی کاربران عادی
        const user = Users.find(email, password);
        return user || null;
    },
    
    register: function(name, email, password) {
        if (Users.exists(email)) {
            throw new Error('این ایمیل قبلاً ثبت‌نام شده است');
        }
        
        if (password.length < 6) {
            throw new Error('رمز عبور باید حداقل ۶ کاراکتر باشد');
        }
        
        return Users.add({ name, email, password });
    },
    
    logout: function() {
        localStorage.removeItem('current_user');
        return true;
    },
    
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('current_user'));
    },
    
    isLoggedIn: function() {
        return !!this.getCurrentUser();
    },
    
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.isAdmin;
    }
};

// مدیریت مودال‌ها
window.Modal = {
    open: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    close: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    closeAll: function() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
};

// رویداد کلیک خارج از مودال
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            Modal.closeAll();
        }
    });
};

// بستن مودال با Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        Modal.closeAll();
    }
});

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    // مقداردهی اولیه پخش کننده موسیقی
    if (window.MusicPlayer) {
        MusicPlayer.init();
    }
    
    // اضافه کردن رویداد برای بستن مودال
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || 
            e.target.classList.contains('close-btn')) {
            Modal.closeAll();
        }
    });
});

console.log('فایل script.js با موفقیت بارگذاری شد');
