let products = []; // Sekarang array kosong, akan diisi dari JSON
let cartItems = []; 

// Fungsi mengambil data dari JSON
async function loadCatalog() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        products = data.products; // Memasukkan data JSON ke variabel sistem
        renderProducts();         // Panggil render setelah data siap
    } catch (error) {
        console.error("Gagal memuat katalog:", error);
    }
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

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

// ... (Biarkan fungsi window.addToCart, toggleCartModal, dan processCheckout ke WA persis seperti sebelumnya) ...

// Ganti DOMContentLoaded agar menjalankan loadCatalog, bukan renderProducts langsung
document.addEventListener('DOMContentLoaded', loadCatalog);

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
// Ganti dengan nomor WhatsApp Admin/Toko Anda (Gunakan format 62 tanpa + atau 0)
const WA_ADMIN_NUMBER = "6281316250484"; 

window.processCheckout = function(event) {
    event.preventDefault(); // Mencegah reload halaman
    
    if (cartItems.length === 0) {
        alert("Keranjang kosong! Silakan pilih roti terlebih dahulu.");
        return;
    }

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    
    // 1. Rekap pesanan dari keranjang
    const tally = cartItems.reduce((acc, curr) => {
        acc[curr.name] = (acc[curr.name] || 0) + 1;
        return acc;
    }, {});

    // 2. Rangkai teks pesan untuk WhatsApp
    let waText = `Halo Azizah Cake, saya ingin memesan roti hari ini:\n\n`;
    
    let totalHarga = 0;
    for (let [itemName, qty] of Object.entries(tally)) {
        const prod = products.find(p => p.name === itemName);
        const subTotal = prod.price * qty;
        totalHarga += subTotal;
        waText += `- ${qty}x ${itemName} (Rp ${subTotal.toLocaleString('id-ID')})\n`;
    }
    
    waText += `\n*Total Estimasi: Rp ${totalHarga.toLocaleString('id-ID')}*\n\n`;
    waText += `*Data Pemesan:*\n`;
    waText += `Nama: ${name}\n`;
    waText += `No. HP/WA: ${phone}\n\n`;
    waText += `Mohon info ketersediaan dan total pembayarannya ya. Terima kasih!`;

    // 3. Encode teks agar aman digunakan di URL (mengubah spasi jadi %20, enter jadi %0A, dll)
    const encodedText = encodeURIComponent(waText);
    
    // 4. Buat URL WhatsApp Click to Chat
    const waUrl = `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodedText}`;
    
    // 5. Buka tab baru menuju WhatsApp
    window.open(waUrl, '_blank');
    
    // 6. Reset keranjang dan tutup modal setelah dialihkan ke WA
    cartItems = [];
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('checkout-form').reset();
    toggleCartModal();
};

document.addEventListener('DOMContentLoaded', renderProducts);