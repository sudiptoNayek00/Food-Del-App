import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./orderConfirm.css";

function OrderConfirm() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="order-confirmation-container">
      <div className="success-animation">
        {success ? (
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14 27l7 7 16-16"
            />
          </svg>
        ) : (
          <svg className="failmark" viewBox="0 0 52 52">
            <circle
              className="failmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="failmark-cross"
              fill="none"
              d="M16 16l20 20M36 16l-20 20"
            />
          </svg>
        )}
      </div>
      <h2>{success ? "Order Confirmed!" : "Order Failed"}</h2>
      <p className={success ? "success-text" : "fail-text"}>
        {success
          ? "Your order has been placed successfully."
          : "Sorry, we could not process your order. Please try again or contact support."}
      </p>
      {orderId && (
        <p>
          <b>Order ID:</b> <span className="order-id">{orderId}</span>
        </p>
      )}
      <p className={success ? "thanks-msg" : "fail-msg"}>
        {success
          ? "Thank you for shopping with us! 🎉"
          : "We apologize for the inconvenience."}
      </p>
      <button className="go-home-btn" onClick={handleGoHome}>
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderConfirm;
