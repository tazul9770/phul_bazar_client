// component/dashboard/Card.jsx

const TONES = {
  muted: "text-gray-500",
  up: "text-emerald-600",
  down: "text-red-500",
  action: "text-rose-700 font-medium",
};

export default function Card({
  icon: Icon,
  title,
  value,
  subtitle,
  tone = "muted",
  loading = false,
}) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:p-5">
      {/* Icon + title */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-700 ring-1 ring-rose-100">
          {Icon && <Icon className="h-5 w-5" />}
        </span>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>

      {/* Value + subtitle */}
      {loading ? (
        <div className="mt-4 space-y-2" aria-hidden="true">
          <div className="h-8 w-24 animate-pulse rounded-md bg-rose-100" />
          <div className="h-3.5 w-20 animate-pulse rounded bg-rose-50" />
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-3xl font-semibold tabular-nums tracking-tight text-gray-900">
            {value ?? "—"}
          </p>
          {subtitle && (
            <p className={`mt-1 text-sm ${TONES[tone] ?? TONES.muted}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
