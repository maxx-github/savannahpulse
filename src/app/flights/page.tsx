"use client";
import { motion } from "framer-motion";
import { FaPlane, FaShieldAlt, FaClock, FaCreditCard, FaArrowRight } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

const flights = [
  { from: "London", to: "Nairobi", duration: "8h 30m", price: "$950" },
  { from: "Dubai", to: "Mombasa", duration: "5h 15m", price: "$545" },
  { from: "New York", to: "Nairobi", duration: "15h 20m", price: "$1200" },
  { from: "Johannesburg", to: "Nairobi", duration: "4h 10m", price: "$435" },
];

const features = [
  { icon: FaShieldAlt, title: "Secure Booking", desc: "256-bit encrypted payments" },
  { icon: FaClock, title: "Instant Confirmation", desc: "Real-time seat availability" },
  { icon: FaCreditCard, title: "Flexible Payment", desc: "Pay in installments" },
];

export default function FlightsPage() {
  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
            TAKE FLIGHT
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Your Journey Begins Here
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Direct flights from major cities worldwide to Kenya's gateways. Book with confidence and fly into your adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="space-y-4">
            {flights.map((flight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-card-border rounded-2xl p-6 flex items-center justify-between hover:border-accent transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <FaPlane className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {flight.from} → {flight.to}
                    </div>
                    <div className="text-muted text-sm flex items-center gap-1">
                      <HiOutlineClock size={14} />
                      {flight.duration}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-2xl font-bold text-accent">{flight.price}</span>
                  <FaArrowRight className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden h-full min-h-[300px]"
          >
            <img
              src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800"
              alt="Flight over Kenya"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-accent" size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}