import React, { useState } from 'react';
import sendEmail from './sendMail';
import './contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data using the sendEmail function
      const result = await sendEmail(formData);

      console.log(result);
      // Handle success or failure based on the result
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  

  return (
    <div className="contact flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form className="conf shadow-md rounded border-4 border-yellow-500 px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-md  font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded bg-yellow-300 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-md font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded bg-yellow-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 text-white">
            <label className="block  text-white text-md font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border bg-yellow-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          
          <div className="flex justify-center">
  <button
    className="bg-yellow-500 hover:bg-yellow-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    Submit
  </button>
</div>


        
        </form>
      </div>
    </div>
  );
};

export default Contact;
