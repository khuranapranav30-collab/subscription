import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { auth, db } from "./utilities/firebase";

function Signup({ signup, handleChange2, resetSignup }) {
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!signup.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!signup.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (signup.password !== signup.Cpassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        signup.email,
        signup.password
      );

      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: signup.name.trim(),
        email: user.email,
        plan: "Free"
      });

      alert("Account created successfully!");
      resetSignup();
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in.");
      } else if (error.code === "auth/weak-password") {
        alert("Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email.");
      } else {
        alert("Signup failed: " + error.message);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email || "",
          plan: "Free"
        });
      }

      resetSignup();
      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);

      if (error.code !== "auth/popup-closed-by-user") {
        alert("Google signup failed: " + error.message);
      }
    }
  };

  return (
    <>
      <style>{`
        .signup-container {
          display: flex;
          flex-direction: column;
          width: 450px;
          max-width: calc(100% - 60px);
          border: 3px solid hsl(220, 100%, 50%);
          padding: 25px;
          margin: 35px auto;
          border-radius: 8px;
          gap: 10px;
          box-sizing: border-box;
        }

        .signup-container h2 {
          text-align: center;
          color: hsl(220, 100%, 50%);
          margin-bottom: 15px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 5px 0;
        }

        .form-row label {
          width: 140px;
          flex-shrink: 0;
        }

        .form-row input {
          flex: 1;
          min-width: 0;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        #create-btn, #google-signup-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 11px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        #create-btn {
          margin-top: 15px;
          background: hsl(220, 100%, 50%);
          color: white;
          border: none;
        }

        #create-btn:hover {
          background: hsl(220, 95%, 61%);
        }

        #google-signup-btn {
          gap: 12px;
          margin-top: 5px;
          background: #fff;
          color: #3c4043;
          border: 1px solid #dadce0;
          font-family: Arial, sans-serif;
          font-weight: 500;
        }

        #google-signup-btn img {
          width: 20px;
          height: 20px;
        }

        #google-signup-btn:hover {
          background: #f7f8f8;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        #google-signup-btn:active {
          background: #eee;
        }

        #google-signup-btn:focus-visible {
          outline: 2px solid #4285f4;
          outline-offset: 2px;
        }

        .signup-divider {
          text-align: center;
          color: #666;
          margin: 8px 0;
        }

        @media (max-width: 520px) {
          .form-row {
            flex-direction: column;
            align-items: stretch;
          }

          .form-row label {
            width: auto;
          }
        }
      `}</style>

      <div className="signup-container">
        <h2>Create a DEV@Deakin Account</h2>

        <div className="form-row">
          <label htmlFor="signup-name">Name*</label>
          <input
            id="signup-name"
            type="text"
            name="name"
            value={signup.name}
            onChange={handleChange2}
            autoComplete="name"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="signup-email">Email*</label>
          <input
            id="signup-email"
            type="email"
            name="email"
            value={signup.email}
            onChange={handleChange2}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="signup-password">Password*</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            value={signup.password}
            onChange={handleChange2}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="signup-confirm">Confirm password*</label>
          <input
            id="signup-confirm"
            type="password"
            name="Cpassword"
            value={signup.Cpassword}
            onChange={handleChange2}
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="button"
          id="create-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

        <p className="signup-divider">OR</p>

        <button
          id="google-signup-btn"
          onClick={handleGoogleSignUp}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
          />
          Continue with Google
        </button>
      </div>
    </>
  );
}

export default Signup;