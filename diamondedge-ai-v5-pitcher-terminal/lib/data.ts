import { Prop, Pitch, Batter } from './types'

const names = ['Y. Díaz','B. Witt Jr.','J. Caminero','K. Tucker','A. Judge','J. Soto','P. Goldschmidt','B. Harper','P. Alonso']
const hands = ['RHB','RHB','RHB','LHB','RHB','LHB','RHB','LHB','RHB']
function lineup(team:string, weakness:string): Batter[] {
  return names.map((n,i)=>({ order:i+1, name:n, hand:hands[i], pa:180+i*22, ba:[.286,.294,.272,.281,.303,.267,.244,.258,.248][i], k:[14.2,16.9,24.7,19.8,26.1,18.4,22.5,21.1,25.7][i], weakness, whiff:18+i*1.7, chase:20+i*1.9, bb:5+i*.8 }))
}
function arsenal(seed:number): Pitch[] {
  const f = seed % 5
  return [
    {name:'Four Seamer',usage:34+f*2,pa:80+seed,ba:.210+f*.018,xba:.225+f*.015,xwoba:.285+f*.022,whiff:24+f*2.1,k:25+f*2.3,hard:33+f*1.5},
    {name:'Sinker',usage:18+f,pa:55+seed,ba:.245+f*.022,xba:.255+f*.021,xwoba:.315+f*.018,whiff:11+f*1.5,k:12+f*1.8,hard:38+f*1.4},
    {name:'Slider',usage:22-f,pa:62+seed,ba:.180+f*.014,xba:.205+f*.012,xwoba:.250+f*.018,whiff:31+f*2.4,k:33+f*2.5,hard:29+f*1.2},
    {name:'Curveball',usage:13+f,pa:38+seed,ba:.190+f*.012,xba:.215+f*.014,xwoba:.270+f*.02,whiff:28+f*2,k:30+f*1.8,hard:31+f*1.2},
    {name:'Changeup',usage:9+f,pa:35+seed,ba:.220+f*.018,xba:.240+f*.015,xwoba:.295+f*.02,whiff:22+f*2.2,k:20+f*2,hard:34+f*1.5}
  ]
}
function stats(k:string, era:string, whip:string, csw:string){return [
 {label:'K%',value:k,avg:'22.2%',good:parseFloat(k)>22.2},{label:'BB%',value:'7.1%',avg:'8.4%',good:true},{label:'CSW%',value:csw,good:parseFloat(csw)>28},{label:'Whiff%',value:'27.8%',good:true},{label:'ERA',value:era,good:parseFloat(era)<4},{label:'WHIP',value:whip,good:parseFloat(whip)<1.25},{label:'HardHit%',value:'36.4%',avg:'37.1%',good:true},{label:'xBA',value:'.231',avg:'.243',good:true}
]}
function splits(title:string,k='24.6%'){return {title,items:[{label:'K%',value:k,good:parseFloat(k)>23},{label:'SwStr%',value:'11.8%',good:true},{label:'Contact%',value:'75.2%',good:true},{label:'wRC+',value:'91',good:true},{label:'ISO',value:'.137',good:true},{label:'O-Swing%',value:'32.4%',good:true}]}}
function books(base:string){return [{book:'DK',odds:base,best:true},{book:'FD',odds:'-118'},{book:'MGM',odds:'-120'},{book:'ESPN',odds:'-115'},{book:'Hard Rock',odds:'+100'}]}

const pitcherRows = [
 ['lugo-k-45','Seth Lugo','KC','TB','Royals @ Rays','12:10 PM','Pitcher Strikeouts','Over 4.5','-115','Over',74,17.8,88,'5.6 Ks','Favorable','A-','SL',[3,6,5,4,5,6,4,2,7,5],'Tampa Bay vs RHP','Curveball/slider chase'],
 ['woo-k-55','Bryan Woo','SEA','PIT','Mariners @ Pirates','12:35 PM','Pitcher Strikeouts','Over 5.5','+100','Over',76,18.1,90,'6.8 Ks','Favorable','A','BW',[7,6,8,5,7,4,9,6,7,5],'Pittsburgh vs RHP','High fastball whiff'],
 ['webb-outs-185','Logan Webb','SF','ATH','Athletics @ Giants','3:45 PM','Pitching Outs','Over 18.5','-105','Over',69,12.7,82,'19.4 outs','Favorable','B+','LW',[18,21,18,20,19,17,21,18,20,19],'Athletics vs RHP','Groundball sinker'],
 ['brown-k-65','Hunter Brown','HOU','DET','Astros @ Tigers','6:40 PM','Pitcher Strikeouts','Over 6.5','+108','Over',72,15.9,86,'7.3 Ks','Favorable','A-','HB',[7,8,5,9,6,7,8,4,7,6],'Detroit vs RHP','Slider chase'],
 ['skubal-k-75','Tarik Skubal','DET','HOU','Astros @ Tigers','6:40 PM','Pitcher Strikeouts','Over 7.5','-102','Over',78,19.4,94,'8.7 Ks','Favorable','A+','TS',[8,9,7,10,6,8,9,8,11,7],'Houston vs LHP','Changeup whiff'],
 ['sanchez-outs-175','Cristopher Sánchez','PHI','WSH','Phillies @ Nationals','6:45 PM','Pitching Outs','Over 17.5','-125','Over',70,13.8,84,'18.6 outs','Favorable','B+','CS',[18,19,17,20,18,18,21,16,19,18],'Washington vs LHP','Weak contact'],
 ['degrom-k-75','Jacob deGrom','TEX','TOR','Rangers @ Blue Jays','7:10 PM','Pitcher Strikeouts','Over 7.5','+112','Over',75,17.1,91,'8.5 Ks','Favorable','A','JD',[8,6,9,10,7,8,7,11,9,6],'Toronto vs RHP','Velocity miss'],
 ['senga-k-55','Kodai Senga','NYM','CHC','Cubs @ Mets','7:10 PM','Pitcher Strikeouts','Over 5.5','-110','Over',66,10.2,78,'6.2 Ks','Neutral','B','KS',[4,6,7,5,8,3,6,7,5,6],'Chicago Cubs vs RHP','Ghost fork'],
 ['cole-k-65','Gerrit Cole','NYY','BOS','Yankees @ Red Sox','7:10 PM','Pitcher Strikeouts','Over 6.5','-120','Over',71,14.8,85,'7.4 Ks','Favorable','A-','GC',[6,7,8,5,9,7,6,8,7,6],'Boston vs RHP','Riding fastball'],
 ['gallen-outs-175','Zac Gallen','ARI','STL','Diamondbacks @ Cardinals','7:45 PM','Pitching Outs','Under 17.5','-112','Under',65,9.7,76,'16.9 outs','Neutral','B','ZG',[17,15,18,16,17,14,18,16,15,17],'St. Louis vs RHP','Contact innings'],
 ['abbott-er-25','Andrew Abbott','CIN','MIL','Brewers @ Reds','7:10 PM','Earned Runs','Under 2.5','-105','Under',68,11.6,81,'2.1 ER','Favorable','B+','AA',[2,1,3,2,0,2,4,1,2,2],'Milwaukee vs LHP','Weak ISO'],
 ['glasnow-k-75','Tyler Glasnow','LAD','MIN','Dodgers @ Twins','7:40 PM','Pitcher Strikeouts','Over 7.5','+105','Over',77,18.9,93,'8.8 Ks','Favorable','A+','TG',[9,8,10,7,11,6,9,8,10,7],'Minnesota vs RHP','High whiff lineup']
] as const

export const props: Prop[] = pitcherRows.map((r,idx)=>({
 id:r[0],player:r[1],team:r[2],opponent:r[3],game:r[4],gameTime:r[5],market:r[6],line:r[7],odds:r[8],side:r[9],confidence:r[10],edge:r[11],diamondScore:r[12],projection:r[13],tag:r[14],grade:r[15],type:r[6].includes('Outs')?'Outs':r[6].includes('Earned')?'ER':'K',headshot:r[16],recent:r[17] as number[],recentLine:Number((r[7] as string).match(/[0-9.]+/)?.[0]||5.5),
 summary:`${r[1]} grades as a ${r[15]} DiamondEdge play because the projected line sits above the book number and the opponent profile shows a clear weakness against ${r[20].toLowerCase()}.`,
 risk:`The main risk is efficiency working against the prop path or early contact cutting off the strikeout ceiling. This still needs normal pitch count and no blow up inning.`,
 statline:stats(`${24+idx%6}.${idx%9}%`,`${2.6+(idx%5)*.32}`.slice(0,4),`${1.02+(idx%6)*.05}`.slice(0,4),`${28+(idx%5)*1.1}%`),
 arsenal:arsenal(idx+8),teamSplits:splits(r[18],`${22+(idx%7)*1.1}%`),lineup:lineup(r[18],r[20]),books:books(r[8]),
 reasons:[`Opponent weakness vs ${r[20]}`,`Projected workload supports ${r[13]}`,`Best available price gives ${r[11]}% edge`,`Recent form is above market baseline`],
 risks:['Early-count contact can reduce strikeout chances','Manager leash can shift if pitch count spikes','Confirmed lineup can change the matchup grade'],
 writeup:[`The clean path is not just raw talent. The model is weighing arsenal fit, opponent swing profile and workload together which is why ${r[1]} gets a ${r[12]} Diamond Score.`,`Compared to the market number, the projection creates enough cushion to rate this as a playable edge instead of a coin flip.`,`This page is built as a full slate demo: every pitcher prop listed on the board has its own clickable research terminal, not just Seth Lugo.`]
}))
export function getProp(id:string){ return props.find(p=>p.id===id) }
export const markets = ['All','K','Outs','ER','Walks','Hits']
