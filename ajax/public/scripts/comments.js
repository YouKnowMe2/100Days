const loadComments = document.getElementById('load-comments');
const commentSection = document.getElementById('comments');

function createCommentsList(comments){

    const commentListElement = document.createElement('ol');

    for(const comment of comments){
        const commentElement = document.createElement('li');

        commentElement.innerHTML = `
            <article class="comment-item">
                <h2> ${comment.title}</h2>
                <p> ${comment.text} </p>
            </article>`
        commentListElement.appendChild(commentElement);
    }
    return commentListElement;
}


async function fetchComments(event){
    const postId = loadComments.dataset.postid;
    const response = await fetch(`/posts/${postId}/comments `);
    const data = await response.json();

    const responseData = createCommentsList(data);

    commentSection.innerHTML= '';
    commentSection.appendChild(responseData);

}



loadComments.addEventListener('click',fetchComments);
