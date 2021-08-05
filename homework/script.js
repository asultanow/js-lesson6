// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/posts

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(posts => posts.json())
    .then(posts => {
        const postsDiv = document.querySelector('#posts');

        for (const post of posts) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const title = document.createElement('h3');
            title.innerText = `${post.id}. ${post.title}`;

            const body = document.createElement('p');
            body.innerText = post.body;

            postDiv.append(title, body);
            postsDiv.append(postDiv);
        }
    });

// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/comments

fetch('https://jsonplaceholder.typicode.com/comments')
    .then(comments => comments.json())
    .then(comments => {
        const commentsDiv = document.querySelector('#comments');

        for (const comment of comments) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            const name = document.createElement('h3');
            name.innerText = `${comment.id}. ${comment.name}`;

            const email = document.createElement('p');
            email.innerText = comment.email;

            const body = document.createElement('p');
            body.innerText = comment.body;

            commentDiv.append(name, email, body);
            commentsDiv.append(commentDiv);
        }
    });
