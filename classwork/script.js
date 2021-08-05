fetch('https://jsonplaceholder.typicode.com/posts')
    .then((posts) => posts.json())
    .then((posts) => {
        const postsDiv = document.getElementById('posts');

        for (const post of posts) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const title = document.createElement('h2');
            title.innerText = `${post.id}. ${post.title}`;

            const body = document.createElement('p');
            body.innerText = post.body;

            const viewCommentsBtn = document.createElement('button');
            viewCommentsBtn.innerText = 'view comments';

            viewCommentsBtn.addEventListener('click', function () {
                renderPosts(post, postDiv);
            }, { once: true });

            postDiv.append(title, body, viewCommentsBtn);
            postsDiv.append(postDiv);
        }


    });

function renderPosts(post, postDiv) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((comments) => comments.json())
        .then((comments) => {
            console.log(comments);

            const commentsDiv = document.createElement('div');
            commentsDiv.classList.add('comments');

            for (const comment of comments) {
                const commentDiv = document.createElement('div');

                const name = document.createElement('h3');
                name.innerText = `${comment.id}.${comment.postId}. ${comment.name}`;

                const email = document.createElement('p');
                email.innerText = comment.email;

                const body = document.createElement('p');
                body.innerText = comment.body;

                commentDiv.append(name, email, body);
                commentsDiv.append(commentDiv);
            }

            postDiv.append(commentsDiv);
        });
}
