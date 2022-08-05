const loadComments = document.getElementById('load-comments');
const commentSection = document.getElementById('comments');

const commentsFormElement = document.querySelector('#comments-form form');
const commentTitle = document.getElementById('title');
const commentText = document.getElementById('text');
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

 function saveComment(event){
    event.preventDefault();
    const enteredTitle = commentTitle.value;
    const enteredText = commentText.value;
    const comment = { title: enteredTitle, text: enteredText};
    const postId = loadComments.dataset.postid;

    fetch(`/posts/${postId}/comments`,{
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-type': 'application/json'
        }
    });
}

loadComments.addEventListener('click',fetchComments);

commentsFormElement.addEventListener('submit',saveComment);