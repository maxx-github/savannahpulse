"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

const navLinks = [
  { name: "Destinations", href: "/destinations" },
  { name: "Flights", href: "/flights" },
  { name: "Hotels", href: "/hotels" },
  { name: "Car Hire", href: "/car-hire" },  // ADD THIS LINE
  { name: "Culture", href: "/culture" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
  { name: "Track Booking", href: "/track-booking" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="text-2xl font-bold font-serif">
            Savannah<span className="text-accent">Pulse</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-accent" : "text-white hover:text-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {status === "loading" ? (
            <div className="w-24 h-10 bg-card-border rounded-full animate-pulse"></div>
          ) : session ? (
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-card border border-card-border px-4 py-2 rounded-full hover:border-accent transition-all"
              >
                <FaUserCircle className="text-accent" size={20} />
                <span className="text-sm font-semibold">{session.user?.name?.split(' ')[0]}</span>
              </button>
              {profileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-card border border-card-border rounded-xl shadow-xl overflow-hidden"
                >
                  <Link href="/bookings" onClick={() => setProfileOpen(false)} className="block px-4 py-3 text-sm hover:bg-card-border">My Bookings</Link>
                  <button onClick={() => { signOut({ callbackUrl: '/' }); setProfileOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-card-border">Sign Out</button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-accent text-dark px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105">
              Sign In
            </Link>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark border-t border-card-border px-6 py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-white hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/bookings" className="block py-3 text-accent font-semibold" onClick={() => setOpen(false)}>My Bookings</Link>
              <button onClick={() => { signOut({ callbackUrl: '/' }); setOpen(false); }} className="block py-3 text-red-400 text-left w-full">Sign Out</button>
            </>
          ) : (
            <Link href="/login" className="block mt-4 bg-accent text-dark text-center px-6 py-3 rounded-full font-semibold" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
