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
