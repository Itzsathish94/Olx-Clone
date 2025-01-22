import Logo from '../assets/olx-logo.png';
import Lens from '../assets/search_icon.png'; 
import down_icon from '../assets/down_icon2.png';
import search_field_icon from '../assets/search_field_icon.png';
import Login from './Login';
import { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Firebase auth import
import { signOut } from 'firebase/auth'; // Import Firebase signOut method

const Navbar = ({ setSearch, openModal }) => {
  const [loginPop, setLogInPop] = useState(false);
  const [user, setUser] = useState(null); // Track if user is logged in

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Update state after sign out
      alert("Logged out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error logging out");
    }
  };

  return (
    <>
      <div className='flex p-4 bg-slate-100 shadow-md'>
        <img className='w-9 h-9' src={Logo} alt="Olx logo" />
        <div className='flex border-2 border-spacing-1 w-64 p-2 border-black ml-5 bg-white'>
          <img className='w-3 h-3 mt-1' src={Lens} alt="search lens icon" />
          <input placeholder='Location' className='ml-3 outline-none' />
          <img className="w-4 h-4 mt-1" src={down_icon} alt="down arrow icon" />
        </div>
        <div className='flex h-12 ml-4 border-2 border-black bg-white'>
          <input 
            onChange={(e) => setSearch(e.target.value)} 
            className='ml-3 w-[720px] outline-none' 
            placeholder="Find Cars, Mobile phones and more" 
            type="text" 
          />
          <img src={search_field_icon} alt="search field icon" />
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer'>
          <h1 className='font-semibold'>ENGLISH</h1>
          <img className="w-5 h-5 mt-0.5 ml-2" src={down_icon} alt="down arrow icon" />
        </div>
        {/* Conditional rendering of Login or Logout button */}
        {user ? (
          <div onClick={handleLogout} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Log Out</h1>
          </div>
        ) : (
          <div onClick={() => setLogInPop(true)} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Login</h1>
          </div>
        )}
        {user && <div 
          onClick={openModal} // Trigger openModal when "SELL" is clicked
          className='w-28 flex h-12 p-2 ml-6 cursor-pointer underline hover:no-underline rounded-full border border-yellow-500'
        >
          <h1 className='font-bold text-lg ml-3'>+ SELL</h1>
        </div>}
      </div>

      {/* Login Modal Conditional Rendering */}
      {loginPop && <Login setLogInPop={setLogInPop} />}
    </>
  );
};

export default Navbar;
