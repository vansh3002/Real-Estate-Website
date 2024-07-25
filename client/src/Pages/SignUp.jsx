import React, { useState } from 'react';
import video from 'C:\\REstate\\client\\src\\Login Assets\\110923-689949643_small.mp4';
import { Link ,useNavigate} from 'react-router-dom';
import { FaUserShield, FaEnvelope } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import OAuth from '../Component/OAuth';
import Header from '../Component/Header';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);

  return (
    <div>
      <Header/>
    <div className='loginPage flex justify-center items-center'>
      <div className='container relative' style={{ maxWidth: '100%' }}>
        <div className="videoDiv">
          <video src={video} autoPlay muted loop className="w-screen h-full object-cover top-50 left-0" />
          <div className='formContainer absolute inset-0 flex justify-center items-center z-20'>
            <div className='bg-white bg-opacity-75 rounded-lg p-8'>
              <div className='textDiv flex flex-col justify-center items-center mb-4'>
                <h2 className='title text-gray-600 text-center mb-0 font-bold'>Unlock the door to your dream homes</h2>
                <p className="text-gray-600 text-center mb-0 font-bold">Adopt the peace of satisfaction!</p>
              </div>
              <form onSubmit={handleSubmit} className='form grid'>
                <div className='inputDiv mb-4'>
                  <label htmlFor='username' className="block text-gray-700 text-sm font-bold mb-2 text-center">Username</label>
                  <div className='input flex items-center'>
                    <FaUserShield className='icon mr-2' />
                    <input
                      type='text'
                      id='username'
                      placeholder='Enter Username'
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='inputDiv mb-4'>
                  <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2 text-center">Email</label>
                  <div className='input flex items-center'>
                    <FaEnvelope className='icon mr-2' />
                    <input
                      type='email'
                      id='email'
                      placeholder='Enter Email'
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='inputDiv mb-4'>
                  <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2 text-center">Password</label>
                  <div className='input flex items-center'>
                    <BsFillShieldLockFill className='icon mr-2' />
                    <input
                      type='password'
                      id='password'
                      placeholder='Enter Password'
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full">
                  <span>Register</span>
                  <AiOutlineSwapRight className='icon ml-1' />
                </button>
                <div className='my-1'></div>
                <OAuth />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
