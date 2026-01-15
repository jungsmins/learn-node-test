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
    return fetch("api/posts?limit=2&page=1").then((res) => res.json());
  },
};

loadPosts(el);

const inputTitle = document.getElementById("title");
const inputBody = document.getElementById("body");
const submitBtn = document.getElementById("sub-btn");

console.log(inputTitle.value, inputBody.value);

const createPost = () => {
  const title = inputTitle.value;
  const body = inputBody.value;

  fetch("api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
};

submitBtn.addEventListener("click", createPost);
