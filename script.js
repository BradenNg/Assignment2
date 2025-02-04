// User Authentication //

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCCiIqeQPm0NekECYuiFh1NKMAJ5SOKrZM",
  authDomain: "mokesell-24e42.firebaseapp.com",
  projectId: "mokesell-24e42",
  storageBucket: "mokesell-24e42.firebasestorage.app",
  messagingSenderId: "51017912275",
  appId: "1:51017912275:web:a49e6821aec58b8b362926",
  measurementId: "G-NEM9WMWGRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Payment //

const stripe = Stripe('pk_test_51QkkCUPC6ND5BeiPkRJxH8Gyk689zvWOWyqHfsEFohOHDxUqp14QVTi3YpQjhwOAllxVZh0xqUHjcD7hqk512Wjm00Ow5g4moM'); // Replace with your publishable key

document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById('checkout-button');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const session = await response.json();

                // Redirect to Stripe Checkout page
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id
                });

                if (result.error) {
                    alert(result.error.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again later.');
            }
        });
    }
});

// Load country list
fetch("https://restcountries.com/v3.1/all")
.then(response => response.json())
.then(data => {
    const countrySelect = document.getElementById("country");
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    data.forEach(country => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
    });
})
.catch(error => console.error("Error loading countries:", error));

document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = `$${product.price}`;
        document.getElementById('sellerName').value = product.seller;
        document.getElementById('productImage').src = product.image;
    }
});

// Adding functionality to the Buy Now buttons on the shop page
const buyNowButtons = document.querySelectorAll('.buy-now');

buyNowButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = button.closest('.product-card'); // Assuming each product is inside a div with class 'product-card'
        const product = {
            name: productCard.querySelector('.product-name').innerText,
            price: productCard.querySelector('.product-price').innerText.replace('$', ''),
            seller: productCard.querySelector('.seller-name').innerText,
            image: productCard.querySelector('img').src
        };

        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'payment.html'; // Redirect to payment page
    });
});
