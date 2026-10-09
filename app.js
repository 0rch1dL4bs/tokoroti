// Array Produk Statis
const products = [
    {
        id: 1,
        name: "Garlic Bread",
        price: 15000,
        img: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80",
        desc: "Wangi gurih bawang putih dan butter premium.",
        isReadyToday: true
    },
    {
        id: 2,
        name: "Fudgie Brownies",
        price: 45000,
        img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
        desc: "Nyoklat banget, fudgy di dalam, crusty di luar.",
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

let cart = 0;

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    products.forEach(product => {
        const isAvailable = product.isReadyToday;

        const card = document.createElement('div');
        // Class 'unavailable' dikendalikan dari CSS untuk efek buram
        card.className = `card ${!isAvailable ? 'unavailable' : ''}`;
        
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" loading="lazy">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <span class="price">Rp ${product.price.toLocaleString('id-ID')}</span>
                
                <button class="btn-primary w-100" 
                    ${isAvailable ? `onclick="addToCart(${product.id})"` : 'disabled'} >
                    ${isAvailable ? 'Tambah ke Keranjang' : 'Habis / Tidak Ready'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.addToCart = function(productId) {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct || !targetProduct.isReadyToday) return;

    cart += 1;
    document.getElementById('cart-count').innerText = cart;
    
    // Opsional: Notifikasi sederhana
    alert(`${targetProduct.name} berhasil ditambahkan ke keranjang!`);
};

document.addEventListener('DOMContentLoaded', renderProducts);
``` *(Catatan: URL gambar di atas menggunakan contoh gambar roti dari Unsplash agar Anda bisa langsung melihat efek profesionalnya. Anda bisa menggantinya kembali dengan URL R2/lokal Anda nanti).*

