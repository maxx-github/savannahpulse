"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";

interface Airport {
  code: string;
  name: string;
  city: string;
  country?: string;
}

interface AirportSearchProps {
  label: string;
  placeholder: string;
  airports: Airport[];
  value: string;
  onChange: (value: string) => void;
  showCustomInput?: boolean;
}

export default function AirportSearch({
  label,
  placeholder,
  airports,
  value,
  onChange,
  showCustomInput = false,
}: AirportSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAirport, setSelectedAirport] = useState("");
  const [customAirport, setCustomAirport] = useState("");

  const filteredAirports = airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (airport.country && airport.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAirportSelect = (airport: Airport) => {
    const displayValue = `${airport.city} (${airport.code})`;
    setSelectedAirport(displayValue);
    onChange(displayValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleCustomSubmit = () => {
    if (customAirport.trim()) {
      setSelectedAirport(customAirport);
      onChange(customAirport);
      setIsOpen(false);
      setCustomAirport("");
    }
  };

  return (
    <div className="relative">
      <label className="text-xs text-muted mb-1 block">{label}</label>
      <div className="relative">
        <input
          type="text"
          readOnly
          value={selectedAirport || value}
          onClick={() => setIsOpen(!isOpen)}
          placeholder={placeholder}
          className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted cursor-pointer hover:border-accent transition-colors"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
        >
          <HiOutlineSearch size={18} />
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 w-full mt-2 bg-card border border-card-border rounded-lg shadow-2xl max-h-96 overflow-hidden"
        >
          <div className="p-3 border-b border-card-border">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search airport, city, or country..."
              className="w-full bg-darker border border-card-border rounded px-3 py-2 text-sm text-white placeholder-muted"
              autoFocus
            />
          </div>
          
          <div className="overflow-y-auto max-h-64">
            {filteredAirports.map((airport) => (
              <button
                key={airport.code}
                onClick={() => handleAirportSelect(airport)}
                className="w-full px-4 py-3 text-left hover:bg-accent/10 border-b border-card-border last:border-0 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">
                      {airport.city} <span className="text-accent">({airport.code})</span>
                    </div>
                    <div className="text-xs text-muted">{airport.name}</div>
                  </div>
                  {airport.country && <div className="text-xs text-muted">{airport.country}</div>}
                </div>
              </button>
            ))}
          </div>

          {showCustomInput && (
            <div className="p-3 border-t border-card-border bg-darker/50">
              <div className="text-xs text-muted mb-2">Can't find your airport?</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAirport}
                  onChange={(e) => setCustomAirport(e.target.value)}
                  placeholder="Enter airport name or code"
                  className="flex-1 bg-darker border border-card-border rounded px-3 py-2 text-sm text-white placeholder-muted"
                  onKeyPress={(e) => e.key === "Enter" && handleCustomSubmit()}
                />
                <button
                  onClick={handleCustomSubmit}
                  className="bg-accent text-dark px-4 py-2 rounded text-sm font-semibold hover:bg-accent-hover transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
