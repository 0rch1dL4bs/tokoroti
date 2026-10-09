// Konfigurasi Endpoint Cloudflare R2
const R2_BASE_URL = "https://pub-xxxxxxxx.r2.dev"; 

// Data Mockup Backend (Katalog Produk)
const products = [
    {
        id: 1,
        name: "Garlic Bread",
        price: 10000,
        img: `${R2_BASE_URL}/sourdough-artisan.jpg`, 
        desc: "Dibuat dari baham alami",
        isReadyToday: true // Produk tersedia hari ini
    },
    {
        id: 2,
        name: "Roti Coklat",
        price: 8000,
        img: `${R2_BASE_URL}/croissant.jpg`,
        desc: "Renyah di luar, lembut di dalam.",
        isReadyToday: false // Produk TIDAK tersedia hari ini
    },
    {
        id: 3,
        name: "Fudgie Brownies",
        price: 10000,
        img: `${R2_BASE_URL}/gandum-utuh.jpg`,
        desc: "Kaya serat, tanpa pengawet.",
        isReadyToday: true // Produk tersedia hari ini
    }
];

let cart = 0;

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    products.forEach(product => {
        // Cek ketersediaan produk
        const isAvailable = product.isReadyToday;

        const card = document.createElement('div');
        // Tambahkan class 'unavailable' jika isReadyToday bernilai false
        card.className = `card ${!isAvailable ? 'unavailable' : ''}`;
        
        // Gunakan properti 'disabled' pada button HTML secara native
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" loading="lazy">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${product.desc}</p>
                <span class="price">Rp ${product.price.toLocaleString('id-ID')}</span>
                
                <button class="btn-primary w-100" 
                    ${isAvailable ? `onclick="addToCart(${product.id})"` : 'disabled'} 
                    style="width:100%">
                    ${isAvailable ? 'Tambah ke Keranjang' : 'Habis / Tidak Ready'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.addToCart = function(productId) {
    // Validasi ekstra di level fungsi untuk keamanan tambahan di sisi klien
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct || !targetProduct.isReadyToday) {
        console.warn("Aksi ditolak: Produk tidak tersedia hari ini.");
        return;
    }

    cart += 1;
    document.getElementById('cart-count').innerText = cart;
    console.log(`Produk ID ${productId} ditambahkan. Total item: ${cart}`);
};

document.addEventListener('DOMContentLoaded', renderProducts);