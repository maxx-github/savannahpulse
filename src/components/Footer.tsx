import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-card-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="text-2xl font-bold font-serif">
                Savannah<span className="text-accent">Pulse</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Your gateway to the heart of Kenya. Book flights, find stays, and discover a culture that will stay with you forever.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-muted hover:text-accent transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Explore</h4>
            <ul className="space-y-3">
              {["Destinations", "Flights", "Hotels", "Cultural Tours"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted hover:text-accent text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Our Team", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted hover:text-accent text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted hover:text-accent text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">© 2026 SavannahPulse. All rights reserved.</p>
          <p className="text-muted text-sm">Crafted with <span className="text-red-500">❤</span> in Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
