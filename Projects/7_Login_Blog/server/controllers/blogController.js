const Blog = require("../models/Blog");

// ✅ Get All Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "name email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create Blog (only logged in)
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      user: req.user.id,
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Blog (only owner)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // check ownership
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Blog (only owner)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // check ownership
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ msg: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
