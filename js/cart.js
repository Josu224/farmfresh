/**
 * ============================================
 * FARM FRESH NIGERIA - CART.JS
 * Shopping cart page with quantity update and removal
 * ============================================
 */

(function () {
  'use strict';

  const container = document.getElementById('cart-content');

  // ----- RENDER CART -----
  function renderCart() {
    if (!container) return;

    // Get cart from main.js (exposed globally)
    const cart = (typeof window.getCart === 'function') ? window.getCart() : [];

    if (!cart.length) {
      container.innerHTML = `
        <div class="empty-cart">
          <h2>🛒 Your cart is empty</h2>
          <p>Browse our <a href="tools.html">tools directory</a> to find equipment for your farm.</p>
          <a href="tools.html" class="btn btn-orange" style="margin-top: 20px;">Browse Tools →</a>
        </div>
      `;
      return;
    }

    // Build table
    let html = `
      <div class="cart-table-wrapper">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
    `;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      const priceDisplay = item.priceUnit ? `₦${item.price.toLocaleString()} ${item.priceUnit}` : `₦${item.price.toLocaleString()}`;

      html += `
        <tr>
          <td class="cart-product-cell">
            <img src="${item.image}" class="cart-item-img" alt="${item.name}" onerror="this.src='images/placeholder-tool.jpg'">
            <div class="cart-product-info">
              <strong>${item.name}</strong>
              <small>${item.priceUnit ? item.priceUnit : ''}</small>
            </div>
          </td>
          <td>${priceDisplay}</td>
          <td>
            <input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1" max="99" aria-label="Quantity for ${item.name}">
          </td>
          <td>₦${itemTotal.toLocaleString()}</td>
          <td>
            <button class="remove-btn" data-id="${item.id}" aria-label="Remove ${item.name} from cart">🗑️</button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;

    // Summary
    const subtotal = (typeof window.getCartTotal === 'function') ? window.getCartTotal() : cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const deliveryFee = subtotal > 50000 ? 0 : 2000; // Free delivery over ₦50,000
    const total = subtotal + deliveryFee;

    html += `
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₦${subtotal.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee</span>
          <span>${deliveryFee === 0 ? 'FREE' : '₦' + deliveryFee.toLocaleString()}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <span>₦${total.toLocaleString()}</span>
        </div>
        <button class="checkout-btn" id="proceed-checkout">Proceed to Checkout</button>
        <p class="delivery-note">🚚 Delivery available across Abuja and major Nigerian cities.</p>
      </div>
    `;

    container.innerHTML = html;

    // Attach event listeners
    attachCartEvents();
  }

  // ----- EVENT LISTENERS (Delegation) -----
  function attachCartEvents() {
    if (!container) return;

    // Quantity changes
    container.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = parseInt(input.dataset.id);
        const qty = parseInt(input.value);
        if (!isNaN(qty) && qty > 0) {
          if (typeof window.updateCartItemQuantity === 'function') {
            window.updateCartItemQuantity(id, qty);
          }
          renderCart(); // Refresh display
          showToast('Cart updated', 'success');
        }
      });
    });

    // Remove buttons
    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        if (typeof window.removeCartItem === 'function') {
          window.removeCartItem(id);
        }
        renderCart();
        showToast('Item removed from cart', 'info');
      });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('proceed-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        // Check if user is "logged in" (simple demo check)
        const user = localStorage.getItem('farmFreshCurrentUser');
        if (!user) {
          // Store intended destination
          localStorage.setItem('redirectAfterLogin', 'checkout.html');
          showToast('Please sign in to continue', 'info');
          window.location.href = 'account.html?mode=login';
        } else {
          window.location.href = 'checkout.html';
        }
      });
    }
  }

  // ----- TOAST NOTIFICATION (fallback to main.js) -----
  function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
    } else {
      alert(message);
    }
  }

  // ----- INITIALIZE -----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCart);
  } else {
    renderCart();
  }

  // Listen for cart updates from other pages (optional)
  window.addEventListener('storage', (e) => {
    if (e.key === 'farmFreshCart') {
      renderCart();
    }
  });

})();