import Feedback from '../Models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const feedback = new Feedback({
      name,
      email,
      rating,
      message,
    });

    await feedback.save();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
