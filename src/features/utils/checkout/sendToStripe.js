const sendToStripe = () => {
//  const form = document.querySelector("form");

//  form.addEventListener("submit", (e) => stripePurchase(e));

    function stripePurchase(e) {
        e.preventDefault();
    
        // Create an instance of the Stripe object with your publishable API key
        let stripe = Stripe(
            "pk_test_51Qru3wBFmJyup0ZDWGyGPq8uiE1et3tw9KeqN2H8mEZYwlvmaRb7dZxrIaGYWFIqVUfXZ0WcyOHnP0iZOl9vM8lm00XWIzFNWy"
        );
        fetch("/api/stripe", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
            })
            .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
            })
            .catch(function (error) {
            console.error("Error:", error);
            });
    }
}

export default sendToStripe;