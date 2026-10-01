import { useState, useEffect } from "react";
import authApiClient from "../services/auth_apiClient";
import { FiRefreshCw, FiSearch, FiUser, FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    setIsSearchResult(false);
    try {
      const res = await authApiClient.get(`/auth/users/?page=${pageNumber}`);
      setUsers(res.data.results ?? res.data); // fallback if pagination isn't on yet
      setNextPage(res.data.next ?? null);
      setPrevPage(res.data.previous ?? null);
      setTotalCount(res.data.count ?? (Array.isArray(res.data) ? res.data.length : 0));
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
      setIsSearchResult(true);
      setNextPage(null);
      setPrevPage(null);
      setTotalCount(1);
    } catch (err) {
      console.error("Search user error:", err);
      alert("User not found.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchId("");
    setPage(1);
    fetchUsers(1);
  };

  useEffect(() => {
    fetchUsers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex flex-col items-center gap-1 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-xl text-pink-500">
            <FiUsers />
          </span>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">User Management</h1>
          <p className="text-sm text-gray-400">
            {totalCount} registered user{totalCount === 1 ? "" : "s"}
          </p>
        </div>

        {/* Search & actions */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchUserById()}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <button
            onClick={fetchUserById}
            disabled={searchLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-600/20 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-pink-300"
          >
            {searchLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <FiSearch size={15} />
            )}
            Search
          </button>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {isSearchResult && (
          <p className="mb-4 text-xs font-medium text-pink-500">
            Showing search result — hit Refresh to see all users again.
          </p>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-500" />
          </div>
        ) : (
          <div className="overflow-hidden overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Email", "Name", "Phone", "Address"].map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id} className="transition hover:bg-pink-50/40">
                      <td className="px-4 py-3 font-medium text-gray-900">{u.id}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <span className="flex items-center gap-2">
                          <FiUser className="text-gray-300" size={14} />
                          {u.first_name} {u.last_name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{u.phone_num || "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{u.address || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination — only meaningful for the full list, not a single search result */}
        {!isSearchResult && !loading && (nextPage || prevPage) && (
          <div className="mt-6 flex items-center justify-between">
            <button
              disabled={!prevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                prevPage
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            >
              <FiChevronLeft size={16} />
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page <span className="font-semibold text-gray-700">{page}</span> · Total{" "}
              <span className="font-semibold text-gray-700">{totalCount}</span>
            </span>

            <button
              disabled={!nextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                nextPage
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            >
              Next
              <FiChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
