"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

const ADMIN_EMAIL = "sreeharisunil100@gmail.com";

interface Order {
  id: string;
  user_id: string;
  domain: string;
  amount: number;
  status: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  notes: string;
  created_at: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    active: 0,
    review: 0,
    revenue: 0,
  });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.email !== ADMIN_EMAIL) {
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setOrders(data || []);
        setStats({
          total: data?.length || 0,
          paid: data?.filter((o) => o.status === "paid").length || 0,
          active: data?.filter((o) => o.status === "domain_active").length || 0,
          review: data?.filter((o) => o.status === "needs_review").length || 0,
          revenue: data?.reduce((sum, o) => sum + (o.amount || 0), 0) || 0,
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "domain_active": return "status-active";
      case "paid": return "status-paid";
      case "needs_review": return "status-review";
      default: return "status-paid";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "domain_active": return "Live";
      case "paid": return "Paid";
      case "needs_review": return "Needs Review";
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1 className="admin-title">Admin Panel</h1>
            <p className="admin-sub">Espace AI — Order Management</p>
          </div>
          <Link href="/" className="btn btn-outline">Back to Site</Link>
        </div>
      </div>

      <div className="admin-body">
        {error && <div className="auth-error">{error}</div>}

        {/* Stats */}
        <div className="admin-stats">
          {[
            { label: "Total Orders", value: stats.total, color: "var(--accent)" },
            { label: "Domain Active", value: stats.active, color: "#16a34a" },
            { label: "Needs Review", value: stats.review, color: "#dc2626" },
            { label: "Total Revenue", value: `₹${stats.revenue}`, color: "var(--gold)" },
          ].map((s, i) => (
            <div key={i} className="admin-stat-card">
              <div className="admin-stat-value" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="admin-table-wrap">
          <h2 className="admin-table-title">All Orders</h2>
          {orders.length === 0 ? (
            <div className="admin-empty">No orders yet.</div>
          ) : (
            <div className="admin-table">
              <div className="admin-table-header">
                <span>Domain</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Payment ID</span>
                <span>Date</span>
                <span>Notes</span>
              </div>
              {orders.map((order) => (
                <div key={order.id || order.razorpay_payment_id} className="admin-table-row">
                  <span className="admin-domain">{order.domain}</span>
                  <span className="admin-amount">₹{order.amount}</span>
                  <span>
                    <span className={`admin-status ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </span>
                  <span className="admin-payment-id">
                    {order.razorpay_payment_id?.substring(0, 16)}...
                  </span>
                  <span className="admin-date">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString("en-IN")
                      : "—"}
                  </span>
                  <span className="admin-notes">
                    {order.notes || "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
