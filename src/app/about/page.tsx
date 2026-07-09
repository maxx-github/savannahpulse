"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHeart, FaUsers, FaAward } from "react-icons/fa";

const team = [
  {
    name: "Anthony Solomon",
    role: "Founder & Lead Guide",
    bio: "Born and raised in Mombasa, Anthony has spent 20 years exploring every corner of Kenya. His passion for sharing authentic cultural experiences led to the creation of SavannahPulse.",
    image: "/images/team/anthony-solomon.jpeg",
  },
  {
    name: "David Kipchoge",
    role: "Safari Specialist",
    bio: "Former wildlife ranger turned safari guide, David's intimate knowledge of animal behavior and conservation makes every game drive unforgettable.",
    image: "/images/team/expert-guide.jpg",
  },
  
];

const values = [
  {
    icon: FaHeart,
    title: "Passion for Kenya",
    desc: "We don't just show you Kenya — we share our home with pride and love.",
  },
  {
    icon: FaUsers,
    title: "Community First",
    desc: "Every booking supports local communities and conservation efforts.",
  },
  {
    icon: FaAward,
    title: "Authentic Experiences",
    desc: "No tourist traps. Only genuine cultural connections and wild adventures.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Local Expertise",
    desc: "Our team lives and breathes Kenya. We know places maps don't show.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920"
            alt="Kenyan landscape"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6"
          >
            Meet Your <span className="text-accent">Local Experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We're not just tour operators — we're storytellers, conservationists, and passionate Kenyans dedicated to sharing the authentic heart of our homeland.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                SavannahPulse was born from a simple belief: travel should transform both the traveler and the places they visit. We curate journeys that go beyond sightseeing — creating meaningful connections between visitors and Kenya's rich cultural tapestry.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Every itinerary we design supports local communities, protects wildlife habitats, and preserves ancient traditions. When you travel with us, you're not just visiting Kenya — you're becoming part of its story.
              </p>
              <div className="flex items-center gap-4 text-accent">
                <FaMapMarkerAlt size={24} />
                <span className="font-semibold">Based in Nairobi, Kenya</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800"
                alt="Maasai warriors"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold text-center mb-16"
          >
            What Drives <span className="text-accent">Us</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-card-border rounded-2xl p-8 text-center hover:border-accent/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-accent" size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold text-center mb-4"
          >
            The <span className="text-accent">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted text-center max-w-2xl mx-auto mb-16"
          >
            Meet the passionate locals who will craft your perfect Kenyan adventure
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold mb-6"
          >
            Ready to Explore Kenya with Us?
          </motion.h2>
          <p className="text-gray-300 mb-8 text-lg">
            Let our local experts craft your perfect journey
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-dark font-semibold px-8 py-4 rounded-full hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </div>
  );
}