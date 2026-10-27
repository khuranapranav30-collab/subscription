function QuestionForm() {
    return (
        <form className="post-form">
            <label htmlFor="questionTitle">Title</label>
            <input
                id="questionTitle"
                type="text"
                placeholder="Start your question with how, what, why, etc."
            />

            <label htmlFor="problem">Describe your problem</label>
            <textarea
                id="problem"
                rows="8"
            />

            <label htmlFor="questionTags">Tags</label>
            <input
                id="questionTags"
                type="text"
                placeholder="Add up to 3 tags, e.g., Java"
            />

            <div className="post-actions">
                <button type="button">Post</button>
            </div>
        </form>
    );
}

export default QuestionForm;
