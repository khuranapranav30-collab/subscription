
function ArticleForm() {
    return (
        <form className="post-form">
            <label htmlFor="articleTitle">Title</label>
            <input
                id="articleTitle"
                type="text"
                placeholder="Enter a descriptive title"
            />

            <label htmlFor="abstract">Abstract</label>
            <textarea
                id="abstract"
                rows="2"
                placeholder="Enter a 1-paragraph abstract"
            />

            <label htmlFor="articleText">Article Text</label>
            <textarea
                id="articleText"
                rows="6"
                placeholder="Enter your article text"
            />

            <label htmlFor="articleTags">Tags</label>
            <input
                id="articleTags"
                type="text"
                placeholder="Add up to 3 tags, e.g., Java"
            />

            <div className="post-actions">
                <button type="button">Post</button>
            </div>
        </form>
    );
}

export default ArticleForm;
