import { useState, useEffect } from "react";
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import SellProductModal from "./SellProduct"; // Correct import for SellProductModal
import { db } from "../firebase"; // Import Firebase db instance
import { collection, getDocs, addDoc } from "firebase/firestore"; // Firebase Firestore methods

const Main = () => {
  const [prod, setProd] = useState([]);
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal visibility

  // Fetch products from Firestore
  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products")); // Reference Firestore collection
      const products = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id, // Include Firestore document ID
      }));
      setProd(products);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
    }
  };

  useEffect(() => {
    getProducts(); // Fetch products from Firestore when the component mounts
  }, []);

  const openModal = () => setIsModalOpen(true); // Function to open modal
  const closeModal = () => setIsModalOpen(false); // Function to close modal

  const addProduct = async (newProduct) => {
    try {
      // Add new product to Firestore
      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Document written with ID: ", docRef.id);
      
      // Update state with the new product
      setProd(prevProd => [...prevProd, { ...newProduct, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding product to Firestore:', error);
    }
  };

  return (
    <div>
      <Navbar setSearch={setSearch} openModal={openModal} />
      <Menubar setMenu={setMenu} />
      <Home products={prod} search={search} menu={menu} />
      <Footer />
      <SellProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addProduct={addProduct} // Pass addProduct function to the modal
      />
    </div>
  );
};

export default Main;
