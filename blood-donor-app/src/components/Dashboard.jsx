import { useState, useEffect } from "react";
import { UsersIcon, HeartIcon } from "@heroicons/react/24/outline";

function Dashboard({ onLogout }) {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [sortByAvailability, setSortByAvailability] = useState(false);
  const [error, setError] = useState(null);

  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryName, setQueryName] = useState("");
  const [queryContact, setQueryContact] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

        const mappedDonors = data.map((user) => {
          const index = user.id % bloodGroups.length;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.address.city,
            bloodGroup: bloodGroups[index],
            availability: Math.random() > 0.5,
            requested: false,
          };
        });
        setDonors(mappedDonors);
      } catch (err) {
        setError("Failed to load donors.Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm">
          <p className="text-red-600 font-semibold mb-4">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredDonors = donors.filter((donor) => {
    const bloodMatch =
      selectedBloodGroup === "" || donor.bloodGroup === selectedBloodGroup;

    const cityMatch = donor.city
      .toLowerCase()
      .includes(searchCity.toLowerCase());

    return bloodMatch && cityMatch;
  });

  const availableCount = filteredDonors.filter(
    (donor) => donor.availability === true,
  ).length;

  function handleRequest(id) {
    setDonors(
      donors.map((donor) => {
        if (donor.id === id) {
          return { ...donor, requested: !donor.requested };
        } else {
          return donor;
        }
      }),
    );
  }

  const sortedDonors = sortByAvailability
    ? [...filteredDonors].sort((a, b) => b.availability - a.availability)
    : filteredDonors;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-[320px] rounded-b-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=80"
          alt="Blood Donation"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-10 text-white">
          <h1 className="text-4xl font-bold">LifeSaver Network</h1>

          <p className="mt-3 max-w-xl text-gray-200">
            Connecting blood donors with those in need. Search, filter and
            request instantly.
          </p>

          <div className="absolute top-6 right-8 flex gap-3">
            <button
              onClick={() => setShowQueryModal(true)}
              className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition"
            >
              Raise Query
            </button>

            <button
              onClick={onLogout}
              className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6 -mt-6">
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            type="text"
            placeholder="Search by city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />

          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
          <button
            onClick={() => setSortByAvailability(!sortByAvailability)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition border ${
              sortByAvailability
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {sortByAvailability
              ? "✔ Available First"
              : "⇅ Sort by Availability"}
          </button>
        </div>

        <p className="text-gray-500 text-sm">
          Browse available donors and send requests instantly.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-md text-center">
            <UsersIcon className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-gray-500 text-sm">Total Donors</p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {sortedDonors.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md text-center">
            <HeartIcon className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-gray-500 text-sm">Available Donors</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {availableCount}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedDonors.length === 0 ? (
            <h3 className="text-center col-span-2">
              No donors found for the selected filters. Try changing blood group
              or clearing search.
            </h3>
          ) : (
            sortedDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 p-6 flex flex-col justify-between aspect-square"
              >
                <p className="font-semibold text-lg">{donor.name}</p>

                <p className="text-sm text-gray-600">{donor.email}</p>

                <p className="text-sm mt-2">City: {donor.city}</p>

                <p className="text-sm">Blood Group: {donor.bloodGroup}</p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    donor.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {donor.availability ? "Available" : "Unavailable"}
                </span>

                <button
                  onClick={() => handleRequest(donor.id)}
                  disabled={!donor.availability}
                  className={`w-full py-2 rounded-md transition ${
                    !donor.availability
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : donor.requested
                        ? "bg-gray-500 text-white hover:bg-gray-600"
                        : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {!donor.availability
                    ? "Unavailable"
                    : donor.requested
                      ? "Withdraw Request"
                      : "Request Help"}
                </button>

                {donor.requested && (
                  <p className="text-green-600 text-sm">
                    Request sent successfully.
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {showQueryModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowQueryModal(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-700">
              Raise a Query
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            <input
              type="text"
              placeholder="Contact Details"
              value={queryContact}
              onChange={(e) => setQueryContact(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            <textarea
              placeholder="Your Query"
              value={queryMessage}
              onChange={(e) => setQueryMessage(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowQueryModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowQueryModal(false);
                  setQueryName("");
                  setQueryContact("");
                  setQueryMessage("");

                  setShowToast(true);

                  setTimeout(() => {
                    setShowToast(false);
                  }, 3000);
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn z-50">
          Query submitted successfully.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
