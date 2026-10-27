import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "firebase/firestore";
import { auth, db } from "./utilities/firebase";

function Pricing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsPaid(false);

      if (!currentUser?.email) {
        return;
      }

      try {
        const usersQuery = query(
          collection(db, "users"),
          where("email", "==", currentUser.email)
        );

        const snapshot = await getDocs(usersQuery);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          setIsPaid(
            userData.plan === "Paid" ||
            userData.subscriptionStatus === "active"
          );
        }
      } catch (error) {
        console.error("Unable to load subscription:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCardDetails((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleUpgrade = () => {
    setMessage("");

    if (!user) {
      setShowForm(false);
      setMessage("Please log in first to upgrade to the Paid Plan.");
      return;
    }

    if (isPaid) {
      setMessage("You are already subscribed to the Paid Plan.");
      return;
    }

    setShowForm(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage("Please log in first to upgrade your plan.");
      setShowForm(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      const snapshot = await getDocs(usersQuery);

      if (snapshot.empty) {
        setMessage("Your user profile was not found in Firestore.");
        return;
      }

      await Promise.all(
        snapshot.docs.map((userDoc) =>
          updateDoc(doc(db, "users", userDoc.id), {
            plan: "Paid",
            subscriptionStatus: "active"
          })
        )
      );

      setIsPaid(true);
      setShowForm(false);
      setCardDetails({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
      });
      setMessage("Your plan has been upgraded to Paid successfully!");
    } catch (error) {
      console.error("Subscription update error:", error);
      setMessage("Unable to update your plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      <style>{`
        .pricing-container {
          padding: 40px 20px;
          text-align: center;
        }

        .pricing-container h1 {
          color: hsl(220, 100%, 50%);
          margin-bottom: 10px;
        }

        .pricing-plans {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 35px;
          flex-wrap: wrap;
        }

        .plan {
          width: 280px;
          padding: 25px;
          border: 2px solid #ddd;
          border-radius: 10px;
          text-align: left;
        }

        .plan h2 {
          color: hsl(220, 100%, 50%);
        }

        .plan h3 {
          font-size: 28px;
        }

        .plan ul {
          padding-left: 20px;
          line-height: 2;
        }

        .plan button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 5px;
          background: hsl(220, 100%, 50%);
          color: white;
          cursor: pointer;
          transition: transform 0.15s;
        }

        .plan button:hover {
          transform: scale(1.02);
        }

        .plan button:disabled {
          background: #888;
          cursor: not-allowed;
        }

        .free-plan {
          background: #f8faff;
        }

        .subscription-message {
          margin: 20px auto;
          font-weight: 600;
          color: #166534;
        }

        .payment-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
          box-sizing: border-box;
        }

        .payment-form {
          background: white;
          color: #222;
          width: 100%;
          max-width: 420px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 28px;
          border-radius: 12px;
          box-sizing: border-box;
          text-align: left;
        }

        .payment-form h2 {
          text-align: center;
          color: hsl(220, 100%, 50%);
          margin-top: 0;
        }

        .payment-form p {
          text-align: center;
        }

        .payment-form form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .payment-form input {
          width: 100%;
          padding: 11px;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-sizing: border-box;
        }

        .payment-row {
          display: flex;
          gap: 12px;
        }

        .payment-row > div {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .payment-form button {
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .payment-submit {
          background: hsl(220, 100%, 50%);
          color: white;
        }

        .payment-cancel {
          background: #e5e7eb;
          color: #222;
        }
      `}</style>

      <h1>Choose Your Plan</h1>
      <p>Find the right plan for your DEV@Deakin experience.</p>

      <div className="pricing-plans">
        <div className="plan free-plan">
          <h2>Free Plan</h2>
          <h3>$0 <small>/ forever</small></h3>
          <p>Get started with the basics.</p>

          <ul>
            <li>Create an account</li>
            <li>Browse articles</li>
            <li>Create posts</li>
            <li>Basic community access</li>
          </ul>

          <button onClick={() => navigate("/")}>
            Current Free Plan
          </button>
        </div>

        <div className="plan">
          <h2>Paid Plan</h2>
          <h3>$9.99 <small>/ month</small></h3>
          <p>Get more from DEV@Deakin.</p>

          <ul>
            <li>Everything in Free</li>
            <li>Premium content access</li>
            <li>Advanced profile features</li>
            <li>Priority community support</li>
          </ul>

          <button onClick={handleUpgrade} disabled={isPaid}>
            {isPaid ? "Current Paid Plan" : "Upgrade Plan"}
          </button>
        </div>
      </div>

      {message && (
        <p className="subscription-message" role="status">
          {message}
        </p>
      )}

      {showForm && (
        <div className="payment-overlay">
          <div className="payment-form">
            <h2>Upgrade to Paid Plan</h2>
            <p>Subscription: $9.99/month</p>

            <form onSubmit={handlePayment}>
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                id="cardName"
                name="cardName"
                type="text"
                placeholder="Name on card"
                value={cardDetails.cardName}
                onChange={handleChange}
                autoComplete="cc-name"
                required
              />

              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                autoComplete="cc-number"
                maxLength={19}
                pattern="[0-9 ]{13,19}"
                required
              />

              <div className="payment-row">
                <div>
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={handleChange}
                    autoComplete="cc-exp"
                    maxLength={5}
                    pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="password"
                    inputMode="numeric"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={handleChange}
                    autoComplete="cc-csc"
                    maxLength={4}
                    pattern="[0-9]{3,4}"
                    required
                  />
                </div>
              </div>

              <button
                className="payment-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating Plan..." : "Continue"}
              </button>

              <button
                className="payment-cancel"
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;