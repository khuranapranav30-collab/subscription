import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utilities/firebase";

function NavBar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Unable to log out. Please try again.");
        }
    };

    return (
        <>
            <style>
            {`
            nav {
                display: flex;
                align-items: center;
                background-color: hsl(0, 0%, 18%);
                position: sticky;
                top: 0;
                z-index: 10;
                height: 45px;
                box-sizing: border-box;
                padding: 0 12px;
                gap: 20px;
            }
            
            nav a {
                text-decoration: none;
                color: white;
            }

            .logo {
                width: auto;
            }

            .search {
                flex: 1;
                min-width: 0;
                height: 35px;
                display: flex;
                align-items: stretch;
            }

            .search-logo {
                width: 45px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                box-sizing: border-box;
            }

            .search-bar {
                flex: 1;
                min-width: 0;
            }

            .search-bar input {
                width: 100%;
                height: 100%;
                padding: 5px;
                box-sizing: border-box;
                border: none;
                outline: none;
            }

            .left {
                width: auto;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                gap: 20px;
            }
        `}
            </style>

            <nav>
                <div className="logo">
                    <NavLink to="/">
                        {user ? (user.displayName || user.email) : "Dev@Deakin"}
                    </NavLink>
                </div>

                <div className="search">
                    <div className="search-logo">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="search" />
                    </div>
                </div>

                <div className="left">
                    <div className="subscription">
                        <NavLink to="/pricing">Subscription</NavLink>
                    </div>

                    <div className="post">
                        <NavLink to="/post">Post</NavLink>
                    </div>

                    <div className="login">
                        {user ? (
                            <NavLink to="/login" onClick={handleLogout}>
                                Logout
                            </NavLink>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
