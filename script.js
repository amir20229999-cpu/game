// توابع مشترک بین index.html و admin.html

// آدرس فایل JSON محصولات
const PRODUCTS_FILE = 'products.json';

// بارگذاری محصولات از فایل JSON
async function loadProducts() {
    try {
        const response = await fetch(PRODUCTS_FILE);
        if (!response.ok) {
            throw new Error('فایل محصولات یافت نشد');
        }
        return await response.json();
    } catch (error) {
        console.error('خطا در بارگذاری محصولات:', error);
        // اگر فایل وجود نداشت، از محصولات پیش‌فرض استفاده کن
        return getDefaultProducts();
    }
}

// محصولات پیش‌فرض
function getDefaultProducts() {
    return [
        {
            "id": 1,
            "name": "پیراهن مردانه کلاسیک",
            "price": 350000,
            "description": "پیراهن مردانه با کیفیت بالا",
            "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
            "colors": ["مشکی"]
        }
    ];
}

// نمایش محصولات در صفحه اصلی
async function displayProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return; // اگر در صفحه admin هستیم، ادامه نده
    
    const products = await loadProducts();
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">
                    ${product.description || ''}
                </p>
                <div class="product-price">${product.price.toLocaleString()} تومان</div>
                <button onclick="orderProduct(${product.id}, '${product.name}', ${product.price})" 
                        class="btn btn-whatsapp" style="width: 100%;">
                    <i class="fab fa-whatsapp"></i> سفارش در واتس‌اپ
                </button>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

// سفارش محصول
function orderProduct(id, name, price) {
    const phone = prompt("📱 لطفاً شماره موبایل خود را وارد کنید:");
    
    if (!phone || phone.length !== 11) {
        alert("لطفاً شماره موبایل معتبر وارد کنید (۱۱ رقم)");
        return;
    }
    
    const message = `🛒 سفارش جدید از موناکو:\n\n`;
    const message2 = `محصول: ${name}\n`;
    const message3 = `قیمت: ${price.toLocaleString()} تومان\n`;
    const message4 = `شماره مشتری: ${phone}\n\n`;
    const message5 = `لطفاً با مشتری تماس بگیرید.`;
    
    const fullMessage = message + message2 + message3 + message4 + message5;
    
    // ارسال به واتس‌اپ شما
    const whatsappUrl = `https://wa.me/989129573096?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // ذخیره سفارش در localStorage
    saveOrder(id, name, price, phone);
}

// ذخیره سفارش
function saveOrder(productId, productName, price, phone) {
    let orders = JSON.parse(localStorage.getItem('monaco_orders')) || [];
    
    const order = {
        id: Date.now(),
        productId: productId,
        productName: productName,
        price: price,
        customerPhone: phone,
        date: new Date().toLocaleString('fa-IR'),
        status: 'pending'
    };
    
    orders.push(order);
    localStorage.setItem('monaco_orders', JSON.stringify(orders));
    
    alert("✅ سفارش شما ثبت شد!\nکارشناسان ما به زودی با شما تماس می‌گیرند.");
}

// توابع مدیریت محصولات (برای admin.html)
async function addProductToJSON(newProduct) {
    try {
        // ابتدا محصولات فعلی را بارگذاری کن
        const products = await loadProducts();
        
        // ID جدید ایجاد کن
        newProduct.id = Date.now();
        
        // محصول جدید را اضافه کن
        products.push(newProduct);
        
        // ذخیره در localStorage به صورت موقت
        localStorage.setItem('monaco_temp_products', JSON.stringify(products));
        
        showMessage('محصول با موفقیت اضافه شد!', 'success');
        
        // نمایش مجدد لیست محصولات
        if (typeof displayAdminProducts === 'function') {
            displayAdminProducts();
        }
        
        return true;
    } catch (error) {
        console.error('خطا در افزودن محصول:', error);
        showMessage('خطا در افزودن محصول', 'error');
        return false;
    }
}

// نمایش پیام
function showMessage(text, type = 'success') {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}

// نمایش محصولات در پنل مدیریت
async function displayAdminProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    const products = await loadProducts();
    
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">هنوز محصولی اضافه نشده است.</p>';
        return;
    }
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        productItem.innerHTML = `
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <div class="product-price">${product.price.toLocaleString()} تومان</div>
                <small>ID: ${product.id}</small>
            </div>
            <div class="product-actions">
                <button onclick="editProduct(${product.id})" class="btn" style="background: var(--warning);">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${product.id})" class="btn btn-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(productItem);
    });
}

// حذف محصول
async function deleteProduct(productId) {
    if (!confirm('آیا از حذف این محصول اطمینان دارید؟')) return;
    
    const products = await loadProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    
    // ذخیره در localStorage
    localStorage.setItem('monaco_temp_products', JSON.stringify(updatedProducts));
    
    showMessage('محصول با موفقیت حذف شد!', 'success');
    displayAdminProducts();
}

// ویرایش محصول
function editProduct(productId) {
    alert('این قابلیت در نسخه بعدی اضافه می‌شود.\nفعلاً می‌توانید محصول را حذف و مجدداً اضافه کنید.');
}

// وقتی صفحه بارگذاری شد
document.addEventListener('DOMContentLoaded', function() {
    // اگر در صفحه اصلی هستیم، محصولات را نمایش بده
    if (document.getElementById('productsContainer')) {
        displayProducts();
    }
    
    // اگر در صفحه مدیریت هستیم
    if (document.getElementById('addProductForm')) {
        displayAdminProducts();
        
        // رویداد فرم افزودن محصول
        document.getElementById('addProductForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const newProduct = {
                name: document.getElementById('productName').value.trim(),
                price: parseInt(document.getElementById('productPrice').value),
                image: document.getElementById('productImage').value.trim(),
                description: document.getElementById('productDescription').value.trim()
            };
            
            if (!newProduct.name || !newProduct.price || !newProduct.image) {
                showMessage('لطفاً همه فیلدهای ضروری را پر کنید', 'error');
                return;
            }
            
            const success = await addProductToJSON(newProduct);
            
            if (success) {
                // ریست فرم
                this.reset();
            }
        });
    }
});

// تابع برای دریافت محصولات نهایی (ترکیب localStorage و فایل اصلی)
async function getFinalProducts() {
    // اول از localStorage بخون (اگر مدیر اضافه کرده)
    const tempProducts = JSON.parse(localStorage.getItem('monaco_temp_products'));
    
    if (tempProducts && tempProducts.length > 0) {
        return tempProducts;
    }
    
    // اگر چیزی در localStorage نبود، از فایل اصلی بخون
    return await loadProducts();
}
