'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PropCard } from '@/components/PropCard'
import { StatPill } from '@/components/StatPill'
import { markets, props } from '@/lib/data'
import { Activity, ArrowUpRight, BadgeDollarSign, Brain, Flame, Gauge, Search, ShieldCheck, SlidersHorizontal, Sparkles, TrendingUp, Zap } from 'lucide-react'

const games = Array.from(new Set(props.map((p) => p.game))).length
const avgEdge = (props.reduce((sum, p) => sum + p.edge, 0) / props.length).toFixed(1)
const diamondPlays = props.filter((p) => p.confidence >= 68 || p.edge >= 14)
const topPlay = [...props].sort((a, b) => b.confidence + b.edge - (a.confidence + a.edge))[0]
const biggestEdges = [...props].sort((a, b) => b.edge - a.edge).slice(0, 4)
const mostConfident = [...props].sort((a, b) => b.confidence - a.confidence).slice(0, 4)

function MiniRow({ prop, label }: { prop: (typeof props)[number]; label?: string }) {
  return (
    <Link href={`/props/${prop.id}`} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-3 transition hover:border-emerald-300/40 hover:bg-white/[.07]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-purple/40 via-white/10 to-emerald-400/20 text-xs font-black shadow-[0_0_35px_rgba(139,92,246,.16)]">{prop.headshot}</div>
        <div className="min-w-0">
          <div className="truncate text-sm font-black">{prop.player}</div>
          <div className="truncate text-xs text-white/45">{prop.market} • {prop.line}</div>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-black text-emerald-300">{label ?? `${prop.edge}% edge`}</div>
        <div className="text-[11px] text-white/40">{prop.confidence}% conf</div>
      </div>
    </Link>
  )
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-2 text-sm font-bold transition ${active ? 'border-emerald-300/50 bg-emerald-300/15 text-white shadow-[0_0_30px_rgba(32,227,162,.15)]' : 'border-white/10 bg-white/[.04] text-white/60 hover:border-white/20 hover:text-white'}`}>
      {children}
    </button>
  )
}

export default function Home() {
  const [q, setQ] = useState('')
  const [m, setM] = useState('All')
  const filtered = useMemo(() => props.filter(p => (m === 'All' || p.type === m) && (p.player.toLowerCase().includes(q.toLowerCase()) || p.game.toLowerCase().includes(q.toLowerCase()) || p.market.toLowerCase().includes(q.toLowerCase()) || p.team.toLowerCase().includes(q.toLowerCase()) || p.opponent.toLowerCase().includes(q.toLowerCase()))), [q, m])

  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <section className="relative mx-auto max-w-7xl px-4 py-6 sm:py-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_15%_20%,rgba(32,227,162,.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,.28),transparent_33%),linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.025))] p-6 shadow-2xl sm:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[.2em] text-emerald-200">Live MLB</span>
              <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-white/55">Model v2 dashboard</span>
            </div>

            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.9] tracking-[-.06em] sm:text-7xl">
              Professional MLB Prop Intelligence
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
              DiamondEdge combines pitch arsenals, projected lineups, batter splits, sportsbook pricing, recent form, park factors and AI grading into one clean research terminal for finding the best MLB props on the slate
            </p>

            <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/12 bg-black/35 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
              <Search size={20} className="text-emerald-200/70" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search any player team game market or edge" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-white/35" />
              <div className="hidden rounded-xl bg-white/10 px-2 py-1 text-[10px] font-bold text-white/35 sm:block">⌘K</div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatPill label="Games" value={games} good />
              <StatPill label="Live Props" value={props.length * 47} />
              <StatPill label="Diamond Plays" value={diamondPlays.length} good />
              <StatPill label="Avg Edge" value={`${avgEdge}%`} good />
            </div>
          </div>

          <div className="glass rounded-[2rem] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-[.2em] text-white/35">Top graded</div>
                <h2 className="mt-1 text-2xl font-black">Diamond Play</h2>
              </div>
              <div className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-black text-gold">A+</div>
            </div>
            <Link href={`/props/${topPlay.id}`} className="mt-4 block rounded-3xl border border-emerald-300/20 bg-black/25 p-4 transition hover:border-emerald-300/50">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300/20 to-purple/30 text-sm font-black">{topPlay.headshot}</div>
                <div>
                  <h3 className="text-2xl font-black">{topPlay.player}</h3>
                  <p className="text-sm text-white/45">{topPlay.game}</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-white/[.06] p-3">
                <div className="text-xs text-white/35">{topPlay.market}</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-2xl font-black">{topPlay.line}</div>
                  <div className="text-lg font-black text-purple">{topPlay.odds}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-emerald-300/10 p-3"><div className="text-[10px] uppercase text-white/35">Score</div><b className="text-emerald-200">{Math.round(topPlay.confidence + topPlay.edge / 2)}</b></div>
                <div className="rounded-2xl bg-white/[.04] p-3"><div className="text-[10px] uppercase text-white/35">Edge</div><b>{topPlay.edge}%</b></div>
                <div className="rounded-2xl bg-white/[.04] p-3"><div className="text-[10px] uppercase text-white/35">Proj</div><b>{topPlay.projection}</b></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm font-black text-emerald-300">Open full report <ArrowUpRight size={18}/></div>
            </Link>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="glass rounded-3xl p-4"><div className="mb-3 flex items-center gap-2 font-black"><Flame className="text-red" size={18}/> Diamond Plays</div>{diamondPlays.slice(0,3).map(p => <MiniRow key={p.id} prop={p}/>)}</div>
          <div className="glass rounded-3xl p-4"><div className="mb-3 flex items-center gap-2 font-black"><TrendingUp className="text-emerald-300" size={18}/> Biggest Edges</div>{biggestEdges.slice(0,3).map(p => <MiniRow key={p.id} prop={p} label={`+${p.edge}%`}/>)}</div>
          <div className="glass rounded-3xl p-4"><div className="mb-3 flex items-center gap-2 font-black"><Brain className="text-purple" size={18}/> Model Confidence</div>{mostConfident.slice(0,3).map(p => <MiniRow key={p.id} prop={p} label={`${p.confidence}%`}/>)}</div>
          <div className="glass rounded-3xl p-4"><div className="mb-3 flex items-center gap-2 font-black"><Zap className="text-gold" size={18}/> Market Pulse</div><div className="grid gap-2 text-sm"><div className="rounded-2xl bg-white/[.035] p-3"><b className="text-gold">6 steam alerts</b><div className="text-white/40">Detected across strikeouts and total bases</div></div><div className="rounded-2xl bg-white/[.035] p-3"><b className="text-emerald-300">94% synced</b><div className="text-white/40">Odds board and model snapshots</div></div><div className="rounded-2xl bg-white/[.035] p-3"><b>5 books tracked</b><div className="text-white/40">FD DK ESPN Hard Rock Caesars</div></div></div></div>
        </div>

        <div id="props" className="relative mt-7 glass rounded-[2rem] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-white/35"><ShieldCheck size={15}/> Research board</div>
              <h2 className="mt-1 text-3xl font-black tracking-tight">Player Props</h2>
              <p className="mt-1 max-w-2xl text-sm text-white/50">Click any card to open the full player report with charts arsenal matchup lineup splits and AI reasoning</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 lg:w-96">
              <Search size={18} className="text-white/35" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search prop board" className="w-full bg-transparent text-sm outline-none placeholder:text-white/30" />
            </div>
          </div>

          <div className="hide-scroll mt-4 flex gap-2 overflow-x-auto pb-1">
            <div className="mt-2 flex items-center gap-2 pr-1 text-sm font-bold text-white/45"><SlidersHorizontal size={18}/> Filters</div>
            {markets.map(x => <FilterButton key={x} active={m === x} onClick={() => setM(x)}>{x}</FilterButton>)}
            <FilterButton><BadgeDollarSign size={15} className="inline"/> Odds</FilterButton>
            <FilterButton><Gauge size={15} className="inline"/> Grade</FilterButton>
            <FilterButton><Activity size={15} className="inline"/> Steam</FilterButton>
            <FilterButton><Sparkles size={15} className="inline"/> AI Edge</FilterButton>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-2" id="model">
          {filtered.map(p => <PropCard key={p.id} prop={p} />)}
        </div>

        <div className="relative mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.02] p-5">
          <div className="text-xs font-black uppercase tracking-[.2em] text-white/35">Next module</div>
          <h3 className="mt-1 text-2xl font-black">Elite player detail page upgrade</h3>
          <p className="mt-2 max-w-3xl text-white/55">Next we upgrade the prop pages with tabs for overview recent form pitch arsenal splits opponent breakdown weather line movement and Diamond Intelligence reports</p>
        </div>
      </section>
    </main>
  )
}
