// Function to display the correct page based on user action
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
}

// Event listener for login button
document.getElementById('loginBtn').addEventListener('click', function () {
    showPage('homePage');
});

document.getElementById('signUpBtn').addEventListener('click', function () {
    alert('Sign-up page will be available soon.');
});

// Open Profile page
function openProfile() {
    showPage('profilePage');
}

// Open Cart page
function openCart() {
    showPage('cartPage');
}

// Proceed to checkout from Cart page
document.getElementById('checkoutBtn').addEventListener('click', function () {
    showPage('checkoutPage');
});

// Payment Method selection
function choosePayment(method) {
    alert('You chose ' + method);
    showPage('confirmationPage');
}

// Go back to Home page after confirmation
function goToHome() {
    showPage('homePage');
}

// Go back to Home page when pressing "Back" from Profile or Cart
function goBackHome() {
    showPage('homePage');
}

// Save profile details and notify user
document.getElementById('saveProfileBtn').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const fullName = document.getElementById('fullName').value;
    const birthdate = document.getElementById('birthdate').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('profileEmail').value;

    if (username && fullName && birthdate && address && phoneNumber && email) {
        alert('Profile details have been updated.');
        // Optionally, save the details for further use
        showPage('homePage');
    } else {
        alert('Please fill in all fields.');
    }
});

// Initially display the login page
showPage('loginPage');
