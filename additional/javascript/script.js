renderUsers();

function renderUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(users => users.json())
        .then(users => {
            console.log(users);

            const usersDiv = document.getElementById('users');

            for (const user of users) {
                const userDiv = createUserDiv(user);
                usersDiv.append(userDiv);
            }
        });
}

function createUserDiv(user) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user', 'block');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('user_left');

    const name = document.createElement('div');
    name.classList.add('user_name');
    name.innerText = `${user.id}. ${user.name}`;

    const userInfo = document.createElement('div');
    userInfo.classList.add('user_info');

    const username = document.createElement('div');
    username.innerText = '@' + user.username;

    const email = document.createElement('div');
    email.innerText = user.email;

    const phone = document.createElement('div');
    phone.innerText = user.phone;

    userInfo.append(username, email, phone);

    leftDiv.append(name, userInfo);

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('user_right');

    const viewPostsBtn = document.createElement('button');
    viewPostsBtn.classList.add('user_view-posts-btn');
    viewPostsBtn.innerText = 'view posts';

    // viewPostsBtn.onclick = () => renderPosts(user, userDiv);
    viewPostsBtn.addEventListener(
        'click', () => renderPosts(user, userDiv), { once: true }
    );

    rightDiv.append(viewPostsBtn);

    userDiv.append(leftDiv, rightDiv);

    return userDiv;
}

function renderPosts(user, userDiv) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(allPosts => allPosts.json())
        .then(allPosts => {
            const posts = allPosts.filter(post => post.userId === user.id);

            const postsDiv = document.createElement('div');
            postsDiv.classList.add('posts');

            for (const post of posts) {
                const postDiv = createPostDiv(post);
                postsDiv.append(postDiv);
            }

            userDiv.append(postsDiv);
        });
}

function createPostDiv(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post', 'block');

    const title = document.createElement('h3');
    title.innerText = `${post.id}.${post.userId}. ${post.title}`;

    const body = document.createElement('p');
    body.innerText = post.body.replaceAll('\n', ' ');

    const viewCommentsBtn = document.createElement('button');
    viewCommentsBtn.classList.add('post_view-comments-btn');
    viewCommentsBtn.innerText = 'view comments';

    // viewCommentsBtn.onclick = () => renderComments(post, postDiv);
    viewCommentsBtn.addEventListener(
        'click', () => renderComments(post, postDiv), { once: true }
    );

    postDiv.append(title, body, viewCommentsBtn);

    return postDiv;
}

function renderComments(post, postDiv) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then(comments => comments.json())
        .then(comments => {
            const commentsDiv = document.createElement('div');
            commentsDiv.classList.add('comments');

            for (const comment of comments) {
                const commentDiv = createCommentDiv(comment);
                commentsDiv.append(commentDiv);
            }

            postDiv.append(commentsDiv);
        });
}

function createCommentDiv(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment', 'block');

    const name = document.createElement('h3');
    name.innerText = `${comment.id}.${comment.postId}. ${comment.name}`;

    const email = document.createElement('p');
    email.innerText = comment.email;

    const body = document.createElement('p');
    body.innerText = comment.body.replaceAll('\n', ' ');

    commentDiv.append(name, email, body);

    return commentDiv;
}
