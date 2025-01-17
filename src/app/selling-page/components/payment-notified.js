import Image from "next/image";

function PaymentNotified() {
  return (
    <>
      <div className="payment-notified">
        <p>
          Extended every 4-week at the price of $39.99 if you do not cancel 24
          hours before the renewal date in your account settings.{" "}
          <a href="#">Subscription Terms</a>.
        </p>
        <div className="paydent">
          <i className="bi bi-shield-check me-1"></i> Pay safe & secure
        </div>
        <Image
          src="/images/users/payment_methods.webp"
          width={184}
          height={56}
          alt="img"
        />
        <p className="cp-text">ADM Digital.</p>
      </div>
      <div className="bg-light-green mt-4">
        <Image
          src="/images/users/icon-money-back.svg"
          width={100}
          height={100}
          alt="img"
        />
        <h2>Money-Back Guarantee</h2>
        <p>
          We are so confident in our service that we are ready to offer a full
          refund within 30 days of purchase if you do not achieve initial
          results and can demonstrate you have followed the plan.
        </p>
        <p>
          Learn more about all the conditions in our{" "}
          <a href="#">Subscription Terms</a>.
        </p>
      </div>
    </>
  );
}

export default PaymentNotified;
