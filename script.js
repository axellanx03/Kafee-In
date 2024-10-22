function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function toggleForm() {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');

    if (signinForm.style.display === 'none') {
        signinForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Sign In';
        formSubtitle.textContent = "We've already met!";
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = 'Sign Up';
    } else {
        signinForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
        formSubtitle.textContent = "Let's create you an account.";
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Sign In';
    }
}

function showDashboard() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
}

document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Sign in attempted');
    showDashboard();
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Sign up attempted');
    showDashboard();
});

document.getElementById('toggle-link').addEventListener('click', function(e) {
    e.preventDefault();
    toggleForm();
});

// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    const featuredProducts = document.querySelector('.featured-products');
    const productLists = document.querySelectorAll('.product-list');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;

            // Remove active class from all buttons and contents
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${category}-content`).classList.add('active');

            // Show/hide content based on selected category
            if (category === 'coffee') {
                featuredProducts.style.display = 'grid';
                productLists.forEach(list => list.style.display = 'block');
            } else {
                featuredProducts.style.display = 'none';
                productLists.forEach(list => list.style.display = 'none');
            }
        });
    });

    let cart = [];

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartView();
    }

    function updateCartView() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>₱${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn remove">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn add">+</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;

            const removeBtn = cartItem.querySelector('.remove');
            const addBtn = cartItem.querySelector('.add');

            removeBtn.addEventListener('click', () => updateQuantity(item, -1));
            addBtn.addEventListener('click', () => updateQuantity(item, 1));
        });

        document.getElementById('total-items').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('total-price').textContent = total.toFixed(2);
    }

    function updateQuantity(item, change) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem !== item);
        }
        updateCartView();
    }

    function showCartView() {
        document.getElementById('dashboard-container').style.display = 'none';
        document.getElementById('cart-container').style.display = 'block';
    }

    function showDashboardView() {
        document.getElementById('cart-container').style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'block';
    }

    // Add event listeners for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                name: this.parentElement.querySelector('h3').textContent,
                price: parseFloat(this.parentElement.querySelector('p').textContent.replace('₱', '')),
                image: this.parentElement.querySelector('img').src
            };
            addToCart(product);
        });
    });

    // Add event listener for cart button in header
    document.querySelector('.cart-btn').addEventListener('click', showCartView);

    // Add event listener for "Return to Cart" button
    document.getElementById('return-to-dashboard').addEventListener('click', showDashboardView);

    // Custom coffee creation
    const createCustomCoffeeBtn = document.getElementById('create-custom-coffee');
    createCustomCoffeeBtn.addEventListener('click', function() {
        const base = document.getElementById('coffee-base').value;
        const milk = document.getElementById('milk-type').value;
        const sugar = document.getElementById('sugar-percentage').value;

        // Calculate price based on ingredients
        let price = 0;
        switch (base) {
            case 'espresso': price += 80; break;
            case 'americano': price += 90; break;
            case 'latte': price += 100; break;
            case 'cappuccino': price += 110; break;
            case 'mocha': price += 120; break;
            case 'macchiato': price += 115; break;
        }

        switch (milk) {
            case 'whole': price += 5; break;
            case 'skim': price += 5; break;
            case 'soy': price += 15; break;
            case 'almond': price += 20; break;
            case 'oat': price += 20; break;
        }

        // Add sugar cost (assuming 5 pesos per 25% sugar)
        price += (parseInt(sugar) / 25) * 5;

        const customCoffee = {
            name: `Custom ${base} with ${milk} milk and ${sugar}% sugar`,
            price: price,
            image: 'custom-coffee.png' // You'll need to add this image to your project
        };

        addToCart(customCoffee);
        alert(`Your custom coffee has been added to the cart:\n${customCoffee.name}\nPrice: ₱${customCoffee.price.toFixed(2)}`);
    });

    const userInfo = document.querySelector('.user-info');
    const userDropdown = document.querySelector('.user-dropdown');
    const editProfileLink = document.getElementById('edit-profile');
    const logoutLink = document.getElementById('logout');
    const editProfileContainer = document.getElementById('edit-profile-container');
    const editProfileForm = document.getElementById('edit-profile-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // Toggle user dropdown
    userInfo.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        userDropdown.style.display = 'none';
    });

    // Handle edit profile
    editProfileLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('dashboard-container').style.display = 'none';
        editProfileContainer.style.display = 'block';
        userDropdown.style.display = 'none';

        // Populate form with current user data (replace with actual user data)
        document.getElementById('edit-name').value = '';
        document.getElementById('edit-email').value = '';
        document.getElementById('edit-phone').value = '';
        document.getElementById('edit-dob').value = '';
    });

    // Handle cancel edit
    cancelEditBtn.addEventListener('click', function() {
        editProfileContainer.style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'block';
    });

    // Handle edit profile form submission
    editProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Profile updated:', {
            name: document.getElementById('edit-name').value,
            email: document.getElementById('edit-email').value,
            phone: document.getElementById('edit-phone').value,
            dateOfBirth: document.getElementById('edit-dob').value
        });
        editProfileContainer.style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'block';
    });

    // Handle logout
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('dashboard-container').style.display = 'none';
        document.getElementById('auth-container').style.display = 'block';
        userDropdown.style.display = 'none';
    });

    const dobInput = document.getElementById('edit-dob');
    
    dobInput.addEventListener('click', function() {
        this.type = 'date';
        this.focus();
    });

    dobInput.addEventListener('blur', function() {
        if (!this.value) {
            this.type = 'text';
        }
    });

    dobInput.addEventListener('input', function() {
        if (this.type === 'date') {
            const date = new Date(this.value);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            this.type = 'text';
        }
    });

    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');

    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
    });

    // Close notification panel when clicking outside
    document.addEventListener('click', function() {
        notificationPanel.style.display = 'none';
    });
});
