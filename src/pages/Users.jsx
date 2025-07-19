import { useState, useEffect } from "react";
import authApiClient from "../services/auth_apiClient";
import { FaSyncAlt, FaSearch, FaUserCircle } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get("/auth/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async () => {
    if (!searchId.trim()) return;
    setSearchLoading(true);
    try {
      const res = await authApiClient.get(`/auth/users/${searchId}/`);
      setUsers([res.data]);
    } catch (err) {
      console.error("Search user error:", err);
      alert("User not found.");
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow p-4">
        <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          <FaUserCircle /> User Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by User ID"
            className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            onClick={fetchUserById}
            disabled={searchLoading}
            className="bg-blue-600 text-white px-3 py-2 rounded shadow text-sm flex items-center justify-center gap-1 hover:bg-blue-700 transition w-full sm:w-auto"
          >
            {searchLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaSearch />
            )}
            Search
          </button>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="bg-gray-600 text-white px-3 py-2 rounded shadow text-sm flex items-center justify-center gap-1 hover:bg-gray-700 transition w-full sm:w-auto"
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaSyncAlt />
            )}
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Address</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 text-center">
                      <td className="border p-2">{u.id}</td>
                      <td className="border p-2">{u.email}</td>
                      <td className="border p-2">
                        {u.first_name} {u.last_name}
                      </td>
                      <td className="border p-2">{u.phone_num}</td>
                      <td className="border p-2">{u.address}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
