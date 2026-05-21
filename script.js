// =============================================
// ⚙️  KONFIGURASI TOKO — SESUAIKAN DENGAN DATA ANDA
// =============================================
const TOKO_CONFIG = {
    nama: 'markiel-olshop',
    whatsapp: '6281994970727',     // format 62xxx tanpa + atau 0

    // ✅ FILTER KURIR — hanya kurir ini yang ditampilkan ke buyer
    // Ganti/tambah sesuai ekspedisi yang tersedia di sekitar rumah Anda
    // Nama harus mengandung kata yang muncul di dropdown (tidak harus persis)
    kurirDiizinkan: ['SiCepat', 'JNE', 'J&T Express', 'J&T Cargo', 'Lion Parcel'],

    // Rekening bank untuk transfer — ganti dengan data asli Anda
    bankAccounts: [
        //{ bank: 'BCA',     norek: 'XXXX-XXXX-XXXX', atas_nama: 'Nama Pemilik Toko' },
        { bank: 'BCA',     norek: '7391049720', atas_nama: 'Henry Octovianus' },
        { bank: 'Mandiri', norek: '1240006195474', atas_nama: 'Henry Octovianus' },
    ],

    qrisImage: 'qris_markiel-olshop.png',  // nama file foto QRIS di folder website
};

// =============================================
// DOM Elements
// =============================================
const hamburger        = document.querySelector('.hamburger');
const navMenu          = document.querySelector('.nav-menu');
const cartIcon         = document.querySelector('.cart-icon');
const cartModal        = document.querySelector('.cart-modal');
const closeCart        = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount        = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');
const clearCartBtn     = document.querySelector('.clear-cart');
const checkoutBtn      = document.getElementById('checkoutBtn') || document.querySelector('.checkout-btn');

// Slider
const slider       = document.querySelector('.slider');
const slides       = document.querySelectorAll('.slide');
const prevBtn      = document.querySelector('.prev-btn');
const nextBtn      = document.querySelector('.next-btn');
const dots         = document.querySelectorAll('.dot');

// Spec Modal
const specModal  = document.querySelector('.spec-modal');
const closeSpec  = document.querySelector('.close-spec');
const specBody   = document.querySelector('.spec-body');

// Lightbox
const photoLightbox    = document.getElementById('photoLightbox');
const lightboxImg      = document.getElementById('lightboxImg');
const lightboxClose    = document.getElementById('lightboxClose');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

// About Modal
const aboutModal = document.querySelector('.about-modal');
const closeAbout = document.querySelector('.close-about');

// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');

// Cart Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// =============================================
// PETA WARNA → KODE HEX
// =============================================
const colorHexMap = {
    "Biru Navy":"#1a2e6e","Navy":"#1a2e6e","Cokelat Tua":"#3d1c02","Hitam":"#111111",
    "Merah Marun":"#7b0f1a","Merah Mawar":"#d63b6e","Biru Pastel":"#89b4d8",
    "Kuning Lemon":"#f7e94a","Hijau Mint":"#7ecfac","Putih":"#f5f5f5","Putih Tulang":"#f0ebe0",
    "Abu-abu":"#8e8e8e","Abu-abu Tua":"#4a4a4a","Merah":"#d92b2b","Hijau Army":"#4a5628",
    "Dusty Pink":"#ff4d94","Cokelat":"#6b3f1c","Cokelat Muda":"#b8895a","Krem / Khaki":"#c9b785",
    "Olive Green":"#6b7c3c","Biru Muda":"#7ab8d8","Sage Green":"#7aaa95","Peach":"#f5b88c",
    "Lavender":"#c09ad0","Light Blue Wash":"#8ab5d8","Medium Blue":"#3160a8",
    "Dark Indigo":"#1a1850","Black Denim":"#1c1c22",
    "Original":"#c8a06e","Pedas":"#e74c3c","Ekstra Pedas":"#8b1a1a","Manis":"#f5a623",
    "Asin":"#7fb3d3","Keju":"#f7dc6f","Pandan":"#6db33f","Balado":"#c0392b","BBQ":"#6b2d0f",
    "Ayam Goreng":"#d4a04c","Ayam Bakar":"#8b5e3c","Ikan Bakar":"#5d7d9e",
    "Cokelat Original":"#3d1c02","Cokelat Keju":"#8b5a00","Marble":"#888888","Purple":"#9b59b6",
    "Abu2 Muda":"#a19a9a", "Biru":"#192a62", "Bata":"#b35d3b", "Pink":"#c97e8a",
    "Green":"#5fb89a", "Yellow":"#f0c419",
    "Black":"#1a1a1a", "Brown":"#7a5a4a", "White":"#f5f0e8",
    "Blue":"#8a9dd9",
    "Black Red":"#3d141a", "Maroon":"#5a1a26",
    "Grey":"#a5b4c2",
    "Hijau Tua":"#2d6b3d", "Kuning Tua":"#c9a234", "Marun":"#8a1820", "Oranye":"#b85a28"
};

const lightColors = new Set([
    "#f5f5f5","#f0ebe0","#f7e94a","#f5b88c","#c9b785","#89b4d8","#7ecfac",
    "#d9a0a0","#7ab8d8","#7aaa95","#c09ad0","#8ab5d8","#f7dc6f","#d4a04c","#c8a06e","#f5a623",
    "#f5f0e8","#8a9dd9","#a5b4c2"
]);

// =============================================
// DATA SPESIFIKASI PRODUK PAKAIAN
// =============================================
const clothingSpecs = {
    1: {
        nama:"Kaftan Queen Marun",gambar:"baju1_kaftan queen1.png",
        fotoTambahan:["baju1_kaftan queen.jpeg"],
        material:"Suede lembut, nyaman & breathable",jenisKain:"Suede-like",fit:"A-line longgar elegan",lengan:"Lengan Panjang",
        warna:["Merah Marun"],
        ukuran:[
            {size:"All Size",lebar_dada:"120 cm",panjang:"140 cm",lingkar_lengan:"~ cm"},
            //{size:"M",lebar_dada:"100 cm",panjang:"72 cm",lingkar_lengan:"40 cm"},
            //{size:"L",lebar_dada:"106 cm",panjang:"74 cm",lingkar_lengan:"42 cm"},
            //{size:"XL",lebar_dada:"112 cm",panjang:"76 cm",lingkar_lengan:"44 cm"},
            //{size:"XXL",lebar_dada:"118 cm",panjang:"78 cm",lingkar_lengan:"46 cm"}
        ],
        perawatan:"Cuci dengan air dingin (maks. 30°C), pisahkan dari pakaian berwarna terang, jangan diperas berlebihan, setrika dengan suhu rendah, hindari pemutih.",
        keterangan:"Padukan dengan hijab matching (seperti di foto) untuk tampilan serasi. Perfect untuk wanita yang menginginkan dress modest, trendy"
    },
    2: {
        nama:"Atasan Katun Bolong 20000",gambar:"baju2_katbol_marun.jpeg",
        fotoTambahan:["baju2_katbol_hijau_tua.jpeg","baju2_katbol_kuning_tua.jpeg","baju2_katbol_marun.jpeg","baju2_katbol_oranye.jpeg"],
        material:"Kain Katun Bolong (eyelet cotton) premium dengan motif bordir floral yang elegan, dilapis kain furing di bagian dalam agar nyaman & tidak menerawang. Bahan adem, ringan, & breathable, cocok untuk iklim tropis.",jenisKain:"Katun Bolong + Lapis Furing",fit:"Regular Fit (Kebaya Modern)",lengan:"Lengan 3/4",
        warna:["Hijau Tua","Kuning Tua","Marun","Oranye"],
        ukuran:[
            {size:"Standar",lebar_dada:"100 cm",panjang:"68 cm"},
            {size:"Jumbo",lebar_dada:"118 cm",panjang:"70 cm"}
        ],
        perawatan:"Cuci dengan tangan menggunakan air dingin (maks. 30°C), gunakan deterjen lembut, jangan gunakan pemutih agar warna & motif bordir tetap terjaga, jangan diperas terlalu kuat agar bordir tidak rusak, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang dari bagian dalam. Lepas bros sebelum mencuci.",
        keterangan:"Atasan Katun Bolong 20000 — kebaya modern dengan model kerah V-neck, lengan 3/4 yang elegan, dan motif bordir floral di seluruh bagian. Dilengkapi bros aksen bunga emas yang bisa dilepas-pasang. Berat ±250 gram. Cocok untuk acara semi-formal: kondangan, arisan, acara keluarga, hingga lebaran."
    },
    3: {
        nama:"Gamis Kanaya Dress Muslim Linen Bordir",gambar:"baju3_gamis kanaya1.png",
        fotoTambahan:["baju3_gamis kanaya2.png"],
        material:"Linen bordir",jenisKain:"Linen",fit:"Longgar & lurus (stright cut)",lengan:"Lengan Panjang",
        warna:["Putih","Black Denim"],
        ukuran:[
            {size:"S",lebar_dada:"94 cm",panjang:"67 cm",berat:"180 gsm"},
            {size:"M",lebar_dada:"98 cm",panjang:"69 cm",berat:"180 gsm"},
            {size:"L",lebar_dada:"104 cm",panjang:"71 cm",berat:"180 gsm"},
            {size:"XL",lebar_dada:"110 cm",panjang:"73 cm",berat:"180 gsm"},
            {size:"XXL",lebar_dada:"116 cm",panjang:"75 cm",berat:"180 gsm"}
        ],
        perawatan:"Cuci mesin dengan air dingin, balik kaos sebelum dicuci agar warna terjaga, jangan gunakan pemutih, keringkan di tempat teduh, setrika suhu rendah.",
        keterangan:"Kaos polos unisex dengan jahitan benang cotton combed. Cocok sebagai dalaman maupun pakaian harian. Bahan tebal, tidak mudah melar."
    },
    4: {
        nama:"Setrok Malay Muslim Set Tradisional",gambar:"baju4_strok malay1.png",
        fotoTambahan:["baju4_strok malay1.png"],
        material:"Kualitas Tinggi Breathable Nyaman",jenisKain:"Bahan Katun Bordire Premium",fit:"Modest Classy",lengan:"Panjang",
        warna:["Original"],
        ukuran:[
            {size:"ALL Size",lebar_dada:"110/120 cm",lingkar_pinggul:"~",panjang:"~"},
            //{size:"30",lingkar_pinggang:"76 cm",lingkar_pinggul:"92 cm",panjang:"99 cm"},
            //{size:"32",lingkar_pinggang:"81 cm",lingkar_pinggul:"97 cm",panjang:"100 cm"},
            //{size:"34",lingkar_pinggang:"86 cm",lingkar_pinggul:"102 cm",panjang:"101 cm"},
            //{size:"36",lingkar_pinggang:"91 cm",lingkar_pinggul:"107 cm",panjang:"102 cm"}
        ],
        perawatan:"Cuci dengan air dingin maks. 30°C, jangan gunakan pemutih, keringkan dengan cara digantung, setrika suhu sedang.",
        keterangan:"Celana chino modern dengan potongan slim fit yang rapi. Kantong samping dan belakang dengan jahitan presisi. Cocok untuk kerja, acara semi-formal, hingga hangout."
    },
    5: {
        nama:"Hoodie Jacket Zipper 507#",gambar:"baju9_jaket younger1.png",
        fotoTambahan:["baju9_jaket younger2.png","baju9_jaket younger3.png"],
        material:"Cotton blend + Synthetic (premium quality)",jenisKain:"Cotton",fit:"Fit untuk XS-L (oversized untuk semua)",lengan:"Lengan Panjang",
        warna:["Ayam Bakar","Biru Pastel","Hijau Army"],
        ukuran:[
            {size:"ALL Size",lebar_dada:"~",panjang:"~",lebar_bahu:"~"},
            //{size:"M",lebar_dada:"95 cm",panjang:"67 cm",lebar_bahu:"40 cm"},
            //{size:"L",lebar_dada:"100 cm",panjang:"69 cm",lebar_bahu:"42 cm"},
            //{size:"XL",lebar_dada:"106 cm",panjang:"71 cm",lebar_bahu:"44 cm"},
            //{size:"XXL",lebar_dada:"112 cm",panjang:"73 cm",lebar_bahu:"46 cm"}
        ],
        perawatan:"Machine wash cold, hang dry recommended",
        keterangan:"Material berkualitas tinggi, nyaman & breathable, desain trendy, cocok untuk kasual & semi-formal. Oversized fit yang flattering untuk berbagai type tubuh"
    },
    6: {
        nama:"Kebaya Brukat Mutiara Premium",gambar:"baju6_kebaya1 olive green.jpeg",
        fotoTambahan:["baju6_kebaya1 maroon.jpeg","baju6_kebaya1 biru.jpeg","baju6_kebaya1 coklat.jpeg","baju6_kebaya1 biru muda.jpeg"],
        material:"Cotton Slub 100% berkualitas premium",jenisKain:"Katun",fit:"Regular Fit",lengan:"Lengan Pendek",
        warna:["Merah Marun", "Cokelat Muda", "Biru", "Olive Green", "Biru Muda"],
        ukuran:[
            {size:"S",lebar_dada:"100 cm",panjang:"57 cm",lebar_bahu:"42 cm"},
            {size:"M",lebar_dada:"106 cm",panjang:"59 cm",lebar_bahu:"44 cm"},
            {size:"L",lebar_dada:"112 cm",panjang:"61 cm",lebar_bahu:"46 cm"},
            {size:"XL",lebar_dada:"118 cm",panjang:"63 cm",lebar_bahu:"48 cm"},
            {size:"XXL",lebar_dada:"124 cm",panjang:"65 cm",lebar_bahu:"50 cm"}
        ],
        perawatan:"Cuci jarang (hanya saat perlu), balikkan denim sebelum dicuci, gunakan air dingin, jangan gunakan pemutih, keringkan dengan digantung di tempat teduh, setrika dari bagian dalam.",
        keterangan:"Jaket denim klasik dengan 4 kantong fungsional (2 dada, 2 samping) dan kancing logam tahan karat. Cocok dipakai pria maupun wanita untuk tampilan kasual sehari-hari."
    },
    7: {
        nama:"Rok Dress Kebaya Batik Modern",gambar:"baju7_rok_dress_navy.jpeg",
        fotoTambahan:["baju7_rok_dress_biru.jpeg","baju7_rok_dress_hitam.jpeg","baju7_rok_dress_navy.jpeg","baju7_rok_dress_pink.jpeg"],
        material:"Atasan: katun bermotif batik premium dengan tekstur halus & nyaman. Bawahan: kain polos jatuh berkualitas premium, adem & breathable, cocok untuk iklim tropis.",jenisKain:"Katun Batik + Polos",fit:"Regular Fit",lengan:"Lengan 3/4",
        warna:["Biru","Hitam","Navy","Pink"],
        ukuran:[
            {size:"S",lebar_dada:"94 cm",panjang:"95 cm",lingkar_pinggang:"68 cm"},
            {size:"M",lebar_dada:"98 cm",panjang:"97 cm",lingkar_pinggang:"72 cm"},
            {size:"L",lebar_dada:"104 cm",panjang:"99 cm",lingkar_pinggang:"78 cm"},
            {size:"XL",lebar_dada:"110 cm",panjang:"101 cm",lingkar_pinggang:"84 cm"},
            {size:"XXL",lebar_dada:"116 cm",panjang:"103 cm",lingkar_pinggang:"90 cm"}
        ],
        perawatan:"Cuci dengan air dingin (maks. 30°C), gunakan deterjen lembut, jangan gunakan pemutih agar motif batik & warna rok polos tetap terjaga, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang dari bagian dalam.",
        keterangan:"Setelan rok dress kebaya batik modern (2 pieces) — atasan kebaya batik motif eksklusif dipadukan dengan rok A-line polos midi warna senada. Anggun & elegan untuk berbagai acara: pesta, kondangan, kantor, acara keluarga, hingga ibadah. Cocok dipadukan dengan heels maupun flat shoes."
    },
    8: {
        nama:"Dress Popline Floral Midi",gambar:"baju8_dress_popline_purple.jpeg",
        fotoTambahan:["baju8_dress_popline_green.jpeg","baju8_dress_popline_pink.jpeg","baju8_dress_popline_purple.jpeg","baju8_dress_popline_yellow.jpeg"],
        material:"Kain popline premium dengan tekstur halus, jatuh dengan indah, adem & nyaman, cocok untuk iklim tropis. Motif floral printing kualitas tinggi yang tidak mudah pudar.",jenisKain:"Popline / Twill Premium",fit:"A-Line Midi",lengan:"Lengan 3/4",
        warna:["Green","Pink","Purple","Yellow"],
        ukuran:[
            {size:"S",lebar_dada:"92 cm",panjang:"110 cm",lingkar_pinggang:"68 cm"},
            {size:"M",lebar_dada:"96 cm",panjang:"112 cm",lingkar_pinggang:"72 cm"},
            {size:"L",lebar_dada:"102 cm",panjang:"114 cm",lingkar_pinggang:"78 cm"},
            {size:"XL",lebar_dada:"108 cm",panjang:"116 cm",lingkar_pinggang:"84 cm"},
            {size:"XXL",lebar_dada:"114 cm",panjang:"118 cm",lingkar_pinggang:"90 cm"}
        ],
        perawatan:"Cuci dengan air dingin (maks. 30°C), gunakan deterjen lembut, jangan gunakan pemutih agar motif floral tetap cerah & tidak pudar, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang dari bagian dalam.",
        keterangan:"Dress popline floral midi dengan motif bunga eksklusif gradient dari pundak ke pinggang dan bertabur di bagian bawah rok. Dilengkapi belt aksen di pinggang yang membentuk siluet ramping & feminin. Anggun untuk berbagai acara: arisan, kondangan, dinner, hingga acara semi-formal. Cocok dipadukan dengan heels."
    },
    9: {
        nama:"Gamis Marbela Mix Ceruti",gambar:"baju9_marbela_mix_ceruti_pink.jpeg",
        fotoTambahan:["baju9_marbela_mix_ceruti_black.jpeg","baju9_marbela_mix_ceruti_brown.jpeg","baju9_marbela_mix_ceruti_pink.jpeg","baju9_marbela_mix_ceruti_white.jpeg"],
        material:"Bagian badan: kain marbela premium dengan motif floral printing kualitas tinggi yang elegan. Bagian lengan: kain ceruti adem & jatuh dengan indah. Kombinasi material yang nyaman dipakai seharian, cocok untuk iklim tropis.",jenisKain:"Marbela + Ceruti Premium",fit:"A-Line / Loose Fit",lengan:"Lengan Panjang",
        warna:["Black","Brown","Pink","White"],
        ukuran:[
            {size:"M",lebar_dada:"100 cm",panjang:"140 cm",lebar_bahu:"38 cm"},
            {size:"L",lebar_dada:"106 cm",panjang:"142 cm",lebar_bahu:"40 cm"},
            {size:"XL",lebar_dada:"112 cm",panjang:"144 cm",lebar_bahu:"42 cm"},
            {size:"XXL",lebar_dada:"118 cm",panjang:"146 cm",lebar_bahu:"44 cm"},
            {size:"3XL",lebar_dada:"124 cm",panjang:"148 cm",lebar_bahu:"46 cm"}
        ],
        perawatan:"Cuci dengan tangan menggunakan air dingin (maks. 30°C), gunakan deterjen lembut khusus kain halus, jangan diperas terlalu kuat agar kain ceruti tidak rusak, jangan gunakan pemutih, jemur dengan dibalik di tempat teduh, setrika dengan suhu rendah dari bagian dalam.",
        keterangan:"Gamis syari mewah dengan kombinasi kain marbela bermotif floral klasik di bagian badan & ceruti polos di bagian lengan. Model A-line longgar dengan kerah shanghai (mandarin collar) yang elegan, kancing depan & manset bermotif. Cocok untuk acara formal: pesta, kondangan, lebaran, hingga aktivitas sehari-hari yang anggun & syar'i."
    },
    10: {
        nama:"Setelan Jumbo Floral Cotton Stretch",gambar:"baju10_setelan_jumbo_blue.png",
        fotoTambahan:["baju10_setelan_jumbo_blue.png","baju10_setelan_jumbo_green.png","baju10_setelan_jumbo_pink.png","baju10_setelan_jumbo_purple.png"],
        material:"Atasan: katun stretch premium dengan motif bunga warna-warni printing kualitas tinggi, lembut & nyaman dipakai. Bawahan: kain katun polos jatuh dengan pinggang karet (elastis), adem & fleksibel untuk berbagai ukuran tubuh.",jenisKain:"Cotton Stretch",fit:"Loose Fit / Jumbo (Plus Size)",lengan:"Lengan Pendek",
        warna:["Blue","Green","Pink","Purple"],
        ukuran:[
            {size:"Atasan (All Size Jumbo)",lebar_dada:"126 cm",lingkar_pinggang:"—",panjang:"60 cm"},
            {size:"Celana (All Size Jumbo)",lebar_dada:"—",lingkar_pinggang:"68–130 cm (karet)",panjang:"70 cm"}
        ],
        perawatan:"Cuci dengan air dingin (maks. 30°C), pisahkan dari pakaian berwarna gelap pada pencucian pertama, gunakan deterjen lembut, jangan gunakan pemutih agar motif floral tetap cerah, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang.",
        keterangan:"Setelan jumbo (atasan kemeja kancing hidup + celana kulot 7/8) dengan motif bunga warna-warni yang ceria & feminin. Bahan cotton stretch yang adem, lembut, & nyaman dipakai seharian. Pinggang celana karet elastis fleksibel (LP 68–130 cm) — sangat akomodatif untuk berbagai ukuran tubuh, terutama plus size. Cocok untuk pakaian santai harian, hangout, arisan, hingga liburan."
    },
    11: {
        nama:"Set Rok Jaguard Fukuro 40098",gambar:"baju11_kulot_maroon.jpeg",
        fotoTambahan:["baju11_kulot_black_red.jpeg","baju11_kulot_black.jpeg","baju11_kulot_blue.jpeg","baju11_kulot_brown.jpeg","baju11_kulot_maroon.jpeg","baju11_kulot_purple.jpeg"],
        material:"Kain Jaguard Fukuro premium dengan motif floral emboss elegan, dilapis hyget di bagian dalam agar nyaman dipakai. Bahan kokoh tapi tetap jatuh dengan indah, cocok untuk acara formal & semi-formal.",jenisKain:"Jaguard Fukuro + Lapis Hyget",fit:"Regular Fit (Atasan Peplum) + Rok A-Line Plisket",lengan:"Lengan Pendek",
        warna:["Black Red","Hitam","Blue","Cokelat Muda","Maroon","Pink"],
        ukuran:[
            {size:"L",lebar_dada:"98 cm",panjang:"57 cm (atasan) / 74 cm (rok)",lingkar_pinggang:"70–100 cm"},
            {size:"XL",lebar_dada:"108 cm",panjang:"57 cm (atasan) / 74 cm (rok)",lingkar_pinggang:"70–110 cm"},
            {size:"XXL",lebar_dada:"118 cm",panjang:"57 cm (atasan) / 74 cm (rok)",lingkar_pinggang:"70–120 cm"}
        ],
        perawatan:"Cuci dengan tangan menggunakan air dingin (maks. 30°C), gunakan deterjen lembut, jangan gunakan pemutih agar warna & motif emboss tetap terjaga, jangan diperas terlalu kuat, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang dari bagian dalam. Belt bisa dilepas saat dicuci.",
        keterangan:"Set Rok Jaguard Fukuro (2 pieces — atasan peplum kancing hidup + rok A-line plisket midi) dengan motif floral emboss elegan & aksen bunga di pundak. Dilengkapi belt yang bisa dilepas-pasang untuk membentuk siluet ramping di pinggang. Berat total ±350 gram. Anggun & mewah untuk berbagai acara formal: pesta, kondangan, acara keluarga, hingga ibadah."
    },
    12: {
        nama:"Dres Katun Bolong 65617",gambar:"baju12_katunbolong_maroon.jpeg",
        fotoTambahan:["baju12_katunbolong_black.jpeg","baju12_katunbolong_brown.jpeg","baju12_katunbolong_grey.jpeg","baju12_katunbolong_maroon.jpeg","baju12_katunbolong_pink.jpeg","baju12_katunbolong_white.jpeg"],
        material:"Kain Katun Bolong (eyelet cotton) premium dengan motif bordir floral & geometris yang elegan, dilapis kain furing di bagian dalam agar nyaman & tidak menerawang. Bahan adem, ringan, & breathable, cocok untuk iklim tropis.",jenisKain:"Katun Bolong + Lapis Furing",fit:"Fit & Flare (A-Line) Midi",lengan:"Lengan Pendek (Puff Sleeve)",
        warna:["Black","Brown","Grey","Maroon","Pink","White"],
        ukuran:[
            {size:"All Size (Fit L–XL)",lebar_dada:"110 cm",panjang:"110 cm"}
        ],
        perawatan:"Cuci dengan tangan menggunakan air dingin (maks. 30°C), gunakan deterjen lembut, jangan gunakan pemutih agar warna & motif bordir tetap terjaga, jangan diperas terlalu kuat agar bordir tidak rusak, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang dari bagian dalam. Belt bisa dilepas saat dicuci.",
        keterangan:"Dres Katun Bolong 65617 — dress midi elegan dengan model kerah V-neck, lengan puff (gembung) menggemaskan, kancing hidup di depan, dan belt aksen di pinggang yang membentuk siluet ramping. Motif bordir floral & geometris di seluruh bagian dengan tepi rok scalloped yang feminin. Berat ±350 gram. Cocok untuk acara semi-formal: kondangan, arisan, dinner, hingga acara kantor."
    },
    13: {
        nama:"Kemeja Pria Kemko CR002",gambar:"baju8_cr002 purple.jpeg",
        fotoTambahan:["baju13_cr002 biru muda.jpeg","baju13_cr002 purple.jpeg","baju13_cr002 terracota.jpeg","baju13_cr002 white.jpeg",
            "baju13_cr002 hitam.jpeg", "baju13_cr002 marun.jpeg"],
        material:"Katun premium yang halus, adem & breathable, cocok untuk iklim tropis",jenisKain:"Katun Slub",fit:"Regular Fit",lengan:"Lengan Pendek",
        warna:["Biru Muda","Purple","Bata","Putih","Hitam","Merah Marun"],
        ukuran:[
            {size:"M",lebar_dada:"100 cm",panjang:"68 cm",lebar_bahu:"44 cm"},
            {size:"L",lebar_dada:"106 cm",panjang:"70 cm",lebar_bahu:"46 cm"},
            {size:"XL",lebar_dada:"112 cm",panjang:"72 cm",lebar_bahu:"48 cm"},
            {size:"XXL",lebar_dada:"118 cm",panjang:"74 cm",lebar_bahu:"50 cm"}
        ],
        perawatan:"Cuci dengan air dingin (maks. 30°C), pisahkan dari pakaian berwarna gelap saat dicuci pertama kali, jangan gunakan pemutih, jemur dengan dibalik agar warna tetap terjaga, setrika dengan suhu sedang.",
        keterangan:"Kemeja pria Kemko CR002 dengan model kerah shanghai (mandarin collar) yang elegan dan kancing depan klasik. Dilengkapi satu saku di bagian dada. Cocok untuk acara semi-formal, ibadah, casual, maupun ke kantor. Tersedia versi couple/sarimbit (dewasa & anak)."
    },
    14: {
        nama:"Kemeja Batik Pria Lengan Panjang",gambar:"baju14_batik1 biru.jpeg",
        fotoTambahan:["baju14_batik1 biru.jpeg","baju14_batik1 cokelat.jpeg","baju14_batik1 hitam.jpeg", "baju14_batik1 hijau.jpeg", 
            "baju14_batik1 coklat muda.jpeg", "baju14_batik1 marun.jpeg", "baju14_batik1 pink.jpeg", "baju14_batik1 navy.jpeg", "baju14_batik1 sizes.jpeg"],
        material:"Katun halus dengan motif batik printing premium, adem & nyaman dipakai seharian",jenisKain:"Katun Batik",fit:"Fit-Agak Longgar",lengan:"Lengan Panjang",
        warna:["Biru","Cokelat","Hitam", "Cokelat Muda", "Hijau Army", "Olive Green", "Merah Marun", "Dusty Pink", "Navy"],
        ukuran:[
            {size:"S",lebar_dada:"100 cm",panjang_baju:"70 cm",panjang_lengan:"59 cm"},
            {size:"M",lebar_dada:"104 cm",panjang_baju:"71 cm",panjang_lengan:"60 cm"},
            {size:"L",lebar_dada:"108 cm",panjang_baju:"72 cm",panjang_lengan:"61 cm"},
            {size:"XL",lebar_dada:"112 cm",panjang_baju:"73 cm",panjang_lengan:"63 cm"},
            {size:"XXL",lebar_dada:"116 cm",panjang_baju:"74 cm",panjang_lengan:"64 cm"}
        ],
        perawatan:"Cuci dengan air dingin (maks. 30°C), gunakan deterjen lembut, jangan gunakan pemutih agar motif batik tetap terjaga, jemur dengan dibalik di tempat teduh, setrika dengan suhu sedang dari bagian dalam.",
        keterangan:"Kemeja batik pria dengan motif eksklusif kombinasi tradisional & modern. Potongan slim fit yang rapi membentuk siluet maskulin. Cocok untuk acara formal, semi-formal, pesta, kondangan, hingga ke kantor."
    },
    15: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    16: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    17: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    18: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    19: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    20: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    21: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    22: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    23: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    },
    24: {
        nama:"Produk Segera Hadir",gambar:"Under_prepared.jpg",
        fotoTambahan:["Under_prepared.jpg"],
        material:"TBA",jenisKain:"TBA",fit:"TBA",lengan:"TBA",
        warna:[],
        ukuran:[],
        perawatan:"TBA (To be Advised)",
        keterangan:"Produk ini sedang dalam tahap persiapan. Detail spesifikasi, warna, ukuran, dan harga akan segera kami informasikan. Nantikan koleksi terbaru kami!"
    }
};

// =============================================
// DATA SPESIFIKASI PRODUK MAKANAN
// =============================================
const foodSpecs = {
    101: {
        nama:"Rendang Sapi Premium",gambar:"https://picsum.photos/600/400?random=50",
        fotoTambahan:["https://picsum.photos/400/300?random=51","https://picsum.photos/400/300?random=52","https://picsum.photos/400/300?random=53","https://picsum.photos/400/300?random=54"],
        bahanUtama:"Daging sapi segar, santan kelapa, rempah pilihan",kemasan:"Vacuum seal / standing pouch",
        beratBersih:"250 gram",kedaluwarsa:"6 bulan (sejak tanggal produksi)",
        varian:["Original","Pedas","Ekstra Pedas"],
        paket:[{paket:"Mini",berat:"100 g",isi:"1 pcs"},{paket:"Standar",berat:"250 g",isi:"1 pcs"},{paket:"Jumbo",berat:"500 g",isi:"1 pcs"},{paket:"Family",berat:"1 kg",isi:"1 pcs"}],
        penyimpanan:"Simpan di suhu ruang (maks. 25°C), hindari sinar matahari langsung. Setelah dibuka, simpan dalam kulkas dan habiskan dalam 3 hari.",
        keterangan:"Rendang sapi autentik Padang dengan bumbu rempah lengkap. Proses memasak tradisional selama 4–5 jam menghasilkan tekstur lembut dan cita rasa yang kaya."
    },
    102: {
        nama:"Nasi Kotak Spesial",gambar:"https://picsum.photos/600/400?random=55",
        fotoTambahan:["https://picsum.photos/400/300?random=56","https://picsum.photos/400/300?random=57","https://picsum.photos/400/300?random=58","https://picsum.photos/400/300?random=59"],
        bahanUtama:"Nasi putih, ayam goreng, tempe, sayur tumis, sambal",kemasan:"Kotak kardus food-grade + plastik wrap",
        beratBersih:"400 gram",kedaluwarsa:"Dikonsumsi hari yang sama",
        varian:["Ayam Goreng","Ayam Bakar","Ikan Bakar"],
        paket:[{paket:"Satuan",isi:"1 kotak",min_order:"1 kotak"},{paket:"Paket 5",isi:"5 kotak",min_order:"5 kotak"},{paket:"Paket 10",isi:"10 kotak",min_order:"10 kotak"},{paket:"Paket 20",isi:"20 kotak",min_order:"20 kotak"}],
        penyimpanan:"Segera dikonsumsi setelah diterima. Jangan simpan lebih dari 4 jam di suhu ruang.",
        keterangan:"Nasi kotak lengkap dengan lauk bergizi. Cocok untuk acara arisan, rapat, syukuran, atau pesanan harian."
    },
    103: {
        nama:"Kue Lapis Legit",gambar:"https://picsum.photos/600/400?random=60",
        fotoTambahan:["https://picsum.photos/400/300?random=61","https://picsum.photos/400/300?random=62","https://picsum.photos/400/300?random=63","https://picsum.photos/400/300?random=64"],
        bahanUtama:"Tepung terigu, telur ayam kampung, mentega, susu, rempah",kemasan:"Kotak karton premium + ribbon",
        beratBersih:"400 gram",kedaluwarsa:"7 hari suhu ruang, 14 hari di kulkas",
        varian:["Original","Pandan","Cokelat","Keju"],
        paket:[{paket:"Loyang Mini",ukuran:"16×10 cm",lapis:"± 15 lapis"},{paket:"Loyang Standar",ukuran:"20×10 cm",lapis:"± 20 lapis"},{paket:"Loyang Jumbo",ukuran:"24×10 cm",lapis:"± 25 lapis"}],
        penyimpanan:"Simpan dalam wadah tertutup di suhu ruang. Untuk daya tahan lebih lama, simpan di kulkas dan keluarkan 15 menit sebelum dikonsumsi.",
        keterangan:"Lapis legit asli dengan proses panggang lapis per lapis menggunakan oven tradisional. Tekstur lembut, padat, dan harum."
    },
    104: {
        nama:"Keripik Tempe Pedas",gambar:"https://picsum.photos/600/400?random=65",
        fotoTambahan:["https://picsum.photos/400/300?random=66","https://picsum.photos/400/300?random=67","https://picsum.photos/400/300?random=68","https://picsum.photos/400/300?random=69"],
        bahanUtama:"Tempe kedelai lokal, tepung beras, bumbu rempah, cabai",kemasan:"Standing pouch zipper / aluminium foil",
        beratBersih:"150 gram",kedaluwarsa:"3 bulan (sealed), 1 minggu (setelah dibuka)",
        varian:["Original","Pedas","Balado","BBQ"],
        paket:[{paket:"Regular",berat:"150 g",isi:"1 pcs"},{paket:"Hemat 3",berat:"150 g",isi:"3 pcs"},{paket:"Hemat 6",berat:"150 g",isi:"6 pcs"},{paket:"Bundling",berat:"150 g",isi:"12 pcs"}],
        penyimpanan:"Simpan di tempat kering dan sejuk, jauhkan dari sinar matahari langsung. Setelah dibuka, tutup kembali rapat.",
        keterangan:"Keripik tempe renyah dari tempe segar pilihan. Digoreng dengan minyak bersih tanpa pengawet tambahan."
    },
    105: {
        nama:"Sambal Bawang Homemade",gambar:"https://picsum.photos/600/400?random=70",
        fotoTambahan:["https://picsum.photos/400/300?random=71","https://picsum.photos/400/300?random=72","https://picsum.photos/400/300?random=73","https://picsum.photos/400/300?random=74"],
        bahanUtama:"Cabai rawit, bawang merah, bawang putih, garam, minyak kelapa",kemasan:"Botol kaca bening + tutup twist (food-grade)",
        beratBersih:"200 gram",kedaluwarsa:"1 bulan di kulkas, 2 minggu di suhu ruang",
        varian:["Original","Pedas","Ekstra Pedas"],
        paket:[{paket:"Botol Mini",berat:"100 g",isi:"1 botol"},{paket:"Botol Standar",berat:"200 g",isi:"1 botol"},{paket:"Botol Besar",berat:"400 g",isi:"1 botol"},{paket:"Paket Hemat",berat:"200 g",isi:"3 botol"}],
        penyimpanan:"Simpan di kulkas setelah dibuka. Gunakan sendok bersih dan kering setiap penggunaan.",
        keterangan:"Sambal bawang homemade tanpa MSG dan pengawet. Dibuat dari bahan segar pilihan dengan resep tradisional."
    },
    106: {
        nama:"Brownies Kukus Cokelat",gambar:"https://picsum.photos/600/400?random=75",
        fotoTambahan:["https://picsum.photos/400/300?random=76","https://picsum.photos/400/300?random=77","https://picsum.photos/400/300?random=78","https://picsum.photos/400/300?random=79"],
        bahanUtama:"Cokelat compound, telur, tepung terigu, mentega, gula",kemasan:"Kotak karton + plastik wrap / kemasan hampers",
        beratBersih:"350 gram",kedaluwarsa:"4 hari suhu ruang, 7 hari kulkas",
        varian:["Cokelat Original","Cokelat Keju","Marble","Purple"],
        paket:[{paket:"Loyang Mini",ukuran:"20×10 cm",berat:"±200 g"},{paket:"Loyang Standar",ukuran:"26×10 cm",berat:"±350 g"},{paket:"Loyang Jumbo",ukuran:"30×10 cm",berat:"±500 g"}],
        penyimpanan:"Simpan dalam wadah kedap udara di suhu ruang maks. 4 hari, atau di kulkas hingga 7 hari.",
        keterangan:"Brownies kukus lembut dengan lapisan ganache cokelat premium. Tekstur moist dan fudgy, tidak terlalu manis."
    }
};

// =============================================
// INITIALIZE
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    updateCart();
    initDarkMode();
    initTabs();
    initPagination();
    initOngkir();
    initPaymentModal();
    initMusicPlayer();   // ← tombol Putar / Jeda musik latar

    hamburger.addEventListener('click', toggleMobileMenu);
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    clearCartBtn.addEventListener('click', clearCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            addToCart({
                id:     parseInt(btn.dataset.id),
                name:   btn.dataset.name,
                price:  parseInt(btn.dataset.price),
                weight: parseFloat(btn.dataset.weight) || 0.3,
                image:  btn.dataset.image
            });
        });
    });

    document.querySelectorAll('.view-spec').forEach(button => {
        button.addEventListener('click', (e) => {
            openSpecModal(parseInt(e.currentTarget.dataset.specId));
        });
    });

    specModal.addEventListener('click', (e) => { if (e.target === specModal) closeSpecModal(); });
    closeSpec.addEventListener('click', closeSpecModal);

    const aboutNavLink = document.querySelector('a[href="#about"]');
    if (aboutNavLink) {
        aboutNavLink.addEventListener('click', (e) => { e.preventDefault(); openAboutModal(); });
    }
    closeAbout.addEventListener('click', closeAboutModal);
    aboutModal.addEventListener('click', (e) => { if (e.target === aboutModal) closeAboutModal(); });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});

// =============================================
// MOBILE MENU
// =============================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =============================================
// SLIDER
// =============================================
function initSlider() {
    let currentSlide = 0;
    const slideCount = slides.length;
    let isTransitioning = false;

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        if (index < 0) currentSlide = slideCount - 1;
        else if (index >= slideCount) currentSlide = 0;
        else currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        document.querySelectorAll('.slide-content').forEach(c => { c.style.opacity='0'; c.style.animation='none'; });
        setTimeout(() => {
            const ac = slides[currentSlide].querySelector('.slide-content');
            if (ac) ac.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
        }, 300);
        setTimeout(() => { isTransitioning = false; }, 800);
    }

    nextBtn.addEventListener('click', () => { if (!isTransitioning) showSlide(currentSlide + 1); });
    prevBtn.addEventListener('click', () => { if (!isTransitioning) showSlide(currentSlide - 1); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { if (!isTransitioning && i !== currentSlide) showSlide(i); }));

    let startX = 0;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    slider.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && !isTransitioning) showSlide(currentSlide + 1);
            else if (diff < 0 && !isTransitioning) showSlide(currentSlide - 1);
        }
    });

    showSlide(0);
}

// =============================================
// DARK MODE
// =============================================
function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });
}

// =============================================
// TABS
// =============================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if (target) {
                target.classList.add('active');
                // Reset pagination tab tujuan kembali ke halaman 1
                const pagination = target.querySelector('.pagination');
                if (pagination) showPage(target, '1', pagination);
            }
        });
    });
}

// =============================================
// PAGINATION — tombol halaman per tab
// =============================================
function showPage(tabContent, pageNum, paginationEl) {
    // Tampilkan hanya kartu dengan data-page = pageNum
    tabContent.querySelectorAll('.product-card[data-page]').forEach(card => {
        if (card.dataset.page === pageNum) {
            card.classList.add('is-current-page');
        } else {
            card.classList.remove('is-current-page');
        }
    });
    // Update state aktif tombol
    paginationEl.querySelectorAll('.page-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageNum);
    });
}

function initPagination() {
    document.querySelectorAll('.pagination').forEach(pagination => {
        const targetId   = pagination.dataset.target;
        const tabContent = document.getElementById(targetId);
        if (!tabContent) return;

        // Tampilkan halaman awal (1)
        showPage(tabContent, '1', pagination);

        // Klik tombol halaman
        pagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showPage(tabContent, btn.dataset.page, pagination);
                // Scroll halus ke awal section produk
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
}

// =============================================
// SPEC MODAL
// =============================================
function openSpecModal(specId) {
    const isFood = !!foodSpecs[specId];
    const spec = isFood ? foodSpecs[specId] : clothingSpecs[specId];
    if (!spec) return;
    if (isFood) renderFoodSpec(spec); else renderClothingSpec(spec);
    specModal.style.display = 'flex';
}
function closeSpecModal() { specModal.style.display = 'none'; }

function renderClothingSpec(spec) {
    document.querySelector('.spec-header h2').innerHTML = '<i class="fas fa-tshirt"></i> Spesifikasi Produk';
    const sizeKeys = spec.ukuran.length > 0 ? Object.keys(spec.ukuran[0]) : [];
    const labelMap = {size:'Ukuran',lebar_dada:'Lebar Dada',panjang:'Panjang',lingkar_lengan:'Lingkar Lengan',lingkar_pinggang:'Lingkar Pinggang',lingkar_pinggul:'Lingkar Pinggul',lebar_bahu:'Lebar Bahu',berat:'Gramasi'};
    const tableHeaders = sizeKeys.map(k => `<th>${labelMap[k]||k}</th>`).join('');
    const tableRows = spec.ukuran.map(row => `<tr>${sizeKeys.map(k => `<td>${row[k]}</td>`).join('')}</tr>`).join('');
    const fotoGrid = spec.fotoTambahan.map((url,i) => `<div class="spec-photo-item"><img src="${url}" alt="Foto ${i+1}" loading="lazy"></div>`).join('');
    const warnaCircles = spec.warna.map(w => {
        const hex = colorHexMap[w]||'#cccccc';
        return `<div class="spec-color-swatch" title="${w}"><div class="spec-color-circle" style="background-color:${hex};border-color:${lightColors.has(hex)?'#aaaaaa':'rgba(0,0,0,0.15)'};"></div><span class="spec-color-name">${w}</span></div>`;
    }).join('');
    specBody.innerHTML = `
        <div class="spec-product-header">
            <div class="spec-product-img"><img src="${spec.gambar}" alt="${spec.nama}"></div>
            <div class="spec-product-title"><h3>${spec.nama}</h3><p class="spec-keterangan">${spec.keterangan}</p></div>
        </div>
        <div class="spec-section spec-section-photos"><h4><i class="fas fa-images"></i> Foto Produk</h4><div class="spec-photo-grid">${fotoGrid}</div></div>
        <div class="spec-details-grid">
            <div class="spec-detail-item"><span class="spec-label"><i class="fas fa-layer-group"></i> Material</span><span class="spec-value">${spec.material}</span></div>
            <div class="spec-detail-item"><span class="spec-label"><i class="fas fa-tshirt"></i> Potongan (Fit)</span><span class="spec-value">${spec.fit}</span></div>
        </div>
        <div class="spec-section"><h4><i class="fas fa-palette"></i> Pilihan Warna</h4><div class="spec-colors">${warnaCircles}</div></div>
        <div class="spec-section"><h4><i class="fas fa-ruler"></i> Panduan Ukuran</h4><div class="spec-table-wrapper"><table class="spec-table"><thead><tr>${tableHeaders}</tr></thead><tbody>${tableRows}</tbody></table></div><p class="spec-size-note"><i class="fas fa-info-circle"></i> Toleransi ukuran ±1–2 cm.</p></div>
        <div class="spec-section"><h4><i class="fas fa-hand-sparkles"></i> Cara Perawatan</h4><p class="spec-perawatan">${spec.perawatan}</p></div>
    `;
    specBody.querySelectorAll('.spec-photo-item img').forEach(img => img.addEventListener('click', () => openLightbox(img.src)));
}

function renderFoodSpec(spec) {
    document.querySelector('.spec-header h2').innerHTML = '<i class="fas fa-utensils"></i> Spesifikasi Produk';
    const paketLabelMap = {paket:'Paket',berat:'Berat',isi:'Isi',min_order:'Min. Order',ukuran:'Ukuran',lapis:'Jumlah Lapis'};
    const paketKeys = spec.paket.length > 0 ? Object.keys(spec.paket[0]) : [];
    const tableHeaders = paketKeys.map(k => `<th>${paketLabelMap[k]||k}</th>`).join('');
    const tableRows = spec.paket.map(row => `<tr>${paketKeys.map(k => `<td>${row[k]}</td>`).join('')}</tr>`).join('');
    const fotoGrid = spec.fotoTambahan.map((url,i) => `<div class="spec-photo-item"><img src="${url}" alt="Foto ${i+1}" loading="lazy"></div>`).join('');
    const varianCircles = spec.varian.map(v => {
        const hex = colorHexMap[v]||'#cccccc';
        return `<div class="spec-color-swatch" title="${v}"><div class="spec-color-circle" style="background-color:${hex};border-color:${lightColors.has(hex)?'#aaaaaa':'rgba(0,0,0,0.15)'};"></div><span class="spec-color-name">${v}</span></div>`;
    }).join('');
    specBody.innerHTML = `
        <div class="spec-product-header">
            <div class="spec-product-img"><img src="${spec.gambar}" alt="${spec.nama}"></div>
            <div class="spec-product-title"><h3>${spec.nama}</h3><p class="spec-keterangan">${spec.keterangan}</p></div>
        </div>
        <div class="spec-section spec-section-photos"><h4><i class="fas fa-images"></i> Foto Produk</h4><div class="spec-photo-grid">${fotoGrid}</div></div>
        <div class="spec-details-grid">
            <div class="spec-detail-item"><span class="spec-label"><i class="fas fa-leaf"></i> Bahan Utama</span><span class="spec-value">${spec.bahanUtama}</span></div>
            <div class="spec-detail-item"><span class="spec-label"><i class="fas fa-box"></i> Kemasan</span><span class="spec-value">${spec.kemasan}</span></div>
            <div class="spec-detail-item"><span class="spec-label"><i class="fas fa-weight-hanging"></i> Berat Bersih</span><span class="spec-value">${spec.beratBersih}</span></div>
            <div class="spec-detail-item"><span class="spec-label"><i class="fas fa-calendar-alt"></i> Kedaluwarsa</span><span class="spec-value">${spec.kedaluwarsa}</span></div>
        </div>
        <div class="spec-section"><h4><i class="fas fa-pepper-hot"></i> Varian Rasa</h4><div class="spec-colors">${varianCircles}</div></div>
        <div class="spec-section"><h4><i class="fas fa-shopping-bag"></i> Pilihan Paket</h4><div class="spec-table-wrapper"><table class="spec-table"><thead><tr>${tableHeaders}</tr></thead><tbody>${tableRows}</tbody></table></div></div>
        <div class="spec-section"><h4><i class="fas fa-snowflake"></i> Cara Penyimpanan</h4><p class="spec-perawatan">${spec.penyimpanan}</p></div>
    `;
    specBody.querySelectorAll('.spec-photo-item img').forEach(img => img.addEventListener('click', () => openLightbox(img.src)));
}

// =============================================
// ABOUT MODAL
// =============================================
function openAboutModal()  { aboutModal.style.display = 'flex'; }
function closeAboutModal() { aboutModal.style.display = 'none'; }

// =============================================
// LIGHTBOX
// =============================================
function openLightbox(src) {
    lightboxImg.src = src;
    photoLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    photoLightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

// =============================================
// CART FUNCTIONS
// =============================================
function openCart()       { cartModal.style.display = 'flex'; }
function closeCartModal() { cartModal.style.display = 'none'; }

function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    updateCart();
    saveCartToLocalStorage();
    showNotification(`${product.name} ditambahkan ke keranjang`);
    resetOngkir();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCart(); saveCartToLocalStorage(); resetOngkir();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(productId);
    else { updateCart(); saveCartToLocalStorage(); resetOngkir(); }
}

function clearCart() {
    cart = [];
    updateCart(); saveCartToLocalStorage(); resetOngkir(); closeCartModal();
}

function handleCheckout() {
    if (cart.length === 0) { alert('Keranjang belanja Anda kosong!'); return; }
    if (selectedOngkir === 0) {
        showNotification('⚠️ Pilih ekspedisi pengiriman terlebih dahulu!');
        const el = document.getElementById('ongkirSection');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }
    openPaymentModal();
}

function updateCart() {
    const totalItems = cart.reduce((t, i) => t + i.quantity, 0);
    cartCount.textContent = totalItems;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja Anda kosong</p>';
        totalPriceElement.textContent = 'Rp 0';
        toggleOngkirSection(false);
        updateGrandTotal();
        return;
    }

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-item-right">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Hapus</button>
                </div>
                <div class="cart-item-price">Rp ${formatPrice(item.price)}</div>
            </div>`;
        cartItemsContainer.appendChild(el);
    });

    totalPriceElement.textContent = `Rp ${formatPrice(totalPrice)}`;

    document.querySelectorAll('.quantity-btn.minus').forEach(btn =>
        btn.addEventListener('click', (e) => updateQuantity(parseInt(e.target.dataset.id), -1)));
    document.querySelectorAll('.quantity-btn.plus').forEach(btn =>
        btn.addEventListener('click', (e) => updateQuantity(parseInt(e.target.dataset.id), 1)));
    document.querySelectorAll('.remove-item').forEach(btn =>
        btn.addEventListener('click', (e) => removeFromCart(parseInt(e.target.dataset.id))));

    toggleOngkirSection(true);
    updateGrandTotal();
}

function saveCartToLocalStorage() { localStorage.setItem('cart', JSON.stringify(cart)); }
function getTotalBarang() { return cart.reduce((s, i) => s + (i.price * i.quantity), 0); }
function formatPrice(price) { return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

function showNotification(message) {
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => { if (n.parentNode) document.body.removeChild(n); }, 300);
    }, 3000);
}

// =============================================
// ===== FITUR ONGKIR — BOTTOM SHEET ===========
// =============================================

let selectedOngkir       = 0;
let selectedCourierName  = '';
let villageSearchTimeout = null;

// DOM refs — bottom sheet elements
const villageSearch    = document.getElementById('villageSearch');
const villageDropdown  = document.getElementById('villageDropdown');
const ongkirClearBtn   = document.getElementById('ongkirClearBtn');
const ongkirLoading    = document.getElementById('ongkirLoading');
const ongkirErrorMsg   = document.getElementById('ongkirErrorMsg');
const ongkirResult     = document.getElementById('ongkirResult');
const ongkirDestLabel  = document.getElementById('ongkirDestLabel');
const ongkirWeightInfo = document.getElementById('ongkirWeightInfo');
const courierList      = document.getElementById('courierList');

// DOM refs — cart bottom area
const ongkirRow            = document.getElementById('ongkirRow');
const ongkirRowAmount      = document.getElementById('ongkirRowAmount');
const selectedCourierLabel = document.getElementById('selectedCourierLabel');
const grandTotalArea       = document.getElementById('grandTotalArea');
const grandTotalAmount     = document.getElementById('grandTotalAmount');

// ── Bottom Sheet buka/tutup ───────────────────
function openShippingSheet() {
    const overlay = document.getElementById('shippingSheetOverlay');
    const sheet   = document.getElementById('shippingSheet');
    if (!overlay) return;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
        overlay.classList.add('active');
        sheet.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
    // Fokus ke input kelurahan
    setTimeout(() => { if (villageSearch) villageSearch.focus(); }, 350);
}

function closeShippingSheet() {
    const overlay = document.getElementById('shippingSheetOverlay');
    const sheet   = document.getElementById('shippingSheet');
    if (!overlay) return;
    overlay.classList.remove('active');
    sheet.classList.remove('active');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 320);
}

function initOngkir() {
    // Tombol buka bottom sheet
    const btnPilih = document.getElementById('btnPilihEkspedisi');
    if (btnPilih) btnPilih.addEventListener('click', openShippingSheet);

    // Tombol tutup sheet (×)
    const btnClose = document.getElementById('sheetCloseBtn');
    if (btnClose) btnClose.addEventListener('click', closeShippingSheet);

    // Klik backdrop tutup sheet
    const overlay = document.getElementById('shippingSheetOverlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeShippingSheet();
        });
    }

    // Input cari kelurahan
    if (villageSearch) {
        villageSearch.addEventListener('input', function () {
            clearTimeout(villageSearchTimeout);
            hideVillageDropdown();
            const kw = this.value.trim();
            if (kw.length >= 2) villageSearchTimeout = setTimeout(() => searchVillage(kw), 400);
        });
    }

    // Klik luar dropdown
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sheet-search-wrap') && !e.target.closest('.ongkir-input-wrap')) {
            hideVillageDropdown();
        }
    });

    if (ongkirClearBtn) ongkirClearBtn.addEventListener('click', () => resetOngkir());
}

function toggleOngkirSection(show) {
    // Tampilkan/sembunyikan tombol Pilih Ekspedisi di cart-bottom
    const wrap = document.getElementById('pilihEkspedisiWrap');
    if (wrap) wrap.style.display = show ? 'block' : 'none';
}

function resetOngkir() {
    selectedOngkir = 0;
    selectedCourierName = '';
    if (villageSearch)   villageSearch.value = '';
    if (ongkirClearBtn)  ongkirClearBtn.style.display = 'none';
    if (ongkirLoading)   ongkirLoading.style.display  = 'none';
    if (ongkirErrorMsg)  { ongkirErrorMsg.style.display = 'none'; ongkirErrorMsg.textContent = ''; }
    if (ongkirResult)    ongkirResult.style.display    = 'none';
    hideVillageDropdown();
    updateGrandTotal();
}

function updateGrandTotal() {
    const barangTotal = getTotalBarang();
    const btnLabel    = document.getElementById('btnEkspedisiLabel');
    const btnWrap     = document.getElementById('pilihEkspedisiWrap');
    const btn         = btnWrap ? btnWrap.querySelector('.btn-pilih-ekspedisi') : null;

    if (selectedOngkir > 0) {
        const grandTotal = barangTotal + selectedOngkir;
        if (ongkirRow)            ongkirRow.style.display           = 'flex';
        if (ongkirRowAmount)      ongkirRowAmount.textContent        = 'Rp ' + formatPrice(selectedOngkir);
        if (selectedCourierLabel) selectedCourierLabel.textContent   = '(' + selectedCourierName + ')';
        if (grandTotalArea)       grandTotalArea.style.display       = 'flex';
        if (grandTotalAmount)     grandTotalAmount.textContent       = 'Rp ' + formatPrice(grandTotal);
        // Tombol ekspedisi jadi "Ganti Ekspedisi"
        if (btnLabel) btnLabel.textContent = 'Ganti Ekspedisi (' + selectedCourierName + ')';
        if (btn) btn.classList.add('btn-ganti-ekspedisi');
        // Footer jadi hijau "Lanjut Bayar"
        if (checkoutBtn) {
            checkoutBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Lanjut Bayar';
            checkoutBtn.style.backgroundColor = '#27ae60';
        }
    } else {
        if (ongkirRow)      ongkirRow.style.display      = 'none';
        if (grandTotalArea) grandTotalArea.style.display = 'none';
        // Reset tombol ekspedisi
        if (btnLabel) btnLabel.textContent = 'Pilih Ekspedisi & Ongkir';
        if (btn) btn.classList.remove('btn-ganti-ekspedisi');
        // Reset footer
        if (checkoutBtn) {
            checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Checkout';
            checkoutBtn.style.backgroundColor = '';
        }
    }
}

async function searchVillage(keyword) {
    try {
        const res  = await fetch('cart.php?action=search_village&keyword=' + encodeURIComponent(keyword));
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) renderVillageDropdown(data.data);
        else renderVillageDropdown([]);
    } catch (err) { console.error('Error search village:', err); renderVillageDropdown([]); }
}

function renderVillageDropdown(villages) {
    villageDropdown.innerHTML = '';
    if (villages.length === 0) {
        const li = document.createElement('li');
        li.className = 'village-dropdown-empty';
        li.textContent = 'Kelurahan tidak ditemukan';
        villageDropdown.appendChild(li);
        villageDropdown.style.display = 'block';
        return;
    }
    villages.forEach(v => {
        const li = document.createElement('li');
        li.className = 'village-dropdown-item';
        const vn = v.name || '', dn = v.district || '', cn = v.regency || v.city || '', pn = v.province || '', vc = v.code || '';
        li.innerHTML = '<span class="village-name">' + vn + '</span><span class="village-detail">' + dn + ', ' + cn + ', ' + pn + '</span>';
        li.addEventListener('click', () => selectVillage(vc, vn + ', ' + dn + ', ' + cn));
        villageDropdown.appendChild(li);
    });
    villageDropdown.style.display = 'block';
}

function hideVillageDropdown() {
    if (villageDropdown) { villageDropdown.innerHTML = ''; villageDropdown.style.display = 'none'; }
}

function selectVillage(villageCode, label) {
    villageSearch.value = label;
    ongkirClearBtn.style.display = 'flex';
    hideVillageDropdown();
    if (ongkirDestLabel) ongkirDestLabel.textContent = '🏠 Tujuan: ' + label;
    const totalWeight = Math.max(0.1, cart.reduce((s, i) => s + (i.weight || 0.3) * i.quantity, 0));
    const weightKg = Math.round(totalWeight * 10) / 10;
    if (ongkirWeightInfo) ongkirWeightInfo.textContent = '📦 Estimasi berat: ' + weightKg + ' kg';
    const catatanEl = document.getElementById('ongkirCatatanPengiriman');
    if (catatanEl) catatanEl.style.display = 'block';
    if (ongkirResult)   ongkirResult.style.display   = 'none';
    if (ongkirErrorMsg) ongkirErrorMsg.style.display = 'none';
    if (ongkirLoading)  ongkirLoading.style.display  = 'block';
    checkOngkir(villageCode, weightKg);
}

async function checkOngkir(destinationCode, weight) {
    try {
        const formData = new FormData();
        formData.append('action', 'check_ongkir');
        formData.append('destination_code', destinationCode);
        formData.append('weight', weight);
        const res  = await fetch('cart.php', { method: 'POST', body: formData });
        const data = await res.json();
        if (ongkirLoading) ongkirLoading.style.display = 'none';
        if (data.success && Array.isArray(data.couriers) && data.couriers.length > 0) {
            renderCourierList(data.couriers);
            if (ongkirResult) ongkirResult.style.display = 'block';
        } else {
            showOngkirError(data.message || 'Ongkir tidak tersedia untuk tujuan ini.');
        }
    } catch (err) {
        if (ongkirLoading) ongkirLoading.style.display = 'none';
        showOngkirError('Gagal terhubung ke layanan ongkir. Periksa koneksi dan coba lagi.');
    }
}

function renderCourierList(couriers) {
    courierList.innerHTML = '';

    // Filter kurir sesuai TOKO_CONFIG.kurirDiizinkan
    const filtered = couriers.filter(c =>
        TOKO_CONFIG.kurirDiizinkan.some(allowed =>
            (c.courier_name || '').toLowerCase().includes(allowed.toLowerCase())
        )
    );
    const listToRender = filtered.length > 0 ? filtered : couriers;

    if (listToRender.length === 0) {
        courierList.innerHTML = '<p class="ongkir-error">Ekspedisi tidak tersedia untuk rute ini.</p>';
        return;
    }
    if (filtered.length === 0 && couriers.length > 0) {
        const info = document.createElement('p');
        info.className = 'ongkir-error';
        info.textContent = 'Ekspedisi pilihan tidak ada, menampilkan semua:';
        courierList.appendChild(info);
    }

    listToRender.forEach(c => {
        const price      = c.price || 0;
        const name       = c.courier_name || c.courier_code || 'Kurir';
        const estimation = c.estimation ? '⏱ ' + c.estimation : '';
        const label = document.createElement('label');
        label.className = 'courier-item';
        label.innerHTML =
            '<input type="radio" name="courier_choice" value="' + price + '" data-name="' + name + '">' +
            '<div class="courier-info">' +
                '<span class="courier-name">' + name + '</span>' +
                '<span class="courier-etd">' + estimation + '</span>' +
            '</div>' +
            '<span class="courier-price">Rp ' + formatPrice(price) + '</span>';

        label.querySelector('input').addEventListener('change', function () {
            selectedOngkir      = parseInt(this.value);
            selectedCourierName = this.dataset.name;
            updateGrandTotal();
            document.querySelectorAll('.courier-item').forEach(el => el.classList.remove('courier-selected'));
            label.classList.add('courier-selected');
            // ✅ Tutup bottom sheet otomatis setelah pilih kurir
            setTimeout(() => closeShippingSheet(), 350);
        });
        courierList.appendChild(label);
    });
}

function showOngkirError(msg) {
    if (ongkirErrorMsg) { ongkirErrorMsg.textContent = '⚠️ ' + msg; ongkirErrorMsg.style.display = 'block'; }
}

// =============================================
// ===== MODAL PEMBAYARAN =====
// =============================================

let currentPayMethod = 'qris';

function initPaymentModal() {
    const closePayment  = document.getElementById('closePayment');
    const payBackBtn    = document.getElementById('payBackBtn');
    const payConfirmBtn = document.getElementById('payConfirmBtn');
    const paymentModal  = document.getElementById('paymentModal');

    if (closePayment)  closePayment.addEventListener('click', closePaymentModal);
    if (payBackBtn)    payBackBtn.addEventListener('click', closePaymentModal);
    if (payConfirmBtn) payConfirmBtn.addEventListener('click', konfirmasiPesanan);
    if (paymentModal)  paymentModal.addEventListener('click', (e) => { if (e.target === paymentModal) closePaymentModal(); });
}

function openPaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (!paymentModal) return;

    const barangTotal = getTotalBarang();
    const grandTotal  = barangTotal + selectedOngkir;

    const el = (id) => document.getElementById(id);
    if (el('payTotalBarang')) el('payTotalBarang').textContent = `Rp ${formatPrice(barangTotal)}`;
    if (el('payOngkirAmount')) el('payOngkirAmount').textContent = `Rp ${formatPrice(selectedOngkir)}`;
    if (el('payOngkirLabel'))  el('payOngkirLabel').textContent  = `Ongkir (${selectedCourierName})`;
    if (el('payGrandTotal'))   el('payGrandTotal').textContent   = `Rp ${formatPrice(grandTotal)}`;

    renderBankList();
    selectPayMethod('qris');

    closeCartModal();
    paymentModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) paymentModal.style.display = 'none';
    document.body.style.overflow = '';
}

function selectPayMethod(method) {
    currentPayMethod = method;
    const qrisArea     = document.getElementById('payQrisArea');
    const transferArea = document.getElementById('payTransferArea');
    const tabQris      = document.getElementById('tabQris');
    const tabTransfer  = document.getElementById('tabTransfer');

    if (method === 'qris') {
        if (qrisArea)     qrisArea.style.display     = 'block';
        if (transferArea) transferArea.style.display = 'none';
        if (tabQris)      tabQris.classList.add('active');
        if (tabTransfer)  tabTransfer.classList.remove('active');
    } else {
        if (qrisArea)     qrisArea.style.display     = 'none';
        if (transferArea) transferArea.style.display = 'block';
        if (tabQris)      tabQris.classList.remove('active');
        if (tabTransfer)  tabTransfer.classList.add('active');
    }
}

function renderBankList() {
    const bankList = document.getElementById('bankList');
    if (!bankList) return;
    bankList.innerHTML = '';
    const grandTotal = getTotalBarang() + selectedOngkir;

    TOKO_CONFIG.bankAccounts.forEach(acc => {
        const div = document.createElement('div');
        div.className = 'bank-item';
        div.innerHTML = `
            <div class="bank-logo-name"><span class="bank-name">${acc.bank}</span></div>
            <div class="bank-detail">
                <span class="bank-norek">${acc.norek}</span>
                <span class="bank-atas-nama">a.n. ${acc.atas_nama}</span>
            </div>
            <button class="bank-copy-btn" onclick="copyToClipboard('${acc.norek}', this)">
                <i class="fas fa-copy"></i> Salin
            </button>`;
        bankList.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'bank-transfer-total';
    totalDiv.innerHTML = `<span>Nominal Transfer:</span><strong>Rp ${formatPrice(grandTotal)}</strong>`;
    bankList.appendChild(totalDiv);
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const ori = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        btn.style.background = '#27ae60';
        setTimeout(() => { btn.innerHTML = ori; btn.style.background = ''; }, 2000);
    }).catch(() => showNotification('Gagal menyalin. Salin manual: ' + text));
}

function konfirmasiPesanan() {
    var grandTotal = getTotalBarang() + selectedOngkir;
    var method     = currentPayMethod === 'qris' ? 'QRIS' : 'Transfer Bank';

    // Buat baris item dengan newline yang benar
    var itemLines = cart.map(function(i) {
        return '- ' + i.name + ' x' + i.quantity + ' = Rp ' + formatPrice(i.price * i.quantity);
    }).join('\n');

    // Pesan WhatsApp — gunakan \n (escape sequence) bukan newline literal
    var pesanWA =
        'Halo ' + TOKO_CONFIG.nama + ', saya ingin konfirmasi pesanan:\n\n' +
        itemLines + '\n\n' +
        'Ongkir (' + selectedCourierName + '): Rp ' + formatPrice(selectedOngkir) + '\n' +
        'Total Bayar: Rp ' + formatPrice(grandTotal) + '\n' +
        'Metode Bayar: ' + method;

    // Confirm dialog
    var ok = confirm(
        '\u2705 Ringkasan Pesanan:\n\n' +
        itemLines + '\n\n' +
        'Ongkir: Rp ' + formatPrice(selectedOngkir) + ' (' + selectedCourierName + ')\n' +
        'Total Bayar: Rp ' + formatPrice(grandTotal) + '\n' +
        'Metode: ' + method + '\n\n' +
        'Klik OK untuk kirim konfirmasi via WhatsApp.'
    );

    if (ok) {
        var waURL = 'https://wa.me/' + TOKO_CONFIG.whatsapp + '?text=' + encodeURIComponent(pesanWA);
        // Gunakan anchor tag agar tidak diblokir browser mobile
        var link = document.createElement('a');
        link.href   = waURL;
        link.target = '_blank';
        link.rel    = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closePaymentModal();
        clearCart();
    }
}

// =============================================
// MUSIC PLAYER (Putar / Jeda musik latar) — PLAYLIST
// File2 mp3 ditaruh di folder yg sama dgn website ini.
// Atur daftar lagu di MUSIC_PLAYLIST di bawah.
// =============================================

// === DAFTAR LAGU (PLAYLIST) ==================
// Tambah / kurangi nama file mp3 di sini.
// Urutan playback = urutan di array ini (dari atas ke bawah).
// Nama file harus PERSIS sama (case-sensitive di server Linux/cPanel).
const MUSIC_PLAYLIST = [
    'Be confidence - belive in yourself.mp3',
    'Lets Go to Keep Moving Forward.mp3',
    'Yes You Can.mp3'
];

const MUSIC_GAP_MS    = 1000;   // jeda antar lagu (1000 ms = 1 detik)
const MUSIC_VOLUME    = 0.9;    // 0.0 (mute) s/d 1.0 (max)
const MUSIC_SHUFFLE   = false;  // true = acak, false = urut sesuai array
const MUSIC_LOOP_ALL  = true;   // true = setelah lagu terakhir kembali ke awal
// =============================================

function initMusicPlayer() {
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic  = document.getElementById('bgMusic');
    if (!musicBtn || !bgMusic) return;

    const musicLabel = musicBtn.querySelector('.music-label');
    const musicIcon  = musicBtn.querySelector('.music-icon');

    bgMusic.volume = MUSIC_VOLUME;

    let playlist      = MUSIC_PLAYLIST.slice();   // salinan playlist (boleh diacak)
    let currentIndex  = 0;
    let isUserPlaying = false;     // true = user mau musik tetap nyala
    let gapTimer      = null;      // timer utk jeda antar lagu
    let errorRetries  = 0;         // hindari infinite loop kalau semua file error
    let loadToken     = 0;         // utk abaikan callback stale dari load yg dibatalkan

    // === Visualizer (Web Audio API) ===
    const musicVisualizer  = document.getElementById('musicVisualizer');
    const musicNowPlaying  = document.getElementById('musicNowPlaying');
    const visBars          = musicVisualizer
                             ? musicVisualizer.querySelectorAll('.vis-bar')
                             : [];
    let audioCtx       = null;
    let audioSource    = null;
    let audioAnalyser  = null;
    let audioFreqData  = null;
    let visAnimId      = null;

    // Acak playlist (kalau diaktifkan) — Fisher-Yates shuffle
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    if (MUSIC_SHUFFLE) shuffleArray(playlist);

    // Helper — UI tombol
    function setUIPlaying() {
        musicBtn.classList.add('playing');
        if (musicLabel) musicLabel.textContent = 'Stop Musik';
        if (musicIcon) {
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
        }
        musicBtn.setAttribute('aria-label', 'Stop musik');
        musicBtn.setAttribute('title', 'Stop musik');
        startVisualizer();
        updateNowPlaying();
    }

    function setUIPaused() {
        musicBtn.classList.remove('playing');
        if (musicLabel) musicLabel.textContent = 'Putar Musik';
        if (musicIcon) {
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-music');
        }
        musicBtn.setAttribute('aria-label', 'Putar musik');
        musicBtn.setAttribute('title', 'Putar musik');
        stopVisualizer();
    }

    // === VISUALIZER FUNCTIONS ===

    // Init Web Audio API — hanya sekali per audio element
    function initAudioAnalyser() {
        if (audioCtx) return true;       // sudah pernah diinisialisasi
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return false;
            audioCtx      = new AC();
            audioSource   = audioCtx.createMediaElementSource(bgMusic);
            audioAnalyser = audioCtx.createAnalyser();
            audioAnalyser.fftSize = 64;             // small = cepat & cukup untuk bar visualizer
            audioAnalyser.smoothingTimeConstant = 0.75;
            audioSource.connect(audioAnalyser);
            audioAnalyser.connect(audioCtx.destination);   // tetap teruskan ke speaker
            audioFreqData = new Uint8Array(audioAnalyser.frequencyBinCount);
            return true;
        } catch (e) {
            console.warn('Web Audio API tidak tersedia / gagal init:', e);
            audioCtx = null;
            return false;
        }
    }

    // Animasi histogram bar mengikuti irama lagu
    function startVisualizer() {
        if (musicNowPlaying) musicNowPlaying.classList.add('active');
        if (musicVisualizer) musicVisualizer.classList.add('active');

        if (!audioAnalyser) return;                  // fallback: visualizer pill tetap tampil tanpa animasi
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }

        if (visAnimId) cancelAnimationFrame(visAnimId);

        const barCount = visBars.length;
        const dataLen  = audioFreqData.length;

        function tick() {
            visAnimId = requestAnimationFrame(tick);
            audioAnalyser.getByteFrequencyData(audioFreqData);
            for (let i = 0; i < barCount; i++) {
                // Sample frekuensi merata dari rendah ke tinggi
                const idx     = Math.floor((i / barCount) * dataLen);
                const value   = audioFreqData[idx] || 0;     // 0 - 255
                const heightPct = Math.max(15, (value / 255) * 100);
                visBars[i].style.height = heightPct + '%';
            }
        }
        tick();
    }

    function stopVisualizer() {
        if (visAnimId) cancelAnimationFrame(visAnimId);
        visAnimId = null;
        if (musicVisualizer) musicVisualizer.classList.remove('active');
        if (musicNowPlaying) musicNowPlaying.classList.remove('active');
        // Reset bar ke posisi minimum
        for (let i = 0; i < visBars.length; i++) {
            visBars[i].style.height = '18%';
        }
    }

    // Ambil judul lagu dari nama file (strip ekstensi)
    function getSongTitle(filename) {
        if (!filename) return '';
        return filename.replace(/\.(mp3|ogg|wav|m4a|aac)$/i, '');
    }

    function updateNowPlaying() {
        if (!musicNowPlaying) return;
        const title = getSongTitle(playlist[currentIndex] || '');
        musicNowPlaying.textContent = title;
    }

    // Muat & putar lagu di index tertentu
    // Memakai bgMusic.load() utk reset state element audio (penting!)
    function loadAndPlay(idx) {
        if (!playlist.length) return;
        currentIndex = ((idx % playlist.length) + playlist.length) % playlist.length;
        const myToken = ++loadToken;

        bgMusic.src = playlist[currentIndex];
        bgMusic.load();   // PENTING: reset state element audio dari ended/error sebelumnya

        bgMusic.play()
            .then(() => {
                if (myToken !== loadToken) return;        // ada load lain yg lebih baru
                if (!isUserPlaying) {                     // user keburu pause saat loading
                    bgMusic.pause();
                    setUIPaused();
                    return;
                }
                errorRetries = 0;
                setUIPlaying();
            })
            .catch((err) => {
                if (myToken !== loadToken) return;
                if (!isUserPlaying) return;
                console.warn('Gagal memutar:', playlist[currentIndex], err);
                handleTrackError();
            });
    }

    // Skip ke lagu berikut bila track gagal dimuat / diputar
    function handleTrackError() {
        if (!isUserPlaying) return;
        errorRetries++;
        if (errorRetries >= playlist.length) {
            isUserPlaying = false;
            errorRetries = 0;
            setUIPaused();
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Tidak ada file musik yg bisa diputar. Cek nama file di MUSIC_PLAYLIST.');
            }
            return;
        }
        const nextIdx = (currentIndex + 1) % playlist.length;
        setUIPaused();
        clearTimeout(gapTimer);
        gapTimer = setTimeout(() => {
            if (isUserPlaying) loadAndPlay(nextIdx);
        }, MUSIC_GAP_MS);
    }

    // Lanjut ke lagu berikut setelah lagu sekarang selesai (jeda 1 detik)
    function playNextTrack() {
        if (!isUserPlaying) return;
        let nextIndex = currentIndex + 1;
        if (nextIndex >= playlist.length) {
            if (!MUSIC_LOOP_ALL) {
                isUserPlaying = false;
                setUIPaused();
                return;
            }
            if (MUSIC_SHUFFLE) shuffleArray(playlist);
            nextIndex = 0;
        }
        setUIPaused();              // tampilkan paused selama jeda antar lagu
        clearTimeout(gapTimer);
        gapTimer = setTimeout(() => {
            if (isUserPlaying) loadAndPlay(nextIndex);
        }, MUSIC_GAP_MS);
    }

    // Saat lagu selesai → otomatis lanjut ke lagu berikut
    bgMusic.addEventListener('ended', playNextTrack);

    // Saat file gagal dimuat → skip ke lagu berikut
    bgMusic.addEventListener('error', () => {
        if (isUserPlaying) handleTrackError();
    });

    // CATATAN PENTING: Sengaja TIDAK pasang listener event 'play' atau 'pause'.
    // UI tombol dikontrol secara EKSPLISIT dari kode kita (setUIPlaying / setUIPaused).
    // Listener 'play'/'pause' bawaan browser bisa fire prematur (sebelum audio
    // benar2 bunyi) sehingga menyebabkan UI keliru — itu yg bikin tombol nampak
    // sebagai "Jeda Musik" walau audio sebenarnya tdk ada bunyinya.

    // Klik tombol → toggle Play / Pause
    musicBtn.addEventListener('click', () => {
        if (!playlist.length) {
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Daftar musik kosong. Cek MUSIC_PLAYLIST di script.js.');
            }
            return;
        }

        if (isUserPlaying) {
            // ----- PAUSE -----
            isUserPlaying = false;
            clearTimeout(gapTimer);
            bgMusic.pause();
            setUIPaused();
        } else {
            // ----- PLAY -----
            isUserPlaying = true;
            errorRetries = 0;
            initAudioAnalyser();   // init Web Audio API saat klik (user gesture)
            // Smart: resume kalau pause di tengah lagu, kalau tidak load fresh
            const canResume = bgMusic.src &&
                              !bgMusic.ended &&
                              bgMusic.currentTime > 0 &&
                              bgMusic.duration > 0 &&
                              bgMusic.readyState >= 2;
            if (canResume) {
                bgMusic.play()
                    .then(() => { if (isUserPlaying) setUIPlaying(); })
                    .catch(() => loadAndPlay(currentIndex));
            } else {
                loadAndPlay(currentIndex);
            }
        }
    });
}
