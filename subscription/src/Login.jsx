import { NavLink, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { auth, db } from "./utilities/firebase";

async function verifyWithBackend(user) {
  const idToken = await user.getIdToken();

  const response = await fetch(
    "http://localhost:3000/api/auth/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      }
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Backend token verification failed."
    );
  }

  console.log("Backend verification:", result);
  return result;
}

function Login({ login, handleChange1, resetLogin }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    let user = null;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      );

      user = userCredential.user;
      await verifyWithBackend(user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (user) {
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error("Sign-out error:", signOutError);
        }
      }

      if (error.code === "auth/invalid-credential") {
        alert("Incorrect email or password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email.");
      } else if (error.code === "auth/missing-password") {
        alert("Please enter your password.");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many attempts. Please try again later.");
      } else {
        alert("Login failed: " + error.message);
      }
    } finally {
      resetLogin();
    }
  };

  const handleGoogleSignIn = async () => {
    let user = null;

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      user = userCredential.user;

      if (!user.email) {
        await signOut(auth);
        user = null;
        alert("Unable to retrieve your Google email.");
        return;
      }

      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      const usersSnapshot = await getDocs(usersQuery);

      if (usersSnapshot.empty) {
        await signOut(auth);
        user = null;
        alert("No DEV@Deakin account found. Please sign up first.");
        return;
      }

      await verifyWithBackend(user);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);

      if (user) {
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error("Sign-out error:", signOutError);
        }
      }

      if (error.code !== "auth/popup-closed-by-user") {
        alert(
          "Google sign-in failed: " +
          (error.message || "Please try again.")
        );
      }
    }
  };

  return (
    <>
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 300px;
          max-width: calc(100% - 60px);
          border: 3px solid hsl(220, 100%, 50%);
          padding: 40px;
          margin: 80px auto;
          gap: 10px;
          border-radius: 8px;
        }

        .container h2 {
          text-align: center;
          color: hsl(220, 100%, 50%);
        }

        .container p {
          color: black;
          margin-bottom: 2px;
        }

        .container input {
          padding: 9px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .signup-link {
          text-decoration: none;
          align-self: flex-end;
        }

        #btn1, #btn2, #google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 11px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        #btn1 {
          background-color: white;
          border: 2px solid hsl(220, 100%, 50%);
          color: hsl(220, 100%, 50%);
          padding: 10px 14px;
        }

        #btn1:hover {
          background: #f0f5ff;
        }

        #btn2 {
          margin-top: 15px;
          background: hsl(220, 100%, 50%);
          color: white;
          border: none;
        }

        #btn2:hover {
          background: hsl(220, 95%, 61%);
        }

        #google-btn {
          width: 100%;
          gap: 12px;
          margin-top: 5px;
          background: #fff;
          color: #3c4043;
          border: 1px solid #dadce0;
          font-family: Arial, sans-serif;
          font-weight: 500;
        }

        #google-btn img {
          width: 20px;
          height: 20px;
        }

        #google-btn:hover {
          background: #f7f8f8;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        #google-btn:active {
          background: #eee;
        }

        #google-btn:focus-visible {
          outline: 2px solid #4285f4;
          outline-offset: 2px;
        }

        .login-divider {
          text-align: center;
          color: #666;
          margin: 8px 0;
        }
      `}</style>

      <div className="container">
        <NavLink to="/signup" className="signup-link">
          <button id="btn1">
            Signup
          </button>
        </NavLink>

        <h2>Login to DEV@Deakin</h2>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange1}
          autoComplete="email"
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange1}
          autoComplete="current-password"
        />

        <button
          id="btn2"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="login-divider">OR</p>

        <button
          id="google-btn"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            aria-hidden="true"
          />
          Continue with Google
        </button>
      </div>
    </>
  );
}

export default Login;
