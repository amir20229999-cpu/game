// توابع کمکی مشترک
const Monaco = {
    // ذخیره محصولات در LocalStorage
    saveProducts: function(products) {
        localStorage.setItem('monaco_products', JSON.stringify(products));
    },
    
    // دریافت محصولات از LocalStorage
    getProducts: function() {
        return JSON.parse(localStorage.getItem('monaco_products')) || [];
    },
    
    // خروجی گرفتن به صورت JSON
    exportToJson: function(data, filename = 'products.json') {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
        return true;
    }
};

console.log('کد مشترک بارگذاری شد');
