import React, { useState } from 'react';

// Komponen utama aplikasi untuk formulir e-Domisili
function App() {
  // Variabel state untuk setiap field formulir
  const [nik, setNik] = useState(''); // State untuk NIK (Nomor Induk Kependudukan)
  const [nama, setNama] = useState(''); // State untuk Nama Lengkap
  const [telepon, setTelepon] = useState(''); // State untuk Nomor Telepon
  const [alamatSekarang, setAlamatSekarang] = useState(''); // State untuk Alamat Lengkap Saat Ini
  const [fotoKTP, setFotoKTP] = useState(null); // State untuk Foto KTP (menyimpan objek File)
  const [tipeDomisili, setTipeDomisili] = useState(''); // State untuk Tipe Domisili

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah perilaku default pengiriman formulir

    // Untuk demonstrasi, tampilkan data formulir ke konsol
    console.log({
      nik,
      nama,
      telepon,
      alamatSekarang,
      fotoKTP: fotoKTP ? fotoKTP.name : 'Tidak ada file yang diunggah', // Tampilkan nama file jika tersedia
      tipeDomisili,
    });

    // Dalam aplikasi nyata, Anda akan mengirim data ini ke API backend Anda di sini
    // Contoh:
    // const formData = new FormData();
    // formData.append('nik', nik);
    // formData.append('nama', nama);
    // formData.append('telepon', telepon);
    // formData.append('alamatSekarang', alamatSekarang);
    // if (fotoKTP) formData.append('fotoKTP', fotoKTP);
    // formData.append('tipeDomisili', tipeDomisili);
    //
    // try {
    //   const response = await fetch('/api/submit-domisili', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const result = await response.json();
    //   console.log('Pengajuan berhasil:', result);
    //   // Dalam produksi, gunakan modal kustom, bukan alert()
    //   alert('Pengajuan berhasil dikirim!');
    //   // Secara opsional bersihkan formulir atau alihkan halaman
    // } catch (error) {
    //   console.error('Terjadi kesalahan pengajuan:', error);
    //   // Dalam produksi, gunakan modal kustom, bukan alert()
    //   alert('Terjadi kesalahan saat mengirim pengajuan.');
    // }
  };

  // Fungsi untuk menangani pemilihan file foto KTP
  const handleFileChange = (e) => {
    // Dapatkan file yang dipilih dari input
    if (e.target.files && e.target.files[0]) {
      setFotoKTP(e.target.files[0]); // Tetapkan objek file ke state
    } else {
      setFotoKTP(null); // Kosongkan state jika tidak ada file yang dipilih
    }
  };

  return (
    <>
      {/* CSS untuk styling formulir - Ditempatkan langsung di komponen */}
      <style>
        {`
        /* Gaya global untuk elemen body dan root */
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #f3f4f6; /* Latar belakang abu-abu muda */
        }

        /* Wadah untuk seluruh aplikasi, berada di tengah layar */
        .app-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem; /* Padding lebih kecil di layar kecil */
        }

        /* Media query untuk layar lebih besar */
        @media (min-width: 640px) { /* sm breakpoint dalam Tailwind */
          .app-container {
            padding: 1.5rem;
          }
        }

        @media (min-width: 1024px) { /* lg breakpoint dalam Tailwind */
          .app-container {
            padding: 2rem;
          }
        }

        /* Wadah kartu untuk formulir */
        .form-card {
          background-color: #ffffff; /* Latar belakang putih */
          padding: 1.5rem; /* Padding lebih kecil di layar kecil */
          border-radius: 0.5rem; /* Sudut membulat */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Bayangan lembut */
          width: 100%;
          max-width: 40rem; /* Lebar maksimal untuk layar yang lebih lebar */
        }

        /* Media query untuk layar menengah */
        @media (min-width: 640px) { /* sm breakpoint dalam Tailwind */
          .form-card {
            padding: 2rem;
            max-width: 32rem; /* Max-width disesuaikan untuk md */
          }
        }

        @media (min-width: 768px) { /* md breakpoint dalam Tailwind */
          .form-card {
            max-width: 36rem; /* Max-width disesuaikan untuk lg */
          }
        }

        @media (min-width: 1024px) { /* lg breakpoint dalam Tailwind */
          .form-card {
            max-width: 40rem; /* Max-width disesuaikan untuk xl */
          }
        }


        /* Styling judul formulir */
        .form-title {
          font-size: 1.5rem; /* Ukuran font 2xl */
          font-weight: 700; /* bold */
          color: #1f2937; /* gray-800 */
          text-align: center;
          margin-bottom: 1.5rem; /* mb-6 */
        }

        /* Media query untuk ukuran judul formulir yang lebih kecil */
        @media (min-width: 640px) { /* sm breakpoint dalam Tailwind */
          .form-title {
            font-size: 1.875rem; /* Ukuran font 3xl */
            margin-bottom: 2rem; /* mb-8 */
          }
        }

        /* Tata letak grid untuk field formulir */
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem; /* space-y-4 */
        }

        /* Media query untuk gap yang lebih besar */
        @media (min-width: 640px) { /* sm breakpoint dalam Tailwind */
          .form-grid {
            gap: 1.25rem; /* space-y-5 */
          }
        }

        /* Wadah field formulir individual */
        .form-field {
          /* Tidak ada gaya spesifik yang dibutuhkan di sini, terutama untuk spasi */
        }

        /* Styling label */
        .form-label {
          display: block;
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          color: #374151; /* gray-700 */
          margin-bottom: 0.25rem; /* mb-1 */
        }

        /* Styling input dan textarea */
        .form-input,
        .form-select,
        .form-input-file {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem; /* px-3 py-2 */
          border: 1px solid #d1d5db; /* border-gray-300 */
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          outline: none;
          font-size: 1rem; /* ukuran teks dasar */
        }

        .form-input:focus,
        .form-select:focus,
        .form-input-file:focus {
          border-color: #3b82f6; /* focus:border-blue-500 */
          box-shadow: 0 0 0 1px #3b82f6, 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-blue-500 */
        }

        /* Media query untuk ukuran font input */
        @media (min-width: 640px) { /* sm breakpoint dalam Tailwind */
          .form-input,
          .form-select {
            font-size: 1rem; /* sm:text-base */
          }
        }

        /* Styling spesifik untuk resize textarea */
        .textarea-resize {
          resize: vertical; /* Izinkan perubahan ukuran vertikal */
        }

        /* Styling spesifik input file */
        .form-input-file {
          font-size: 0.875rem; /* text-sm */
          color: #111827; /* text-gray-900 */
          background-color: #f9fafb; /* bg-gray-50 */
          cursor: pointer;
        }

        .form-input-file::-webkit-file-upload-button {
          margin-right: 1rem; /* file:mr-4 */
          padding: 0.5rem 1rem; /* file:py-2 file:px-4 */
          border-radius: 0.375rem; /* file:rounded-md */
          border: 0; /* file:border-0 */
          font-size: 0.875rem; /* file:text-sm */
          font-weight: 600; /* file:font-semibold */
          background-color: #eff6ff; /* file:bg-blue-50 */
          color: #1d4ed8; /* file:text-blue-700 */
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }

        .form-input-file::file-selector-button { /* Properti standar untuk tombol input file */
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 0;
          font-size: 0.875rem;
          font-weight: 600;
          background-color: #eff6ff;
          color: #1d4ed8;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }

        .form-input-file::-webkit-file-upload-button:hover,
        .form-input-file::file-selector-button:hover {
          background-color: #dbeafe; /* hover:file:bg-blue-100 */
        }

        /* Tampilan nama file di bawah input file */
        .file-name-display {
          margin-top: 0.5rem; /* mt-2 */
          font-size: 0.875rem; /* text-sm */
          color: #6b7280; /* text-gray-500 */
        }

        .file-name-text {
          font-weight: 600; /* font-semibold */
        }

        /* Styling spesifik dropdown select */
        .form-select {
          padding-right: 2.5rem; /* Sesuaikan padding untuk panah dropdown */
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.5em 1.5em;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }


        /* Styling tombol submit */
        .submit-button {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0.75rem 1rem; /* py-2 px-4 */
          border: 1px solid transparent;
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          color: #ffffff; /* text-white */
          background-color: #2563eb; /* bg-blue-600 */
          cursor: pointer;
          transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out; /* transisi duration-300 ease-in-out */
        }

        .submit-button:hover {
          background-color: #1d4ed8; /* hover:bg-blue-700 */
          transform: scale(1.02); /* hover:scale-105 */
        }

        .submit-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #bfdbfe, 0 0 0 4px #3b82f6; /* focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 */
        }

        /* Gaya dasar terkait aplikasi yang sering ditemukan di create-react-app (dipertahankan untuk kelengkapan jika diperlukan) */
        /* Anda mungkin tidak memerlukan gaya spesifik ini jika tata letak Anda sepenuhnya kustom */
        .App {
          text-align: center;
        }

        .App-logo {
          height: 40vmin;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          .App-logo {
            animation: App-logo-spin infinite 20s linear;
          }
        }

        .App-header {
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        }

        .App-link {
          color: #61dafb;
        }

        @keyframes App-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        `}
      </style>

      {/* Wadah utama untuk aplikasi, berada di tengah layar */}
      <div className="app-container">
        {/* Wadah formulir */}
        <div className="form-card">
          {/* Judul formulir */}
          <h1 className="form-title">
            Formulir Pengajuan Surat Keterangan Domisili
          </h1>

          {/* Formulir utama */}
          <form onSubmit={handleSubmit} className="form-grid">
            {/* Field NIK */}
            <div className="form-field">
              <label htmlFor="nik" className="form-label">
                NIK (Nomor Induk Kependudukan)
              </label>
              <input
                type="text" // Tipe input teks untuk NIK
                id="nik"
                name="nik"
                value={nik}
                onChange={(e) => setNik(e.target.value)} // Perbarui state NIK saat terjadi perubahan
                required // Jadikan field wajib diisi
                placeholder="Masukkan NIK Anda"
                className="form-input"
              />
            </div>

            {/* Field Nama */}
            <div className="form-field">
              <label htmlFor="nama" className="form-label">
                Nama Lengkap
              </label>
              <input
                type="text" // Tipe input teks untuk Nama
                id="nama"
                name="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)} // Perbarui state Nama saat terjadi perubahan
                required // Jadikan field wajib diisi
                placeholder="Masukkan Nama Lengkap Anda"
                className="form-input"
              />
            </div>

            {/* Field Telepon */}
            <div className="form-field">
              <label htmlFor="telepon" className="form-label">
                Nomor Telepon
              </label>
              <input
                type="tel" // Tipe input tel untuk Nomor Telepon
                id="telepon"
                name="telepon"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)} // Perbarui state Telepon saat terjadi perubahan
                required // Jadikan field wajib diisi
                placeholder="Contoh: 081234567890"
                className="form-input"
              />
            </div>

            {/* Field Alamat Sekarang */}
            <div className="form-field">
              <label htmlFor="alamatSekarang" className="form-label">
                Alamat Lengkap Saat Ini
              </label>
              <textarea
                id="alamatSekarang"
                name="alamatSekarang"
                value={alamatSekarang}
                onChange={(e) => setAlamatSekarang(e.target.value)} // Perbarui state Alamat saat terjadi perubahan
                required // Jadikan field wajib diisi
                rows="3" // Atur jumlah baris untuk textarea
                placeholder="Masukkan alamat lengkap Anda (Jalan, Nomor, RT/RW, Kelurahan/Desa, Kecamatan, Kota/Kabupaten, Provinsi)"
                className="form-input textarea-resize"
              ></textarea>
            </div>

            {/* Field Unggah Foto KTP */}
            <div className="form-field">
              <label htmlFor="fotoKTP" className="form-label">
                Unggah Foto KTP
              </label>
              <input
                type="file" // Tipe input file untuk unggahan file
                id="fotoKTP"
                name="fotoKTP"
                accept="image/*" // Hanya menerima file gambar
                onChange={handleFileChange} // Tangani pemilihan file
                required // Jadikan field wajib diisi
                className="form-input-file"
              />
              {/* Tampilkan nama file yang dipilih */}
              {fotoKTP && (
                <p className="file-name-display">
                  File terpilih: <span className="file-name-text">{fotoKTP.name}</span>
                </p>
              )}
            </div>

            {/* Dropdown Tipe Domisili */}
            <div className="form-field">
              <label htmlFor="tipeDomisili" className="form-label">
                Tipe Domisili
              </label>
              <select
                id="tipeDomisili"
                name="tipeDomisili"
                value={tipeDomisili}
                onChange={(e) => setTipeDomisili(e.target.value)} // Perbarui state Tipe Domisili saat terjadi perubahan
                required // Jadikan field wajib diisi
                className="form-select"
              >
                <option value="">Pilih Tipe Domisili</option> {/* Opsi default */}
                <option value="tetap">Tetap</option> {/* Opsi untuk "Tetap" */}
                <option value="kontrak">Kontrak</option> {/* Opsi untuk "Kontrak" */}
              </select>
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit" // Tombol kirim
              className="submit-button"
            >
              Ajukan Surat Domisili
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
