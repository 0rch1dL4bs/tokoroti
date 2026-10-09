// Array Produk Statis
const products = [
    {
        id: 1,
        name: "Garlic Bread",
        price: 15000,
        // Gambar representasi Garlic Bread
        img: "./images/garlic-bread.webp",
        desc: "Wangi gurih dari paduan bawang putih segar, parsley, dan butter premium.",
        isReadyToday: true
    },
    {
        id: 2,
        name: "Roti Coklat Keju",
        price: 18000,
        // Gambar representasi Roti isi/Coklat Keju
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
        isReadyToday: false // Disembunyikan oleh sistem karena tidak ready
    }
];

let cart = 0;

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    // Filter array agar hanya mengambil produk yang ready hari ini
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

window.addToCart = function(productId) {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct || !targetProduct.isReadyToday) return;

    cart += 1;
    document.getElementById('cart-count').innerText = cart;
    
    alert(`${targetProduct.name} berhasil ditambahkan ke keranjang!`);
};

document.addEventListener('DOMContentLoaded', renderProducts);