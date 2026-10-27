function Footer() {
    return (
        <>
            <style>
                {`
                    .Contact{
                        background-color:hsl(0, 0%, 12%);
                        color:white;
                        margin: 10px 8px;
                    }
                    .ftr {
                        background-color: #1f6f78;
                        color: white;
                        display:grid;
                        grid-template-columns:1fr 1fr 1fr;
                        text-align:center;
                    }
                    .fa-brands.fa-square-facebook{
                        font-size: 40px;
                        color: blue;
                    }
                    .fa-brands.fa-square-twitter{
                        font-size: 40px;
                        color: #1DA1F2;
                    }
                    .fa-brands.fa-square-instagram{
                        font-size: 40px;
                        color: #E1306C;
                    }
                    #hh{
                    text-align:center;
                    }
                    .footer-links{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    gap:50px;
                    }
                    .footer{
                        grid-column: 1/-1;
                        text-align:center;
                    }
                    @media (max-width: 800px) {
                        .form {
                            width: 100%;
                        }
                        .form label {
                            font-size: 14px;
                        }
                        .form input {
                            width: 33%;
                        }
                        .btn {
                            width: 85px;
                            font-size: 13px;
                        }
                    }
                `}
            </style>

            <div className="ftr">

                <aside>
                    <h3>Explore</h3>
                    <p>Home</p>
                    <p>Questions</p>
                    <p>Articles</p>
                    <p>Tutorials</p>
                </aside>

                <section>
                    <h3>Support</h3>
                    <p>FAQs</p>
                    <p>Help</p>
                    <p>Contact Us</p>
                </section>

                <article>
                    <h3>Stay connected</h3>
                    <i className="fa-brands fa-square-facebook"></i>
                    <i className="fa-brands fa-square-twitter"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                </article>

                <div className='footer' id='footer'>
                    <div className="footer-bottom">
                        <h3>DEV@Deakin 2026</h3>

                        <div className="footer-links">
                            <p>Privacy Policy</p>
                            <p>Terms</p>
                            <p>Code of Conduct</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer