"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    rating: 5,
    text: "SavannahPulse exceeded every expectation. The Maasai Mara migration experience was life-changing. Our guide's knowledge was incredible, and staying in a traditional manyatta was a highlight of our trip.",
    trip: "Maasai Mara Safari",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    name: "Michael Chen",
    location: "San Francisco, USA",
    rating: 5,
    text: "The attention to detail was remarkable. From the moment we landed in Nairobi to our final sunset in Diani, everything was seamless. The team's passion for Kenya is infectious!",
    trip: "Kenya Grand Tour",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Emma & James Wilson",
    location: "Sydney, Australia",
    rating: 5,
    text: "Our honeymoon in Lamu was pure magic. The team arranged a private dhow sunset cruise and a Swahili cooking class that we'll never forget. Authentic, romantic, and unforgettable.",
    trip: "Lamu Honeymoon",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "As a solo female traveler, I felt completely safe and welcomed. The cultural immersion experiences were respectful and genuine. I left with lifelong friends and memories.",
    trip: "Cultural Journey",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  },
  {
    name: "David & Lisa Thompson",
    location: "Toronto, Canada",
    rating: 5,
    text: "We've traveled extensively, but Mount Kenya trek with SavannahPulse was extraordinary. The guides' expertise and the team's support made summiting Point Lenana achievable and safe.",
    trip: "Mount Kenya Expedition",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE",
    rating: 5,
    text: "The perfect blend of luxury and adventure. Our family loved the beach resort in Watamu followed by a safari in the Mara. SavannahPulse understood exactly what we wanted.",
    trip: "Family Adventure",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
];

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="pt-20 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
          >
            Stories from <span className="text-accent">Happy Travelers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Don't just take our word for it — hear from the adventurers who've experienced Kenya with SavannahPulse
          </motion.p>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-16 bg-card/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-card border border-card-border rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-accent"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <FaQuoteLeft className="text-accent/30 text-5xl mb-4" />
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 italic">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <FaStar key={i} className="text-accent" />
                      ))}
                    </div>
                    <h3 className="font-serif text-2xl font-bold">{testimonials[currentIndex].name}</h3>
                    <p className="text-accent text-sm">{testimonials[currentIndex].location}</p>
                    <p className="text-muted text-xs mt-2">{testimonials[currentIndex].trip}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark/80 border border-card-border flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark/80 border border-card-border flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-accent w-8" : "bg-card-border"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            More <span className="text-accent">Reviews</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-card-border rounded-2xl p-6 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, star) => (
                    <FaStar key={star} className="text-accent text-sm" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-muted text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="font-serif text-5xl font-bold text-accent mb-2">10,000+</div>
              <div className="text-muted">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-serif text-5xl font-bold text-accent mb-2">4.9/5</div>
              <div className="text-muted">Average Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="font-serif text-5xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted">Would Recommend</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="font-serif text-5xl font-bold text-accent mb-2">15+</div>
              <div className="text-muted">Years Experience</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Ready to Write Your <span className="text-accent">Own Story</span>?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of happy travelers who've discovered the heart of Kenya with us
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-dark font-semibold px-8 py-4 rounded-full hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
          >
            Start Your Adventure
          </a>
        </div>
      </section>
    </div>
  );
}