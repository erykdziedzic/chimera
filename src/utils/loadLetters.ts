import letterA from '../img/letters/A.png'
import letterB from '../img/letters/B.png'
import letterC from '../img/letters/C.png'
import letterD from '../img/letters/D.png'
import letterE from '../img/letters/E.png'
import letterF from '../img/letters/F.png'
import letterG from '../img/letters/G.png'
import letterH from '../img/letters/H.png'
import letterI from '../img/letters/I.png'
import letterK from '../img/letters/K.png'
import letterL from '../img/letters/L.png'
import letterM from '../img/letters/M.png'
import letterN from '../img/letters/N.png'
import letterO from '../img/letters/O.png'
import letterP from '../img/letters/P.png'
import letterQ from '../img/letters/Q.png'
import letterR from '../img/letters/R.png'
import letterS from '../img/letters/S.png'
import letterT from '../img/letters/T.png'
import letterU from '../img/letters/U.png'
import letterW from '../img/letters/W.png'
import letterY from '../img/letters/Y.png'
import letterComma from '../img/letters/comma.png'
import letterDot from '../img/letters/dot.png'
import { loadScaled } from './loadImage'

export type Letters = {
  a: HTMLImageElement
  b: HTMLImageElement
  c: HTMLImageElement
  d: HTMLImageElement
  e: HTMLImageElement
  f: HTMLImageElement
  g: HTMLImageElement
  h: HTMLImageElement
  i: HTMLImageElement
  k: HTMLImageElement
  l: HTMLImageElement
  m: HTMLImageElement
  n: HTMLImageElement
  o: HTMLImageElement
  p: HTMLImageElement
  q: HTMLImageElement
  r: HTMLImageElement
  s: HTMLImageElement
  t: HTMLImageElement
  u: HTMLImageElement
  w: HTMLImageElement
  y: HTMLImageElement
  comma: HTMLImageElement
  dot: HTMLImageElement
}

export default async function loadLetters(): Promise<Letters> {
  const a = await loadScaled(letterA)
  const b = await loadScaled(letterB)
  const c = await loadScaled(letterC)
  const d = await loadScaled(letterD)
  const e = await loadScaled(letterE)
  const f = await loadScaled(letterF)
  const g = await loadScaled(letterG)
  const h = await loadScaled(letterH)
  const i = await loadScaled(letterI)
  const k = await loadScaled(letterK)
  const l = await loadScaled(letterL)
  const m = await loadScaled(letterM)
  const n = await loadScaled(letterN)
  const o = await loadScaled(letterO)
  const p = await loadScaled(letterP)
  const q = await loadScaled(letterQ)
  const r = await loadScaled(letterR)
  const s = await loadScaled(letterS)
  const t = await loadScaled(letterT)
  const u = await loadScaled(letterU)
  const w = await loadScaled(letterW)
  const y = await loadScaled(letterY)
  const comma = await loadScaled(letterComma)
  const dot = await loadScaled(letterDot)

  return {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    w,
    y,
    comma,
    dot,
  }
}
