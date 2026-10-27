import { useState } from "react";

function Subscribe() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("Sending...");

        try {
            const response = await fetch(
                "http://localhost:3000/api/subscribe",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email })
                }
            );

            const result = await response.text();

            if (!response.ok) {
                throw new Error(result || "Subscription failed.");
            }

            setMessage("Welcome email sent successfully!");
            setEmail("");
        } 
        catch (error) {
            setMessage("Failed: " + error.message);
        }
    };

    return (
        <>
            <style>
                {`
                    .subscribe-form {
                        margin-top: 50px;
                        display: flex;
                        justify-content: center;
                        height: 40px;
                    }

                    .subscribe-form input {
                        width: 400px;
                        outline: none;
                        border: 1px solid black;
                        padding: 0 10px;
                        box-sizing: border-box;
                    }

                    #sub-btn {
                        background-color: hsl(0, 0%, 18%);
                        color: white;
                        border-radius: 2px;
                        border: none;
                        width: 120px;
                        flex-shrink: 0;
                    }

                    #sub-btn:hover {
                        background-color: hsl(0, 0%, 25%);
                        cursor: pointer;
                    }

                    .subscribe-message {
                        margin-top: 12px;
                        text-align: center;
                    }
                `}
            </style>

            <form className="subscribe-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button id="sub-btn" type="submit">
                    Subscribe
                </button>
            </form>

            {message && (
                <p className="subscribe-message" role="status">
                    {message}
                </p>
            )}
        </>
    );
}

export default Subscribe;