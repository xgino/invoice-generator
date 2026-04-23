import React, { useState, useEffect, useRef } from 'react';
import { APP_STORE_URL } from '../components/Navbar';

function useReveal(t = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}

function Shape({ type, size, color, top, left, delay, duration, drift }) {
  const s = { position:'absolute', top, left, width:size, height:size, opacity:0.55, pointerEvents:'none', zIndex:0, animation:`sf${drift||'A'} ${duration||8}s ${delay||0}s ease-in-out infinite` };
  if (type==='circle') return <div style={{...s, borderRadius:'50%', background:color}} />;
  if (type==='ring') return <div style={{...s, borderRadius:'50%', border:'2.5px solid '+color, background:'transparent'}} />;
  if (type==='square') return <div style={{...s, borderRadius:size*0.18, background:color, transform:'rotate(15deg)'}} />;
  if (type==='cross') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (type==='dots') return <svg style={{...s,opacity:0.3}} viewBox="0 0 40 40" fill={color}>{[0,10,20,30].map(x=>[0,10,20,30].map(y=><circle key={x+'-'+y} cx={x+5} cy={y+5} r="1.5"/>)).flat()}</svg>;
  if (type==='tri') return <svg style={s} viewBox="0 0 30 30" fill="none" stroke={color} strokeWidth="2"><polygon points="15,4 27,26 3,26"/></svg>;
  return null;
}

function CTA({ text, dark }) {
  const bg = dark ? '#fff' : '#0a0f1e';
  const fg = dark ? '#0a0f1e' : '#fff';
  return (
    <a href={APP_STORE_URL} style={{ display:'inline-flex', alignItems:'center', gap:12, background:bg, color:fg, padding:'17px 34px', borderRadius:18, fontSize:17, fontWeight:700, textDecoration:'none', boxShadow:dark?'0 6px 30px rgba(0,0,0,.25)':'0 6px 30px rgba(10,15,30,.22)', transition:'transform .18s, box-shadow .18s' }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px) scale(1.02)'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
      <svg viewBox="0 0 384 512" style={{width:20,height:20,fill:fg}}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
      {text}
    </a>
  );
}

function FeatureSection({ refHook, bg, color, label, labelColor, title, desc, extra, cta, ctaDark, shapes }) {
  const [ref, vis] = refHook;
  const rv = (d=0) => ({ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(44px)', transition:`opacity .7s ${d}s ease, transform .7s ${d}s ease` });
  return (
    <section ref={ref} style={{ padding:'110px 24px', background:bg, color, position:'relative', overflow:'hidden' }}>
      {shapes}
      <div style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={rv()}>
          <p style={{ fontSize:14, fontWeight:700, color:labelColor, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:16 }}>{label}</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(32px,4.5vw,52px)', fontWeight:700, lineHeight:1.12, margin:'0 0 24px', letterSpacing:'-0.02em' }}>{title}</h2>
          <p style={{ fontSize:18, lineHeight:1.7, opacity:0.75, maxWidth:620, margin:0 }}>{desc}</p>
        </div>
        {extra && <div style={rv(0.15)}>{extra}</div>}
        <div style={{ marginTop:44, ...rv(0.25) }}><CTA text={cta} dark={ctaDark}/></div>
      </div>
    </section>
  );
}

function PCard({ nm, tl, p, pr, ac, bd, pop, ct, cb, fs }) {
  return (
    <div style={{ background:'#fff', border:`${pop?'2px':'1px'} solid ${pop?bd:'#e5e7eb'}`, borderRadius:24, padding:'34px 28px', boxShadow:pop?`0 24px 64px ${ac}12`:'0 2px 8px rgba(0,0,0,.02)', display:'flex', flexDirection:'column', transition:'transform .25s, box-shadow .25s' }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=pop?`0 32px 72px ${ac}18`:'0 12px 32px rgba(0,0,0,.06)'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=pop?`0 24px 64px ${ac}12`:'0 2px 8px rgba(0,0,0,.02)'}}>
      <div style={{ marginBottom:24 }}><h3 style={{ fontSize:21, fontWeight:800, margin:'0 0 4px' }}>{nm}</h3><p style={{ fontSize:14, color:'#6b7280', margin:0 }}>{tl}</p></div>
      <div style={{ marginBottom:28, display:'flex', alignItems:'baseline', gap:4 }}>
        <span style={{ fontSize:42, fontWeight:800, letterSpacing:'-0.03em' }}>{p}</span>
        {pr && <span style={{ fontSize:15, color:'#94a3b8', fontWeight:500 }}>{pr}</span>}
      </div>
      <div style={{ flex:1, marginBottom:28 }}>
        {fs.map(([on,text],i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            {on ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ac} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                 : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>}
            <span style={{ fontSize:14, fontWeight:500, color:on?'#1e293b':'#9ca3af' }}>{text}</span>
          </div>
        ))}
      </div>
      <a href={APP_STORE_URL} style={{ display:'block', textAlign:'center', padding:'15px 0', borderRadius:15, background:cb, color:'#fff', fontWeight:700, fontSize:15, textDecoration:'none', transition:'transform .18s', boxShadow:`0 4px 16px ${cb}33` }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>{ct}</a>
    </div>
  );
}

export default function Landing() {
  const [yearly, setYearly] = useState(true);
  const [heroRef,heroV] = useReveal(0.05);
  const [f1Ref,f1V] = useReveal();
  const [f2Ref,f2V] = useReveal();
  const [f3Ref,f3V] = useReveal();
  const [f4Ref,f4V] = useReveal();
  const [f5Ref,f5V] = useReveal();
  const [f6Ref,f6V] = useReveal();
  const [stepRef,stepV] = useReveal();
  const [priceRef,priceV] = useReveal(0.08);
  const [testRef,testV] = useReveal();

  const rv = (vis, d=0) => ({ opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(44px)', transition:`opacity .7s ${d}s ease, transform .7s ${d}s ease` });

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif", color:'#0a0f1e', background:'#fcfcfb', overflowX:'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes sfA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(8deg)}}
        @keyframes sfB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(14px) rotate(-6deg)}}
        @keyframes sfC{0%,100%{transform:translateX(0) rotate(0deg)}50%{transform:translateX(12px) rotate(5deg)}}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes pulse{0%,100%{opacity:.55}50%{opacity:.85}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section ref={heroRef} style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'linear-gradient(170deg,#f9fafb 0%,#eef4ff 35%,#f5f0ff 65%,#fefcf4 100%)' }}>
        <Shape type="circle" size={120} color="rgba(99,102,241,.12)" top="8%" left="5%" delay={0} duration={9} drift="A"/>
        <Shape type="ring" size={80} color="rgba(37,99,235,.18)" top="18%" left="88%" delay={1.5} duration={7} drift="B"/>
        <Shape type="square" size={50} color="rgba(245,158,11,.1)" top="72%" left="8%" delay={0.8} duration={10} drift="C"/>
        <Shape type="cross" size={32} color="rgba(124,58,237,.2)" top="82%" left="78%" delay={2} duration={8} drift="A"/>
        <Shape type="dots" size={90} color="rgba(37,99,235,.4)" top="40%" left="92%" delay={0} duration={12} drift="B"/>
        <Shape type="tri" size={44} color="rgba(16,185,129,.18)" top="14%" left="55%" delay={1} duration={11} drift="C"/>
        <Shape type="ring" size={160} color="rgba(251,191,36,.08)" top="60%" left="85%" delay={0.5} duration={14} drift="A"/>
        <Shape type="circle" size={28} color="rgba(239,68,68,.12)" top="90%" left="45%" delay={2.5} duration={7} drift="B"/>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'140px 24px 100px', width:'100%', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:64 }}>
            <div style={{ flex:'1 1 480px', maxWidth:620, ...rv(heroV) }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(37,99,235,.06)', border:'1px solid rgba(37,99,235,.12)', borderRadius:999, padding:'7px 18px', fontSize:13, fontWeight:600, color:'#2563eb', marginBottom:32, animation:'pulse 3s ease-in-out infinite' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18h.01"/><path d="M7 21h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/></svg>
                Now on iPhone
              </div>

              <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(44px,6.5vw,76px)', fontWeight:700, lineHeight:1.05, letterSpacing:'-0.025em', margin:'0 0 28px' }}>
                Create invoices<br/>
                <span style={{ fontStyle:'italic', fontWeight:400, background:'linear-gradient(135deg,#2563eb 0%,#7c3aed 50%,#db2777 100%)', backgroundSize:'200% 200%', animation:'grad 4s ease infinite', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>in seconds.</span>
              </h1>

              <p style={{ fontSize:20, lineHeight:1.7, color:'#475569', margin:'0 0 16px', maxWidth:520 }}>
                Stop wasting hours on formatting. Invoicor auto fills 80% of your invoice so you can go from zero to sent in under 5 seconds. Beautiful PDFs, any currency, any language.
              </p>
              <p style={{ fontSize:15, lineHeight:1.6, color:'#94a3b8', margin:'0 0 40px', maxWidth:480 }}>
                Trusted by freelancers, agencies, and small businesses worldwide. Get paid faster, starting today.
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'center' }}>
                <CTA text="Send Your First Invoice" dark={false}/>
                <span style={{ fontSize:14, color:'#94a3b8', fontWeight:500 }}>3 invoices free, no card needed</span>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:44 }}>
                <div style={{ display:'flex' }}>
                  {['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'].map((c,i)=>(
                    <div key={i} style={{ width:34, height:34, borderRadius:'50%', background:c, border:'2.5px solid #fcfcfb', marginLeft:i?-9:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'#fff' }}>{['S','M','A','J','K'][i]}</div>
                  ))}
                </div>
                <div>
                  <div style={{ display:'flex', gap:2 }}>{[1,2,3,4,5].map(i=><svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>
                  <p style={{ fontSize:13, color:'#64748b', margin:'3px 0 0', fontWeight:500 }}>Trusted by 4,700+ businesses worldwide</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{ flex:'1 1 320px', maxWidth:370, margin:'0 auto', position:'relative', opacity:heroV?1:0, transform:heroV?'scale(1)':'scale(.9)', transition:'opacity .8s .25s ease, transform .8s .25s ease' }}>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'130%', height:'130%', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.1) 0%,rgba(124,58,237,.05) 40%,transparent 70%)', pointerEvents:'none', animation:'pulse 4s ease-in-out infinite' }}/>
              <Shape type="circle" size={18} color="rgba(37,99,235,.35)" top="-5%" left="10%" delay={0} duration={5} drift="A"/>
              <Shape type="ring" size={28} color="rgba(251,191,36,.3)" top="85%" left="80%" delay={1} duration={6} drift="B"/>
              <Shape type="square" size={14} color="rgba(16,185,129,.3)" top="20%" left="95%" delay={0.5} duration={7} drift="C"/>
              <div style={{ position:'relative', zIndex:2, borderRadius:48, border:'8px solid #0a0f1e', background:'#0a0f1e', overflow:'hidden', aspectRatio:'9/19.5', boxShadow:'0 50px 100px rgba(10,15,30,.25)', animation:'bob 5s ease-in-out infinite' }}>
                <div style={{ position:'absolute', inset:0, background:'#f8fafc', display:'flex', flexDirection:'column' }}>
                  <div style={{ background:'linear-gradient(140deg,#1e40af,#6d28d9)', padding:'52px 20px 24px', borderRadius:'0 0 28px 28px', position:'relative' }}>
                    <div style={{ position:'absolute', top:12, right:14, width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.2)', animation:'pulse 2s ease-in-out infinite' }}/>
                    <p style={{ color:'rgba(255,255,255,.65)', fontSize:11, fontWeight:500, margin:'0 0 4px' }}>Outstanding</p>
                    <p style={{ color:'#fff', fontSize:30, fontWeight:800, margin:0 }}>$4,280<span style={{fontSize:18,fontWeight:500}}>.00</span></p>
                    <div style={{ display:'flex', gap:8, marginTop:16 }}>
                      {[['3','Draft'],['5','Sent'],['8','Paid']].map(([n,l])=>(
                        <div key={l} style={{ flex:1, background:'rgba(255,255,255,.12)', borderRadius:14, padding:'9px 0', textAlign:'center' }}>
                          <p style={{ color:'#fff', fontSize:17, fontWeight:800, margin:0 }}>{n}</p>
                          <p style={{ color:'rgba(255,255,255,.6)', fontSize:9, margin:'2px 0 0', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' }}>{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding:'14px 14px 0', flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                      <p style={{ fontWeight:800, fontSize:13, margin:0 }}>Recent</p>
                      <p style={{ fontSize:11, color:'#6366f1', fontWeight:700, margin:0 }}>See all</p>
                    </div>
                    {[
                      {c:'Acme Corp',n:'INV-0042',a:'$1,200',st:'Sent',sc:'#e0e7ff',tc:'#4338ca'},
                      {c:'Studio Nova',n:'INV-0041',a:'$3,080',st:'Paid',sc:'#d1fae5',tc:'#047857'},
                      {c:'Bright Agency',n:'INV-0040',a:'$750',st:'Draft',sc:'#fef3c7',tc:'#b45309'},
                    ].map((inv,i)=>(
                      <div key={i} style={{ background:'#fff', borderRadius:16, padding:'11px 12px', marginBottom:8, border:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div><p style={{ fontWeight:700, fontSize:12, margin:0 }}>{inv.c}</p><p style={{ fontSize:10, color:'#94a3b8', margin:'2px 0 0' }}>{inv.n}</p></div>
                        <div style={{ textAlign:'right' }}><p style={{ fontWeight:800, fontSize:12, margin:0 }}>{inv.a}</p><span style={{ fontSize:9, fontWeight:700, color:inv.tc, background:inv.sc, padding:'2px 8px', borderRadius:6, display:'inline-block', marginTop:2 }}>{inv.st}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background:'#0a0f1e', padding:'16px 0', overflow:'hidden' }}>
        <div style={{ display:'flex', animation:'marquee 22s linear infinite', width:'max-content' }}>
          {[0,1].map(r=>(
            <div key={r} style={{ display:'flex', gap:48, paddingRight:48, alignItems:'center' }}>
              {['Create in Seconds','80% Auto Fill','Beautiful Templates','Multi Currency','Multi Language','Status Tracking','Tax Calculator','Discount Calculator','PDF Export','Multiple Profiles','EU Data Protection'].map((t,i)=>(
                <span key={i} style={{ color:'rgba(255,255,255,.4)', fontSize:13, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#6366f1', display:'inline-block' }}/>{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Feature 1: Auto Fill */}
      <FeatureSection refHook={[f1Ref,f1V]} bg="#0a0f1e" color="#fff" label="Smart Auto Fill" labelColor="#818cf8"
        title={<>80% of your invoice is<br/><span style={{ fontStyle:'italic', color:'#fbbf24' }}>already done.</span></>}
        desc="Add your business info, clients, and services once. After that, Invoicor remembers everything. Select a client, pick your items, and the invoice builds itself. Name, address, prices, tax, totals. All filled in. All you do is tap send."
        extra={
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:14, marginTop:40 }}>
            {[{n:'Business info',d:'Saved once, used forever'},{n:'Client details',d:'Auto filled on selection'},{n:'Products and services',d:'Pick from your saved list'},{n:'Prices and tax',d:'Calculated automatically'}].map((c,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:16, padding:'20px 16px', textAlign:'center', transition:'transform .25s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <p style={{ fontWeight:700, fontSize:15, margin:'0 0 4px', color:'#f1f5f9' }}>{c.n}</p>
                <p style={{ fontSize:13, color:'#64748b', margin:0 }}>{c.d}</p>
              </div>
            ))}
          </div>
        }
        cta="Start Invoicing for Free" ctaDark={true}
        shapes={<><Shape type="ring" size={200} color="rgba(99,102,241,.08)" top="10%" left="-5%" delay={0} duration={12} drift="A"/><Shape type="dots" size={120} color="rgba(255,255,255,.15)" top="60%" left="85%" delay={1} duration={15} drift="B"/><Shape type="circle" size={60} color="rgba(251,191,36,.06)" top="80%" left="20%" delay={2} duration={9} drift="C"/></>}
      />

      {/* Feature 2: Templates */}
      <FeatureSection refHook={[f2Ref,f2V]} bg="#fcfcfb" color="#0a0f1e" label="Professional Templates" labelColor="#7c3aed"
        title={<>Invoices that make clients<br/><span style={{ fontStyle:'italic', color:'#7c3aed' }}>take you seriously.</span></>}
        desc="Choose from our collection of professionally designed PDF templates. Add your own logo, pick your brand colours, and every invoice looks like it came from a design agency. First impressions matter, and your invoice is often the last thing a client sees before they pay."
        extra={
          <div style={{ display:'flex', flexWrap:'wrap', gap:14, marginTop:40 }}>
            {['Your logo on every invoice','Multiple professional layouts','Customisable colours','Clean, modern typography'].map((t,i)=>(
              <span key={i} style={{ background:'#ede9fe', color:'#5b21b6', fontSize:14, fontWeight:600, padding:'10px 20px', borderRadius:12 }}>{t}</span>
            ))}
          </div>
        }
        cta="Make Your Invoices Look Premium" ctaDark={false}
        shapes={<><Shape type="ring" size={100} color="rgba(124,58,237,.07)" top="5%" left="90%" delay={0} duration={10} drift="A"/><Shape type="circle" size={40} color="rgba(245,158,11,.08)" top="85%" left="5%" delay={1} duration={8} drift="B"/></>}
      />

      {/* Feature 3: Multi Currency and Language */}
      <FeatureSection refHook={[f3Ref,f3V]} bg="#f7f8fa" color="#0a0f1e" label="Go Global" labelColor="#059669"
        title={<>Any currency. Any language.<br/><span style={{ fontStyle:'italic', color:'#059669' }}>Clients pay up to 30% faster.</span></>}
        desc="Set USD, EUR, GBP, JPY, or any other currency per invoice. Then translate the entire invoice into your client's language with one tap. Invoices in the recipient's native language get paid significantly faster. Invoicor makes international business effortless."
        extra={
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginTop:40 }}>
            {['$ USD','EUR','GBP','JPY','CAD','AUD','CHF','SEK','+ more'].map((c,i)=>(
              <span key={i} style={{ background:'#d1fae5', color:'#065f46', fontSize:14, fontWeight:700, padding:'10px 18px', borderRadius:12, border:'1px solid #a7f3d0' }}>{c}</span>
            ))}
          </div>
        }
        cta="Invoice Clients Worldwide" ctaDark={false}
        shapes={<><Shape type="tri" size={40} color="rgba(16,185,129,.12)" top="15%" left="75%" delay={0.5} duration={10} drift="C"/><Shape type="square" size={24} color="rgba(16,185,129,.1)" top="80%" left="10%" delay={1.5} duration={8} drift="A"/></>}
      />

      {/* Feature 4: Auto Calculations */}
      <FeatureSection refHook={[f4Ref,f4V]} bg="#fff" color="#0a0f1e" label="Zero Math" labelColor="#2563eb"
        title={<>Tax, discounts, totals.<br/><span style={{ fontStyle:'italic', color:'#2563eb' }}>All calculated for you.</span></>}
        desc="Set your tax rate once and Invoicor handles the rest. Subtotals, tax amounts, discounts, and final totals update live as you add items. No calculator needed. No spreadsheet. No mistakes. Just accurate numbers, every single time."
        extra={
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:14, marginTop:40 }}>
            {[{icon:'%',t:'Tax auto calculated',d:'Set your rate, forget about it'},{icon:'$',t:'Live totals',d:'Updates as you add items'},{icon:'*',t:'Discount support',d:'Percentage or fixed amount'}].map((c,i)=>(
              <div key={i} style={{ background:'#eff6ff', borderRadius:16, padding:'24px 20px', textAlign:'center' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'#2563eb', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:800, margin:'0 auto 12px' }}>{c.icon}</div>
                <p style={{ fontWeight:700, fontSize:15, margin:'0 0 4px' }}>{c.t}</p>
                <p style={{ fontSize:13, color:'#64748b', margin:0 }}>{c.d}</p>
              </div>
            ))}
          </div>
        }
        cta="Stop Doing Math Manually" ctaDark={false}
        shapes={<><Shape type="cross" size={28} color="rgba(37,99,235,.12)" top="10%" left="92%" delay={0} duration={9} drift="B"/><Shape type="ring" size={60} color="rgba(37,99,235,.06)" top="70%" left="3%" delay={1} duration={11} drift="A"/></>}
      />

      {/* Feature 5: Multiple Profiles */}
      <FeatureSection refHook={[f5Ref,f5V]} bg="#fcfcfb" color="#0a0f1e" label="Built for Hustlers" labelColor="#db2777"
        title={<>Multiple businesses.<br/><span style={{ fontStyle:'italic', color:'#db2777' }}>One app.</span></>}
        desc="Freelance under your own name and run a side business? Maybe you consult for one industry and sell products in another. Invoicor lets you create multiple business profiles, each with its own logo, company details, and banking information. Switch between them in one tap."
        cta="Manage All Your Businesses" ctaDark={false}
        shapes={<><Shape type="circle" size={50} color="rgba(219,39,119,.06)" top="15%" left="88%" delay={0} duration={9} drift="C"/><Shape type="ring" size={80} color="rgba(219,39,119,.08)" top="75%" left="5%" delay={1} duration={12} drift="A"/></>}
      />

      {/* Feature 6: Security */}
      <FeatureSection refHook={[f6Ref,f6V]} bg="#0a0f1e" color="#fff" label="Your Data, Protected" labelColor="#60a5fa"
        title={<>Securely stored in Germany.<br/><span style={{ fontStyle:'italic', color:'#60a5fa' }}>We never sell your data.</span></>}
        desc="All your invoices and business data are stored on secure servers in Germany, fully compliant with EU data protection regulations including GDPR. We do not sell, share, or monetise your data. Your financial information belongs to you and only you."
        extra={
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginTop:40 }}>
            {['GDPR Compliant','Servers in Germany','No data selling','Encrypted storage','EU regulations'].map((t,i)=>(
              <span key={i} style={{ background:'rgba(96,165,250,.1)', color:'#93c5fd', fontSize:14, fontWeight:600, padding:'10px 18px', borderRadius:12, border:'1px solid rgba(96,165,250,.15)' }}>{t}</span>
            ))}
          </div>
        }
        cta="Your Data Stays Yours" ctaDark={true}
        shapes={<><Shape type="dots" size={100} color="rgba(255,255,255,.1)" top="20%" left="88%" delay={0} duration={14} drift="B"/><Shape type="ring" size={120} color="rgba(96,165,250,.08)" top="60%" left="-3%" delay={1} duration={12} drift="A"/></>}
      />

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section ref={stepRef} style={{ padding:'110px 24px', background:'#fff', borderTop:'1px solid #eef0f4', position:'relative', overflow:'hidden' }}>
        <Shape type="dots" size={80} color="rgba(99,102,241,.25)" top="20%" left="3%" delay={0} duration={14} drift="A"/>
        <Shape type="tri" size={36} color="rgba(245,158,11,.12)" top="70%" left="92%" delay={1} duration={9} drift="B"/>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={rv(stepV)}>
            <p style={{ fontSize:14, fontWeight:700, color:'#7c3aed', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>How It Works</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(32px,4vw,48px)', fontWeight:700, margin:'0 0 16px' }}>Three steps. Under 5 seconds.</h2>
            <p style={{ fontSize:17, color:'#64748b', margin:'0 auto 60px', maxWidth:560 }}>Our advanced auto fill handles 80% of the work so you do not have to.</p>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:32, justifyContent:'center' }}>
            {[
              { s:'01', t:'Select your client', d:'Pick from your saved list or create a new one. Business name, address, email, everything auto fills instantly.', c:'#2563eb' },
              { s:'02', t:'Add items or services', d:'Select saved products or type a quick line item. Prices, tax, discounts, and totals all calculate live. Zero manual math.', c:'#7c3aed' },
              { s:'03', t:'Share and get paid', d:'Your PDF invoice is generated in one tap. Share via email, WhatsApp, AirDrop, or download it. Track payment status in the app.', c:'#059669' },
            ].map((step,i)=>(
              <div key={i} style={{ flex:'1 1 240px', maxWidth:280, textAlign:'left', ...rv(stepV, 0.12*i) }}>
                <div style={{ width:60, height:60, borderRadius:18, background:step.c, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, marginBottom:20, boxShadow:`0 8px 24px ${step.c}33` }}>{step.s}</div>
                <h3 style={{ fontSize:20, fontWeight:700, margin:'0 0 8px' }}>{step.t}</h3>
                <p style={{ fontSize:15, lineHeight:1.65, color:'#64748b', margin:0 }}>{step.d}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:56, ...rv(stepV, 0.4) }}>
            <CTA text="Send Your First Invoice" dark={false}/>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section ref={priceRef} style={{ padding:'110px 24px', background:'#f7f8fa', position:'relative', overflow:'hidden' }}>
        <Shape type="ring" size={140} color="rgba(99,102,241,.06)" top="8%" left="88%" delay={0} duration={11} drift="A"/>
        <Shape type="circle" size={50} color="rgba(245,158,11,.06)" top="75%" left="6%" delay={1.5} duration={8} drift="C"/>
        <div style={{ maxWidth:1020, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:48, ...rv(priceV) }}>
            <p style={{ fontSize:14, fontWeight:700, color:'#6366f1', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Pricing</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(32px,4vw,48px)', fontWeight:700, margin:'0 0 12px' }}>Start free. Upgrade when you grow.</h2>
            <p style={{ fontSize:17, color:'#64748b', margin:'0 0 32px' }}>No hidden fees. No watermarks on any plan. Cancel anytime.</p>
            <div style={{ display:'inline-flex', background:'#e5e7eb', borderRadius:14, padding:4 }}>
              <button onClick={()=>setYearly(false)} style={{ padding:'11px 26px', borderRadius:11, border:'none', cursor:'pointer', fontWeight:700, fontSize:14, fontFamily:'inherit', background:!yearly?'#fff':'transparent', color:!yearly?'#0a0f1e':'#6b7280', boxShadow:!yearly?'0 2px 10px rgba(0,0,0,.06)':'none', transition:'all .2s' }}>Monthly</button>
              <button onClick={()=>setYearly(true)} style={{ padding:'11px 26px', borderRadius:11, border:'none', cursor:'pointer', fontWeight:700, fontSize:14, fontFamily:'inherit', background:yearly?'#fff':'transparent', color:yearly?'#0a0f1e':'#6b7280', boxShadow:yearly?'0 2px 10px rgba(0,0,0,.06)':'none', transition:'all .2s' }}>Yearly <span style={{color:'#059669',fontSize:12,fontWeight:800,marginLeft:4}}>2 months free</span></button>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:18, alignItems:'start', ...rv(priceV, 0.15) }}>
            <PCard nm="Free" tl="Try it, love it" p="$0" pr="" ac="#64748b" bd="#e2e8f0" pop={false} ct="Download Free" cb="#0a0f1e" fs={[[1,'3 invoices (lifetime)'],[1,'Unlimited clients'],[1,'1 business profile'],[1,'Free templates'],[1,'Status tracking'],[1,'No watermark'],[0,'Revenue analytics'],[0,'Premium templates']]}/>
            <PCard nm="Starter" tl="For side hustlers" p={yearly?'$49.99':'$4.99'} pr={yearly?'/year':'/mo'} ac="#2563eb" bd="#93c5fd" pop={false} ct="Start Free Trial" cb="#2563eb" fs={[[1,'10 invoices per month'],[1,'Unlimited clients'],[1,'1 business profile'],[1,'All templates'],[1,'Status tracking'],[1,'No watermark'],[1,'Revenue analytics'],[0,'Premium templates']]}/>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', zIndex:3, background:'linear-gradient(135deg,#6366f1,#7c3aed)', color:'#fff', fontSize:11, fontWeight:800, padding:'6px 18px', borderRadius:999, textTransform:'uppercase', letterSpacing:'.08em', whiteSpace:'nowrap', boxShadow:'0 4px 16px rgba(99,102,241,.3)' }}>Most Popular</div>
              <PCard nm="Pro" tl="For serious businesses" p={yearly?'$79.99':'$7.99'} pr={yearly?'/year':'/mo'} ac="#7c3aed" bd="#c4b5fd" pop={true} ct="Start Free Trial" cb="#7c3aed" fs={[[1,'50 invoices per month'],[1,'Unlimited clients'],[1,'3 business profiles'],[1,'All premium templates'],[1,'Status tracking'],[1,'No watermark'],[1,'Revenue analytics'],[1,'Priority support']]}/>
            </div>
          </div>
          <div style={{ marginTop:28, padding:'22px 28px', borderRadius:18, background:'#fff', border:'1.5px dashed #d1d5db', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16 }}>
            <div>
              <p style={{ fontWeight:700, fontSize:15, margin:'0 0 3px' }}>Business tier coming soon</p>
              <p style={{ fontSize:13, color:'#6b7280', margin:0 }}>Unlimited invoices, 10 profiles, QR payments, accountant CSV export.</p>
            </div>
            <span style={{ fontSize:13, fontWeight:700, color:'#6366f1', cursor:'pointer', whiteSpace:'nowrap' }}>Notify me</span>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section ref={testRef} style={{ padding:'110px 24px', background:'#fff', borderTop:'1px solid #f1f3f7', position:'relative', overflow:'hidden' }}>
        <Shape type="square" size={30} color="rgba(251,191,36,.1)" top="15%" left="92%" delay={0} duration={9} drift="A"/>
        <Shape type="ring" size={70} color="rgba(99,102,241,.06)" top="80%" left="4%" delay={1} duration={11} drift="B"/>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(32px,4vw,44px)', fontWeight:700, margin:'0 0 52px', textAlign:'center', ...rv(testV) }}>Businesses worldwide get paid faster.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:18, ...rv(testV, 0.15) }}>
            {[
              { q:"I used to spend 20 minutes per invoice in Google Docs. Now I open Invoicor, tap three times, and it is sent before my coffee gets cold. Absolute game changer.", n:'Sarah J.', r:'Freelance Designer', bg:'#e0e7ff' },
              { q:"My clients actually commented on how professional my invoices look. The templates are better than what my accountant sends. Worth every cent of the Pro plan.", n:'Marcus C.', r:'Software Consultant', bg:'#ede9fe' },
              { q:"Had 3,000 euros in unsent invoices sitting in my notes app. First day with Invoicor, sent them all. Got paid within a week. Wish I found this sooner.", n:'Elena R.', r:'Photography Studio', bg:'#fef3c7' },
            ].map((t,i)=>(
              <div key={i} style={{ background:'#fafaf9', border:'1px solid #e8ecf1', borderRadius:22, padding:'30px 26px', display:'flex', flexDirection:'column', transition:'transform .25s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <div style={{ display:'flex', gap:3, marginBottom:18 }}>{[1,2,3,4,5].map(s=><svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>
                <p style={{ fontSize:15, lineHeight:1.7, color:'#334155', margin:'0 0 24px', flex:1 }}>"{t.q}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:'50%', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16 }}>{t.n[0]}</div>
                  <div><p style={{ fontWeight:700, fontSize:14, margin:0 }}>{t.n}</p><p style={{ fontSize:13, color:'#6b7280', margin:0 }}>{t.r}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section style={{ padding:'120px 24px', textAlign:'center', position:'relative', overflow:'hidden', background:'linear-gradient(170deg,#0a0f1e,#1a1f36)' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'90vw', height:'90vw', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 55%)', pointerEvents:'none', animation:'pulse 5s ease-in-out infinite' }}/>
        <Shape type="circle" size={24} color="rgba(251,191,36,.2)" top="20%" left="15%" delay={0} duration={6} drift="A"/>
        <Shape type="ring" size={50} color="rgba(99,102,241,.12)" top="70%" left="80%" delay={1} duration={8} drift="B"/>
        <Shape type="cross" size={20} color="rgba(255,255,255,.08)" top="30%" left="85%" delay={2} duration={7} drift="C"/>
        <Shape type="square" size={16} color="rgba(16,185,129,.15)" top="75%" left="20%" delay={0.5} duration={9} drift="A"/>
        <div style={{ maxWidth:640, margin:'0 auto', position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(34px,5vw,56px)', fontWeight:700, color:'#fff', margin:'0 0 18px', lineHeight:1.12 }}>
            Get paid faster.<br/><span style={{fontStyle:'italic',color:'#818cf8'}}>Starting right now.</span>
          </h2>
          <p style={{ fontSize:18, color:'#94a3b8', margin:'0 0 44px', lineHeight:1.65 }}>Download free. 3 invoices on us. No card, no commitment.</p>
          <CTA text="Send Your First Invoice" dark={true}/>
        </div>
      </section>
    </div>
  );
}