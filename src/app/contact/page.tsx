"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Visit Us",
    lines: ["Kenyatta Avenue, Nairobi CBD", "Nairobi, Kenya"],
    color: "bg-accent/20",
  },
  {
    icon: FaPhone,
    title: "Call Us",
    lines: ["+971 52 743 3747"],
    color: "bg-accent/20",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp Us",
    lines: ["+971 52 743 3747"],
    color: "bg-green-500/20",
  },
  {
    icon: FaEnvelope,
    title: "Email Us",
    lines: ["info@hospitalityarc.com"],
    color: "bg-accent/20",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
            GET IN TOUCH
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Start Your Journey
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Have questions about your Kenya adventure? Our team of local experts is ready to craft your perfect itinerary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full ${info.color} flex items-center justify-center flex-shrink-0`}>
                  <info.icon className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold mb-1">{info.title}</h3>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-muted text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-card border border-card-border rounded-2xl p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254..."
                      className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dream Kenya adventure..."
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-dark font-semibold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-accent-hover transition-all hover:scale-105 disabled:opacity-50"
                >
                  <FaPaperPlane size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}