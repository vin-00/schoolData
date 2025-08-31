"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // 6 schools per page
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const fetchSchools = async () => {
    const res = await axios.get("http://localhost:5000/api/schools", {
      params: { page, limit, search },
    });
    setSchools(res.data.schools);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchSchools();
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Schools</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => {
            setPage(1); // reset to first page on new search
            setSearch(e.target.value);
          }}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

      {/* School Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {schools.map((school) => (
          <div key={school.id} className="border rounded-lg shadow-md overflow-hidden">
            {school.image && (
              <img
                src={`http://localhost:5000${school.image}`}
                alt={school.name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold">{school.name}</h2>
              <p className="text-sm text-gray-600">{school.address}</p>
              <p className="text-sm text-gray-500">{school.city}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
          }`}
        >
          Prev
        </button>

        <span className="px-4 py-2 border rounded">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded ${
            page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
