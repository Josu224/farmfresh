/**
 * ============================================
 * FARM FRESH NIGERIA - CHECKOUT.JS
 * Checkout page with order form and processing
 * ============================================
 */

(function () {
  'use strict';

  const container = document.getElementById('checkout-container');

  // ----- RENDER CHECKOUT PAGE -----
  function renderCheckout() {
    if (!container) return;

    // Get cart from main.js
    const cart = (typeof window.getCart === 'function') ? window.getCart() : [];

    if (!cart.length) {
      container.innerHTML = `
        <div class="empty-cart-message">
          <h2>🛒 Your cart is empty</h2>
          <p>Browse our <a href="tools.html">tools directory</a> to add equipment to your cart.</p>
          <a href="tools.html" class="btn btn-orange" style="margin-top: 20px;">Browse Tools →</a>
        </div>
      `;
      return;
    }

    // Build order items HTML
    let orderItemsHtml = '';
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      orderItemsHtml += `
        <div class="order-item">
          <span class="order-item-name">${item.name} × ${item.quantity}</span>
          <span class="order-item-price">₦${itemTotal.toLocaleString()}</span>
        </div>
      `;
    });

    const subtotal = (typeof window.getCartTotal === 'function') ? window.getCartTotal() : cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const deliveryFee = subtotal > 50000 ? 0 : 2000;
    const total = subtotal + deliveryFee;

    container.innerHTML = `
      <div class="checkout-form">
        <h2>Delivery Details</h2>
        <form id="checkout-form">
          <div class="form-group">
            <label for="fullname">Full Name *</label>
            <input type="text" id="fullname" name="fullname" required autocomplete="name">
          </div>
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required autocomplete="email">
          </div>
          <div class="form-group">
            <label for="phone">Phone Number (Nigeria) *</label>
            <input type="tel" id="phone" name="phone" placeholder="0803 123 4567" required autocomplete="tel">
          </div>
          <div class="form-group">
            <label for="address">Delivery Address *</label>
            <textarea id="address" name="address" rows="3" required autocomplete="street-address"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="city">City *</label>
              <input type="text" id="city" name="city" required autocomplete="address-level2">
            </div>
            <div class="form-group">
              <label for="state">State *</label>
              <select id="state" name="state" required>
                <option value="">Select State</option>
                <option value="Abuja FCT">Abuja FCT</option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="payment">Payment Method *</label>
            <select id="payment" name="payment" required>
              <option value="">Select payment method</option>
              <option value="card">💳 Card (Paystack)</option>
              <option value="bank">🏦 Bank Transfer</option>
              <option value="cash">💵 Cash on Delivery</option>
            </select>
          </div>
          <button type="submit" class="place-order-btn">Place Order</button>
        </form>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="order-items-list">
          ${orderItemsHtml}
        </div>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₦${subtotal.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee</span>
          <span>${deliveryFee === 0 ? 'FREE' : '₦' + deliveryFee.toLocaleString()}</span>
        </div>
        <div class="order-total">
          <span>Total</span>
          <span>₦${total.toLocaleString()}</span>
        </div>
        <p class="delivery-note">🚚 Estimated delivery: 2-3 business days within Abuja, 3-5 days to other states.</p>
      </div>
    `;

    // Attach form handler
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', handleOrderSubmit);
    }
  }

  // ----- HANDLE ORDER SUBMISSION -----
  function handleOrderSubmit(e) {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value;
    const payment = document.getElementById('payment').value;

    // Validation
    if (!fullname || !email || !phone || !address || !city || !state || !payment) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const phoneRegex = /^(\+?234|0)[0-9]{10}$/;
    const cleanedPhone = phone.replace(/\s+/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      showToast('Please enter a valid Nigerian phone number (e.g., 08031234567).', 'error');
      return;
    }

    // Get cart data
    const cart = (typeof window.getCart === 'function') ? window.getCart() : [];
    if (!cart.length) {
      showToast('Your cart is empty. Add items before checking out.', 'error');
      return;
    }

    const subtotal = (typeof window.getCartTotal === 'function') ? window.getCartTotal() : cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const deliveryFee = subtotal > 50000 ? 0 : 2000;
    const total = subtotal + deliveryFee;

    // Create order object
    const order = {
      id: 'ORD-' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        priceUnit: item.priceUnit || '',
        image: item.image
      })),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      customer: {
        fullname,
        email,
        phone: cleanedPhone,
        address,
        city,
        state,
        payment
      },
      status: 'pending'
    };

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('farmFreshOrders')) || [];
    orders.unshift(order);
    localStorage.setItem('farmFreshOrders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('farmFreshCart');
    if (typeof window.updateCartIcon === 'function') {
      window.updateCartIcon();
    }

    // Show success and redirect
    showToast(`✅ Order ${order.id} placed successfully! Redirecting to your account...`, 'success');

    setTimeout(() => {
      window.location.href = 'account.html';
    }, 2000);
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
    document.addEventListener('DOMContentLoaded', renderCheckout);
  } else {
    renderCheckout();
  }

})();