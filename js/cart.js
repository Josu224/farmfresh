    function renderCart() {
      const cart = getCart();
      const container = document.getElementById('cart-content');
      if (!cart.length) {
        container.innerHTML = '<div class="empty-cart"><h2>Your cart is empty</h2><p>Browse our <a href="tools.html">products</a> to get started.</p></div>';
        return;
      }

      let html = `
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
        html += `
                    <tr>
                        <td style="display: flex; align-items: center; gap: 16px;">
                            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                            <div><strong>${item.name}</strong><br><small>${item.priceUnit ? `/ ${item.priceUnit}` : ''}</small></div>
                        </td>
                        <td>₦${item.price.toLocaleString()}</td>
                        <td><input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1"></td>
                        <td>₦${itemTotal.toLocaleString()}</td>
                        <td><button class="remove-btn" data-id="${item.id}">🗑️</button></td>
                    </tr>
                `;
      });
      html += `</tbody></table>`;

      const total = getCartTotal();
      html += `
                <div class="cart-summary">
                    <h3>Order Summary</h3>
                    <p>Subtotal: ₦${total.toLocaleString()}</p>
                    <p>Delivery: Calculated at checkout</p>
                    <div class="cart-total">Total: ₦${total.toLocaleString()}</div>
                    <button class="checkout-btn" onclick="location.href='checkout.html'">Proceed to Checkout</button>
                </div>
            `;
      container.innerHTML = html;

      // Attach event listeners
      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
          const id = parseInt(input.dataset.id);
          const qty = parseInt(input.value);
          if (!isNaN(qty) && qty > 0) {
            updateCartItemQuantity(id, qty);
            renderCart();
          }
        });
      });
      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(btn.dataset.id);
          removeCartItem(id);
          renderCart();
        });
      });
    }

    document.addEventListener('DOMContentLoaded', renderCart);