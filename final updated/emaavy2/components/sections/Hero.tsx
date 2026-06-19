'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TRUST_BADGES } from '@/lib/constants';

// ─── Dashboard tabs (exact EMAAVY nav) ────────────────────────────────────────
const TABS = [
  { id: 0, label: 'Dashboard',          url: 'app.emaavy.ai/dashboard',      icon: '▦' },
  { id: 1, label: 'Phone Numbers',      url: 'app.emaavy.ai/phone-numbers',  icon: '✆' },
  { id: 2, label: 'AI Agents',          url: 'app.emaavy.ai/agents',         icon: '◎' },
  { id: 3, label: 'Campaigns',          url: 'app.emaavy.ai/campaigns',      icon: '◈' },
  { id: 4, label: 'Conversation Flows', url: 'app.emaavy.ai/flows',          icon: '⑂' },
  { id: 5, label: 'Integrations',       url: 'app.emaavy.ai/integrations',   icon: '⊕' },
  { id: 6, label: 'Settings',           url: 'app.emaavy.ai/settings',       icon: '⚙' },
];

// ─── Panel content ─────────────────────────────────────────────────────────────
function PanelDashboard() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-start justify-between border-b border-slate-100 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#18345d]">Dashboard</p>
          <p className="text-[10px] text-slate-400">Here's what's happening today.</p>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {['All Campaigns','All Agents','Last 7 Days'].map(f => (
            <span key={f} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[9.5px] text-slate-500">
              {f} ▾
            </span>
          ))}
          <span className="flex items-center gap-1 rounded-md bg-[#18345d] px-2 py-0.5 text-[9.5px] font-medium text-white">
            ▦ View All Calls
          </span>
        </div>
      </div>
      {/* metrics */}
      <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3">
        {[
          { icon: '✆', bg: '#EFF6FF', ic: '#1D4ED8', pct: '↑ 142%', val: '1,284', lbl: 'TOTAL CALLS (7D)' },
          { icon: '✓', bg: '#F0FDF4', ic: '#16A34A', pct: '↑ 8.3%', val: '68%',   lbl: 'SUCCESS RATE' },
          { icon: '◈', bg: '#FFF7ED', ic: '#EA580C', pct: '↑ 2',    val: '4',      lbl: 'ACTIVE CAMPAIGNS' },
          { icon: '◷', bg: '#F5F3FF', ic: '#7C3AED', pct: '↓ 12%',  val: '47',    lbl: 'PENDING FOLLOW-UPS' },
        ].map((m,i) => (
          <motion.div key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
            className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
            <div className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-md text-xs" style={{background:m.bg,color:m.ic}}>{m.icon}</div>
            <p className="text-[9px] font-medium text-emerald-600">{m.pct}</p>
            <p className="text-base font-bold text-[#18345d]">{m.val}</p>
            <p className="text-[8.5px] font-medium uppercase tracking-wide text-slate-400">{m.lbl}</p>
          </motion.div>
        ))}
      </div>
      {/* chart */}
      <div className="mx-3 mb-2 rounded-lg border border-slate-100 bg-white p-2.5">
        <p className="mb-1.5 text-[10px] font-semibold text-[#18345d]">Calls Over Time</p>
        <div className="relative h-12">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,42 C30,40 57,38 114,32 C171,26 200,22 228,14 C256,7 285,4 342,2 C370,2 390,18 400,42 Z" fill="url(#chartFill)"/>
            <path d="M0,42 C30,40 57,38 114,32 C171,26 200,22 228,14 C256,7 285,4 342,2 C370,2 390,18 400,42" fill="none" stroke="#22C55E" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="342" cy="2" r="3" fill="#22C55E"/>
          </svg>
          <div className="absolute bottom-0 flex w-full justify-between px-1">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>(
              <span key={d} className="text-[7.5px] text-slate-300">{d}</span>
            ))}
          </div>
        </div>
      </div>
      {/* recent calls */}
      <div className="mx-3 overflow-hidden rounded-lg border border-slate-100 bg-white">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
          <span className="text-[10px] font-semibold text-[#18345d]">Recent Call Records</span>
          <span className="text-[9.5px] text-[#4a658b]">View All</span>
        </div>
        {[
          { num:'+91 98XXX XXXXX', camp:'Q3 Sales Outreach',       st:'completed', stc:'#DCFCE7', stct:'#14532D', dur:'2m 41s' },
          { num:'+91 87XXX XXXXX', camp:'Product Demo Follow-up',  st:'no-answer', stc:'#FEE2E2', stct:'#7F1D1D', dur:'0s' },
          { num:'+91 99XXX XXXXX', camp:'Appointment Reminder',    st:'voicemail', stc:'#FEF3C7', stct:'#78350F', dur:'38s' },
        ].map((r,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-4}} animate={{opacity:1,x:0}} transition={{delay:0.2+i*0.08}}
            className="flex items-center gap-2 border-b border-slate-50 px-3 py-1.5 last:border-0">
            <span className="w-24 text-[9.5px] text-slate-600 truncate">{r.num}</span>
            <span className="flex-1 text-[9.5px] text-slate-500 truncate">{r.camp}</span>
            <span className="rounded-full px-2 py-0.5 text-[8.5px] font-medium" style={{background:r.stc,color:r.stct}}>{r.st}</span>
            <span className="w-8 text-right text-[9px] text-slate-400">{r.dur}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PanelPhoneNumbers() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b border-slate-100 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#18345d]">Phone Numbers</p>
          <p className="text-[10px] text-slate-400">Numbers provisioned in your account.</p>
        </div>
        <span className="flex items-center gap-1 rounded-md bg-[#18345d] px-2.5 py-1 text-[9.5px] font-medium text-white">+ Provision a Phone number</span>
      </div>
      <div className="p-3">
        <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <div>
              <p className="text-[10.5px] font-semibold text-[#18345d]">Active Numbers</p>
              <p className="text-[9px] text-slate-400">3 numbers in your account</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[9.5px] text-slate-400">🔍 Search numbers...</span>
          </div>
          <div className="flex bg-slate-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            <span className="flex-1">Number</span><span className="flex-1">Campaign</span><span className="w-5"></span>
          </div>
          {[
            { num:'+91 80XXX XXXXX', camp:'Q3 Sales Outreach' },
            { num:'+91 80XXX XXXXY', camp:'Appointment Reminder' },
            { num:'+91 80XXX XXXXZ', camp:'Unassigned', muted:true },
          ].map((r,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-4}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}
              className="flex items-center border-b border-slate-50 px-3 py-2 last:border-0">
              <span className="flex-1 text-[10.5px] font-medium text-[#18345d]">{r.num}</span>
              <span className={`flex-1 text-[10px] ${r.muted ? 'italic text-slate-400' : 'text-slate-600'}`}>{r.camp}</span>
              <span className="text-[11px] text-slate-300">↗</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelAgents() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b border-slate-100 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#18345d]">AI Agents</p>
          <p className="text-[10px] text-slate-400">Configure and manage your AI calling agents.</p>
        </div>
        <span className="flex items-center gap-1 rounded-md bg-[#18345d] px-2.5 py-1 text-[9.5px] font-medium text-white">+ Create Agent</span>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {[
          { init:'A', color:'#18345d', name:'Aria — Sales Agent',   meta:'Language: Hindi · ElevenLabs voice',           st:'active' },
          { init:'R', color:'#1D4ED8', name:'Ravi — Support Agent', meta:'Language: English · Sarvam AI voice',          st:'active' },
          { init:'M', color:'#7C3AED', name:'Meera — Booking Agent',meta:'Language: Hindi + English · Deepgram STT',     st:'active' },
        ].map((a,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}
            className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white" style={{background:a.color}}>{a.init}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-[#18345d] truncate">{a.name}</p>
              <p className="text-[9.5px] text-slate-400 truncate">{a.meta}</p>
            </div>
            <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[8.5px] font-semibold text-[#14532D]">{a.st}</span>
          </motion.div>
        ))}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
          className="rounded-lg border border-slate-100 bg-white p-2.5">
          <p className="mb-1.5 text-[10px] font-semibold text-[#18345d]">Opening Line — Aria</p>
          <p className="rounded-md bg-slate-50 px-2.5 py-2 font-mono text-[9.5px] leading-relaxed text-slate-600">
            Hello! I'm Aria calling from [Your Company]. I'm reaching out about our upcoming offer. Is this a good time to speak?
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function PanelCampaigns() {
  const rows = [
    { name:'Q3 Sales Outreach',      st:'active',   stc:'#DCFCE7', stct:'#14532D', flow:'Sales Qualification Flow', agent:'Aria',  prog:62, rate:'71.2%', ratec:'#16A34A' },
    { name:'Product Demo Follow-up', st:'active',   stc:'#DCFCE7', stct:'#14532D', flow:'Demo Follow-up Flow',      agent:'Ravi',  prog:44, rate:'58.4%', ratec:'#16A34A' },
    { name:'Appointment Reminder',   st:'paused',   stc:'#FEF3C7', stct:'#78350F', flow:'Appointment Booking Flow', agent:'Meera', prog:100,rate:'82.0%', ratec:'#18345d' },
    { name:'Re-engagement Drive',    st:'draft',    stc:'#F1F5F9', stct:'#64748B', flow:'Re-engagement Flow',       agent:'Aria',  prog:0,  rate:'—',     ratec:'#94A3B8' },
  ];
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b border-slate-100 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#18345d]">Campaigns</p>
          <p className="text-[10px] text-slate-400">Manage and track your automated calling campaigns.</p>
        </div>
        <div className="flex gap-1.5">
          <span className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[9.5px] font-medium text-[#18345d]">⑂ Manage Flows</span>
          <span className="flex items-center gap-1 rounded-md bg-[#18345d] px-2 py-1 text-[9.5px] font-medium text-white">+ Create Campaign</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-3">
        <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
          <div className="flex bg-slate-50 px-3 py-1.5 text-[8.5px] font-semibold uppercase tracking-wide text-slate-400 border-b border-slate-100">
            <span className="flex-1">Campaign Name</span>
            <span className="w-14">Status</span>
            <span className="w-28 hidden sm:block">Flow & Agent</span>
            <span className="w-16">Progress</span>
            <span className="w-12 text-right">Rate</span>
          </div>
          {rows.map((r,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-4}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}
              className="flex items-center border-b border-slate-50 px-3 py-2 last:border-0">
              <span className="flex-1 text-[10px] font-semibold text-[#18345d] truncate pr-2">{r.name}</span>
              <span className="w-14">
                <span className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold" style={{background:r.stc,color:r.stct}}>{r.st}</span>
              </span>
              <div className="w-28 hidden sm:block">
                <p className="text-[8.5px] text-slate-400 truncate">⑂ {r.flow}</p>
                <p className="text-[8.5px] text-slate-400">◎ {r.agent}</p>
              </div>
              <div className="w-16">
                <p className="text-[8.5px] text-slate-400 mb-0.5">{r.prog}%</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#22C55E]" style={{width:`${r.prog}%`}}/>
                </div>
              </div>
              <span className="w-12 text-right text-[10px] font-semibold" style={{color:r.ratec}}>{r.rate}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelFlows() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b border-slate-100 bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#18345d]">Conversation Flows</p>
          <p className="text-[10px] text-slate-400">Design and manage dialogue paths for your agents.</p>
        </div>
        <span className="flex items-center gap-1 rounded-md bg-[#18345d] px-2.5 py-1 text-[9.5px] font-medium text-white">+ Create Flow</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[
            { name:'Sales Qualification Flow', st:'Valid',   stc:'#DCFCE7',stct:'#14532D', dir:'Outbound', dirc:'#DBEAFE',dirct:'#1e3a5f', desc:'Qualify leads with AI conversation.', used:'1 campaign',  bc:'#EFF6FF', ic:'#1D4ED8' },
            { name:'Appointment Booking Flow', st:'Valid',   stc:'#DCFCE7',stct:'#14532D', dir:'Inbound',  dirc:'#EDE9FE',dirct:'#3730A3', desc:'Book, reschedule, or cancel appointments.', used:'1 campaign',  bc:'#EDE9FE', ic:'#7C3AED' },
            { name:'Re-engagement Flow',       st:'Draft',   stc:'#FEF3C7',stct:'#78350F', dir:'Outbound', dirc:'#DBEAFE',dirct:'#1e3a5f', desc:'Win back lapsed customers.', used:'0 campaigns', bc:'#FEF3C7', ic:'#D97706' },
          ].map((f,i)=>(
            <motion.div key={i} initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{delay:i*0.08}}
              className="rounded-lg border border-slate-100 bg-white p-2">
              <div className="mb-1.5 flex items-center gap-1.5">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px]" style={{background:f.bc,color:f.ic}}>⑂</div>
                <p className="text-[9.5px] font-semibold text-[#18345d] leading-tight">{f.name}</p>
              </div>
              <div className="mb-1 flex gap-1">
                <span className="rounded-full px-1.5 py-px text-[7.5px] font-semibold" style={{background:f.stc,color:f.stct}}>{f.st}</span>
                <span className="rounded-full px-1.5 py-px text-[7.5px] font-semibold" style={{background:f.dirc,color:f.dirct}}>{f.dir}</span>
              </div>
              <p className="text-[8.5px] text-slate-400 mb-1">{f.desc}</p>
              <p className="text-[8px] text-slate-300">{f.used}</p>
            </motion.div>
          ))}
        </div>
        {/* mini flow canvas */}
        <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
          <div className="flex items-center gap-1.5 border-b border-slate-100 bg-white px-2.5 py-1.5">
            <span className="text-[9.5px] font-semibold text-[#18345d]">Sales Qualification Flow</span>
            {['+ Step','✕ End','Templates','Arrange'].map(b=>(
              <span key={b} className="rounded border border-slate-200 px-1.5 py-0.5 text-[8px] text-slate-500">{b}</span>
            ))}
            <span className="ml-auto rounded bg-[#18345d] px-1.5 py-0.5 text-[8px] text-white">✦ AI Validate</span>
          </div>
          <div className="relative h-20 bg-slate-50/70 overflow-hidden">
            {/* nodes */}
            {[
              { x:8,  y:24, label:'hook',             sub:'yes / not now',       w:52 },
              { x:72, y:10, label:'qualify interest',  sub:'budget / timeline',   w:70 },
              { x:72, y:46, label:'collect details',   sub:'name / email',        w:70 },
              { x:155,y:10, label:'book demo',         sub:'calendar invite',     w:58 },
              { x:155,y:46, label:'follow-up trigger', sub:'',                    w:70 },
              { x:238,y:26, label:'conclude',          sub:'Thank you + WA',      w:58 },
            ].map((n,i)=>(
              <motion.div key={i} initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.06}}
                className="absolute rounded border border-slate-200 bg-white px-1.5 py-1 shadow-sm"
                style={{left:n.x,top:n.y,minWidth:n.w}}>
                <p className="text-[8px] font-semibold text-[#18345d]">{n.label}</p>
                {n.sub && <p className="text-[7px] text-slate-400">{n.sub}</p>}
              </motion.div>
            ))}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 320 80" preserveAspectRatio="none">
              <path d="M60,34 C66,34 66,22 72,22" fill="none" stroke="#A5B4FC" strokeWidth="1"/>
              <path d="M60,34 C66,34 66,58 72,58" fill="none" stroke="#A5B4FC" strokeWidth="1"/>
              <path d="M142,22 C148,22 148,22 155,22" fill="none" stroke="#A5B4FC" strokeWidth="1"/>
              <path d="M142,58 C148,58 148,58 155,58" fill="none" stroke="#A5B4FC" strokeWidth="1"/>
              <path d="M213,22 C220,22 220,38 238,38" fill="none" stroke="#A5B4FC" strokeWidth="1"/>
              <path d="M225,58 C232,58 232,46 238,46" fill="none" stroke="#A5B4FC" strokeWidth="1"/>
            </svg>
            {/* start/end dots */}
            <div className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-[#18345d] text-[7px] text-white" style={{left:2,top:30}}>▶</div>
            <div className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-red-700 text-[7px] text-white" style={{right:4,top:30}}>■</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelIntegrations() {
  const ints = [
    { ic:'〜', bg:'#DBEAFE', fc:'#1D4ED8', name:'ElevenLabs',  desc:'Hindi & English TTS',           connected:true },
    { ic:'👂', bg:'#DCFCE7', fc:'#16A34A', name:'Sarvam AI',   desc:'Indian language STT + TTS',     connected:true },
    { ic:'🎙', bg:'#EDE9FE', fc:'#7C3AED', name:'Deepgram',    desc:'Nova-2 speech recognition',     connected:true },
    { ic:'💬', bg:'#DCFCE7', fc:'#16A34A', name:'WhatsApp',    desc:'Automated follow-ups',          connected:true },
    { ic:'⬡',  bg:'#F3F4F6', fc:'#374151', name:'CRM',         desc:'Sync contacts & call outcomes', connected:true },
    { ic:'⊕',  bg:'#FEE2E2', fc:'#DC2626', name:'Webhook',     desc:'Custom HTTP endpoints',         connected:false },
  ];
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-100 bg-white px-4 py-3">
        <p className="text-sm font-semibold text-[#18345d]">Integrations</p>
        <p className="text-[10px] text-slate-400">Connect your tools and data sources to EMAAVY.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {ints.map((it,i)=>(
          <motion.div key={i} initial={{opacity:0,scale:.93}} animate={{opacity:1,scale:1}} transition={{delay:i*0.07}}
            className="rounded-lg border border-slate-100 bg-white p-2.5">
            <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg text-base" style={{background:it.bg,color:it.fc}}>{it.ic}</div>
            <p className="text-[10px] font-semibold text-[#18345d]">{it.name}</p>
            <p className="text-[8.5px] text-slate-400">{it.desc}</p>
            <div className="mt-1.5 flex items-center gap-1">
              <div className={`h-1.5 w-1.5 rounded-full ${it.connected ? 'bg-emerald-500' : 'bg-slate-300'}`}/>
              <span className={`text-[8.5px] font-medium ${it.connected ? 'text-emerald-600' : 'text-slate-400'}`}>
                {it.connected ? 'Connected' : 'Not configured'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PanelSettings() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-100 bg-white px-4 py-3">
        <p className="text-sm font-semibold text-[#18345d]">Settings</p>
        <p className="text-[10px] text-slate-400">Manage your account and platform preferences.</p>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {[
          { icon:'🏢', title:'Account Details', rows:[{l:'Organisation',v:'Acme Corp Demo'},{l:'Plan',v:'Enterprise'},{l:'Region',v:'India (South Asia)'}] },
          { icon:'🔔', title:'Notifications',   rows:[{l:'Campaign completion',v:'On',vc:'#16A34A'},{l:'Failed calls alert',v:'On',vc:'#16A34A'},{l:'Daily summary',v:'Off',vc:'#94A3B8'}] },
          { icon:'🔑', title:'API Keys',         rows:[{l:'Production key',v:'em_live_••••••••'},{l:'Test key',v:'em_test_••••••••'}] },
          { icon:'🕐', title:'Calling Hours',    rows:[{l:'Timezone',v:'IST (UTC+5:30)'},{l:'Start',v:'09:00 AM'},{l:'End',v:'07:00 PM'}] },
        ].map((card,i)=>(
          <motion.div key={i} initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{delay:i*0.08}}
            className="rounded-lg border border-slate-100 bg-white p-2.5">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="text-sm">{card.icon}</span>
              <p className="text-[10.5px] font-semibold text-[#18345d]">{card.title}</p>
            </div>
            {card.rows.map((r,j)=>(
              <div key={j} className="flex items-center justify-between py-0.5">
                <span className="text-[9px] text-slate-400">{r.l}</span>
                <span className="text-[9px] font-semibold font-mono" style={{color:(r as any).vc || '#18345d'}}>{r.v}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const PANELS = [PanelDashboard, PanelPhoneNumbers, PanelAgents, PanelCampaigns, PanelFlows, PanelIntegrations, PanelSettings];

// ─── Cursor component ──────────────────────────────────────────────────────────
function Cursor({ x, y, visible, clicking }: { x: number; y: number; visible: boolean; clicking: boolean }) {
  return (
    <div
      className="pointer-events-none absolute z-50"
      style={{
        left: x - 5,
        top: y - 3,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
        transform: clicking ? 'scale(0.75)' : 'scale(1)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.2s, 0.15s',
      }}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <defs>
          <filter id="cur-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="rgba(0,0,0,0.28)" />
          </filter>
        </defs>
        <g filter="url(#cur-shadow)">
          <path d="M4 2L4 21L8.8 17L12 24.5L15 23.2L11.8 15.8L18.5 15.8L4 2Z"
            fill="white" stroke="#111" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function Ripple({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <div
      className="pointer-events-none absolute z-40 h-7 w-7 rounded-full border-2 border-[#4a658b]"
      style={{
        left: x - 14,
        top: y - 14,
        opacity: active ? 0.9 : 0,
        transform: active ? 'scale(1)' : 'scale(0.3)',
        transition: active ? 'transform 0.45s ease, opacity 0.45s ease' : 'none',
      }}
    />
  );
}

// ─── Main Dashboard Showcase ───────────────────────────────────────────────────
function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [urlText, setUrlText] = useState(TABS[0].url);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const [paused, setPaused] = useState(false);

  const shellRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(cursorPos);
  const targetRef = useRef(targetPos);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const curTabRef = useRef(0);

  posRef.current = cursorPos;
  targetRef.current = targetPos;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    const cur = posRef.current;
    const tgt = targetRef.current;
    const nx = lerp(cur.x, tgt.x, 0.11);
    const ny = lerp(cur.y, tgt.y, 0.11);
    setCursorPos({ x: nx, y: ny });
    if (Math.abs(nx - tgt.x) > 0.5 || Math.abs(ny - tgt.y) > 0.5) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setCursorPos(tgt);
      rafRef.current = null;
    }
  }, []);

  const moveTo = useCallback((x: number, y: number) => {
    setTargetPos({ x, y });
    setCursorVisible(true);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const getNavCenter = useCallback((tabIdx: number) => {
    const el = navRefs.current[tabIdx];
    const shell = shellRef.current;
    if (!el || !shell) return { x: 78, y: 150 };
    const er = el.getBoundingClientRect();
    const sr = shell.getBoundingClientRect();
    return { x: er.left - sr.left + er.width * 0.42, y: er.top - sr.top + er.height / 2 };
  }, []);

  const doClick = useCallback((x: number, y: number, cb: () => void) => {
    setRipplePos({ x, y });
    setRippleActive(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setRippleActive(true);
      setTimeout(() => setRippleActive(false), 500);
    }));
    setClicking(true);
    setTimeout(() => { setClicking(false); cb(); }, 200);
  }, []);

  const goTo = useCallback((idx: number) => {
    curTabRef.current = idx;
    setActiveTab(idx);
    setUrlText(TABS[idx].url);
  }, []);

  const animateNext = useCallback(() => {
    if (paused) return;
    const next = (curTabRef.current + 1) % TABS.length;
    const pos = getNavCenter(next);
    moveTo(pos.x, pos.y);
    const waitArrived = () => {
      const cur = posRef.current;
      if (Math.abs(cur.x - pos.x) < 5 && Math.abs(cur.y - pos.y) < 5) {
        doClick(pos.x, pos.y, () => {
          goTo(next);
          autoRef.current = setTimeout(animateNext, 4200);
        });
      } else {
        setTimeout(waitArrived, 30);
      }
    };
    setTimeout(waitArrived, 60);
  }, [paused, getNavCenter, moveTo, doClick, goTo]);

  useEffect(() => {
    const init = setTimeout(() => {
      const p0 = getNavCenter(0);
      setCursorPos(p0);
      setTargetPos(p0);
      setCursorVisible(true);
      autoRef.current = setTimeout(animateNext, 2500);
    }, 900);
    return () => {
      clearTimeout(init);
      if (autoRef.current) clearTimeout(autoRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const Panel = PANELS[activeTab];

  return (
    <div
      ref={shellRef}
      className="relative overflow-hidden rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_40px_rgba(24,52,93,0.14)]"
      onClick={() => { setPaused(true); if (autoRef.current) clearTimeout(autoRef.current); }}
    >
      {/* chrome bar */}
      <div className="flex items-center gap-3 bg-[#1C2B3A] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 rounded-md bg-white/10 px-3 py-1 text-center text-[11px] text-white/50">{urlText}</div>
        <span className="hidden text-[10px] text-white/30 sm:block">EMAAVY — Enterprise Call Intelligence</span>
      </div>

      {/* body */}
      <div className="flex" style={{ height: 400 }}>
        {/* sidebar */}
        <div className="flex w-40 flex-shrink-0 flex-col bg-[#0D2137]">
          <div className="border-b border-white/5 px-4 py-3.5">
            <span className="text-[15px] font-bold tracking-tight text-[#E8F4FF]">
              e<span className="text-[#4a90c4]">maavy</span>
            </span>
          </div>
          <div className="flex-1 py-2">
            {TABS.slice(0, 5).map((tab, i) => (
              <div
                key={tab.id}
                ref={el => { navRefs.current[i] = el; }}
                onClick={e => { e.stopPropagation(); setPaused(true); if (autoRef.current) clearTimeout(autoRef.current); goTo(i); }}
                className={`relative flex cursor-pointer items-center gap-2 px-4 py-2 text-[11.5px] transition-all ${
                  activeTab === i
                    ? 'bg-white/10 text-[#E8F4FF]'
                    : 'text-white/45 hover:text-white/70'
                }`}
              >
                {activeTab === i && (
                  <div className="absolute inset-y-0 left-0 w-[3px] rounded-r-sm bg-[#4a90c4]" />
                )}
                <span className="text-[12px]">{tab.icon}</span>
                {tab.label}
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 py-2">
            {TABS.slice(5).map((tab, i) => (
              <div
                key={tab.id}
                ref={el => { navRefs.current[i + 5] = el; }}
                onClick={e => { e.stopPropagation(); setPaused(true); if (autoRef.current) clearTimeout(autoRef.current); goTo(i + 5); }}
                className={`relative flex cursor-pointer items-center gap-2 px-4 py-2 text-[11.5px] transition-all ${
                  activeTab === i + 5
                    ? 'bg-white/10 text-[#E8F4FF]'
                    : 'text-white/35 hover:text-white/60'
                }`}
              >
                {activeTab === i + 5 && (
                  <div className="absolute inset-y-0 left-0 w-[3px] rounded-r-sm bg-[#4a90c4]" />
                )}
                <span className="text-[12px]">{tab.icon}</span>
                {tab.label}
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 text-[11.5px] text-white/25">
              <span className="text-[12px]">↪</span>Log out
            </div>
          </div>
        </div>

        {/* content */}
        <div className="relative flex-1 overflow-hidden bg-slate-50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="h-full"
          >
            <Panel />
          </motion.div>
        </div>
      </div>

      {/* cursor + ripple */}
      <Cursor x={cursorPos.x} y={cursorPos.y} visible={cursorVisible} clicking={clicking} />
      <Ripple x={ripplePos.x} y={ripplePos.y} active={rippleActive} />

      {/* step dots */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
        {TABS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Tab ${i + 1}`}
            onClick={e => { e.stopPropagation(); setPaused(true); if (autoRef.current) clearTimeout(autoRef.current); goTo(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeTab === i ? 'w-5 bg-[#4a658b]' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* bg blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#4a658b]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#18345d]/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* left copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4a658b]/20 bg-[#f0f4f8] px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4a658b]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4a658b]">
                AI-Powered Outbound Voice Platform
              </span>
            </motion.div>

            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[#18345d] sm:text-5xl lg:text-[3.25rem]">
              AI Voice Agents,{' '}
              <span className="bg-[linear-gradient(135deg,#4a658b_0%,#18345d_100%)] bg-clip-text text-transparent">
                Campaigns &amp; Flows
              </span>{' '}
              For Indian Businesses
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#475569]">
              Deploy AI calling agents, automate outbound campaigns, design conversation flows,
              and scale operations — all from one platform built for India.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#pricing" className="btn-primary px-6 py-3 text-base">
                Start Free
              </Link>
              <Link href="#contact" className="btn-secondary px-6 py-3 text-base">
                Book Demo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {TRUST_BADGES.map((badge: string, i: number) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-1.5 text-xs font-semibold text-[#4a658b]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4a658b]" />
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* right — dashboard showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* premium glow ring */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#4a658b]/10 via-transparent to-[#18345d]/10 blur-xl" />
            {/* label */}
            <div className="relative mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4a658b]">
                  Live Dashboard Preview
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Click to explore · Auto-plays</span>
            </div>
            <div className="relative">
              <DashboardShowcase />
            </div>
            {/* bottom caption */}
            <p className="mt-3 text-center text-[10.5px] text-slate-400">
              Dashboard · Phone Numbers · AI Agents · Campaigns · Conversation Flows · Integrations · Settings
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
