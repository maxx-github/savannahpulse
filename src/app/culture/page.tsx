"use client";
import { motion } from "framer-motion";
import { FaSun, FaUtensils, FaMusic, FaArrowRight } from "react-icons/fa";
import { HiClock } from "react-icons/hi";

const experiences = [
  {
    icon: FaSun,
    duration: "Full Day",
    title: "Maasai Village Immersion",
    desc: "Walk alongside Maasai warriors, learn traditional beadwork, and witness ancient ceremonies...",
    price: "$180",
    img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
  },
  {
    icon: FaUtensils,
    duration: "Half Day",
    title: "Kenyan Cuisine Discovery",
    desc: "From sizzling Nyama Choma to fragrant Pilau, join local chefs in bustling markets and intimate...",
    price: "$95",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  },
  {
    icon: FaMusic,
    duration: "Full Day",
    title: "Festival & Art Celebrations",
    desc: "Dance to the rhythm of traditional drums, witness vibrant art shows, and join local festivals that...",
    price: "$120",
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
  },
];

const timeline = [
  { time: "6:00 AM", title: "Sunrise in the Bush", desc: "Wake to birdsong and a traditional chai breakfast", side: "left" },
  { time: "8:00 AM", title: "Village Welcome", desc: "Maasai elders welcome you with song and ceremony", side: "right" },
  { time: "10:30 AM", title: "Craft & Create", desc: "Learn beadwork and traditional crafts from artisans", side: "left" },
  { time: "12:30 PM", title: "Market & Cook", desc: "Shop at a local market, then cook Kenyan classics", side: "right" },
  { time: "3:00 PM", title: "Art & Story", desc: "Gallery visit and oral storytelling under acacia shade", side: "left" },
  { time: "5:30 PM", title: "Sunset Festival", desc: "Drums, dance, and celebration as the sun sets golden", side: "right" },
];

export default function CulturePage() {
  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <section className="timeline-bg py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent tracking-[0.3em] text-sm font-semibold mb-4"
          >
            HARAMBEE — PULLING TOGETHER
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            Discover Living Culture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted max-w-2xl mx-auto"
          >
            Go beyond sightseeing. Walk with the people, taste their stories, and carry home a piece of Kenya's soul.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-card border border-card-border rounded-2xl overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.img}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                    <exp.icon className="text-accent" size={18} />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <HiClock size={14} />
                    {exp.duration}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-muted text-sm mb-4 line-clamp-2">{exp.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-semibold">From {exp.price}</span>
                  <button className="text-white text-sm flex items-center gap-1 hover:text-accent transition-colors">
                    Book Now <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="timeline-bg py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-center mb-16"
          >
            A Day in the Life — <span className="text-accent">Cultural Journey Timeline</span>
          </motion.h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-card-border -translate-x-1/2"></div>

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  item.side === "left" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-dark z-10"></div>

                <div className={`w-1/2 ${item.side === "left" ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div className="text-accent font-mono text-sm font-bold mb-1">{item.time}</div>
                  <h3 className="font-serif text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}