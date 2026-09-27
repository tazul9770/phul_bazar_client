import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";

// "Sunday, 27 April 2025" format (locale-er upor nirbhor na kore nijei banano)
const formatDate = (d) => {
  const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
  const month = d.toLocaleDateString("en-GB", { month: "long" });
  return `${weekday}, ${d.getDate()} ${month} ${d.getFullYear()}`;
};

// Browser-er internet connection sotti-i online kina track kore
const useOnlineStatus = () => {
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
};

const WelcomeBanner = () => {
  const { user } = useAuthContext();
  const online = useOnlineStatus();
  const [now, setNow] = useState(() => new Date());

  // Raat 12-ta par hole date jate nijei bodle jay
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const name = user?.first_name || (user?.is_staff ? "Admin" : "there");

  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      {/* Greeting */}
      <div className="min-w-0">
        <h1 className="flex flex-wrap items-center gap-x-2 break-words text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[28px] sm:leading-9">
          <span>Welcome Back, {name}!</span>
          <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Date + status */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 sm:pt-2">
        <span className="flex items-center gap-2">
          <FiCalendar className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <time dateTime={now.toISOString()}>{formatDate(now)}</time>
        </span>

        <span className="flex items-center gap-1.5" role="status" aria-live="polite">
          <span
            className={`h-2 w-2 rounded-full ${
              online ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          <span className={online ? "text-slate-600" : "text-slate-400"}>
            {online ? "Online" : "Offline"}
          </span>
        </span>
      </div>
    </section>
  );
};

export default WelcomeBanner;
