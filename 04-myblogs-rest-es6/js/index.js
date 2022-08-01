import { getAllPosts } from "./blogs-api-client.js";
const postSection = document.getElementById("posts");

async function init() {
  try {
    const allPosts = await getAllPosts();
    showPosts(allPosts);
  } catch (err) {
    errorsDiv.append = err;
  }
}

export function showPosts(posts) {
  posts.forEach((post) => addPost(post));
}

export function showError(err) {
  errorsDiv.innerHTML = `
 <div>${err}</div>`;
}
export function addPost(post) {
  const postElem = document.createElement(`article`);
  postElem.innerHTML = `
<h3 class="post-title">${post.title}</h3>
<img class="post-img">src="${post.imageUrl}"</img>
<div class="post-content">
<div class="post-metadata">Author: ${post.authorId}, Tags: ${post.tags.join(
    ` ,`
  )}</div>
<div class="post-text">${post.content}</div>
</div>
`;
  postSection.insertAdjacentElement("beforend", postElem);
}
init();
