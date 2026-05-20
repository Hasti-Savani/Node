const API = "http://localhost:5000/api/blogs";

async function getBlogs() {
  try {
    const res = await fetch(API);
    const text = await res.text(); // first read as text

    console.log(text); // DEBUG

    const data = JSON.parse(text);
    displayBlogs(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addBlog() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  getBlogs();
}

async function deleteBlog(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  getBlogs();
}

async function editBlog(id) {
  const title = prompt("New Title:");
  const description = prompt("New Description:");

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  getBlogs();
}

function displayBlogs(blogs) {
  const container = document.getElementById("blogs");
  container.innerHTML = "";

  blogs.forEach((blog) => {
    container.innerHTML += `
      <div class="border border-white p-5 mb-5">
        <h3 class="text-xl">${blog.title}</h3>
        <p class="py-3">${blog.description}</p>
        <button class="p-2 mx-1 bg-yellow-500 w-[80px] rounded-full" onclick="editBlog('${blog._id}')">Edit</button>
        <button class="p-2 mx-1 bg-red-500 w-[80px] rounded-full" onclick="deleteBlog('${blog._id}')">Delete</button>
      </div>
    `;
  });
}

function searchBlog() {
  const input = document.getElementById("search").value.toLowerCase();
  const blogs = document.querySelectorAll(".blog");

  blogs.forEach((blog) => {
    blog.style.display = blog.innerText.toLowerCase().includes(input)
      ? "block"
      : "none";
  });
}

getBlogs();
