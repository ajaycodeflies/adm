import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const selectedPlanData = plans.find((plan) => plan._id === selectedPlan);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiscount(true);
    }, 10 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/frontend/plans");
      const data = await res.json();
      if (data.success) {
        setPlans(data.plans);
        const mostPopular = data.plans.find((p) => p.is_popular) || data.plans[0];
        setSelectedPlan(mostPopular?._id);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePlanChange = (id) => {
    setSelectedPlan(id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="plan-container">
      <div className="badge-blocks">
        <div className="badge-text">
          <p>
            <i className="bi bi-shield-check me-1"></i> Your goal
          </p>
          <h5 className="fw-bold">Professional growth</h5>
        </div>
        <div className="badge-text">
          <p>
            <i className="bi bi-bar-chart-fill me-1"></i> Your target
          </p>
          <h5 className="fw-bold">Buy a house</h5>
        </div>
      </div>

      <div className="plan-blocks">
        {plans.map((plan) => (
          <div className="plan mb-3" key={plan._id}>
            {plan.is_popular && (
              <div className="highlight">
                <span className="badge badge-soft-primary">
                  <i className="bi bi-hand-thumbs-up-fill"></i> Most Popular
                </span>
              </div>
            )}
            <input
              type="radio"
              name="plan"
              id={plan._id}
              className="form-check-input"
              checked={selectedPlan === plan._id}
              onChange={() => handlePlanChange(plan._id)}
            />
            <label
              htmlFor={plan._id}
              className="form-label d-flex align-items-center w-100 mb-0"
            >
              <div className="custom-check"></div>
              <div className="full-price">
                <span>{plan.plan_name?.toUpperCase()}</span>
                <small>
                  {!showDiscount ? (
                    <>
                      <span style={{ textDecoration: "line-through", marginRight: 4 }}>
                        ${plan.original_price.toFixed(2)}
                      </span>
                      ${plan.price.toFixed(2)}
                    </>
                  ) : (
                    <>${plan.original_price.toFixed(2)}</>
                  )}
                </small>
              </div>
              <span className="price">
                <svg width="18" height="48" viewBox="0 0 18 48">
                  <path
                    fill="#F1F1F1"
                    d="M17.5398 0.224716C17.6504 0.0829078 17.8202 0 18 0V48C17.8202 48 17.6504 47.9171 17.5398 47.7753L1.87711 27.6896C0.185765 25.5206 0.185763 22.4794 1.87711 20.3104L17.5398 0.224716Z"
                  ></path>
                </svg>
                <div className="per-day-price">
                  <div className="dollar-sign-price">$</div>
                  <div className="big-size-price">
                    {Math.floor(!showDiscount ? plan.per_day_price : plan.per_day_off)}
                  </div>
                  <div className="small-size-price">
                    <small>
                      .{((!showDiscount ? plan.per_day_price : plan.per_day_off) % 1)
                        .toFixed(2)
                        .substring(2)}
                    </small>
                    <small>per day</small>
                  </div>
                </div>
              </span>
            </label>
          </div>
        ))}

        <div className="d-flex mt-4">
          <i className="bi bi-info-circle me-2 text-primary"></i>
          <div className="icon-text">
            <span>
              People using plan for 3 months achieve twice as many results as
              for 1 month
            </span>
            <p className="fs-small text-muted mt-2 mb-4">
              *According to a research by ADM Digital, 2024
            </p>
          </div>
        </div>

        <button type="button" className="btn pulse-btn w-100" onClick={toggleModal}>
          GET MY PLAN
        </button>
      </div>

      {isModalOpen && (
        <div className="checkout-modal-wrapper">
          <div className="modal-overlay">
            <div className="checkout-modal">
              <div className="checkout-top-header">
                <button className="close-btn" onClick={toggleModal}>X</button>
                <p className="justify-center text-center">Checkout</p>
              </div>
              <div className="checkout-header">
                <h3 className="checkout-title">
                  <span className="highlight-char">91% of users</span> are satisfied with the plan and stay with us after its completion
                </h3>
                <div className="total-section">
                  <span>Total</span>
                  <strong>${selectedPlanData?.price?.toFixed(2)}</strong>
                </div>
              </div>

              <div className="checkout-body">
                <h4 className="payment-heading">Pay fast & secure with Card</h4>
                <div className="payment-options">
                </div>

                <div className="card-form">
                  <div className="card-icons">
                    <img src="/images/visa.svg" alt="Visa" />
                    <img src="/images/ms.svg" alt="MasterCard" />
                    <img src="/images/maestro.svg" alt="Maestro" />
                    <img src="/images/ae.svg" alt="Amex" />
                    <img src="/images/capa_1.svg" alt="Diners" />
                    <img src="/images/dn.svg" alt="Discover" />
                  </div>

                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="card-input" />
                  <div className="card-row">
                    <input type="text" placeholder="MM/YY" className="card-input" />
                    <input type="text" placeholder="CVV" className="card-input" />
                  </div>
                  <button
                    className="confirm-btn"
                    onClick={async () => {
                      const stripe = await stripePromise;
                      const res = await fetch('/api/frontend/checkout', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          planId: selectedPlanData.plan_name,
                          price: selectedPlanData.price,
                        }),
                      });

                      const { sessionId } = await res.json();
                      await stripe.redirectToCheckout({ sessionId });
                    }}
                  >
                    🔒 CONFIRM PAYMENT
                  </button>

                </div>
                <div className="safe-label">
                  ✅ Pay safe & secure
                </div>

                <p className="checkout-info">
                  You agree to our <a href="#">Subscription Terms</a> and <a href="#">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
