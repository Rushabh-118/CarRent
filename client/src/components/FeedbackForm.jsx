import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiSend, FiStar, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import Title from './Title';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const { name, email, rating, message } = formData;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/feedback', formData);
      if (response.data.success) {
        toast.success('Thank you for your feedback!', {
          icon: '🌟',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setFormData({
          name: '',
          email: '',
          rating: 5,
          message: '',
        });
      } else {
        toast.error(response.data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='mt-20'>
        <Title title="Feedback Form" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mt-5 mb-20 mx-auto p-8 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Share Your Experience</h2>
          <p className="text-gray-600">We value your feedback to improve our services</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="name" className="flex items-center text-gray-700 font-medium">
              <FiUser className="mr-2" /> Name <span className="text-blue-600 ml-1">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="flex items-center text-gray-700 font-medium">
              <FiMail className="mr-2" /> Email <span className="text-blue-600 ml-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FiStar className="mr-2" /> Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <FiStar
                    className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                </button>
              ))}
              <span className="ml-2 text-gray-600">
                {rating} Star{rating > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="flex items-center text-gray-700 font-medium">
              <FiMessageSquare className="mr-2" /> Message <span className="text-blue-600 ml-1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="Tell us about your experience..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <div className="text-sm text-gray-500">
            <span className="text-blue-600">*</span> indicates required fields
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-colors ${
              isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
            }`}
          >
            <FiSend className={isSubmitting ? 'animate-pulse' : ''} />
            <span>{isSubmitting ? 'Sending...' : 'Submit Feedback'}</span>
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default FeedbackForm;