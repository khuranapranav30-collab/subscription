import QuestionForm from './QuestionForm.jsx'
import ArticleForm from './ArticleForm.jsx'

function Post({ postType, handleChange3 }) {
    return (
        <>
            <style>
                {`
                    .post-container {
                        width: 90%;
                        max-width: 900px;
                        margin: 25px auto;
                        font-family: Arial, sans-serif;
                        color: #222;
                    }

                    .post-heading {
                        background-color: #e2e2e2;
                        padding: 7px 10px;
                        margin-bottom: 12px;
                        font-size: 15px;
                    }

                    .post-type {
                        display: flex;
                        gap: 25px;
                        margin: 12px 0;
                        font-size: 13px;
                    }

                    .post-type label {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        cursor: pointer;
                    }

                    .section-heading {
                        background-color: #e2e2e2;
                        padding: 7px 10px;
                        margin: 15px 0 10px;
                        font-size: 14px;
                    }

                    .post-description {
                        text-align: center;
                        font-size: 12px;
                        line-height: 1.5;
                        margin: 10px 0 20px;
                    }

                    .post-description span {
                        color: #e74c3c;
                    }

                    .post-form {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .post-form label {
                        font-size: 13px;
                        margin-top: 5px;
                    }

                    .post-form input,
                    .post-form textarea {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 7px;
                        border: 1px solid #888;
                        font-family: Arial, sans-serif;
                        font-size: 13px;
                    }

                    .post-actions {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 20px;
                    }

                    .post-actions button {
                        width: 120px;
                        padding: 8px;
                        border: none;
                        background-color: #999;
                        color: #111;
                        cursor: pointer;
                        font-size: 14px;
                    }

                    .post-actions button:hover {
                        background-color: #777;
                        color: white;
                    }

                    @media (max-width: 600px) {
                        .post-container {
                            width: 92%;
                        }

                        .post-type {
                            flex-wrap: wrap;
                            gap: 12px;
                        }
                    }
                `}
            </style>

            <div className="post-container">
                <h3 className="post-heading">New Post</h3>

                <div className="post-type">
                    <span>Select Post Type:</span>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Question"
                            checked={postType === "Question"}
                            onChange={handleChange3}
                        />
                        Question
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Article"
                            checked={postType === "Article"}
                            onChange={handleChange3}
                        />
                        Article
                    </label>
                </div>

                <h4 className="section-heading">
                    What do you want to ask or share
                </h4>

                <p className="post-description">
                    This section is designed based on the type of the post.
                    It could be developed by conditional rendering.
                    <br />
                    <span>
                        For a {postType.toLowerCase()}, the following section
                        would appear.
                    </span>
                </p>

                {postType === "Question" ? <QuestionForm /> : <ArticleForm />}
            </div>
        </>
    )
}

export default Post
