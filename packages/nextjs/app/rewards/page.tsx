export default function RewardsPage() {
  const rewards = [
    { label: "Unclaimed REP", value: "240.12 REP" },
    { label: "Lifetime REP", value: "8,432.55 REP" },
    { label: "Current APY", value: "12.6%" },
  ];
  return (
    <div className="px-6 py-8 mx-auto max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Rewards</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map(r => (
          <div key={r.label} className="rounded-xl border border-base-300 bg-base-100 p-5">
            <div className="text-sm text-base-content/70">{r.label}</div>
            <div className="text-xl font-semibold mt-1">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
