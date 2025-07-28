function Register(event) {
  event.preventDefault(); // prevent form submission

  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (username && password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert("Hi " + username + ", your account has been registered successfully.");
    window.location.href = 'login.html';
  } else {
    alert("Please fill in all the required fields.");
  }
}

function Login(event) {
  event.preventDefault(); // prevent form submission

  const enteredUsername = document.getElementById("loginUsername").value.trim();
  const enteredPassword = document.getElementById("loginPassword").value.trim();

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
    alert("Login successful!");
    window.location.href = "home.html"; // Replace with your actual home page
  } else {
    alert("Login failed! Please enter valid credentials.");
  }
}

////ADD to cart js



    let cartCount = 0;
    const cartItems = [];
    const cartCountDisplay = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');

    const productPrices = {
      'Samsung A35': 15000,
      'Vivo Y29': 17999
      // Add other products here
    };

    function updateCartDropdown() {
      cartItemsList.innerHTML = '';

      if (cartItems.length === 0) {
        cartItemsList.innerHTML = `<li style="text-align:center; color:gray;">No items added yet</li>`;
        cartTotalDisplay.textContent = '0';
        return;
      }

      let total = 0;

      cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        const price = productPrices[item.name] || 0;
        const itemTotal = item.qty * price;
        total += itemTotal;

        li.innerHTML = `
          <span>${item.name} (₹${price})</span>
          <div class="qty-controls">
            <button onclick="decreaseQty(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        `;
        cartItemsList.appendChild(li);
      });

      cartTotalDisplay.textContent = total;
    }

    function increaseQty(index) {
      cartItems[index].qty += 1;
      cartCount++;
      cartCountDisplay.textContent = cartCount;
      updateCartDropdown();
    }

    function decreaseQty(index) {
      if (cartItems[index].qty > 1) {
        cartItems[index].qty -= 1;
        cartCount--;
      } else {
        cartCount -= cartItems[index].qty;
        cartItems.splice(index, 1);
      }
      cartCountDisplay.textContent = cartCount;
      updateCartDropdown();
    }

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const existing = cartItems.find(item => item.name === name);

        if (existing) {
          existing.qty += 1;
        } else {
          cartItems.push({ name, qty: 1 });
        }

        cartCount++;
        cartCountDisplay.textContent = cartCount;
        updateCartDropdown();
      });
    });

    cartIcon.addEventListener('click', () => {
      cartDropdown.style.display =
        cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
      if (!cartDropdown.contains(event.target) && !cartIcon.contains(event.target)) {
        cartDropdown.style.display = 'none';
      }
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
      alert('Proceeding to checkout...');
    });
  




   