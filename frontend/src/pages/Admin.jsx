import { useState } from "react";
import Nav from "../components/Nav";
import { useMutation } from "@tanstack/react-query";
import { postProduct } from "../queries/products";
import Footer from "../components/Footer";

const Admin = () => {
  const [image, setImage] = useState(null);

  // State for form values
  const [form, setForm] = useState({
    title: "",
    price: "",
    discountedPrice: "",
    category: "clothing",
    rating: "1",
    company: "",
    description: "",
    featured: false,
  });

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: postProduct,
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Product image is required";
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("discountedPrice", form.discountedPrice);
      formData.append("category", form.category);
      formData.append("rating", form.rating);
      formData.append("company", form.company);
      formData.append("isFeatured", form.featured);
      formData.append("description", form.description);
      formData.append("image", image);
      console.log(form);
      mutate(formData);
    }
  };

  return (
    <div>
      <Nav />
      <div className="admin-container">
        <h3>Add new product</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Product title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="discountedPrice"
              placeholder="Discounted Price"
              value={form.discountedPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="clothing">Clothing</option>
              </select>
            </div>
            <div>
              <label>Rating</label>
              <select name="rating" value={form.rating} onChange={handleChange}>
                <option value="1">1 star</option>
                <option value="2">2 star</option>
                <option value="3">3 star</option>
                <option value="4">4 star</option>
                <option value="5">5 star</option>
              </select>
            </div>
          </div>
          <input
            name="company"
            placeholder="Company name"
            value={form.company}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Description"
            rows={8}
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
          <div>
            <div className="admin-checkbox">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              <label>Set as Featured Product</label>
            </div>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="product-image"
            />
            {!image ? (
              <label htmlFor="product-image">
                <button
                  style={{ marginTop: "0.5rem" }}
                  type="button"
                  onClick={() =>
                    document.getElementById("product-image").click()
                  }
                >
                  Upload Image
                </button>
              </label>
            ) : (
              <button
                style={{ marginTop: "0.5rem" }}
                type="button"
                onClick={() => setImage(null)}
              >
                Remove
              </button>
            )}
            {image && (
              <div style={{ marginTop: "0.5rem" }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
            )}
          </div>
          {errors.image && (
            <div className="error" style={{ marginTop: "0.35rem" }}>
              {errors.image}
            </div>
          )}
          <button type="submit" className="admin-submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
