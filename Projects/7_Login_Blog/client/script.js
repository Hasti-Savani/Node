const API = "http://localhost:5000/api";

// Check login on load
window.onload = () => {
  const token = localStorage.getItem("token");
  if (token) {
    showBlogUI();
    getBlogs();
  }
};

// Show Blog UI
function showBlogUI() {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("blogSection").classList.remove("hidden");
}

// Logout
function logout() {
  localStorage.removeItem("token");
  location.reload();
}

// Register
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  alert("Registered Successfully!");
}

// Login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    showBlogUI();
    getBlogs();
  } else {
    alert(data.msg || "Login failed");
  }
}

// Get Blogs
async function getBlogs() {
  const res = await fetch(`${API}/blogs`);
  const blogs = await res.json();

  const container = document.getElementById("blogs");
  container.innerHTML = "";

  blogs.forEach((blog) => {
    container.innerHTML += `
      <div class=" p-4 mb-2 rounded-xl bg-gray-600 text-white">
        <h3 class="text-xl font-semibold">${blog.title}</h3>
        <p class="py-2">${blog.description}</p>
        <button class="p-2 mt-2 bg-red-500 w-[80px] rounded-full" onclick="deleteBlog('${blog._id}')">Delete</button>
      </div>
    `;
  });
}

// Add Blog
async function addBlog() {
  const token = localStorage.getItem("token");

  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;

  await fetch(`${API}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ title, description }),
  });

  getBlogs();
}

// Delete Blog
async function deleteBlog(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/blogs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  getBlogs();
}
