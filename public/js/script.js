const body = document.querySelector("body");
const el = document.createElement("div");
body.appendChild(el);

const loadPosts = (el) => {
  el.innerHTML = "Loading...";

  api.getPosts().then((posts) => {
    console.log(posts);
    const postListEl = posts
      .map(
        (post) => `
        <article class="post">
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        </article>`
      )
      .join("");

    el.innerHTML = postListEl;
  });
};

const api = {
  getPosts: () => {
    return fetch("api/posts").then((res) => res.json());
  },
};

loadPosts(el);
