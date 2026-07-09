"use client";
import CheckoutWizard from "@/components/CheckoutWizard";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { 
  FaPlane, FaClock, FaSuitcase, FaUtensils, FaWifi, FaCheck, FaFilter, FaArrowRight 
} from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";

// Mock Flight Data
const mockFlights = [
  {
    id: "KQ100",
    airline: "Kenya Airways",
    logo: "🇰🇪",
    from: "LHR", to: "NBO",
    departTime: "21:30", arriveTime: "06:00+1",
    duration: "8h 30m",
    stops: 0,
    price: 680,
    baggage: "23kg",
    meal: true, wifi: true,
    class: "Economy"
  },
  {
    id: "BA063",
    airline: "British Airways",
    logo: "🇧",
    from: "LHR", to: "NBO",
    departTime: "20:15", arriveTime: "06:45+1",
    duration: "8h 30m",
    stops: 0,
    price: 720,
    baggage: "23kg",
    meal: true, wifi: true,
    class: "Economy"
  },
  {
    id: "EK721",
    airline: "Emirates",
    logo: "🇪",
    from: "LHR", to: "NBO",
    departTime: "14:00", arriveTime: "05:30+1",
    duration: "11h 30m",
    stops: 1,
    stopCity: "Dubai (DXB)",
    price: 620,
    baggage: "30kg",
    meal: true, wifi: true,
    class: "Economy"
  },
  {
    id: "QR105",
    airline: "Qatar Airways",
    logo: "🇦",
    from: "LHR", to: "NBO",
    departTime: "08:30", arriveTime: "23:15",
    duration: "10h 45m",
    stops: 1,
    stopCity: "Doha (DOH)",
    price: 590,
    baggage: "30kg",
    meal: true, wifi: true,
    class: "Economy"
  },
  {
    id: "ET707",
    airline: "Ethiopian Airlines",
    logo: "🇪🇹",
    from: "LHR", to: "NBO",
    departTime: "22:00", arriveTime: "12:30+1",
    duration: "10h 30m",
    stops: 1,
    stopCity: "Addis Ababa (ADD)",
    price: 540,
    baggage: "23kg",
    meal: true, wifi: false,
    class: "Economy"
  },
  {
    id: "KQ101-BUS",
    airline: "Kenya Airways",
    logo: "🇰",
    from: "LHR", to: "NBO",
    departTime: "21:30", arriveTime: "06:00+1",
    duration: "8h 30m",
    stops: 0,
    price: 2450,
    baggage: "32kg",
    meal: true, wifi: true,
    class: "Business"
  },
];

export default function FlightResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get search params (fallback to defaults)
  const from = searchParams.get('from') || 'London (LHR)';
  const to = searchParams.get('to') || 'Nairobi (NBO)';
  const date = searchParams.get('date') || 'Jul 15, 2026';
  const passengers = searchParams.get('passengers') || '1';

  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [filters, setFilters] = useState({
    stops: 'all',
    maxPrice: 1000,
    airlines: [] as string[],
  });

  // Filter flights
  const filteredFlights = useMemo(() => {
    return mockFlights.filter(flight => {
      if (filters.stops === 'direct' && flight.stops !== 0) return false;
      if (filters.stops === '1stop' && flight.stops !== 1) return false;
      if (flight.price > filters.maxPrice) return false;
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;
      return true;
    });
  }, [filters]);

  const toggleAirline = (airline: string) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter(a => a !== airline)
        : [...prev.airlines, airline]
    }));
  };

 const handleCheckout = () => {
  if (!selectedFlight) return;
  setShowCheckout(true);
};

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Summary Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-card-border rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-serif">{from.split(' ')[0]}</div>
              <div className="text-xs text-muted">{from.match(/\(([^)]+)\)/)?.[1]}</div>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <div className="h-px w-12 bg-accent/50"></div>
              <FaPlane className="rotate-90" />
              <div className="h-px w-12 bg-accent/50"></div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-serif">{to.split(' ')[0]}</div>
              <div className="text-xs text-muted">{to.match(/\(([^)]+)\)/)?.[1]}</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-muted text-xs">Date</div>
              <div className="font-semibold">{date}</div>
            </div>
            <div className="text-center">
              <div className="text-muted text-xs">Travelers</div>
              <div className="font-semibold">{passengers} Adult</div>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition-all text-sm font-semibold"
            >
              Modify Search
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <FaFilter className="text-accent" />
                <h3 className="font-serif text-xl font-bold">Filters</h3>
              </div>

              {/* Stops Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm">Stops</h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'Any' },
                    { id: 'direct', label: 'Direct' },
                    { id: '1stop', label: '1 Stop' },
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="stops"
                        checked={filters.stops === opt.id}
                        onChange={() => setFilters({ ...filters, stops: opt.id })}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm">Airlines</h4>
                <div className="space-y-2">
                  {['Kenya Airways', 'British Airways', 'Emirates', 'Qatar Airways', 'Ethiopian Airlines'].map(airline => (
                    <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.airlines.includes(airline)}
                        onChange={() => toggleAirline(airline)}
                        className="w-4 h-4 rounded accent-accent"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold mb-3 text-sm">Max Price: ${filters.maxPrice}</h4>
                <input
                  type="range"
                  min="400"
                  max="3000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  className="w-full h-2 bg-card-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>$400</span>
                  <span>$3000+</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Flight Results */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold">
                {filteredFlights.length} Flights Found
              </h2>
              <span className="text-sm text-muted">Sorted by: Best</span>
            </div>

            {filteredFlights.map((flight, i) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedFlight(flight)}
                className={`bg-card border rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl ${
                  selectedFlight?.id === flight.id 
                    ? 'border-accent shadow-lg shadow-accent/10' 
                    : 'border-card-border hover:border-accent/50'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Airline Info */}
                  <div className="flex items-center gap-4 md:w-1/4">
                    <div className="text-3xl">{flight.logo}</div>
                    <div>
                      <div className="font-bold">{flight.airline}</div>
                      <div className="text-xs text-muted">Flight {flight.id}</div>
                      {flight.class === 'Business' && (
                        <span className="inline-block mt-1 bg-accent/20 text-accent text-xs px-2 py-0.5 rounded">Business</span>
                      )}
                    </div>
                  </div>

                  {/* Flight Path */}
                  <div className="flex-1 flex items-center justify-center gap-4 md:w-2/4">
                    <div className="text-center">
                      <div className="text-xl font-bold">{flight.departTime}</div>
                      <div className="text-xs text-muted">{flight.from}</div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-muted mb-1">{flight.duration}</div>
                      <div className="w-full h-0.5 bg-card-border relative flex items-center justify-center">
                        <FaPlane className="text-accent bg-card p-1 rounded-full text-sm" />
                        {flight.stops > 0 && (
                          <div className="absolute -bottom-4 text-xs text-accent whitespace-nowrap">
                            {flight.stops} stop • {flight.stopCity}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold">{flight.arriveTime}</div>
                      <div className="text-xs text-muted">{flight.to}</div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="text-center md:w-1/4">
                    <div className="font-serif text-3xl font-bold text-accent">${flight.price}</div>
                    <div className="text-xs text-muted mb-2">per person</div>
                    <button className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedFlight?.id === flight.id 
                        ? 'bg-accent text-dark' 
                        : 'bg-card-border text-white hover:bg-accent hover:text-dark'
                    }`}>
                      {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-card-border text-xs text-muted">
                  <div className="flex items-center gap-1">
                    <FaSuitcase className="text-accent" /> {flight.baggage}
                  </div>
                  {flight.meal && (
                    <div className="flex items-center gap-1">
                      <FaUtensils className="text-accent" /> Meal included
                    </div>
                  )}
                  {flight.wifi && (
                    <div className="flex items-center gap-1">
                      <FaWifi className="text-accent" /> Wi-Fi
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredFlights.length === 0 && (
              <div className="text-center py-20 bg-card rounded-2xl border border-card-border">
                <FaPlane className="text-muted mx-auto mb-4 text-4xl" />
                <h3 className="font-serif text-xl font-bold mb-2">No flights found</h3>
                <p className="text-muted">Try adjusting your filters.</p>
              </div>
            )}
          </div>

          {/* Sticky Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold mb-4">Booking Summary</h3>
              
              {selectedFlight ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-darker rounded-xl p-4 border border-card-border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{selectedFlight.logo}</span>
                      <span className="font-bold">{selectedFlight.airline}</span>
                    </div>
                    <div className="text-sm text-muted mb-1">Flight {selectedFlight.id}</div>
                    <div className="flex items-center justify-between font-bold">
                      <span>{selectedFlight.departTime}</span>
                      <FaPlane className="text-accent rotate-90" />
                      <span>{selectedFlight.arriveTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{selectedFlight.from}</span>
                      <span>{selectedFlight.to}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Base Fare ({passengers}x)</span>
                      <span>${selectedFlight.price * parseInt(passengers)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Taxes & Fees</span>
                      <span>${Math.round(selectedFlight.price * 0.12 * parseInt(passengers))}</span>
                    </div>
                    <div className="h-px bg-card-border my-2"></div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-accent">
                        ${Math.round(selectedFlight.price * 1.12 * parseInt(passengers))}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-accent text-dark font-bold py-3 rounded-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Checkout <FaArrowRight />
                  </button>
                  
                  <p className="text-xs text-muted text-center flex items-center justify-center gap-1">
                    <FaCheck className="text-green-500" /> Free cancellation within 24h
                  </p>
                </motion.div>
              ) : (
                <div className="text-center py-8 text-muted">
                  <FaPlane className="mx-auto mb-3 text-3xl opacity-30" />
                  <p className="text-sm">Select a flight to view your booking summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
	        <CheckoutWizard 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        type="flight"
        summary={{
          title: `${selectedFlight?.airline} - ${selectedFlight?.class || 'Economy'}`,
          subtitle: `Flight ${selectedFlight?.id} • ${selectedFlight?.from} to ${selectedFlight?.to}`,
          dates: `${date} • ${passengers} Passenger(s)`,
          price: selectedFlight?.price * parseInt(passengers) || 0,
          taxes: Math.round((selectedFlight?.price * parseInt(passengers) || 0) * 0.12),
          total: Math.round((selectedFlight?.price * parseInt(passengers) || 0) * 1.12)
        }}
      />
    </div>
  );
}