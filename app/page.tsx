'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  ChevronDown,
  CircleHelp,
  Copy,
  Flame,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c90cfd38-57ab-4160-a37b-7da3a3c7749b-CQlfBZgNXTjRfQcEZpC5C2TsVPhSop.png'

type Coin = {
  name: string
  ticker: string
  price: string
  change: string
  volume: string
  holders: string
  gradient: string
  mark: string
  featured?: boolean
}

const coins: Coin[] = [
  { name: 'Charizard Base Set', ticker: '$ZARD', price: '$2.14', change: '+42.8%', volume: '$428.6K', holders: '2,841', gradient: 'from-orange-400 via-red-500 to-rose-700', mark: '🔥', featured: true },
  { name: 'Pikachu Illustrator', ticker: '$PIKA', price: '$0.86', change: '+18.4%', volume: '$196.2K', holders: '1,209', gradient: 'from-yellow-300 via-amber-400 to-orange-500', mark: '⚡' },
  { name: 'Umbreon VMAX', ticker: '$MOON', price: '$0.51', change: '+12.7%', volume: '$94.8K', holders: '816', gradient: 'from-indigo-500 via-purple-700 to-slate-950', mark: '☾' },
  { name: 'Blastoise Holo', ticker: '$SHELL', price: '$0.32', change: '-3.6%', volume: '$61.3K', holders: '584', gradient: 'from-cyan-400 via-blue-600 to-indigo-800', mark: '◒' },
  { name: 'Gengar Alt Art', ticker: '$GHOST', price: '$0.24', change: '+8.9%', volume: '$45.7K', holders: '439', gradient: 'from-fuchsia-500 via-purple-700 to-violet-950', mark: '✦' },
  { name: 'Mewtwo GX', ticker: '$MEWT', price: '$0.18', change: '+5.2%', volume: '$31.4K', holders: '294', gradient: 'from-violet-300 via-indigo-500 to-blue-800', mark: '✧' },
]

function CoinArtwork({ coin, small = false }: { coin: Coin; small?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${coin.gradient} ${small ? 'h-10 w-10' : 'h-14 w-14'} flex items-center justify-center shadow-inner`}>
      <div className="absolute -right-3 -top-4 h-12 w-12 rounded-full bg-white/20 blur-xl" />
      <span className={`${small ? 'text-xl' : 'text-3xl'} relative font-black text-white drop-shadow-sm`}>{coin.mark}</span>
      {!small && <span className="absolute bottom-1 left-1.5 rounded bg-white/20 px-1 text-[8px] font-bold uppercase tracking-wider text-white">TCG</span>}
    </div>
  )
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('Trending')
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')

  const filteredCoins = useMemo(() => coins.filter((coin) => `${coin.name} ${coin.ticker}`.toLowerCase().includes(search.toLowerCase())), [search])
  const showToast = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-[#111827]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-8">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Poketrade home">
              <img src={logoUrl} alt="Poketrade pixel art logo" className="h-12 w-12 object-contain" />
              <div className="hidden leading-none sm:block"><span className="block text-[19px] font-black tracking-[-0.05em] text-[#172033]">poke<span className="text-[#2779df]">trade</span></span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">collect • trade • claim</span></div>
            </a>
            <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex"><a className="text-[#182238]" href="#market">Marketplace</a><a href="#how">How it works</a><a href="#launch">Launch a card</a></nav>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-full p-2.5 text-slate-500 hover:bg-slate-100" aria-label="Search"><Search size={18} /></button>
            <button onClick={() => showToast('Wallet connection is coming soon')} className="hidden items-center gap-2 rounded-xl bg-[#1e293b] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#111827] sm:flex"><Wallet size={16} /> Connect wallet</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2.5 text-slate-600 md:hidden" aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-slate-100 bg-white px-5 py-3"><div className="mx-auto flex max-w-[1240px] items-center gap-3 rounded-xl bg-slate-50 px-3 py-2"><Search size={16} className="text-slate-400" /><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cards or tickers..." className="w-full bg-transparent text-sm outline-none" /></div></div>}
        {menuOpen && <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-semibold text-slate-600"><a href="#market" onClick={() => setMenuOpen(false)}>Marketplace</a><a href="#how" onClick={() => setMenuOpen(false)}>How it works</a><a href="#launch" onClick={() => setMenuOpen(false)}>Launch a card</a></div></nav>}
      </header>

      <section id="top" className="mx-auto max-w-[1240px] px-5 pb-12 pt-12 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2779df]"><span className="h-1.5 w-1.5 rounded-full bg-[#2779df]" /> The trading card market, evolved</div><h1 className="max-w-[670px] text-5xl font-black leading-[0.98] tracking-[-0.065em] text-[#121b2f] sm:text-6xl lg:text-[76px]">Your cards.<br /><span className="text-[#2779df]">Their market.</span></h1><p className="mt-6 max-w-[510px] text-base leading-7 text-slate-500 sm:text-lg">Trade the value of real Pokémon cards as memecoins. Every coin is backed by a physical card you can claim, collect, and take home.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#market" className="rounded-xl bg-[#2779df] px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(39,121,223,.22)] transition hover:bg-[#1768ce]">Explore the market <ArrowDown size={16} className="ml-2 inline" /></a><a href="#how" className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-300">How it works</a></div><div className="mt-9 flex items-center gap-5 text-xs text-slate-500"><div className="flex -space-x-2"><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f7f8fc] bg-yellow-300 text-xs">⚡</span><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f7f8fc] bg-blue-300 text-xs">💧</span><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f7f8fc] bg-purple-300 text-xs">✦</span></div><span><strong className="text-slate-800">12,400+</strong> collectors trading today</span></div></div>
          <div className="relative mx-auto w-full max-w-[440px]"><div className="absolute -inset-5 rounded-[40px] bg-blue-100/50 blur-3xl" /><div className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(30,64,175,.12)]"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><p className="text-xs font-semibold text-slate-400">MARKET OVERVIEW</p><p className="mt-1 text-sm font-bold text-slate-800">Cards coin</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">LIVE</span></div><div className="flex items-end justify-between py-6"><div><p className="text-4xl font-black tracking-tight text-[#172033]">$2,048,221</p><p className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-500"><ArrowUp size={14} /> 124.6% <span className="font-normal text-slate-400">this week</span></p></div><div className="flex h-16 items-end gap-1.5">{[24,31,25,43,38,48,44,52,61,55,68,64,76,80,92].map((h, i) => <span key={i} className="w-2 rounded-t bg-gradient-to-t from-blue-200 to-[#2779df]" style={{ height: `${h}%` }} />)}</div></div><div className="space-y-1 rounded-2xl bg-[#f7f9fd] p-2">{coins.slice(0, 3).map((coin, i) => <div key={coin.ticker} className="flex items-center justify-between rounded-xl px-2 py-2.5"><div className="flex items-center gap-2.5"><CoinArtwork coin={coin} small /><div><p className="text-xs font-bold text-slate-800">{coin.name}</p><p className="text-[10px] text-slate-400">{coin.ticker}</p></div></div><div className="text-right"><p className="text-xs font-bold text-slate-800">{coin.price}</p><p className="text-[10px] font-bold text-emerald-500">{coin.change}</p></div></div>)}</div></div></div>
        </div>
      </section>

      <section id="market" className="border-y border-slate-200/80 bg-white"><div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2779df]"><Flame size={14} /> Live market</div><h2 className="text-3xl font-black tracking-[-0.04em] text-[#172033] sm:text-4xl">Find your next grail</h2></div><button onClick={() => showToast('All market pairs loaded')} className="text-sm font-bold text-[#2779df] hover:underline">View all pairs <span aria-hidden>→</span></button></div><div className="mt-8 flex gap-1 overflow-x-auto border-b border-slate-100">{['Trending', 'Newly launched', 'Top gainers', 'Claimable'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${activeTab === tab ? 'border-[#2779df] text-[#2779df]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>{tab}</button>)}</div><div className="mt-4 overflow-hidden rounded-2xl border border-slate-200"><div className="hidden grid-cols-[2fr_1fr_1fr_1fr_32px] gap-4 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:grid"><span>Card / coin</span><span>Price</span><span>24h change</span><span>Volume</span><span /></div>{filteredCoins.map((coin, i) => <div key={coin.ticker} className="grid items-center gap-3 border-t border-slate-100 px-4 py-3.5 transition hover:bg-blue-50/40 sm:grid-cols-[2fr_1fr_1fr_1fr_32px] sm:gap-4 sm:px-5"><div className="flex items-center gap-3"><CoinArtwork coin={coin} /><div><div className="flex items-center gap-2"><p className="text-sm font-bold text-slate-800">{coin.name}</p>{coin.featured && <span className="hidden rounded-full bg-yellow-100 px-1.5 py-0.5 text-[9px] font-bold text-yellow-700 sm:inline">HOT</span>}</div><p className="mt-0.5 text-xs text-slate-400">{coin.ticker} <span className="mx-1 text-slate-300">•</span> {coin.holders} holders</p></div></div><div><p className="text-sm font-bold text-slate-800">{coin.price}</p><p className="text-[10px] text-slate-400">per coin</p></div><p className={`text-sm font-bold ${coin.change.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>{coin.change}</p><p className="text-sm font-semibold text-slate-600">{coin.volume}</p><button onClick={() => showToast(`${coin.name} selected`)} className="hidden rounded-lg p-2 text-slate-400 hover:bg-white hover:text-[#2779df] sm:block" aria-label={`Open ${coin.name}`}><ChevronDown size={16} /></button></div>)}</div></div></section>

      <section id="how" className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2779df]"><Sparkles size={14} /> Built for collectors</div><h2 className="max-w-md text-3xl font-black leading-tight tracking-[-0.04em] text-[#172033] sm:text-4xl">From binder to blockchain, without losing the fun.</h2><p className="mt-4 max-w-md text-sm leading-6 text-slate-500">A simple way to discover, trade, and own a piece of the cards you love. Real cards stay at the center of every market.</p></div><div className="grid gap-3 sm:grid-cols-3">{[{icon: TrendingUp, n: '01', title: 'Trade the market', text: 'Buy and sell coins tied to real card value.'}, {icon: ShieldCheck, n: '02', title: 'Backed by cards', text: 'Every launched coin is verified and held securely.'}, {icon: Wallet, n: '03', title: 'Claim your card', text: 'Redeem your coins and get the card shipped to you.'}].map(({ icon: Icon, n, title, text }) => <div key={n} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2779df]"><Icon size={17} /></span><span className="text-xs font-bold text-slate-300">{n}</span></div><h3 className="mt-6 text-sm font-bold text-slate-800">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{text}</p></div>)}</div></div></section>

      <section id="launch" className="bg-[#18243b]"><div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center lg:px-8"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Have a grail?</p><h2 className="text-3xl font-black tracking-[-0.04em] text-white">Turn your card into a market.</h2><p className="mt-2 text-sm text-slate-400">Launch a coin, find your community, and let collectors decide the value.</p></div><button onClick={() => showToast('Launch flow coming soon')} className="shrink-0 rounded-xl bg-[#ffd21f] px-5 py-3.5 text-sm font-black text-[#172033] transition hover:bg-yellow-300">Launch a card <ArrowUp size={16} className="ml-2 inline rotate-45" /></button></div></section>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 font-bold text-slate-600"><img src={logoUrl} alt="" className="h-7 w-7 object-contain" /> poketrade</div><div className="flex flex-wrap items-center gap-5"><a href="#how" className="hover:text-slate-700">About</a><a href="#how" className="hover:text-slate-700">Security</a><a href="#how" className="hover:text-slate-700">Terms</a><a href="#how" className="flex items-center gap-1 hover:text-slate-700"><CircleHelp size={13} /> Help center</a></div><p>© 2025 Poketrade, Inc.</p></footer>
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#18243b] px-4 py-3 text-sm font-semibold text-white shadow-xl">{toast}</div>}
    </main>
  )
}
