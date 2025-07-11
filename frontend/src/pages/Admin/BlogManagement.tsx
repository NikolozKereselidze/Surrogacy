import { useState, useEffect } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ImageCompressor from "../../components/ImageCompressor";

interface BlogPost {
  id: string;
  link: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  imagePath: string;
}

interface BlogPostWithImage extends BlogPost {
  signedImageUrl?: string;
}

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    link: "",
    title: "",
    excerpt: "",
    date: "",
    category: "",
    readTime: "",
    content: "",
    imagePath: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const getSignedImageUrl = async (imagePath: string): Promise<string> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/image?key=${encodeURIComponent(
          imagePath
        )}`
      );
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      return "";
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blog");
      const data: BlogPost[] = await response.json();

      // Get signed URLs for all images
      const postsWithImages = await Promise.all(
        data.map(async (post) => {
          if (post.imagePath) {
            const signedUrl = await getSignedImageUrl(post.imagePath);
            return { ...post, signedImageUrl: signedUrl };
          }
          return { ...post, signedImageUrl: undefined };
        })
      );

      setBlogPosts(postsWithImages);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imagePath = formData.imagePath;

    // If user selected a new image, upload it first
    if (selectedFile) {
      // Request signed URL
      const res = await fetch("http://localhost:3000/api/blog/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileType: selectedFile.type }),
      });
      const { uploadUrl, fileUrl } = await res.json();

      // Upload image to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      imagePath = fileUrl; // update imagePath with the uploaded file URL
    }

    // Submit blog post with updated imagePath
    const url = editingPost
      ? `http://localhost:3000/api/blog/${editingPost.id}`
      : "http://localhost:3000/api/blog";

    const method = editingPost ? "PUT" : "POST";

    const body = {
      ...formData,
      imagePath,
    };

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      fetchBlogPosts();
      resetForm();
      setSelectedFile(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchBlogPosts();
        }
      } catch (error) {
        console.error("Error deleting blog post:", error);
      }
    }
  };

  const handleEdit = async (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      link: post.link,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      category: post.category,
      readTime: post.readTime,
      content: post.content,
      imagePath: post.imagePath,
    });

    // Get signed URL for current image
    if (post.imagePath) {
      const signedUrl = await getSignedImageUrl(post.imagePath);
      setCurrentImageUrl(signedUrl);
    } else {
      setCurrentImageUrl("");
    }

    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      link: "",
      title: "",
      excerpt: "",
      date: "",
      category: "",
      readTime: "",
      content: "",
      imagePath: "",
    });
    setEditingPost(null);
    setCurrentImageUrl("");
    setShowAddForm(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.pageHeader}>
        <h1>Blog Management</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus /> Add New Post
        </button>
      </div>

      {showAddForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <h2>{editingPost ? "Edit Blog Post" : "Add New Blog Post"}</h2>
            <form onSubmit={handleSubmit} className={styles.blogForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Link</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="e.g., surrogacy-guide"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Complete Guide to Surrogacy Process"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Surrogacy, Egg Donation, Legal"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="e.g., Learn everything you need to know about the surrogacy process, from legal requirements to emotional preparation..."
                  required
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="e.g., Surrogacy is a beautiful journey that brings hope to families who cannot conceive naturally. This comprehensive guide covers all aspects of the process..."
                  required
                  rows={6}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <ImageCompressor
                    label="Choose Blog Image"
                    maxWidth={1200}
                    maxHeight={800}
                    quality={0.75}
                    onCompressed={handleImageChange} // this will setSelectedFile for you
                  />
                  {/* Show current image if editing */}
                  {editingPost && currentImageUrl && (
                    <div style={{ marginTop: "10px" }}>
                      <strong>Current Image:</strong>
                      <br />
                      <img
                        src={currentImageUrl}
                        alt="Current"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginTop: "5px",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  {editingPost ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.blogTable}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Read Time</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>{post.readTime}</td>
                <td>
                  {post.signedImageUrl ? (
                    <img
                      src={post.signedImageUrl}
                      alt={post.title}
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: "1px solid #e0e0e0",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "80px",
                        height: "60px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(post)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDelete(post.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogManagement;
