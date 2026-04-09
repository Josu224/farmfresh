/**
 * ============================================
 * FARM FRESH NIGERIA - ACCOUNT.JS
 * User account dashboard with profile, orders, and favorites
 * ============================================
 */

(function () {
  'use strict';

  const container = document.getElementById('account-container');
  const STORAGE_USER_KEY = 'farmFreshCurrentUser';
  const STORAGE_ORDERS_KEY = 'farmFreshOrders';
  const STORAGE_FAVORITES_KEY = 'farmFreshNigeriaFavorites';

  // ----- CHECK LOGIN STATE -----
  function isLoggedIn() {
    return localStorage.getItem(STORAGE_USER_KEY) !== null;
  }

  function getCurrentUser() {
    const userJson = localStorage.getItem(STORAGE_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // ----- RENDER LOGIN/SIGNUP FORM -----
  function renderAuthForms() {
    container.innerHTML = `
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Login</button>
        <button class="auth-tab" data-tab="signup">Sign Up</button>
      </div>
      <div class="auth-form-container">
        <form id="login-form" class="auth-form active">
          <h2>Welcome Back</h2>
          <p class="auth-subtitle">Sign in to access your account</p>
          <div class="form-group">
            <label for="login-email">Email Address</label>
            <input type="email" id="login-email" required autocomplete="email">
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" required autocomplete="current-password">
          </div>
          <button type="submit" class="btn btn-orange btn-block">Login</button>
          <p class="auth-note">Demo: any email/password works (simulated)</p>
        </form>
        <form id="signup-form" class="auth-form">
          <h2>Create Account</h2>
          <p class="auth-subtitle">Join Farm Fresh Nigeria today</p>
          <div class="form-group">
            <label for="signup-name">Full Name</label>
            <input type="text" id="signup-name" required autocomplete="name">
          </div>
          <div class="form-group">
            <label for="signup-email">Email Address</label>
            <input type="email" id="signup-email" required autocomplete="email">
          </div>
          <div class="form-group">
            <label for="signup-phone">Phone Number (Nigeria)</label>
            <input type="tel" id="signup-phone" placeholder="0803 123 4567">
          </div>
          <div class="form-group">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" required minlength="6">
          </div>
          <div class="form-group">
            <label for="signup-confirm">Confirm Password</label>
            <input type="password" id="signup-confirm" required>
          </div>
          <button type="submit" class="btn btn-orange btn-block">Sign Up</button>
        </form>
      </div>
    `;

    // Tab switching
    const tabs = container.querySelectorAll('.auth-tab');
    const forms = container.querySelectorAll('.auth-form');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        forms.forEach(f => f.classList.remove('active'));
        container.querySelector(`#${targetTab}-form`).classList.add('active');
      });
    });

    // Login handler
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      if (!email || !password) {
        showToast('Please enter email and password', 'error');
        return;
      }
      // Simulate login - store user
      const user = { email, name: email.split('@')[0], phone: '' };
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      showToast(`Welcome back, ${user.name}!`, 'success');
      renderDashboard();
    });

    // Signup handler
    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const phone = document.getElementById('signup-phone').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;

      if (!name || !email || !password) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      if (password !== confirm) {
        showToast('Passwords do not match', 'error');
        return;
      }
      if (phone) {
        const phoneRegex = /^(\+?234|0)[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
          showToast('Please enter a valid Nigerian phone number', 'error');
          return;
        }
      }
      const user = { name, email, phone };
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      showToast(`Account created! Welcome, ${name}!`, 'success');
      renderDashboard();
    });
  }

  // ----- RENDER DASHBOARD (Logged In) -----
  function renderDashboard() {
    const user = getCurrentUser();
    const orders = JSON.parse(localStorage.getItem(STORAGE_ORDERS_KEY)) || [];
    const favorites = JSON.parse(localStorage.getItem(STORAGE_FAVORITES_KEY)) || [];

    // Profile card
    let html = `
      <div class="profile-card">
        <div class="profile-info">
          <h2>👋 Welcome, ${user.name}!</h2>
          <p><span class="profile-label">📧 Email:</span> ${user.email}</p>
          ${user.phone ? `<p><span class="profile-label">📞 Phone:</span> ${user.phone}</p>` : ''}
          <p><span class="profile-label">🛒 Total Orders:</span> ${orders.length}</p>
        </div>
        <button class="logout-btn" id="logout-btn">Logout</button>
      </div>
    `;

    // Favorites section
    html += `<h2 class="section-title">❤️ Saved Tools</h2>`;
    if (favorites.length === 0) {
      html += `<div class="empty-state"><p>You haven't saved any tools yet. <a href="tools.html">Browse tools</a> to add favorites.</p></div>`;
    } else {
      html += `<div class="favorites-grid" id="dashboard-favorites"></div>`;
    }

    // Orders section
    html += `<h2 class="section-title">📦 Order History</h2>`;
    if (orders.length === 0) {
      html += `<div class="empty-state"><p>No orders yet. <a href="tools.html">Start shopping</a> to place your first order.</p></div>`;
    } else {
      html += `<div class="orders-list">`;
      orders.forEach(order => {
        let itemsHtml = '';
        order.items.forEach(item => {
          itemsHtml += `
            <div class="order-item">
              <span>${item.name} × ${item.quantity}</span>
              <span>₦${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          `;
        });
        const statusClass = order.status === 'pending' ? 'status-pending' : 'status-completed';
        const statusText = order.status === 'pending' ? 'Pending' : 'Completed';
        html += `
          <div class="order-card">
            <div class="order-header">
              <div>
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">${new Date(order.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              <span class="order-status ${statusClass}">${statusText}</span>
            </div>
            <div class="order-items">${itemsHtml}</div>
            <div class="order-total">Total: ₦${order.total.toLocaleString()}</div>
            <div class="delivery-info">
              <strong>Delivery:</strong> ${order.customer.address}, ${order.customer.city}, ${order.customer.state}<br>
              <strong>Payment:</strong> ${order.customer.payment === 'card' ? 'Card (Paystack)' : order.customer.payment === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'}
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;

    // Populate favorites grid if present
    const favGrid = document.getElementById('dashboard-favorites');
    if (favGrid && favorites.length) {
      // Try to get tool data from global toolsData (if available)
      if (window.toolsData) {
        const favTools = window.toolsData.filter(tool => favorites.includes(tool.id.toString()));
        favGrid.innerHTML = favTools.map(tool => `
          <div class="favorite-item">
            <img src="${tool.image}" alt="${tool.name}" onerror="this.src='images/placeholder-tool.jpg'">
            <span>${tool.name}</span>
            <a href="tools.html?id=${tool.id}" class="btn-small">View</a>
          </div>
        `).join('');
      } else {
        favGrid.innerHTML = `<p>Favorite tools: ${favorites.length} items. <a href="tools.html">View all</a></p>`;
      }
    }

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
  }

  // ----- LOGOUT -----
  function logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem(STORAGE_USER_KEY);
      // Optional: keep cart/orders? Usually keep, but we can clear for demo
      // localStorage.removeItem('farmFreshCart');
      showToast('You have been logged out.', 'info');
      renderAuthForms();
    }
  }

  // ----- TOAST NOTIFICATION -----
  function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
    } else {
      alert(message);
    }
  }

  // ----- INITIAL ROUTING -----
  function init() {
    if (!container) return;

    // Check URL parameter for mode (e.g., ?mode=login)
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (isLoggedIn()) {
      renderDashboard();
    } else {
      renderAuthForms();
      // If mode=signup, switch to signup tab
      if (mode === 'signup') {
        setTimeout(() => {
          const signupTab = container.querySelector('.auth-tab[data-tab="signup"]');
          if (signupTab) signupTab.click();
        }, 50);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();