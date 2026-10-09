# Azizah Cake & Bakery - Web Catalog

Repositori ini berisi kode sumber (*source code*) untuk antarmuka katalog pemesanan daring Azizah Cake & Bakery, sebuah *artisan bakery* lokal yang berbasis di Balikpapan. 

Proyek ini dibangun dengan filosofi desain yang ringan, cepat, dan *serverless*, memfasilitasi pelanggan untuk memilih produk dan mengirimkan rekap pesanan langsung ke WhatsApp Admin.

## Teknologi yang Digunakan
Sistem ini murni menggunakan arsitektur *frontend* statis tanpa *framework* berat untuk memastikan waktu muat (*load time*) di bawah 1 detik:
- **HTML5 & CSS3**: Struktur responsif dengan sistem *Grid/Flexbox*.
- **Vanilla JavaScript**: Logika keranjang belanja (*client-side state*) dan *parser* URL WhatsApp.
- **WebP Assets**: Optimasi gambar lokal untuk efisiensi *bandwidth*.
- **Cloudflare Pages**: *Hosting* dan *Continuous Deployment* (CD) otomatis.

## Cara Menjalankan di Lokal (Local Development)
Karena aplikasi ini sepenuhnya statis, tidak diperlukan Node.js atau *backend runtime* khusus.
1. *Clone* repositori ini:

   git clone https://github.com/0rch1dL4bs/tokoroti.git
   <br>cd tokoroti
   <br>python3 -m http.server 8000

Kemudian akses ke http://localhost:8000
