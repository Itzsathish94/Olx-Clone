import Logo from '../assets/logo-olx.png';
import Lens from '../assets/search_icon.png';
import down_icon from '../assets/down_icon2.png';
import search_field_icon from '../assets/search_field_icon.png';
import Login from './Login';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bdrop from '../assets/Group.png';
import { FaPlus } from 'react-icons/fa';

const Navbar = ({ setSearch, openModal }) => {
  const [loginPop, setLogInPop] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.dark("✔️ Logged out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <>
      <div className='flex p-4 bg-slate-100 shadow-md'>
        <img className='w-11 h-7 mr-1 mt-2' src={Logo} alt="Olx logo" />
        <div className='flex border-2 border-spacing-1 h-12 w-64 p-2 border-black ml-5 bg-white rounded'>
          <img className='w-3 h-3 mt-2' src={Lens} alt="search lens icon" />
          <input placeholder='Location' className='ml-3 outline-none' />
          <img className="w-4 h-4 mt-1" src={down_icon} alt="down arrow icon" />
        </div>
        <div className='flex h-12 ml-4 border-2 border-black bg-white rounded'>
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
        {user ? (
          <div onClick={handleLogout} className='flex h-11 mt-2 ml-3  mr-2 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Log Out</h1>
          </div>
        ) : (
          <div onClick={() => setLogInPop(true)} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Login</h1>
          </div>
        )}
        {user && <div
          onClick={openModal}
          className="flex items-center justify-center w-[110px] h-13 px-5 ml-3 cursor-pointer text-white rounded-full border border-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          style={{
            backgroundImage: `url(${bdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        > <div className="flex items-center justify-center w-[90px] h-9 px-5 bg-white cursor-pointer text-white rounded-full border  transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl" >
          <FaPlus className="h-4 text-sm fill-black" />
          <h1 className="font-semibold text-lg text-[#002f34]">SELL</h1>
          </div>
        </div>
        }
      </div>

      {loginPop && <Login setLogInPop={setLogInPop} />}
    </>
  );
};

export default Navbar;
