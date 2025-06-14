const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Daftar URL untuk mendapatkan proxy
const urls = [
  "https://raw.githubusercontent.com/RamaXgithub/proxysc3/refs/heads/main/proxy.txt",
  "https://raw.githubusercontent.com/RamaXgithub/proxysc4/refs/heads/main/proxy.txt",
  "https://raw.githubusercontent.com/RamaXgithub/proxysc2/refs/heads/main/proxy.txt",
  "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt"
];

// Fungsi untuk memilih URL secara acak
function getRandomUrl(urls) {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
}

// Fungsi untuk mengunduh file proxy secara acak dan menyimpannya
async function fetchProxies() {
    const file = path.resolve(__dirname, '../proxy.txt'); // Lokasi file proxy.txt

    try {
        const randomUrl = getRandomUrl(urls); // Memilih URL acak

        console.log(`\x1b[33mMengambil proxy dari:\x1b[0m ${randomUrl}`);

        // Mengunduh file proxy
        const response = await axios.get(randomUrl);

        // Jika data bukan berupa teks, ubah ke string (untuk memastikan)
        const proxyData = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);

        // Menyimpan proxy ke dalam file
        fs.writeFileSync(file, proxyData, 'utf8');
        console.log(`\x1b[32mSukses menyimpan proxy ke dalam file:\x1b[0m ${file}`);

        // Menghitung jumlah baris (proxy) yang berhasil diambil
        const total = proxyData.split('\n').length;
        console.log(`\n\x1b[37m( \x1b[33m${total}\x1b[37m ) \x1b[32mProxy berhasil diambil dari file.\n (Ambil proxy berjumlah banyak!)\x1b[0m`);
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

fetchProxies();