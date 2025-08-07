import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiStar,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiCheckCircle,
  FiX,
  FiThumbsUp,
  FiThumbsDown
} from "react-icons/fi";
import Title from "./Title";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
    feedbackType: "general"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { name, email, rating, message, feedbackType } = formData;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!message.trim()) newErrors.message = "Message is required";
    else if (message.length > 500) newErrors.message = "Message too long (max 500 characters)";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "message") {
      setCharacterCount(value.length);
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleFeedbackType = (type) => {
    setFormData((prev) => ({ ...prev, feedbackType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would use:
      const response = await axios.post("/api/feedback", formData);
      
      setIsSubmitted(true);
      toast.success("Thank you for your valuable feedback!", {
        icon: "🌟",
        style: {
          borderRadius: "10px",
          background: "linear-gradient(to right, #4f46e5, #7c3aed)",
          color: "#fff",
          padding: "16px",
          fontSize: "1rem",
          fontWeight: "600"
        },
        duration: 4000
      });
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          rating: 5,
          message: "",
          feedbackType: "general"
        });
        setCharacterCount(0);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit feedback", {
        style: {
          borderLeft: "4px solid #ef4444",
          background: "#fef2f2",
          color: "#b91c1c",
          fontWeight: "500"
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => handleRatingChange(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        className="focus:outline-none transform hover:scale-110 transition-transform"
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      >
        <FiStar
          className={`w-8 h-8 transition-all duration-200 ${
            (hoverRating || rating) >= star
              ? "text-yellow-500 fill-current drop-shadow-sm"
              : "text-gray-300"
          }`}
        />
      </button>
    ));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mt-5 mb-20 mx-auto p-8 bg-white rounded-xl shadow-lg text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <FiCheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Feedback Submitted Successfully!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for taking the time to share your thoughts with us. 
          Your feedback helps us improve our services.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Another Feedback
        </motion.button>
      </motion.div>
    );
  }

  return (
    <>
      <div className="mt-20">
        <Title title="Share Your Thoughts" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mt-5 mb-20 mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100"
      >

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              We Value Your Feedback
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
              Your opinion matters to us! Please take a moment to let us know how we're doing.
            </p>
          </div>
          <div className="flex-shrink-0">
            <DotLottieReact
              src="https://lottie.host/d70a47d2-73ae-49f0-af02-290f7f6fbcf0/ctg5FH5gLA.lottie"
              loop
              autoplay
              className="max-w-xs w-40 md:w-56"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="flex items-center text-gray-700 font-medium"
              >
                <FiUser className="mr-2 text-blue-600" /> Name{" "}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400`}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center">
                  <FiX className="mr-1" /> {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="flex items-center text-gray-700 font-medium"
              >
                <FiMail className="mr-2 text-blue-600" /> Email{" "}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400`}
                placeholder="your.email@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center">
                  <FiX className="mr-1" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FiStar className="mr-2 text-blue-600" /> How would you rate your experience?
            </label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="ml-2 text-gray-600 font-medium">
                {rating} Star{rating > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">
              What type of feedback are you providing?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { type: "praise", label: "Praise", icon: <FiThumbsUp className="mr-1" /> },
                { type: "suggestion", label: "Suggestion", icon: <FiMessageSquare className="mr-1" /> },
                { type: "bug", label: "Bug Report", icon: <FiX className="mr-1" /> },
                { type: "general", label: "General", icon: <FiStar className="mr-1" /> }
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => handleFeedbackType(item.type)}
                  className={`flex items-center justify-center py-2 px-3 rounded-lg border transition-all ${
                    feedbackType === item.type
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="message"
              className="flex items-center text-gray-700 font-medium"
            >
              <FiMessageSquare className="mr-2 text-blue-600" /> Your Feedback{" "}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400`}
              placeholder="Tell us about your experience..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              maxLength="500"
            />
            <div className="flex justify-between items-center">
              {errors.message ? (
                <p id="message-error" className="text-red-500 text-sm mt-1 flex items-center">
                  <FiX className="mr-1" /> {errors.message}
                </p>
              ) : (
                <div className="text-xs text-gray-500">
                  {characterCount}/500 characters
                </div>
              )}
              <div className="text-xs text-gray-500">
                <span className="text-red-500">*</span> required fields
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-all ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FiSend />
                <span>Submit Feedback</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default FeedbackForm;