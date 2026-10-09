// Array Produk Statis
const products = [
    {
        id: 1,
        name: "Garlic Bread",
        price: 15000,
        img: "./images/garlic-bread.webp", 
        desc: "Wangi gurih dari paduan bawang putih segar, parsley, dan butter premium.",
        isReadyToday: true
    },
    {
        id: 2,
        name: "Roti Coklat Keju",
        price: 18000,
        img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80", 
        desc: "Roti super lembut dengan isian coklat lumer dan parutan keju gurih.",
        isReadyToday: true
    },
    {
        id: 3,
        name: "Sourdough Artisan",
        price: 45000,
        img: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=600&q=80",
        desc: "Fermentasi alami 24 jam. Tanpa ragi instan.",
        isReadyToday: false 
    }
];

// Array untuk menyimpan item di keranjang
let cartItems = []; 

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    // Hanya tampilkan produk yang isReadyToday = true
    const readyProducts = products.filter(product => product.isReadyToday === true);

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

// Simulasi pengiriman form (tanpa Telegram)
window.processCheckout = function(event) {
    event.preventDefault(); // Mencegah reload halaman
    
    if (cartItems.length === 0) {
        alert("Keranjang kosong! Silakan pilih roti terlebih dahulu.");
        return;
    }

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    
    // Notifikasi berhasil
    alert(`Testing UI berhasil!\n\nPesanan atas nama: ${name}\nTelp/WA: ${phone}\n\nSiap diproses (Simulasi).`);
    
    // Membersihkan keranjang dan menutup modal
    cartItems = [];
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('checkout-form').reset();
    toggleCartModal();
};

document.addEventListener('DOMContentLoaded', renderProducts);