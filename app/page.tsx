import { Activity, ArrowDownRight, ArrowUpRight, BadgeDollarSign, Gauge, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { filters, marketMovers, modules, props, sports } from '@/lib/data'
import { PropCard } from '@/components/PropCard'
import { StatPill } from '@/components/StatPill'

export default function Home() {
  const games = new Set(props.map((p) => `${p.team}-${p.opponent}`)).size
  const avgEdge = '+13.6%'
  const diamondPlays = props.filter((p) => p.diamondScore >= 90)
  const topProps = [...props].sort((a,b)=>b.diamondScore-a.diamondScore)

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(16,185,129,.22),transparent_33%),radial-gradient(circle_at_82%_8%,rgba(139,92,246,.18),transparent_30%),linear-gradient(180deg,transparent,rgba(0,0,0,.8))]" />

      <header className="relative z-10 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-violet-500 shadow-[0_0_30px_rgba(16,185,129,.18)]"><div className="h-3 w-3 rotate-45 bg-black" /></div>
            <div><div className="text-xl font-black tracking-tight">DiamondEdge</div><div className="text-[10px] font-black uppercase tracking-[.35em] text-emerald-300">Sports Intelligence</div></div>
          </div>
          <nav className="hidden gap-2 md:flex">
            {modules.map((m) => <button key={m} className="rounded-full border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-bold text-white/70 transition hover:border-emerald-300/25 hover:text-white">{m}</button>)}
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0d]/75 p-6 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[.25em] text-emerald-200">Live Terminal</span>
            {sports.map((s) => <span key={s} className={`rounded-full border px-3 py-1 text-xs font-black ${s==='MLB'?'border-emerald-300/25 bg-emerald-300/10 text-emerald-100':'border-white/10 bg-white/[.035] text-white/35'}`}>{s}</span>)}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-.06em] md:text-7xl">Sports Intelligence Terminal</h1>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-white/55">Real-time projections market movement lineup intelligence advanced matchup research and sportsbook pricing in one premium command center</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-[10px] font-black uppercase tracking-[.25em] text-white/35">Live Status</span><span className="flex items-center gap-2 text-xs font-black text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-300"/> Updated 7 sec ago</span></div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-white/55"><span>MLB {games} Games</span><span>{props.length * 81} Markets</span><span>{diamondPlays.length} Diamond Plays</span><span>Books DK FD ESPN HR</span></div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <StatPill label="Games" value={games}/>
            <StatPill label="Live Markets" value={props.length * 81}/>
            <StatPill label="Diamond Plays" value={diamondPlays.length}/>
            <StatPill label="Avg Edge" value={avgEdge}/>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-3xl border border-white/10 bg-black/35 px-5 py-4">
            <Search className="h-5 w-5 text-emerald-200" />
            <input className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/30" placeholder="Search players teams markets edges weather or steam moves" />
          </div>

          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
            {filters.map((f) => <button key={f} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-black text-white/55 transition hover:border-emerald-300/25 hover:text-emerald-100">{f}</button>)}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[#0b0b0d]/70 p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-black tracking-tight">Today's Diamond Plays</h2><span className="text-xs font-bold text-white/35">Click any card</span></div>
            <div className="grid gap-4 md:grid-cols-2">{topProps.slice(0,4).map((p) => <PropCard key={p.id} prop={p} />)}</div>
          </section>

          <aside className="space-y-6">
            <Panel title="Top Market Movers" icon={<Activity className="h-4 w-4"/>}>
              {marketMovers.map((m) => <div key={m.label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[.035] p-3"><span className="text-sm font-bold text-white/75">{m.label}</span><span className={m.direction==='up'?'flex items-center gap-1 text-sm font-black text-emerald-200':'flex items-center gap-1 text-sm font-black text-red-300'}>{m.direction==='up'?<ArrowUpRight className="h-4 w-4"/>:<ArrowDownRight className="h-4 w-4"/>}{m.move}</span></div>)}
            </Panel>
            <Panel title="Terminal Modules" icon={<Sparkles className="h-4 w-4"/>}>
              {['Highest Confidence','Steam Tracker','Lineup Monitor','Weather Impact','Best Books','Saved Watchlist'].map((x, i) => <div key={x} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.03] p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-300/10 text-emerald-200">{i%3===0?<Gauge className="h-4 w-4"/>:i%3===1?<BadgeDollarSign className="h-4 w-4"/>:<ShieldCheck className="h-4 w-4"/>}</span><span className="text-sm font-bold text-white/65">{x}</span></div>)}
            </Panel>
          </aside>
        </div>
      </section>
    </main>
  )
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0d]/70 p-5 backdrop-blur-xl"><div className="mb-4 flex items-center gap-2 text-lg font-black">{icon}{title}</div><div className="space-y-3">{children}</div></div>
}
