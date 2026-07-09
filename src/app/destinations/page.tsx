"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const destinations = [
  {
    tag: "Wildlife Safari",
    rating: 4.9,
    title: "Maasai Mara",
    desc: "Witness millions of wildebeest crossing the Mara River in one of nature's most spectacular events. Home to the Big Five.",
    price: "$850",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    href: "/destinations/maasai-mara",
  },
  {
    tag: "Beach Escape",
    rating: 4.8,
    title: "Diani Beach",
    desc: "Pristine white sands meet turquoise waters along Kenya's stunning coastline. Perfect for diving, snorkeling, and pure relaxation.",
    price: "$620",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    href: "/destinations/diani-beach",
  },
  {
    tag: "Mountain Trek",
    rating: 4.7,
    title: "Mount Kenya",
    desc: "Trek through bamboo forests and alpine meadows to the snow-capped summit. A UNESCO World Heritage Site of breathtaking beauty.",
    price: "$720",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    href: "/destinations/mount-kenya",
  },
  {
    tag: "Cultural Immersion",
    rating: 4.9,
    title: "Lamu Old Town",
    desc: "Wander through centuries-old Swahili architecture, carved doorways, and hidden courtyards in East Africa's oldest living town.",
    price: "$480",
    img: "/images/destinations/card-lamu.jpg",
    href: "/destinations/lamu-old-town",
  },
];

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
            EXPLORE KENYA
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Iconic Destinations
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            From untamed wilderness to ancient coastal towns — every corner of Kenya holds a story waiting to be discovered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={dest.href}>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-80 md:h-96">
                  <img
                    src={dest.img}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1 text-accent mb-2">
                      <FaStar size={14} />
                      <span className="text-sm font-semibold">{dest.rating}</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold mb-2">{dest.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{dest.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-semibold">From {dest.price}</span>
                      <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Discover →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}