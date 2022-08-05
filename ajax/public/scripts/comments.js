const loadComments = document.getElementById('load-comments');

async function fetchComments(event){
    const postId = loadComments.dataset.postid;
    const response = await fetch(`/posts/${postId}/comments `);
    const data = await response.json();
    console.log(data);
}

loadComments.addEventListener('click',fetchComments);
