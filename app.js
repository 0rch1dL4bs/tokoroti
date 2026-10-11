// Variabel penampung produk (sekarang kosong, akan diisi dari API Flask)
let products = [];
let cartItems = []; 

// Fungsi baru untuk menarik data dinamis dari MariaDB via Flask API
async function loadCatalog() {
    try {
        // Ganti URL ini dengan domain/subdomain Flask Anda di shared hosting
        // Contoh: https://api.azizahcake.com/api/products
        const response = await fetch('https://[DOMAIN-HOSTING-ANDA]/api/products');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        products = await response.json(); 
        renderProducts(); // Panggil fungsi render setelah data JSON diterima
        
    } catch (error) {
        console.error("Gagal memuat katalog dari server:", error);
        document.getElementById('product-grid').innerHTML = '<p style="text-align:center; color:red;">Gagal memuat data produk. Silakan refresh halaman.</p>';
    }
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    // Hanya tampilkan produk yang isReadyToday = true atau 1 (tergantung format DB nanti)
    const readyProducts = products.filter(product => product.isReadyToday == true);

    readyProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card'; 
        
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" loading="lazy">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <span class="price">Rp ${product.price.toLocaleString('id-ID')}</span>
                
                <button class="btn-primary w-100" onclick="addToCart(${product.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Menambahkan produk ke keranjang
window.addToCart = function(productId) {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct || !targetProduct.isReadyToday) return;

    cartItems.push(targetProduct);
    document.getElementById('cart-count').innerText = cartItems.length;
    console.log(`${targetProduct.name} ditambahkan.`);
};

// Membuka atau menutup modal keranjang
window.toggleCartModal = function() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items-container');
    
    if (!modal.classList.contains('active')) {
        container.innerHTML = '';
        
        if (cartItems.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:gray;">Keranjang masih kosong.</p>';
        } else {
            // Menghitung jumlah per produk
            const tally = cartItems.reduce((acc, curr) => {
                acc[curr.name] = (acc[curr.name] || 0) + 1;
                return acc;
            }, {});

            let totalHarga = 0;
            for (let [name, qty] of Object.entries(tally)) {
                const prod = products.find(p => p.name === name);
                const subTotal = prod.price * qty;
                totalHarga += subTotal;
                
                container.innerHTML += `
                    <div class="cart-item-row">
                        <span>${qty}x ${name}</span>
                        <span>Rp ${subTotal.toLocaleString('id-ID')}</span>
                    </div>
                `;
            }
            container.innerHTML += `
                <div class="cart-item-row" style="border:none; font-weight:bold; margin-top:10px;">
                    <span>Total Estimasi:</span>
                    <span style="color:var(--primary-color);">Rp ${totalHarga.toLocaleString('id-ID')}</span>
                </div>
            `;
        }
    }
    
    modal.classList.toggle('active');
};

// Simulasi pengiriman form
window.processCheckout = function(event) {
    event.preventDefault(); 
    
    if (cartItems.length === 0) {
        alert("Keranjang kosong! Silakan pilih roti terlebih dahulu.");
        return;
    }

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    
    alert(`Testing UI berhasil!\n\nPesanan atas nama: ${name}\nTelp/WA: ${phone}\n\nSiap diproses (Simulasi).`);
    
    cartItems = [];
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('checkout-form').reset();
    toggleCartModal();
};

// Ubah DOMContentLoaded agar mengeksekusi loadCatalog() terlebih dahulu
document.addEventListener('DOMContentLoaded', loadCatalog);