import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

const PAGE_SIZE = 5;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/contact/?page=${pageNumber}`);
      setContacts(res.data.results);
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        User Contact Messages
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-500 mt-2 text-sm">Loading messages...</p>
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500 text-sm">
                  No messages found
                </td>
              </tr>
            ) : (
              contacts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50 transition duration-200 ease-in-out"
                >
                  <td className="p-4 text-gray-800 font-medium">{item.email}</td>
                  <td className="p-4 text-gray-700">{item.phone_number}</td>
                  <td className="p-4 text-gray-700">{item.write_something}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <button
          disabled={!prevPage}
          onClick={() => setPage(page - 1)}
          className={`px-5 py-2 rounded-lg shadow-md text-sm font-medium transition-colors ${
            prevPage
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          ⬅ Previous
        </button>

        <button
          disabled={!nextPage}
          onClick={() => setPage(page + 1)}
          className={`px-5 py-2 rounded-lg shadow-md text-sm font-medium transition-colors ${
            nextPage
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default ContactList;
