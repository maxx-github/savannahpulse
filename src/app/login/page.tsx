"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [isRegister, setIsRegister] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState<string>('/bookings');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get('callbackUrl') || '/bookings');
  }, []);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Get callback URL from query params (set by NextAuth when redirecting from protected pages)

  // If user is already logged in, redirect them
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isRegister) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (res.ok) {
          // Registration successful, now sign them in
          const signInRes = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });
          
          if (signInRes?.error) {
            setError("Registration successful, but login failed. Please try signing in.");
            setIsRegister(false);
          } else {
            router.push(callbackUrl);
          }
        } else {
          const data = await res.json();
          setError(data.error || "Registration failed");
        }
      } catch (err) {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl: callbackUrl,
        });
        
        if (res?.error) {
          setError("Invalid email or password");
        } else if (res?.ok) {
          router.push(callbackUrl);
        } else {
          setError("Login failed. Please try again.");
        }
      } catch (err) {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { 
        callbackUrl: callbackUrl,
        redirect: true,
      });
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  // Show loading if checking session
  if (status === "loading") {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-card-border rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="font-serif text-3xl font-bold text-center mb-8">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>

        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full bg-white text-dark font-semibold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all mb-6 disabled:opacity-50"
        >
          {googleLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaGoogle className="text-red-500" />
          )}
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-card-border"></div>
          <span className="text-muted text-sm">OR</span>
          <div className="flex-1 h-px bg-card-border"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg pl-12 pr-4 py-3 text-white placeholder-muted"
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-darker border border-card-border rounded-lg pl-12 pr-4 py-3 text-white placeholder-muted"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-darker border border-card-border rounded-lg pl-12 pr-4 py-3 text-white placeholder-muted"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-muted text-sm mt-6">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            className="text-accent hover:underline"
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}