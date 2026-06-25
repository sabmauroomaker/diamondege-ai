import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { StatPill } from '@/components/StatPill'
import { ArsenalTable } from '@/components/ArsenalTable'
import { TeamSplits } from '@/components/TeamSplits'
import { LineupTable } from '@/components/LineupTable'
import { TrendChart } from '@/components/TrendChart'
import { getProp, props } from '@/lib/data'
import { ArrowLeft, BadgeCheck, Brain, Flame, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'

export function generateStaticParams(){return props.map(p=>({id:p.id}))}

function BookRow({books}:{books:{book:string;odds:string;best?:boolean}[]}){return <div className="glass rounded-3xl p-5"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Best Available Books</h2><span className="text-xs font-bold text-white/35">line shop</span></div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{books.map(b=><div key={b.book} className={`rounded-2xl border p-3 text-center ${b.best?'border-emerald-300/35 bg-emerald-300/10':'border-white/10 bg-black/20'}`}><div className="text-[11px] font-bold text-white/40">{b.book}</div><div className="mt-1 text-lg font-black">{b.odds}</div>{b.best&&<div className="mt-1 text-[10px] font-black text-emerald-300">BEST</div>}</div>)}</div></div>}

export default function PropDetail({params}:{params:{id:string}}){
 const prop=getProp(params.id); if(!prop) return notFound();
 return <main className="min-h-screen"><Header/><section className="mx-auto max-w-7xl px-4 py-6">
  <Link href="/" className="pill inline-flex"><ArrowLeft size={14}/> Back to board</Link>

  <div className="mt-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_18%_20%,rgba(32,227,162,.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,.28),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.025))] p-6 shadow-2xl">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-4"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-white/10 bg-black/35 text-2xl font-black shadow-[0_0_40px_rgba(139,92,246,.25)]">{prop.headshot}</div><div><div className="text-sm font-bold text-white/45">{prop.game} • {prop.gameTime}</div><h1 className="text-4xl font-black tracking-[-.04em] sm:text-6xl">{prop.player}</h1><p className="mt-2 text-lg font-bold text-white/70">{prop.market} — <span className="text-white">{prop.line}</span> <span className="text-purple">{prop.odds}</span></p></div></div>
      <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[360px]">
        <div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-3"><div className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Diamond</div><div className="text-3xl font-black">{prop.diamondScore}</div></div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-3"><div className="text-[10px] font-black uppercase tracking-widest text-white/35">Conf</div><div className="text-3xl font-black">{prop.confidence}%</div></div>
        <div className="rounded-2xl border border-purple/25 bg-purple/10 p-3"><div className="text-[10px] font-black uppercase tracking-widest text-purple">Grade</div><div className="text-3xl font-black">{prop.grade}</div></div>
      </div>
    </div>
  </div>

  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5"><StatPill label="Projection" value={prop.projection} good/><StatPill label="Edge" value={`${prop.edge}%`} good/><StatPill label="Line" value={prop.line}/><StatPill label="Market" value={prop.type}/><StatPill label="Slate" value="All pitchers" good/></div>

  <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_.8fr]">
    <div className="glass rounded-3xl p-5"><div className="flex items-center gap-2"><Brain className="text-emerald-300"/><h2 className="text-2xl font-black">Diamond Intelligence</h2></div><p className="mt-3 text-lg leading-8 text-white/72">{prop.summary}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4"><div className="flex items-center gap-2 text-sm font-black text-emerald-200"><Flame size={16}/> Why it grades</div><ul className="mt-3 space-y-2 text-sm text-white/65">{prop.reasons.map(r=><li key={r}>✓ {r}</li>)}</ul></div><div className="rounded-2xl border border-red/20 bg-red/10 p-4"><div className="flex items-center gap-2 text-sm font-black text-red"><ShieldAlert size={16}/> Risks</div><ul className="mt-3 space-y-2 text-sm text-white/65">{prop.risks.map(r=><li key={r}>• {r}</li>)}</ul></div></div><div className="mt-4 space-y-3">{prop.writeup.map((w,i)=><p key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/65">{w}</p>)}</div></div>
    <div className="glass rounded-3xl p-5"><div className="flex items-center gap-2"><BadgeCheck className="text-purple"/><h2 className="text-2xl font-black">Pitcher Profile</h2></div><div className="mt-4 grid grid-cols-2 gap-3">{prop.statline.map(s=><StatPill key={s.label} label={s.label} value={s.value} good={s.good}/>)}</div></div>
  </div>

  <div className="mt-6 grid gap-4 lg:grid-cols-2"><TrendChart recent={prop.recent} line={prop.recentLine}/><TeamSplits title={prop.teamSplits.title} items={prop.teamSplits.items}/></div>
  <div className="mt-6"><BookRow books={prop.books}/></div>
  <div className="mt-6 grid gap-4"><ArsenalTable pitches={prop.arsenal}/><LineupTable lineup={prop.lineup}/></div>
  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[.035] p-5 text-center text-sm text-white/45"><Sparkles size={16} className="mx-auto mb-2 text-emerald-300"/>Module 2 is now built for every pitcher prop on the slate. Click any pitcher from the board and this terminal loads from the same data structure.</div>
 </section></main>
}
