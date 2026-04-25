"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "";
  const amount = parseInt(searchParams.get("amount") || "0");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!user) return;
    setPaying(true);
    setError("");

    try {
      // Create order on backend
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, domain }),
      });

      const orderData = await orderRes.json();

      if (orderData.error) {
        setError(orderData.error);
        setPaying(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Espace AI",
        description: `Custom Domain: ${domain}`,
        order_id: orderData.id,
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#1a3a5c",
        },
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              domain,
              user_id: user.id,
              amount,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setSuccess(true);
          } else {
            setError("Payment verification failed. Contact support.");
          }
          setPaying(false);
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="payment-page">
        <div className="payment-success-box">
          <div className="payment-success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="payment-success-title">Payment Successful!</h1>
          <p className="payment-success-desc">
            Your order for <strong>{domain}</strong> has been placed.
            Our team will set up your domain and connect it to your
            portfolio within 24 hours.
          </p>
          <p className="payment-success-desc">
            You will receive a confirmation on <strong>{user?.email}</strong>
          </p>
          <div className="payment-success-actions">
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard
            </Link>
            <a href="mailto:sreeharisunil100@gmail.com" className="btn btn-outline btn-lg">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <nav className="domain-nav">
        <Link href="/" className="domain-nav-logo">
          <Image src="/espace.png" alt="Espace AI" width={110} height={32} style={{ height: 30, width: "auto" }} />
        </Link>
        <div className="domain-nav-links">
          <Link href="/domains">Back to Search</Link>
        </div>
      </nav>

      <div className="payment-inner">
        <div className="payment-box">
          <div className="payment-header">
            <h1 className="payment-title">Complete your order</h1>
            <p className="payment-sub">Secure payment powered by Razorpay</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="payment-order-summary">
            <h3 className="payment-summary-title">Order Summary</h3>
            <div className="payment-summary-row">
              <span>Domain</span>
              <span className="payment-domain-name">{domain}</span>
            </div>
            <div className="payment-summary-row">
              <span>Domain registration (1 year)</span>
              <span>Included</span>
            </div>
            <div className="payment-summary-row">
              <span>Portfolio setup & hosting</span>
              <span>Included</span>
            </div>
            <div className="payment-summary-row">
              <span>Google indexing setup</span>
              <span>Included</span>
            </div>
            <div className="payment-summary-row">
              <span>SSL certificate</span>
              <span>Free</span>
            </div>
            <div className="payment-summary-divider" />
            <div className="payment-summary-total">
              <span>Total</span>
              <span>₹{amount}</span>
            </div>
          </div>

          <div className="payment-what-next">
            <h3 className="payment-summary-title">What happens after payment</h3>
            {[
              "Your domain is registered on Hostinger",
              "DNS is configured to point to your portfolio",
              "Your portfolio goes live at your custom domain",
              "Google indexing is submitted within 24 hours",
            ].map((step, i) => (
              <div key={i} className="payment-step">
                <div className="payment-step-num">{i + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={handlePayment}
            disabled={paying}
          >
            {paying ? "Opening payment..." : `Pay ₹${amount} Securely`}
          </button>

          <p className="payment-secure-note">
            Secured by Razorpay. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="dashboard-loading"><div className="dashboard-spinner" /></div>}>
      <PaymentContent />
    </Suspense>
  );
        }
