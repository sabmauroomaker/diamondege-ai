import Link from 'next/link'
import type { Prop } from '@/lib/data'

export function PropCard({ prop, compact = false }: { prop: Prop; compact?: boolean }) {
  return (
    <Link href={`/props/${prop.id}`} className="group block rounded-3xl border border-white/10 bg-[#0b0b0d]/85 p-5 shadow-[0_20px_80px_rgba(0,0,0,.35)] transition hover:-translate-y-1 hover:border-emerald-300/35 hover:shadow-[0_0_40px_rgba(16,185,129,.12)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-violet-500/20 text-sm font-black text-emerald-200 ring-1 ring-white/10">{prop.player.split(' ').map(p=>p[0]).slice(0,2).join('')}</div>
          <div>
            <div className="font-black text-white">{prop.player}</div>
            <div className="text-xs font-semibold text-white/45">{prop.team} @ {prop.opponent} · {prop.time}</div>
          </div>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">{prop.grade}</div>
      </div>
      <div className="mt-5 rounded-2xl border border-white/8 bg-white/[.03] p-4">
        <div className="text-[10px] font-black uppercase tracking-[.2em] text-white/35">{prop.market}</div>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div className="text-xl font-black text-white">{prop.line}</div>
          <div className="text-sm font-black text-emerald-200">{prop.odds}</div>
        </div>
      </div>
      {!compact && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Mini label="Proj" value={prop.projection}/>
          <Mini label="Edge" value={prop.edge}/>
          <Mini label="Score" value={prop.diamondScore}/>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {prop.books.map((book) => <span key={book} className="rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-[10px] font-black text-white/55">{book}</span>)}
      </div>
    </Link>
  )
}

function Mini({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-white/8 bg-black/30 p-3"><div className="text-[9px] font-black uppercase tracking-[.2em] text-white/30">{label}</div><div className="mt-1 text-sm font-black text-white">{value}</div></div>
}
