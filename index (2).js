var posts = new Database("posts");

/* BUGFIX
 შემდეგი ორი ფუნქცია გამორჩენილი იყო საწყის
 კოდში (გამოქვეყნებისას)
 შეცვლილია: 8 იანვარი 22:00
 თუ ამ თარიღის შემდეგ გააკეთეთ fork, უბრალოდ წაშალეთ ეს კომენტარი
 თუ ამ თარიღამდე დაიწყეთ, გადააკოპირეთ ეს ორი ფუნქცია
 თქვენს ფაილში.
*/
function setUser(username) {
  localStorage.setItem("currentUser", username);
  document.getElementById("username").value = username;
}

function displayAllPosts() {
  var allPosts = posts.getAll();
  allPosts.sort(function (post1, post2) {
    return post1.likes.length - post2.likes.length;
  });
  for (let post of allPosts) {
    var elem = createPost(post);
    addNewPost(elem);
  }
  // ეს ხაზი აუცილებელია news feed ტესტერისთვის
  return allPosts;
}

displayAllPosts();

function newPost() {
  var post = posts.create({
    text: getPostText(),
    user: getUser(),
    likes: []
  });
  if (post.text.length == 0) return;
  var elem = createPost(post);
  addNewPost(elem);
  document.querySelector("#post_text").value = "";
}

function getPostText() {
  var postInputElement = document.getElementById("post_text");
  return postInputElement.value;
}

function getUser() {
  return localStorage.getItem("currentUser") || "unknown user";
}

function deleteComment(btn){
  btn.parentNode.parentNode.removeChild(btn.parentNode);
}

function addComment(id){
  let post = document.querySelector(`#post-${id}`);

  let text = post.querySelector(".comment_input_text").value;

  let commentEM = `
        <div class="comment_container">
            <div class="comment_text">${text}</div>
            <button class="btn btn-danger delete_comment" onclick="deleteComment(this)">delete</button>
        </div>
    `;
  post.querySelector(".comments_feed").innerHTML += commentEM;
}

function deletePost(postId) {
  var postElem = document.getElementById(`post-${postId}`);
  postElem.parentNode.removeChild(postElem);
  posts.delete(postId);
}


function createPost(post) {
  return `
		<div id="post-${post.id}" class="post container border border-5 p-5">
			<div>
				<button class="btn btn-danger post_delete_button" onclick="deletePost(${post.id})">
					Delete Post
				</button>
			</div>
			<div class="post_title">${post.user}</div>
			<div class="post_text">${post.text}</div>
			${createPostLikes(post)}
      <div class="comments_container">
          <textarea class="comment_input_text form-control w-75"></textarea>
          <button class="btn btn-primary new_comment" onclick="addComment(${post.id})">Add Comment</button>
          <div class="comments_feed"></div>
      </div>
		</div>
	`;
}

function createPostLikes(post) {
  return `
		<div class="post_likes_container">
			<div class="post_likes_info">
				<span class="post_likes_count">
				</span>
				<span class="post_likes_text">
				</span>
			</div>
			<button class="btn btn-primary post_like_button" onclick="newLike(${post.id})">
				Like Post
			</button>
		</div>
	`;
}


function newLike(postId) {
  var post = posts.getById(postId);
  var user = getUser();
  if (!post.likes.includes(user)) {
    post.likes.push(user);
  }
  posts.update(post);
  addNewLike(post);
}

function addNewLike(post) {
  var postElem = document.getElementById(`post-${post.id}`);
  var postLikesCountElem = postElem.querySelector("span.post_likes_count");
  var postLikesTextElem = postElem.querySelector("span.post_likes_text")

  postLikesCountElem.innerText = post.likes.length;
  postLikesTextElem.innerText = "likes"
}

function addNewPost(elem) {
  var posts = document.getElementById("posts");

  posts.insertAdjacentHTML("afterbegin", elem);
}

window.newPost = newPost;
window.newLike = newLike;
window.deletePost = deletePost;
