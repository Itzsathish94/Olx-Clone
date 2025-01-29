import { useState, useEffect } from "react";
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import SellProductModal from "./SellProduct";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ToastContainer } from 'react-toastify'

const Main = () => {
  const [prod, setProd] = useState([]);
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProd(products);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addProduct = async (newProduct) => {
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Document written with ID: ", docRef.id);
      setProd(prevProd => [...prevProd, { ...newProduct, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding product to Firestore:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setSearch={setSearch} openModal={openModal} />
      <Menubar setMenu={setMenu} />
      <div className="flex-grow">
        <Home products={prod} search={search} menu={menu} />
      </div>
      <Footer />
      <SellProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addProduct={addProduct}
      />
      <ToastContainer position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        closeButton={true}
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
        }} />
    </div>
  );
};

export default Main;
