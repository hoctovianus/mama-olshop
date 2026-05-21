<?php
// location:D:\Tutorial Website\DeepSeek\Online Shop Mama\Version 28.0
// ================================================================
// cart.php — Backend untuk Keranjang Belanja & Cek Ongkir
// Integrasi API: api.co.id (GRATIS, tanpa deposit)
// ================================================================

// ================================================================
// ⚙️  KONFIGURASI — WAJIB DIISI
// ================================================================

// 1. API Key dari dashboard.api.co.id (daftar gratis)
define('API_CO_ID_KEY', 'FzeacO1WKGlZDUR1hMqAP1H9u6GgbjWKanwl8p0AmxohowqyYo');

// 2. Kode kelurahan TOKO ANDA (10 digit).
//    Belum tahu kodenya? Buka browser, ketik URL berikut:
//    http://localhost/markiel-olshop/cart.php?action=cari_kode&keyword=NamaKelurahanToko
//    Ganti NamaKelurahanToko dengan nama kelurahan toko Anda.
define('ORIGIN_VILLAGE_CODE', '3216052003');

// 3. Base URL api.co.id
define('API_BASE_URL', 'https://use.api.co.id');

// ================================================================
// ROUTER
// ================================================================

// Untuk endpoint cari_kode — output HTML, bukan JSON
if (isset($_GET['action']) && $_GET['action'] === 'cari_kode') {
    outputKodeCari();
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];
$action = ($method === 'GET') ? ($_GET['action'] ?? '') : ($_POST['action'] ?? '');

switch ($action) {

    case 'search_village':
        $keyword = trim($_GET['keyword'] ?? '');
        if (strlen($keyword) < 2) {
            echo json_encode(['success' => false, 'message' => 'Kata kunci minimal 2 karakter']);
            exit;
        }
        $url    = API_BASE_URL . '/regional/indonesia/villages?name=' . urlencode($keyword) . '&page=1';
        $result = apiRequest('GET', $url);
        if ($result['http_code'] === 200 && !empty($result['body'])) {
            $data     = json_decode($result['body'], true);
            $villages = array_slice($data['data'] ?? [], 0, 8);
            echo json_encode(['success' => true, 'data' => $villages]);
        } elseif ($result['http_code'] === 401 || $result['http_code'] === 403) {
            echo json_encode(['success' => false, 'message' => 'API Key tidak valid.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal mencari kelurahan (HTTP ' . $result['http_code'] . ')']);
        }
        break;

    case 'check_ongkir':
        $destCode = trim($_POST['destination_code'] ?? '');
        $weight   = floatval($_POST['weight'] ?? 0.5);

        if (empty($destCode)) {
            echo json_encode(['success' => false, 'message' => 'Kode kelurahan tujuan tidak valid']);
            exit;
        }

        if (ORIGIN_VILLAGE_CODE === 'GANTI_KODE_KELURAHAN_TOKO') {
            echo json_encode([
                'success' => false,
                'message' => 'Kode kelurahan toko belum diisi. Buka: cart.php?action=cari_kode&keyword=NamaKelurahanToko untuk mencari kodenya.'
            ]);
            exit;
        }

        if ($weight <= 0) $weight = 0.5;
        $weight = round($weight, 1);

        $params = http_build_query([
            'origin_village_code'      => ORIGIN_VILLAGE_CODE,
            'destination_village_code' => $destCode,
            'weight'                   => $weight,
        ]);

        $url    = API_BASE_URL . '/expedition/shipping-cost?' . $params;
        $result = apiRequest('GET', $url);
        $responseBody = json_decode($result['body'], true);

        if ($result['http_code'] === 200 && !empty($result['body'])) {
            if (!empty($responseBody['is_success'])) {
                $couriers = $responseBody['data']['couriers'] ?? [];
                if (empty($couriers)) {
                    echo json_encode(['success' => false, 'message' => 'Tidak ada ekspedisi tersedia untuk rute ini.']);
                } else {
                    echo json_encode(['success' => true, 'couriers' => $couriers, 'weight' => $weight]);
                }
            } else {
                echo json_encode(['success' => false, 'message' => $responseBody['message'] ?? 'Ongkir tidak tersedia.']);
            }
        } else {
            $apiMsg = $responseBody['message'] ?? $result['body'];
            echo json_encode([
                'success' => false,
                'message' => 'Error ' . $result['http_code'] . ': ' . $apiMsg,
                'debug'   => ['origin' => ORIGIN_VILLAGE_CODE, 'dest' => $destCode, 'weight' => $weight, 'curl_error' => $result['error']]
            ]);
        }
        break;

    case 'add':
        $cart      = getCartFromSession();
        $productId = $_POST['productId'] ?? '';
        $quantity  = intval($_POST['quantity'] ?? 1);
        if ($productId) {
            $cart[$productId] = ($cart[$productId] ?? 0) + $quantity;
            saveCartToSession($cart);
        }
        echo json_encode(['success' => true, 'cart' => $cart]);
        break;

    case 'remove':
        $cart      = getCartFromSession();
        $productId = $_POST['productId'] ?? '';
        if (isset($cart[$productId])) unset($cart[$productId]);
        saveCartToSession($cart);
        echo json_encode(['success' => true, 'cart' => $cart]);
        break;

    case 'clear':
        if (session_status() === PHP_SESSION_NONE) session_start();
        $_SESSION['cart'] = [];
        echo json_encode(['success' => true, 'cart' => []]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Action tidak dikenal']);
        break;
}

// ================================================================
// TOOL: Halaman pencari kode kelurahan toko (output HTML)
// ================================================================
function outputKodeCari(): void
{
    $keyword = trim($_GET['keyword'] ?? '');
    $results = [];
    $error   = '';

    if (strlen($keyword) >= 2) {
        $url    = API_BASE_URL . '/regional/indonesia/villages?name=' . urlencode($keyword) . '&page=1';
        $result = apiRequest('GET', $url);
        if ($result['http_code'] === 200) {
            $data    = json_decode($result['body'], true);
            $results = $data['data'] ?? [];
        } else {
            $error = 'Gagal mengambil data. HTTP ' . $result['http_code'] . '. Pastikan API Key sudah diisi.';
        }
    }

    $tableHtml = '';
    if (!empty($results)) {
        $tableHtml .= '<table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:15px;">';
        $tableHtml .= '<tr style="background:#2c3e50;color:white;"><th>KODE (10 digit) — SALIN INI</th><th>Kelurahan</th><th>Kecamatan</th><th>Kota/Kabupaten</th><th>Provinsi</th></tr>';
        foreach ($results as $v) {
            $tableHtml .= '<tr>
                <td style="font-weight:bold;color:#e74c3c;font-family:monospace;font-size:17px;">' . htmlspecialchars($v['code'] ?? '-') . '</td>
                <td>' . htmlspecialchars($v['name'] ?? '-') . '</td>
                <td>' . htmlspecialchars($v['district'] ?? '-') . '</td>
                <td>' . htmlspecialchars($v['regency'] ?? '-') . '</td>
                <td>' . htmlspecialchars($v['province'] ?? '-') . '</td>
            </tr>';
        }
        $tableHtml .= '</table>';
    } elseif ($keyword !== '' && $error === '') {
        $tableHtml = '<p style="color:#e74c3c;">Kelurahan tidak ditemukan untuk: <strong>' . htmlspecialchars($keyword) . '</strong></p>';
    }

    $instruksi = !empty($results) ? '
    <div style="background:#d5f5e3;border:2px solid #27ae60;border-radius:8px;padding:20px;margin-top:20px;">
      <strong>✅ Cara menggunakannya:</strong>
      <ol style="margin-top:10px;line-height:2;">
        <li>Salin kode merah 10 digit dari tabel di atas yang sesuai kelurahan toko Anda.</li>
        <li>Buka file <code>cart.php</code> di text editor (Notepad, VSCode, dll).</li>
        <li>Cari baris: <code>define(\'ORIGIN_VILLAGE_CODE\', \'GANTI_KODE_KELURAHAN_TOKO\');</code></li>
        <li>Ganti <code>GANTI_KODE_KELURAHAN_TOKO</code> dengan kode 10 digit yang baru Anda salin.</li>
        <li>Simpan file → refresh website → coba cek ongkir kembali. ✅</li>
      </ol>
    </div>' : '';

    echo '<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Cari Kode Kelurahan Toko</title>
<style>
  body{font-family:Segoe UI,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;color:#333;}
  h1{color:#2c3e50;}
  .info{background:#eaf4fb;border:2px solid #3498db;border-radius:8px;padding:16px;margin:16px 0;}
  input[type=text]{width:55%;padding:10px 14px;font-size:15px;border:2px solid #3498db;border-radius:6px;}
  button{padding:10px 22px;font-size:15px;background:#3498db;color:white;border:none;border-radius:6px;cursor:pointer;margin-left:8px;}
  button:hover{background:#2980b9;}
  .err{color:#c0392b;background:#fdf0ee;padding:10px;border-radius:6px;}
  code{background:#f0f0f0;padding:2px 6px;border-radius:4px;}
</style>
</head>
<body>
<h1>🔍 Cari Kode Kelurahan Toko</h1>
<div class="info">
  Halaman ini membantu Anda mencari kode 10 digit kelurahan lokasi toko, untuk diisi di
  <code>ORIGIN_VILLAGE_CODE</code> dalam <code>cart.php</code>.
</div>
<form method="GET">
  <input type="hidden" name="action" value="cari_kode">
  <input type="text" name="keyword" value="' . htmlspecialchars($keyword) . '" placeholder="Ketik nama kelurahan toko Anda..." autofocus>
  <button type="submit">🔍 Cari</button>
</form><br>
' . ($error ? '<p class="err">⚠️ ' . htmlspecialchars($error) . '</p>' : '') . '
' . $tableHtml . $instruksi . '
</body></html>';
}

// ================================================================
// HELPER FUNCTIONS
// ================================================================
function apiRequest(string $method, string $url, array $postData = []): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_HTTPHEADER     => [
            'x-api-co-id: ' . API_CO_ID_KEY,
            'Accept: application/json',
            'User-Agent: markiel-olshop/1.0',
        ],
    ]);
    if ($method === 'POST' && !empty($postData)) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    }
    $body     = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    curl_close($ch);
    return ['http_code' => $httpCode, 'body' => $body ?: '', 'error' => $error];
}

function getCartFromSession(): array
{
    if (session_status() === PHP_SESSION_NONE) session_start();
    return $_SESSION['cart'] ?? [];
}

function saveCartToSession(array $cart): void
{
    if (session_status() === PHP_SESSION_NONE) session_start();
    $_SESSION['cart'] = $cart;
}
?>
