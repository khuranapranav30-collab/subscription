import article1 from './assets/article/article1.jpg'
import article2 from './assets/article/article2.jpg'
import article3 from './assets/article/article3.jpg'

const articles = [
    {
        image: article1,
        name: 'The Future of Web Development',
        description:'Explore the latest trends and technologies shaping modern web development.',
        rating: '4.8',
        author: 'Pranav Khurana'
    },
    {
        image: article2,
        name: 'Understanding Modern Web Design',
        description:'Learn about the essential tools and formats used to create modern digital content.',
        rating: '4.6',
        author: 'Pranav Khurana'
    },
    {
        image: article3,
        name: 'Getting Started with Programming',
        description:'A beginner-friendly introduction to coding and the fundamentals of web development.',
        rating: '4.9',
        author: 'Pranav Khurana'
    }
]

function Articles() {
    return (
        <>
            <style>
                {`
                    .article-card{
                        display:grid;
                        grid-template-columns:1fr 1fr 1fr;
                        column-gap:100px;
                        margin:70px 5% 0 5%;
                        width:90%;
                    }

                    .article img {
                        width:100%;
                        height:250px;
                        object-fit:cover;
                        border-radius:20px;
                    }

                    h2{
                        margin-top:50px;
                        color:hsl(190, 97%, 55%);
                        text-align:center;
                        font-weight:bold;
                    }

                    .text{
                        display:flex;
                        flex-direction:column;
                    }

                    .text .upper-text{
                        display:flex;
                        flex-direction:column;
                    }

                    .text .lower-text{
                        display:flex;
                        flex-direction:row;
                    }

                    .text .lower-text .rating{
                        width:20%;
                    }

                    .text .lower-text .author{
                        width:80%;
                        text-align:right;
                    }

                    .article{
                        border:2px solid black;
                        padding:10px;
                    }

                    .article-button{
                        margin-top:15px;
                        width:200px;
                        padding:8px 10px;
                        border-radius:50px;
                        border:none;
                        background-color:hsl(0, 2%, 71%);
                        color:black;
                        font-weight:bold;
                        transition:transform 0.15s;
                    }
                    
                    .button-div{
                        text-align:center;
                    }

                    .article-button:hover{
                        cursor:pointer;
                        transform:scale(1.1);
                    }

                    @media(max-width:800px){
                        .article-card{
                            grid-template-columns:1fr 1fr 1fr;
                            gap:30px;
                        }
                    }
                `}
            </style>

            <h2>Featured Articles</h2>

            <div className="article-card">

                {articles.map((article) => (
                    <div className="article" key={article.name}>

                        <div>
                            <img src={article.image} />
                        </div>

                        <div className="text">

                            <div className="upper-text">
                                <h4>
                                    <b>Name: </b>
                                    {article.name}
                                </h4>

                                <p>
                                    Description: {article.description}
                                </p>
                            </div>

                            <div className="lower-text">

                                <div className="rating">
                                    <p>⭐ {article.rating}</p>
                                </div>

                                <div className="author">
                                    <p>{article.author}</p>
                                </div>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

            <div className="button-div">
                <button className="article-button">See all articles</button>
            </div>
        </>
    )
}

export default Articles