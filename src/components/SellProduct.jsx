import { useState } from 'react';
import axios from 'axios';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify'; 

const SellProductModal = ({ isOpen, closeModal, addProduct }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('image')) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation: Min 4 chars, only alphabets allowed
    if (!formData.title || formData.title.length < 4 || !/^[a-zA-Z\s]+$/.test(formData.title)) {
      newErrors.title = 'Title must be at least 4 characters.';
    }

    // Price validation: Must be a number and greater than 0
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0.';
    }

    // Category validation: Max 10 characters
    if (formData.category && formData.category.length > 10) {
      newErrors.category = 'Category cannot exceed 10 characters.';
    }

    // Description validation: Min 20 characters
    if (!formData.description || formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long.';
    }

    // Image validation: Must upload an image
    if (!formData.image) {
      newErrors.image = 'Please upload an image.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      let imageURL = null;

      if (formData.image) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', formData.image);
        formDataCloudinary.append('upload_preset', 'olx_product_images');
        formDataCloudinary.append('cloud_name', 'dbrfztty8');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dbrfztty8/image/upload',
          formDataCloudinary
        );

        imageURL = response.data.secure_url;
      }

      const db = getFirestore();
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        image: imageURL || null,
        createdAt: new Date().toISOString(),
      };

      const productsRef = collection(db, "products");
      const docRef = await addDoc(productsRef, productData);

      addProduct({ id: docRef.id, ...productData });
      console.log("Product added with ID:", docRef.id);

      // Show success toast
      toast.success('AD successfully posted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

      setIsLoading(false);
      closeModal();
    } catch (error) {
      console.error("Error uploading product:", error);

      // Show error toast
      toast.error('There was an error while uploading the product. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Post Your AD</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.firebase && <p className="text-red-500">{errors.firebase}</p>} {/* Generic error */}

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full h-32"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border p-2 w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          
          {!imagePreview && !formData.image && (
            <p className="text-gray-500">No image selected</p>
          )}

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProductModal;
