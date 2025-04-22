import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Image from "next/image";

const CheckoutForm = ({ selectedPlanData, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/frontend/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: selectedPlanData._id,
        price: selectedPlanData.price,
      }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment successful!");
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-body">
      <h4 className="payment-heading">Pay fast & secure with Card</h4>
      <div className="card-icons">
        <Image src="/images/visa.svg" alt="Visa" width={40} height={24} />
        <Image src="/images/ms.svg" alt="MasterCard" width={40} height={24} />
        <Image src="/images/maestro.svg" alt="Maestro" width={40} height={24} />
        <Image src="/images/ae.svg" alt="Amex" width={40} height={24} />
        <Image src="/images/capa_1.svg" alt="Diners" width={40} height={24} />
        <Image src="/images/dn.svg" alt="Discover" width={40} height={24} />
      </div>

      <div className="card-input-wrapper">
        <CardElement
          className="card-input"
          options={{
            style: {
              base: {
                fontSize: "16px",
              },
            },
            hidePostalCode: true, // Hides the ZIP code field
          }}
        />
      </div>

      {error && <div className="text-danger mt-2">{error}</div>}

      <button type="submit" className="confirm-btn" disabled={!stripe || loading}>
        {loading ? "Processing..." : "🔒 CONFIRM PAYMENT"}
      </button>

      <div className="safe-label mt-3">✅ Pay safe & secure</div>
    </form>
  );
};

export default CheckoutForm;
