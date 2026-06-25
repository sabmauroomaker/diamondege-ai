export type Pitch = { name:string; usage:number; pa:number; ba:number; xba:number; xwoba:number; whiff:number; k:number; hard:number }
export type Batter = { order:number; name:string; hand:string; pa:number; ba:number; k:number; weakness:string; whiff?:number; chase?:number; bb?:number }
export type BookOdd = { book:string; odds:string; best?:boolean }
export type Prop = {
  id:string; player:string; team:string; opponent:string; game:string; gameTime:string; market:string; line:string; odds:string; side:string;
  confidence:number; edge:number; diamondScore:number; projection:string; tag:'Favorable'|'Neutral'|'Risky'; grade:string; type:'K'|'Outs'|'ER'|'Walks'|'Hits';
  headshot:string; summary:string; risk:string; recent:number[]; recentLine:number; statline:{label:string;value:string;avg?:string;good?:boolean}[];
  arsenal:Pitch[]; teamSplits:{title:string; items:{label:string; value:string; good?:boolean}[]}; lineup:Batter[]; writeup:string[]; reasons:string[]; risks:string[]; books:BookOdd[]
}
