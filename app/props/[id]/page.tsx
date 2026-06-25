import Link from 'next/link'
import { ArrowLeft, BadgeDollarSign, Brain, Gauge, ShieldCheck } from 'lucide-react'
import { props } from '@/lib/data'

export function generateStaticParams() { return props.map((prop) => ({ id: prop.id })) }

export default function PropPage({ params }: { params: { id: string } }) {
  const prop = props.find((p) => p.id === params.id) ?? props[0]
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-bold text-white/70 hover:text-white"><ArrowLeft className="h-4 w-4"/> Back to dashboard</Link>
        <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] shadow-[0_40px_120px_rgba(0,0,0,.45)]">
          <div className="bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,.28),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,.24),transparent_35%)] p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div><div className="text-xs font-black uppercase tracking-[.25em] text-emerald-200">{prop.sport} Research Terminal</div><h1 className="mt-3 text-5xl font-black tracking-[-.05em]">{prop.player}</h1><p className="mt-2 text-white/55">{prop.team} @ {prop.opponent} · {prop.time}</p><div className="mt-5 text-2xl font-black">{prop.market} · {prop.line}</div></div>
              <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[380px]"><Metric label="Score" value={prop.diamondScore}/><Metric label="Conf" value={`${prop.confidence}%`}/><Metric label="Edge" value={prop.edge}/></div>
            </div>
          </div>
          <div className="grid gap-5 p-6 lg:grid-cols-[1fr_.45fr]">
            <div className="space-y-5">
              <Card title="Diamond Intelligence" icon={<Brain className="h-4 w-4"/>}><p className="text-sm leading-7 text-white/60">{prop.player} grades as a {prop.grade} play with a {prop.diamondScore} Diamond Score. The model projection sits at {prop.projection} against the market line of {prop.line} creating a measured edge of {prop.edge}. This page is built to scale across every pitcher and market on the slate.</p></Card>
              <Card title="Projection Snapshot" icon={<Gauge className="h-4 w-4"/>}><div className="grid gap-3 sm:grid-cols-4"><Metric label="Line" value={prop.line}/><Metric label="Projection" value={prop.projection}/><Metric label="Odds" value={prop.odds}/><Metric label="Grade" value={prop.grade}/></div></Card>
              <Card title="Risk Factors" icon={<ShieldCheck className="h-4 w-4"/>}><div className="grid gap-3 sm:grid-cols-3">{['Lineup volatility','Pitch count leash','Market movement'].map((x)=><div key={x} className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm font-bold text-white/60">{x}</div>)}</div></Card>
            </div>
            <Card title="Best Books" icon={<BadgeDollarSign className="h-4 w-4"/>}>{prop.books.map((b)=><div key={b} className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="font-black">{b}</span><span className="font-black text-emerald-200">{prop.odds}</span></div>)}</Card>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string | number }) { return <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><div className="text-[10px] font-black uppercase tracking-[.2em] text-white/35">{label}</div><div className="mt-1 text-2xl font-black">{value}</div></div> }
function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) { return <div className="rounded-3xl border border-white/10 bg-white/[.035] p-5"><div className="mb-4 flex items-center gap-2 font-black">{icon}{title}</div>{children}</div> }
