export function StatPill({ label, value, muted }: { label: string; value: string | number; muted?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
      <div className="text-[10px] font-black uppercase tracking-[.22em] text-white/35">{label}</div>
      <div className={muted ? 'mt-2 text-2xl font-black text-white/65' : 'mt-2 text-3xl font-black text-white'}>{value}</div>
    </div>
  )
}
