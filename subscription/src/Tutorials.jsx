import tutorial1 from './assets/tutorials/t1.jpg'
import tutorial2 from './assets/tutorials/t2.jpg'
import tutorial3 from './assets/tutorials/t3.jpg'

function Tutorials() {
    return (
        <>
            <style>
                {`
                    .tutorial-card{
                        display:grid;
                        grid-template-columns:1fr 1fr 1fr;
                        column-gap: 100px;
                        margin:70px 5% 0 5%;
                        width:90%;
                    }
                    .tutorial img {
                        width: 100%;
                        height: 250px;
                        object-fit: cover;
                        border-radius: 20px;
                    }
                    .tutorial-title{
                        margin-top: 50px;
                        color: hsl(190, 97%, 55%);
                        text-align:center;
                        font-weight:bold;
                    }
                    .tutorial-text{
                        display:flex;
                        flex-direction:column;
                    }
                    .tutorial-text .upper-text{
                        display:flex;
                        flex-direction:column;
                    }
                    .tutorial-text .lower-text{
                        display:flex;
                        flex-direction:row;
                    }
                    .tutorial-text .lower-text .rating{
                        width: 20%;
                    }
                    .tutorial-text .lower-text .author{
                        width: 80%;
                        text-align:right;
                    }
                    .tutorial{
                        border: 2px solid black;
                        padding: 10px;
                    }
                    .tutorial-button{
                        margin-top:15px;
                        width:200px;
                        padding:8px 10px;
                        border-radius:50px;
                        border:none;
                        background-color: hsl(0, 2%, 71%);
                        color: black;
                        font-weight:bold;
                        text-align:center;
                        transition: transform 0.15s;
                    }
                    .tutorial-button-div{
                        text-align:center;
                        margin-bottom: 30px;
                    }
                    .tutorial-button:hover{
                        cursor:pointer;
                        transform: scale(1.1);
                    }
                    @media(max-width:800px){
                    .tutorial-card{
                        grid-template-columns: 1fr 1fr 1fr;
                        gap:30px;
                    }
                `}
            </style>

            <h2 className="tutorial-title">
                Featured Tutorials
            </h2>

            <div className="tutorial-card">

                <div className="tutorial">
                    <div>
                        <img src={tutorial1} />
                    </div>

                    <div className="tutorial-text">
                        <div className="upper-text">
                            <h4>
                                <b>Name: </b>
                                JavaScript Introduction
                            </h4>

                            <p>
                                Description: Learn the basics of JavaScript
                                and understand how to start programming.
                            </p>
                        </div>

                        <div className="lower-text">
                            <div className="rating">
                                <p>⭐ 4.8</p>
                            </div>

                            <div className="author">
                                <p>Pranav Khurana</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="tutorial">
                    <div>
                        <img src={tutorial2} />
                    </div>

                    <div className="tutorial-text">
                        <div className="upper-text">
                            <h4>
                                <b>Name: </b>
                                HTML and CSS for Beginners
                            </h4>

                            <p>
                                Description: Learn how to create and style
                                websites using HTML and CSS.
                            </p>
                        </div>

                        <div className="lower-text">
                            <div className="rating">
                                <p>⭐ 4.7</p>
                            </div>

                            <div className="author">
                                <p>Pranav Khurana</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="tutorial">
                    <div>
                        <img src={tutorial3} />
                    </div>

                    <div className="tutorial-text">
                        <div className="upper-text">
                            <h4>
                                <b>Name: </b>
                                Getting Started with React
                            </h4>

                            <p>
                                Description: Learn the fundamentals of React
                                and start building modern web applications.
                            </p>
                        </div>

                        <div className="lower-text">
                            <div className="rating">
                                <p>⭐ 4.9</p>
                            </div>

                            <div className="author">
                                <p>Pranav Khurana</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="tutorial-button-div">
                <button className="tutorial-button">
                    See all tutorials
                </button>
            </div>

        </>
    )
}

export default Tutorials