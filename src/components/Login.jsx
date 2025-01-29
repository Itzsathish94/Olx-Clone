import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginGuitar from '../assets/loginEntryPointPost.webp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';

const Login = ({ setLogInPop }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const validateSignUpInputs = () => {
    if (!email || !password || !username || !phone) {
      toast.error('All fields are required for Sign Up');
      return false;
    }

    const usernamePattern = /^(?!\s*$)[a-zA-Z0-9]{4,}$/;
    if (!usernamePattern.test(username)) {
      toast.error('Username must be at least 4 characters and contain only letters and numbers');
      return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      toast.error('Please enter a 10 digit phone number');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error('Password must be at least 6 characters and include a special character');
      return false;
    }

    return true;
  };

  const validateLogInInputs = () => {
    if (!email || !password) {
      toast.error('Email and Password are required');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUp && !validateSignUpInputs()) return;
    if (!isSignUp && !validateLogInInputs()) return;

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          username: username,
          phone: phone,
          email: email,
        });

        toast.dark('✔️ Sign Up Successful!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.dark('✔️ Log In Successful!');
      }

      setLogInPop(false);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        toast.error('Invalid credentials');
      } else if (errorCode === 'auth/email-already-in-use') {
        toast.error('Email is already in use');
      } else if (errorCode === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else {
        toast.error('Invalid credentials.');
      }
    }
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-zinc-950/75 transition-opacity" aria-hidden="true"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-[500px] sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 onClick={() => setLogInPop(false)} className="font-normal text-2xl cursor-pointer ml-[430px]">X</h1>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <img src={loginGuitar} className="w-22 h-[200px] ml-[130px]" alt="guitar" />
                    <p className="text-base font-medium mt-5 text-center">
                      {isSignUp ? 'Create an account to get started' : 'Help us to become one of the safest places to buy and sell'}
                    </p>

                    {isSignUp && (
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="border-2 border-gray-300 p-2 rounded-md w-full"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="border-2 border-gray-300 p-2 rounded-md w-full mt-3"
                        />
                      </div>
                    )}

                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-2 border-gray-300 p-2 rounded-md w-full mt-3"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-2 border-gray-300 p-2 rounded-md w-full mt-3"
                    />

                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white py-2 px-4 rounded-md w-full mt-4"
                    >
                      {isSignUp ? 'Sign Up' : 'Log In'}
                    </button>

                    <h1 className="text-center mt-4">OR</h1>
                    <h1
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-center mt-4 underline cursor-pointer"
                    >
                      {isSignUp ? 'Already have an account? Log in' : 'Create a new account'}
                    </h1>

                    <h1 className="text-center mt-12 text-xs">All your personal details are safe with us.</h1>
                    <h1 className="text-center mt-4 text-xs">
                      If you continue, you are accepting <span className="text-blue-600"> OLX Terms and Conditions and Privacy Policy</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
