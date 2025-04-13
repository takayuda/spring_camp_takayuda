"use client"

import React, { useState } from "react";
declare global {
  interface Window {
    MusicKit: typeof MusicKit;
  }
}

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playlistLink, setPlaylistLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("date-nearest");
  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
@keyframes fadeInOut {
0% { opacity: 0; transform: translateY(-10px); }
10% { opacity: 1; transform: translateY(0); }
90% { opacity: 1; transform: translateY(0); }
100% { opacity: 0; transform: translateY(-10px); }
}
.animate-fade-in-out {
animation: fadeInOut 5s ease-in-out;
}
`;
  document.head.appendChild(style);
  const [showFilters, setShowFilters] = useState(false);
  const handleScanPlaylist = async () => {
    if (!playlistLink) return;
    // Validate Apple Music playlist link format
    const isValidLink = /^https:\/\/music\.apple\.com\/.*playlist.*/.test(
      playlistLink,
    );
    if (!isValidLink) {
      setErrorMessage("Please enter a valid Apple Music playlist link");
      return;
    }
    setIsLoading(true);
    try {
      // Simulating successful API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setHasResults(true);
    } catch (error) {
      console.error("Error scanning playlist:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistLink(e.target.value);
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md z-50 animate-fade-in-out flex items-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          <span>{errorMessage}</span>
          <button
            className="ml-4 text-red-700 hover:text-red-900"
            onClick={() => setErrorMessage(null)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Concert Finder
          </h1>
          <p className="text-gray-600">
            Discover live performances from artists in your Apple Music
            playlists
          </p>
        </header>
        {/* Playlist Link Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label
                htmlFor="playlist-link"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Playlist Link
              </label>
              <input
                type="text"
                id="playlist-link"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="Paste your Apple Music playlist link here"
                value={playlistLink}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleScanPlaylist}
                disabled={isLoading || !playlistLink}
                className={`!rounded-button whitespace-nowrap cursor-pointer px-6 py-3 font-medium text-white ${
                  isLoading || !playlistLink
                    ? "bg-gray-400"
                    : "bg-pink-600 hover:bg-pink-700"
                } rounded-lg transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Scanning...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className="fab fa-apple mr-2"></i> Scan Playlist
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Results Section */}
        {hasResults && (
          <div className="mb-10">
            {/* Playlist Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 overflow-hidden rounded-lg">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20modern%20music%20playlist%20cover%20with%20vibrant%20colors%2C%20abstract%20shapes%2C%20and%20minimal%20design.%20The%20image%20features%20a%20clean%2C%20professional%20aesthetic%20with%20subtle%20music-related%20elements.%20The%20background%20has%20a%20gradient%20of%20soft%20colors%20that%20blend%20harmoniously%2C%20creating%20a%20contemporary%20digital%20art%20feel&width=400&height=400&seq=1&orientation=squarish"
                    alt="Playlist Cover"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Summer Vibes 2025
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Artists</p>
                      <p className="text-xl font-semibold">24</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Tracks</p>
                      <p className="text-xl font-semibold">48</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-xl font-semibold">3h 12m</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                      Pop
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Electronic
                    </span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      R&B
                    </span>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Hip-Hop
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Filter and Sort Options */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
                  24 Upcoming Performances Found
                </h3>
                <button
                  onClick={toggleFilters}
                  className="!rounded-button whitespace-nowrap cursor-pointer flex items-center text-gray-700 hover:text-gray-900"
                >
                  <i className="fas fa-sliders-h mr-2"></i>
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <label
                      htmlFor="date-filter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date Range
                    </label>
                    <div className="relative">
                      <select
                        id="date-filter"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 rounded-lg"
                      >
                        <option value="all">All Dates</option>
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                        <option value="next-3-months">Next 3 Months</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="location-filter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location
                    </label>
                    <div className="relative">
                      <select
                        id="location-filter"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 rounded-lg"
                      >
                        <option value="all">All Locations</option>
                        <option value="nearby">Within 50 miles</option>
                        <option value="local">Local City</option>
                        <option value="national">National</option>
                        <option value="international">International</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="price-filter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price Range
                    </label>
                    <div className="relative">
                      <select
                        id="price-filter"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 rounded-lg"
                      >
                        <option value="all">All Prices</option>
                        <option value="free">Free</option>
                        <option value="under-50">Under $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-plus">$100+</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="sort-option"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sort By
                    </label>
                    <div className="relative">
                      <select
                        id="sort-option"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 rounded-lg"
                      >
                        <option value="date-nearest">
                          Date (Nearest First)
                        </option>
                        <option value="date-furthest">
                          Date (Furthest First)
                        </option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                        <option value="artist-az">Artist Name (A-Z)</option>
                        <option value="artist-za">Artist Name (Z-A)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Artist Performance Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Artist Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20a%20female%20pop%20singer%20performing%20on%20stage%20with%20dramatic%20lighting.%20The%20image%20captures%20her%20mid-performance%20with%20a%20microphone%2C%20showing%20energy%20and%20charisma.%20The%20background%20features%20concert%20lighting%20with%20a%20dark%20stage%20setting%20that%20emphasizes%20the%20performer&width=600&height=400&seq=2&orientation=landscape"
                    alt="Taylor Swift"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Taylor Swift
                  </h3>
                  <p className="text-gray-500 mb-3">Pop, Country</p>
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex items-start mb-2">
                      <i className="fas fa-map-marker-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">Madison Square Garden</p>
                        <p className="text-gray-600 text-sm">New York, NY</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <i className="far fa-calendar-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">April 18, 2025</p>
                        <p className="text-gray-600 text-sm">8:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-ticket-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">$89 - $350</p>
                        <p className="text-green-600 text-sm">
                          Tickets Available
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
              {/* Artist Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=A professional portrait of a male R&B artist performing on stage with dramatic lighting. The image captures him mid-performance with a microphone, showing energy and charisma. The background features concert lighting with a dark stage setting that emphasizes the performer&width=600&height=400&seq=3&orientation=landscape"
                    alt="The Weeknd"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    The Weeknd
                  </h3>
                  <p className="text-gray-500 mb-3">R&B, Pop</p>
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex items-start mb-2">
                      <i className="fas fa-map-marker-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">SoFi Stadium</p>
                        <p className="text-gray-600 text-sm">Los Angeles, CA</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <i className="far fa-calendar-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">April 25, 2025</p>
                        <p className="text-gray-600 text-sm">7:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-ticket-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">$75 - $295</p>
                        <p className="text-green-600 text-sm">
                          Tickets Available
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
              {/* Artist Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20a%20female%20pop%20singer%20with%20long%20hair%20performing%20on%20stage%20with%20dramatic%20lighting.%20The%20image%20captures%20her%20mid-performance%20with%20a%20microphone%2C%20showing%20energy%20and%20charisma.%20The%20background%20features%20concert%20lighting%20with%20a%20dark%20stage%20setting%20that%20emphasizes%20the%20performer&width=600&height=400&seq=4&orientation=landscape"
                    alt="Ariana Grande"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Ariana Grande
                  </h3>
                  <p className="text-gray-500 mb-3">Pop, R&B</p>
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex items-start mb-2">
                      <i className="fas fa-map-marker-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">United Center</p>
                        <p className="text-gray-600 text-sm">Chicago, IL</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <i className="far fa-calendar-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">May 2, 2025</p>
                        <p className="text-gray-600 text-sm">8:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-ticket-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">$95 - $320</p>
                        <p className="text-yellow-600 text-sm">
                          Limited Availability
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
              {/* Artist Card 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20a%20male%20hip-hop%20artist%20performing%20on%20stage%20with%20dramatic%20lighting.%20The%20image%20captures%20him%20mid-performance%20with%20a%20microphone%2C%20showing%20energy%20and%20charisma.%20The%20background%20features%20concert%20lighting%20with%20a%20dark%20stage%20setting%20that%20emphasizes%20the%20performer&width=600&height=400&seq=5&orientation=landscape"
                    alt="Kendrick Lamar"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Kendrick Lamar
                  </h3>
                  <p className="text-gray-500 mb-3">Hip-Hop, Rap</p>
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex items-start mb-2">
                      <i className="fas fa-map-marker-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">Barclays Center</p>
                        <p className="text-gray-600 text-sm">Brooklyn, NY</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <i className="far fa-calendar-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">May 10, 2025</p>
                        <p className="text-gray-600 text-sm">7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-ticket-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">$85 - $275</p>
                        <p className="text-green-600 text-sm">
                          Tickets Available
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
              {/* Artist Card 5 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20a%20female%20indie%20rock%20band%20performing%20on%20stage%20with%20dramatic%20lighting.%20The%20image%20captures%20them%20mid-performance%20with%20instruments%2C%20showing%20energy%20and%20charisma.%20The%20background%20features%20concert%20lighting%20with%20a%20dark%20stage%20setting%20that%20emphasizes%20the%20performers&width=600&height=400&seq=6&orientation=landscape"
                    alt="Billie Eilish"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Billie Eilish
                  </h3>
                  <p className="text-gray-500 mb-3">Pop, Alternative</p>
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex items-start mb-2">
                      <i className="fas fa-map-marker-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">Climate Pledge Arena</p>
                        <p className="text-gray-600 text-sm">Seattle, WA</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <i className="far fa-calendar-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">May 15, 2025</p>
                        <p className="text-gray-600 text-sm">8:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-ticket-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">$79 - $250</p>
                        <p className="text-green-600 text-sm">
                          Tickets Available
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
              {/* Artist Card 6 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20an%20electronic%20music%20DJ%20performing%20on%20stage%20with%20dramatic%20lighting%20and%20equipment.%20The%20image%20captures%20them%20mid-performance%20with%20DJ%20equipment%2C%20showing%20energy%20and%20charisma.%20The%20background%20features%20concert%20lighting%20with%20a%20dark%20stage%20setting%20that%20emphasizes%20the%20performer&width=600&height=400&seq=7&orientation=landscape"
                    alt="Dua Lipa"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Dua Lipa
                  </h3>
                  <p className="text-gray-500 mb-3">Pop, Dance</p>
                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <div className="flex items-start mb-2">
                      <i className="fas fa-map-marker-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">The O2</p>
                        <p className="text-gray-600 text-sm">London, UK</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-2">
                      <i className="far fa-calendar-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">May 22, 2025</p>
                        <p className="text-gray-600 text-sm">7:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-ticket-alt text-pink-600 mt-1 mr-2"></i>
                      <div>
                        <p className="font-medium">£65 - £195</p>
                        <p className="text-red-600 text-sm">Almost Sold Out</p>
                      </div>
                    </div>
                  </div>
                  <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
            {/* Load More Button */}
            <div className="mt-8 text-center">
              <button className="!rounded-button whitespace-nowrap cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors">
                Load More Results
              </button>
            </div>
          </div>
        )}
        {/* Empty State */}
        {!hasResults && !isLoading && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-pink-100">
              <i className="fas fa-music text-4xl text-pink-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Concerts Found Yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Paste an Apple Music playlist link above to discover upcoming
              concerts from your favorite artists.
            </p>
            <div className="max-w-md mx-auto">
              <h3 className="font-medium text-gray-900 mb-2">
                Try these popular playlists:
              </h3>
              <div className="flex flex-col gap-2">
                <button className="!rounded-button whitespace-nowrap cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <i className="fab fa-apple text-gray-500 mr-2"></i>
                    Today's Hits
                  </span>
                  <i className="fas fa-external-link-alt text-gray-500"></i>
                </button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <i className="fab fa-apple text-gray-500 mr-2"></i>
                    A-List Pop
                  </span>
                  <i className="fas fa-external-link-alt text-gray-500"></i>
                </button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <i className="fab fa-apple text-gray-500 mr-2"></i>
                    New Music Daily
                  </span>
                  <i className="fas fa-external-link-alt text-gray-500"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Concert Finder</h3>
              <p className="text-gray-400 mb-4">
                Discover live performances from artists in your Apple Music
                playlists.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Popular Venues
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Upcoming Festivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Artist Directory
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-envelope text-pink-500 mt-1 mr-2"></i>
                  <span className="text-gray-400">
                    support@concertfinder.com
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone text-pink-500 mt-1 mr-2"></i>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-pink-500 mt-1 mr-2"></i>
                  <span className="text-gray-400">
                    123 Music Ave, San Francisco, CA 94107
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Concert Finder. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
