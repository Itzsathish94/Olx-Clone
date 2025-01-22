import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase imports
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, addDoc } from "firebase/firestore";





const SellProductModal = ({ isOpen, closeModal, addProduct, storage }) => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file); // Add this log
      const fileType = file.type;
      if (!fileType.includes('image')) {
        alert('Please upload a valid image file.');
        return;
      }
  
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Basic validation
    if (!formData.title || !formData.price || !formData.category || !formData.description) {
      alert("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }
  
    if (isNaN(formData.price) || formData.price <= 0) {
      alert("Price must be a valid number greater than 0.");
      setIsLoading(false);
      return;
    }
  
    try {
      const storage = getStorage(); // Initialize storage
      const db = getFirestore(); // Initialize Firestore
      let imageURL = null;
  
      // Upload image if provided
      if (formData.image) {
        const imageRef = ref(storage, `products/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageURL = await getDownloadURL(imageRef);
      }
  
      // Add product to Firestore
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        image: imageURL || null, // Use imageURL if available
        createdAt: new Date().toISOString(), // Optional: Timestamp for sorting
      };
  
      const productsRef = collection(db, "products");
      const docRef = await addDoc(productsRef, productData);
  
      console.log("Product added with ID:", docRef.id);
      alert("Product added successfully!");
      setIsLoading(false);
      closeModal();
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("There was an error while uploading the product. Please try again.");
      setIsLoading(false);
    }
  };
  
  
  


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sell Your Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full h-32"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border p-2 w-full"
          />
          
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
              disabled={isLoading} // Disable submit while loading
            >
              {isLoading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProductModal;
