"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaUser, FaCreditCard, FaClipboardList, FaPlane, FaLock, FaTimes } from "react-icons/fa";

interface CheckoutWizardProps {
  isOpen: boolean;
  onClose: () => void;
  type: "flight" | "hotel" | "car-hire";
  summary: {
    title: string;
    subtitle: string;
    dates: string;
    price: number;
    taxes: number;
    total: number;
  };
}

export default function CheckoutWizard({ isOpen, onClose, type, summary }: CheckoutWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [details, setDetails] = useState({
    fullName: "", email: "", phone: "", passport: "", passportExpiry: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "", expiry: "", cvv: "", nameOnCard: "",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would POST to /api/bookings here
    alert("Booking Confirmed! Redirecting...");
    setIsSubmitting(false);
    onClose();
    setStep(1); // Reset for next time
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-card border border-card-border rounded-2xl w-full max-w-2xl my-8 shadow-2xl relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-white transition-colors">
          <FaTimes size={20} />
        </button>

        {/* Header / Progress */}
        <div className="p-8 border-b border-card-border">
          <div className="flex items-center justify-between mb-8">
            {[
              { num: 1, icon: FaClipboardList, label: "Review" },
              { num: 2, icon: FaUser, label: "Details" },
              { num: 3, icon: FaCreditCard, label: "Payment" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s.num ? "bg-accent text-dark" : "bg-card-border text-muted"
                }`}>
                  {step > s.num ? <FaCheck /> : <s.icon />}
                </div>
                <span className={`text-sm font-semibold hidden md:block ${step >= s.num ? "text-white" : "text-muted"}`}>
                  {s.label}
                </span>
                {i < 2 && <div className={`flex-1 h-1 mx-2 rounded ${step > s.num ? "bg-accent" : "bg-card-border"}`} />}
              </div>
            ))}
          </div>
          <h2 className="font-serif text-2xl font-bold">
            {step === 1 && "Review Your Booking"}
            {step === 2 && "Traveler Details"}
            {step === 3 && "Secure Payment"}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="bg-darker rounded-xl p-6 border border-card-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold">{summary.title}</h3>
                      <p className="text-muted text-sm">{summary.subtitle}</p>
                    </div>
                    {type === 'flight' && <FaPlane className="text-accent text-2xl" />}
                  </div>
                  <div className="text-sm text-muted mb-4">{summary.dates}</div>
                  <div className="space-y-2 pt-4 border-t border-card-border">
                    <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>${summary.price}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted">Taxes & Fees</span><span>${summary.taxes}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2"><span>Total</span><span className="text-accent">${summary.total}</span></div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name (as on ID)" value={details.fullName} onChange={e => setDetails({...details, fullName: e.target.value})} className="bg-darker border border-card-border rounded-lg px-4 py-3 text-white" />
                  <input type="email" placeholder="Email Address" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} className="bg-darker border border-card-border rounded-lg px-4 py-3 text-white" />
                  <input type="tel" placeholder="Phone Number" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} className="bg-darker border border-card-border rounded-lg px-4 py-3 text-white" />
                  {type === 'flight' && (
                    <>
                      <input type="text" placeholder="Passport Number" value={details.passport} onChange={e => setDetails({...details, passport: e.target.value})} className="bg-darker border border-card-border rounded-lg px-4 py-3 text-white" />
                      <input type="text" placeholder="Passport Expiry (MM/YY)" value={details.passportExpiry} onChange={e => setDetails({...details, passportExpiry: e.target.value})} className="bg-darker border border-card-border rounded-lg px-4 py-3 text-white" />
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="bg-darker rounded-xl p-6 border border-card-border">
                  <div className="flex items-center gap-2 mb-4 text-green-400 text-sm">
                    <FaLock /> Secure SSL Encrypted Payment
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Card Number (4242 4242 4242 4242)" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Expiry (MM/YY)" value={payment.expiry} onChange={e => setPayment({...payment, expiry: e.target.value})} className="bg-card border border-card-border rounded-lg px-4 py-3 text-white" />
                      <input type="text" placeholder="CVV" value={payment.cvv} onChange={e => setPayment({...payment, cvv: e.target.value})} className="bg-card border border-card-border rounded-lg px-4 py-3 text-white" />
                    </div>
                    <input type="text" placeholder="Name on Card" value={payment.nameOnCard} onChange={e => setPayment({...payment, nameOnCard: e.target.value})} className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="p-8 border-t border-card-border flex justify-between">
          {step > 1 ? (
            <button onClick={handleBack} className="px-6 py-3 rounded-xl font-semibold text-white hover:bg-card-border transition-all">Back</button>
          ) : <div />}
          
          {step < 3 ? (
            <button onClick={handleNext} className="bg-accent text-dark px-8 py-3 rounded-xl font-bold hover:bg-accent-hover transition-all">Continue</button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="bg-accent text-dark px-8 py-3 rounded-xl font-bold hover:bg-accent-hover transition-all disabled:opacity-50 flex items-center gap-2">
              {isSubmitting ? "Processing..." : `Pay $${summary.total}`}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}