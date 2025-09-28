# Image-to-Video Demo


Instruksi singkat untuk menjalankan project ini secara lokal.


## Prasyarat
- Node.js (14+)
- npm
- ffmpeg (harus tersedia di PATH) — untuk DEMO mode.


Linux (Debian/Ubuntu):
sudo apt update && sudo apt install -y ffmpeg


Mac (Homebrew):
brew install ffmpeg


## Install & Run
1. Copy file dari dokumen ini ke folder project.
2. `cp .env.example .env` lalu edit jika perlu.
3. `npm install`
4. `npm start`
5. Buka `http://localhost:3000` dan coba upload gambar.


## Mengganti ke provider AI
Jika ingin integrasikan ke layanan AI image-to-video:
- Ubah `MODE=provider` di `.env`.
- Edit `server.js` di bagian `if (MODE === 'provider') { ... }` dan implementasikan request ke API provider Anda.
- Pastikan menaruh API key di `.env`.
