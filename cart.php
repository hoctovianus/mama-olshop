<?php
// File untuk menangani operasi keranjang belanja (jika diperlukan)
// Dalam implementasi sederhana ini, kita menggunakan localStorage di JavaScript
// File ini disiapkan untuk pengembangan lebih lanjut dengan backend

// Contoh fungsi untuk mendapatkan data keranjang dari session
function getCartFromSession() {
    session_start();
    return isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
}

// Contoh fungsi untuk menyimpan data keranjang ke session
function saveCartToSession($cart) {
    session_start();
    $_SESSION['cart'] = $cart;
}

// Contoh fungsi untuk menambahkan item ke keranjang
function addToCart($productId, $quantity = 1) {
    $cart = getCartFromSession();
    
    if (isset($cart[$productId])) {
        $cart[$productId] += $quantity;
    } else {
        $cart[$productId] = $quantity;
    }
    
    saveCartToSession($cart);
    return $cart;
}

// Contoh fungsi untuk menghapus item dari keranjang
function removeFromCart($productId) {
    $cart = getCartFromSession();
    
    if (isset($cart[$productId])) {
        unset($cart[$productId]);
    }
    
    saveCartToSession($cart);
    return $cart;
}

// Contoh fungsi untuk mendapatkan total harga
function getCartTotal($products) {
    $cart = getCartFromSession();
    $total = 0;
    
    foreach ($cart as $productId => $quantity) {
        if (isset($products[$productId])) {
            $total += $products[$productId]['price'] * $quantity;
        }
    }
    
    return $total;
}

// Jika diperlukan, Anda dapat menambahkan endpoint API untuk operasi keranjang
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'add':
            $productId = $_POST['productId'] ?? '';
            $quantity = $_POST['quantity'] ?? 1;
            $cart = addToCart($productId, $quantity);
            echo json_encode(['success' => true, 'cart' => $cart]);
            break;
            
        case 'remove':
            $productId = $_POST['productId'] ?? '';
            $cart = removeFromCart($productId);
            echo json_encode(['success' => true, 'cart' => $cart]);
            break;
            
        case 'clear':
            $cart = clearCart();
            echo json_encode(['success' => true, 'cart' => $cart]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Action tidak valid']);
    }
}
?>