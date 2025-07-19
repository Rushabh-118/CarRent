import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import FeedbackForm from '../components/FeedbackForm'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Banner />
      <Testimonial />
      <FeedbackForm />
    </div>
  )
}

export default Home
