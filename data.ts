export type Pitch = { name: string; usage: number; pa: number; ba: string; xba: string; whiff: string; k: string }
export type LineupBatter = { name: string; hand: string; pa: number; avg: string; kRate: string; whiff: string; chase: string; bb: string }
export type TrendPoint = { label: string; value: number }
export type Prop = {
  id: string
  player: string
  team: string
  opponent: string
  game: string
  gameTime: string
  market: string
  type: 'K' | 'Outs' | 'ER' | 'Hits' | 'HRR'
  side: 'Over' | 'Under'
  line: number
  odds: number
  projection: number
  confidence: number
  edge: number
  diamondScore: number
  grade: string
  tag: string
  hand: 'RHP' | 'LHP'
  headshot: string
  recent: TrendPoint[]
  arsenal: Pitch[]
  lineup: LineupBatter[]
  summary: string
  risks: string[]
  books: { book: string; odds: number }[]
}

const baseLineup: LineupBatter[] = [
  { name: 'Y. Díaz', hand: 'RHB', pa: 281, avg: '.286', kRate: '14.8%', whiff: '18.2%', chase: '24.4%', bb: '8.1%' },
  { name: 'J. Caminero', hand: 'RHB', pa: 302, avg: '.273', kRate: '22.6%', whiff: '27.5%', chase: '33.1%', bb: '7.4%' },
  { name: 'J. Aranda', hand: 'LHB', pa: 238, avg: '.301', kRate: '19.5%', whiff: '22.1%', chase: '28.7%', bb: '10.2%' },
  { name: 'B. Lowe', hand: 'LHB', pa: 221, avg: '.247', kRate: '27.8%', whiff: '31.2%', chase: '30.5%', bb: '9.8%' },
  { name: 'C. Simpson', hand: 'LHB', pa: 112, avg: '.265', kRate: '18.7%', whiff: '20.4%', chase: '25.1%', bb: '6.3%' },
  { name: 'N. Fortes', hand: 'RHB', pa: 168, avg: '.218', kRate: '24.9%', whiff: '29.0%', chase: '36.8%', bb: '5.9%' },
]

const arsenalA: Pitch[] = [
  { name: 'Four Seamer', usage: 31.2, pa: 94, ba: '.236', xba: '.251', whiff: '27.8%', k: '24.1%' },
  { name: 'Sinker', usage: 22.6, pa: 71, ba: '.291', xba: '.304', whiff: '13.8%', k: '11.7%' },
  { name: 'Slider', usage: 19.4, pa: 64, ba: '.188', xba: '.214', whiff: '36.6%', k: '34.5%' },
  { name: 'Curveball', usage: 15.7, pa: 46, ba: '.205', xba: '.238', whiff: '29.1%', k: '27.0%' },
  { name: 'Changeup', usage: 11.1, pa: 39, ba: '.257', xba: '.266', whiff: '24.4%', k: '18.8%' },
]

const arsenalB: Pitch[] = [
  { name: 'Cutter', usage: 28.7, pa: 87, ba: '.217', xba: '.229', whiff: '25.7%', k: '22.8%' },
  { name: 'Sweeper', usage: 24.3, pa: 76, ba: '.174', xba: '.203', whiff: '38.4%', k: '36.0%' },
  { name: 'Four Seamer', usage: 19.2, pa: 61, ba: '.268', xba: '.281', whiff: '21.5%', k: '19.4%' },
  { name: 'Sinker', usage: 16.5, pa: 52, ba: '.310', xba: '.333', whiff: '12.0%', k: '10.3%' },
  { name: 'Changeup', usage: 11.3, pa: 35, ba: '.242', xba: '.259', whiff: '27.6%', k: '23.1%' },
]

function trend(values: number[]): TrendPoint[] {
  const dates = ['5/19', '5/25', '5/30', '6/02', '6/06', '6/10', '6/14', '6/17', '6/21', '6/24']
  return values.map((value, index) => ({ label: dates[index] ?? `G${index + 1}`, value }))
}

export const props: Prop[] = [
  { id:'skenes-k-75', player:'Paul Skenes', team:'PIT', opponent:'CHC', game:'Pirates @ Cubs', gameTime:'7:10 PM ET', market:'Pitcher Strikeouts', type:'K', side:'Over', line:7.5, odds:-115, projection:8.8, confidence:94, edge:17.4, diamondScore:96, grade:'A+', tag:'Diamond Play', hand:'RHP', headshot:'PS', recent:trend([8,9,7,10,11,6,9,8,10,7]), arsenal:arsenalB, lineup:baseLineup, summary:'Skenes grades as an elite strikeout look because his sweeper and cutter profile match up strongly against a lineup with multiple elevated whiff bats.', risks:['Pitch count if game gets out of hand','Cubs can stack contact lefties','Line is already priced aggressively'], books:[{book:'DK',odds:-115},{book:'FD',odds:-108},{book:'MGM',odds:-112},{book:'HR',odds:-110}] },
  { id:'lugo-k-45', player:'Seth Lugo', team:'KC', opponent:'TB', game:'Royals @ Rays', gameTime:'12:10 PM ET', market:'Pitcher Strikeouts', type:'K', side:'Over', line:4.5, odds:-115, projection:5.3, confidence:72, edge:10.8, diamondScore:81, grade:'B+', tag:'Edge', hand:'RHP', headshot:'SL', recent:trend([3,6,5,4,5,2,6,4,2,0]), arsenal:arsenalA, lineup:baseLineup, summary:'Lugo has a playable edge when his breaking ball command is working. Tampa Bay owns swing-and-miss pockets in the lower half of the order.', risks:['Lower recent strikeout ceiling','Early contact can reduce pitch count','Rays can run a patient approach'], books:[{book:'DK',odds:-115},{book:'FD',odds:-105},{book:'MGM',odds:+100},{book:'HR',odds:-107}] },
  { id:'skubal-k-65', player:'Tarik Skubal', team:'DET', opponent:'HOU', game:'Astros @ Tigers', gameTime:'6:40 PM ET', market:'Pitcher Strikeouts', type:'K', side:'Over', line:6.5, odds:-122, projection:7.4, confidence:88, edge:14.9, diamondScore:91, grade:'A', tag:'Model Edge', hand:'LHP', headshot:'TS', recent:trend([7,8,6,9,7,10,8,6,9,7]), arsenal:arsenalB, lineup:baseLineup, summary:'Skubal combines whiff rate and leash better than almost anyone on the slate. The model likes the strikeout floor even against a tougher opponent.', risks:['Astros contact profile','High price on the over','Damage can shorten outing'], books:[{book:'DK',odds:-122},{book:'FD',odds:-118},{book:'MGM',odds:-125},{book:'HR',odds:-120}] },
  { id:'crochet-k-75', player:'Garrett Crochet', team:'BOS', opponent:'NYY', game:'Yankees @ Red Sox', gameTime:'7:10 PM ET', market:'Pitcher Strikeouts', type:'K', side:'Over', line:7.5, odds:+104, projection:8.2, confidence:84, edge:12.7, diamondScore:89, grade:'A-', tag:'Plus Money', hand:'LHP', headshot:'GC', recent:trend([9,6,8,10,7,11,6,8,9,7]), arsenal:arsenalB, lineup:baseLineup, summary:'Crochet brings premium whiff stuff with a plus-money tag. The Yankees have power risk but also enough chase to create a ceiling outcome.', risks:['Right handed power bats','Home run damage','Pitch efficiency'], books:[{book:'DK',odds:+104},{book:'FD',odds:+100},{book:'MGM',odds:-102},{book:'HR',odds:+105}] },
  { id:'wheeler-outs-185', player:'Zack Wheeler', team:'PHI', opponent:'WSH', game:'Phillies @ Nationals', gameTime:'6:45 PM ET', market:'Pitching Outs', type:'Outs', side:'Over', line:18.5, odds:-110, projection:19.6, confidence:86, edge:13.5, diamondScore:88, grade:'A-', tag:'Leash', hand:'RHP', headshot:'ZW', recent:trend([19,21,18,20,19,22,18,21,20,19]), arsenal:arsenalA, lineup:baseLineup, summary:'Wheeler profiles as one of the strongest outs plays because of workload stability and opponent contact quality.', risks:['Pitch count spike','Bad defensive inning','Late bullpen decision'], books:[{book:'DK',odds:-110},{book:'FD',odds:-115},{book:'MGM',odds:-108},{book:'HR',odds:-112}] },
  { id:'kirby-outs-175', player:'George Kirby', team:'SEA', opponent:'PIT', game:'Mariners @ Pirates', gameTime:'12:35 PM ET', market:'Pitching Outs', type:'Outs', side:'Over', line:17.5, odds:-118, projection:18.8, confidence:80, edge:11.6, diamondScore:84, grade:'B+', tag:'Control', hand:'RHP', headshot:'GK', recent:trend([18,17,19,20,16,18,21,17,18,19]), arsenal:arsenalA, lineup:baseLineup, summary:'Kirby gets deep through command. Low walk rate helps his outs floor when batted-ball damage stays contained.', risks:['Low strikeout cushion','Pirates can extend innings','BABIP volatility'], books:[{book:'DK',odds:-118},{book:'FD',odds:-120},{book:'MGM',odds:-112},{book:'HR',odds:-115}] },
]

export function getProp(id: string): Prop | undefined { return props.find((prop) => prop.id === id) }
export const slateStats = { games: 12, props: 486, diamondPlays: 31, synced: '97.8%' }
