#!/usr/bin/env python3
"""Build the Salon Autopilot sales offer page with embedded fonts."""
import base64, pathlib

FONTS = pathlib.Path("/root/.claude/skills/canvas-design/canvas-fonts")

def b64(name):
    return base64.b64encode((FONTS / name).read_bytes()).decode()

italiana = b64("Italiana-Regular.ttf")
dmmono = b64("DMMono-Regular.ttf")

HTML = r"""<title>Salon Autopilot — The Offer</title>
<style>
@font-face{font-family:'Italiana';src:url(data:font/ttf;base64,__ITALIANA__) format('truetype');font-weight:400;font-display:swap}
@font-face{font-family:'DMMono';src:url(data:font/ttf;base64,__DMMONO__) format('truetype');font-weight:400;font-display:swap}

:root{
  --ground:#171012; --surface:#1F171A; --surface-2:#261C20;
  --ink:#F4EBE4; --ink-soft:#C9B8AF; --ink-mute:#8E7A72;
  --rouge:#C6414F; --rouge-deep:#B83A4B; --rose:#E7BDB6; --champ:#C9A870;
  --line:rgba(201,168,112,.28); --line-soft:rgba(244,235,228,.10);
  --shadow:0 24px 60px -30px rgba(0,0,0,.7);
  --sans:'Inter',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
  --serif:'Italiana',Georgia,'Times New Roman',serif;
  --mono:'DMMono',ui-monospace,SFMono-Regular,Menlo,monospace;
}
@media (prefers-color-scheme:light){:root{
  --ground:#F6EFE9; --surface:#FBF6F1; --surface-2:#F1E7DE;
  --ink:#241A1C; --ink-soft:#5E4B47; --ink-mute:#93807A;
  --rouge:#B3313F; --rouge-deep:#9E2A38; --rose:#C98E86; --champ:#9C7A3E;
  --line:rgba(120,90,40,.30); --line-soft:rgba(36,26,28,.10);
  --shadow:0 24px 60px -34px rgba(60,30,30,.28);
}}
:root[data-theme="dark"]{
  --ground:#171012; --surface:#1F171A; --surface-2:#261C20;
  --ink:#F4EBE4; --ink-soft:#C9B8AF; --ink-mute:#8E7A72;
  --rouge:#C6414F; --rouge-deep:#B83A4B; --rose:#E7BDB6; --champ:#C9A870;
  --line:rgba(201,168,112,.28); --line-soft:rgba(244,235,228,.10);
  --shadow:0 24px 60px -30px rgba(0,0,0,.7);
}
:root[data-theme="light"]{
  --ground:#F6EFE9; --surface:#FBF6F1; --surface-2:#F1E7DE;
  --ink:#241A1C; --ink-soft:#5E4B47; --ink-mute:#93807A;
  --rouge:#B3313F; --rouge-deep:#9E2A38; --rose:#C98E86; --champ:#9C7A3E;
  --line:rgba(120,90,40,.30); --line-soft:rgba(36,26,28,.10);
  --shadow:0 24px 60px -34px rgba(60,30,30,.28);
}

*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);
  line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.wrap{max-width:1080px;margin:0 auto;padding:0 28px}
section{position:relative}

.eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.28em;text-transform:uppercase;
  color:var(--champ);margin:0 0 18px}
h1,h2,h3{font-family:var(--serif);font-weight:400;text-wrap:balance;letter-spacing:.01em;line-height:1.04;margin:0}
p{margin:0}
.lede{color:var(--ink-soft);max-width:60ch}

/* ---- hero ---- */
.hero{padding:96px 0 76px;border-bottom:1px solid var(--line-soft)}
.hero .brand{display:flex;align-items:center;gap:12px;margin-bottom:52px}
.dot{width:12px;height:12px;border-radius:50%;
  background:radial-gradient(circle at 32% 30%,#fff6,transparent 45%),var(--rouge);
  box-shadow:0 0 0 4px color-mix(in srgb,var(--rouge) 18%,transparent)}
.brand b{font-family:var(--mono);font-weight:400;font-size:13px;letter-spacing:.26em;text-transform:uppercase;color:var(--ink)}
.hero h1{font-size:clamp(40px,7vw,78px)}
.hero h1 em{font-style:italic;color:var(--rose)}
.hero .lede{font-size:clamp(17px,2.2vw,20px);margin-top:26px}
.sheen{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
.sheen::after{content:"";position:absolute;top:-30%;right:-8%;width:520px;height:520px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--rouge) 40%,transparent),transparent 62%);
  filter:blur(30px);opacity:.55}
.hero .wrap{position:relative;z-index:1}

.cta-row{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:40px}
.btn{font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;
  text-decoration:none;padding:15px 26px;border-radius:2px;transition:transform .18s,background .18s,color .18s}
.btn-primary{background:var(--rouge);color:#fff;box-shadow:var(--shadow)}
.btn-primary:hover{transform:translateY(-2px);background:var(--rouge-deep)}
.btn-ghost{color:var(--ink);border:1px solid var(--line)}
.btn-ghost:hover{background:var(--surface)}
a.btn:focus-visible,a:focus-visible{outline:2px solid var(--champ);outline-offset:3px}

/* ---- generic section rhythm ---- */
.block{padding:78px 0;border-bottom:1px solid var(--line-soft)}
.block h2{font-size:clamp(30px,4.4vw,46px);margin-bottom:14px}

/* ---- the leak ---- */
.leak-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:38px}
.leak{background:var(--surface);border:1px solid var(--line-soft);border-radius:4px;padding:24px 26px}
.leak .k{font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:var(--rouge);text-transform:uppercase}
.leak p{color:var(--ink-soft);margin-top:8px;font-size:15px}

/* ---- journey ---- */
.journey{padding:82px 0;border-bottom:1px solid var(--line-soft);background:
  linear-gradient(180deg,transparent,color-mix(in srgb,var(--surface) 55%,transparent),transparent)}
.steps{margin-top:48px;position:relative}
.steps::before{content:"";position:absolute;left:calc(48px + .5px);top:12px;bottom:12px;width:1px;
  background:linear-gradient(180deg,transparent,var(--line),transparent)}
.step{display:grid;grid-template-columns:96px 1fr;gap:30px;padding:22px 0;
  opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s ease}
.step.in{opacity:1;transform:none}
.idx{font-family:var(--mono);font-size:15px;color:var(--champ);position:relative;padding-top:6px}
.idx .n{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;
  background:var(--surface);border:1px solid var(--line);color:var(--ink)}
.step h3{font-size:clamp(22px,2.8vw,30px);margin-bottom:8px}
.step .trigger{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--rouge);margin-bottom:10px;display:inline-block;
  padding:4px 10px;border:1px solid var(--line-soft);border-radius:2px}
.step p{color:var(--ink-soft);max-width:56ch}

/* ---- included ---- */
.inc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:38px}
.inc{background:var(--surface);border:1px solid var(--line-soft);border-radius:4px;padding:22px;
  display:flex;gap:12px;align-items:flex-start}
.inc .tick{color:var(--rouge);font-family:var(--mono);flex:none;margin-top:2px}
.inc span{font-size:15px;color:var(--ink)}

/* ---- proof / structure numbers ---- */
.facts{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:38px}
.fact{text-align:left;padding:26px 22px;border:1px solid var(--line-soft);border-radius:4px;background:var(--surface)}
.fact .big{font-family:var(--serif);font-size:clamp(38px,5vw,52px);color:var(--rose);line-height:1;
  font-variant-numeric:tabular-nums}
.fact .lbl{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-mute);margin-top:12px}

/* ---- offer ---- */
.offer{padding:86px 0;border-bottom:1px solid var(--line-soft)}
.offer-card{background:var(--surface);border:1px solid var(--line);border-radius:8px;
  box-shadow:var(--shadow);overflow:hidden}
.offer-head{padding:38px 40px;border-bottom:1px solid var(--line-soft);
  display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:20px}
.offer-head h2{font-size:clamp(28px,4vw,40px)}
.offer-head .tag{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--champ)}
.offer-body{display:grid;grid-template-columns:1.35fr 1fr}
.offer-list{padding:34px 40px}
.offer-list .row{display:flex;gap:12px;padding:11px 0;border-bottom:1px dashed var(--line-soft);font-size:15px;color:var(--ink-soft)}
.offer-list .row:last-child{border-bottom:0}
.offer-list .row b{color:var(--ink);font-weight:600}
.offer-list .tick{color:var(--rouge);font-family:var(--mono)}
.price{padding:34px 40px;background:var(--surface-2);border-left:1px solid var(--line-soft);
  display:flex;flex-direction:column;gap:6px;justify-content:center}
.price .setup{font-family:var(--serif);font-size:clamp(36px,5vw,52px);line-height:1}
.price .setup small{font-family:var(--mono);font-size:13px;color:var(--ink-mute);letter-spacing:.08em}
.price .mo{font-family:var(--mono);font-size:14px;color:var(--ink-soft);letter-spacing:.04em;margin-top:4px}
.price .note{font-size:12.5px;color:var(--ink-mute);margin-top:10px;line-height:1.5}
.price .btn{margin-top:20px;text-align:center}

.guarantee{margin-top:26px;display:flex;gap:16px;align-items:flex-start;
  padding:24px 26px;border:1px solid var(--line);border-radius:6px;background:
  linear-gradient(180deg,color-mix(in srgb,var(--rouge) 8%,transparent),transparent)}
.guarantee .seal{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--rouge);flex:none;padding-top:3px}
.guarantee p{color:var(--ink-soft);font-size:15px}
.guarantee b{color:var(--ink)}

/* ---- close ---- */
.close{padding:92px 0 40px;text-align:center}
.close h2{font-size:clamp(30px,5vw,54px);margin-bottom:22px}
.close .lede{margin:0 auto 34px}
footer{padding:30px 0 60px;text-align:center;color:var(--ink-mute);
  font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase}

@media (max-width:820px){
  .leak-grid,.offer-body,.facts{grid-template-columns:1fr}
  .inc-grid{grid-template-columns:1fr 1fr}
  .facts{grid-template-columns:1fr 1fr}
  .price{border-left:0;border-top:1px solid var(--line-soft)}
  .step{grid-template-columns:64px 1fr;gap:18px}
  .steps::before{left:32px}
  .idx .n{width:36px;height:36px}
}
@media (max-width:480px){.inc-grid{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.step{opacity:1;transform:none;transition:none}.btn{transition:none}}
</style>

<section class="hero">
  <div class="sheen"></div>
  <div class="wrap">
    <div class="brand"><span class="dot"></span><b>Salon&nbsp;Autopilot</b></div>
    <p class="eyebrow">Done-for-you automation · for nail salons</p>
    <h1>Every booking becomes a <em>five-star</em> experience — without you lifting a finger.</h1>
    <p class="lede">One system runs the entire client journey for you: online booking, technician matching,
      confirmations, reminders, a signature check-in, loyalty, and reviews. From the tap that books them
      to the moment they rave about you online.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#offer">See the offer</a>
      <a class="btn btn-ghost" href="#journey">Watch the journey</a>
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <p class="eyebrow">The leak</p>
    <h2>Right now, revenue slips through the cracks.</h2>
    <p class="lede">Every step your team does by hand is a step where a client — or a five-star review — quietly disappears.</p>
    <div class="leak-grid">
      <div class="leak"><span class="k">No-shows</span><p>A forgotten appointment is an empty chair you can't rebook in time.</p></div>
      <div class="leak"><span class="k">Front-desk drag</span><p>Staff buried in scheduling and phone tag instead of caring for guests.</p></div>
      <div class="leak"><span class="k">Silent fans</span><p>Delighted clients walk out and never leave the review that wins the next one.</p></div>
      <div class="leak"><span class="k">Forgotten loyalty</span><p>Points on a paper card nobody updates — so nobody comes back for them.</p></div>
    </div>
  </div>
</section>

<section class="journey" id="journey">
  <div class="wrap">
    <p class="eyebrow">The system · 7 automated steps</p>
    <h2 style="font-size:clamp(30px,4.4vw,46px)">One booking sets everything in motion.</h2>
    <div class="steps">
      <div class="step"><div class="idx"><span class="n">01</span></div><div>
        <span class="trigger">Trigger · website form</span>
        <h3>They book online</h3>
        <p>A client books an appointment on your site and fills out a short form. That single action starts the entire flow — no calls, no back-and-forth.</p></div></div>
      <div class="step"><div class="idx"><span class="n">02</span></div><div>
        <span class="trigger">Auto · smart matching</span>
        <h3>Matched to the right technician</h3>
        <p>The system reads the service and assigns the best-fit technician automatically — the right hands for every request.</p></div></div>
      <div class="step"><div class="idx"><span class="n">03</span></div><div>
        <span class="trigger">Auto · calendar + email</span>
        <h3>Confirmed in seconds</h3>
        <p>A calendar invite is created and a branded confirmation email lands in their inbox — instantly, every time.</p></div></div>
      <div class="step"><div class="idx"><span class="n">04</span></div><div>
        <span class="trigger">−24 hours · reminder</span>
        <h3>Reminded — and rescued</h3>
        <p>A reminder goes out the day before. If they cancel, an automatic reschedule email brings them right back to the calendar instead of the void.</p></div></div>
      <div class="step"><div class="idx"><span class="n">05</span></div><div>
        <span class="trigger">In-salon · tablet check-in</span>
        <h3>A check-in that feels like arrival</h3>
        <p>They check in on the tablet. Their technician is notified — and the music they chose and the lighting they love begin the moment they sit down.</p></div></div>
      <div class="step"><div class="idx"><span class="n">06</span></div><div>
        <span class="trigger">On complete · loyalty</span>
        <h3>Loyalty, updated automatically</h3>
        <p>The instant the service is finished, their loyalty points update — no punch cards, no manual tallying, no forgotten rewards.</p></div></div>
      <div class="step"><div class="idx"><span class="n">07</span></div><div>
        <span class="trigger">After · review capture</span>
        <h3>The five-star ask, perfectly timed</h3>
        <p>Happy guests are invited to leave a 4- or 5-star review with a direct link — sent at the exact moment they're glowing.</p></div></div>
    </div>
  </div>
</section>

<section class="block">
  <div class="wrap">
    <p class="eyebrow">What you get</p>
    <h2>Built, installed, and running in your salon.</h2>
    <div class="inc-grid">
      <div class="inc"><span class="tick">+</span><span>Custom booking form &amp; website integration</span></div>
      <div class="inc"><span class="tick">+</span><span>Automatic technician assignment</span></div>
      <div class="inc"><span class="tick">+</span><span>Calendar invites &amp; branded confirmations</span></div>
      <div class="inc"><span class="tick">+</span><span>Reminders &amp; automatic reschedule flow</span></div>
      <div class="inc"><span class="tick">+</span><span>Tablet check-in with music &amp; lighting triggers</span></div>
      <div class="inc"><span class="tick">+</span><span>Automated loyalty-point tracking</span></div>
      <div class="inc"><span class="tick">+</span><span>Review-generation flow for 4–5★ guests</span></div>
      <div class="inc"><span class="tick">+</span><span>Setup, testing &amp; staff training</span></div>
      <div class="inc"><span class="tick">+</span><span>Ongoing monitoring &amp; support</span></div>
    </div>
    <div class="facts">
      <div class="fact"><div class="big">7</div><div class="lbl">Automated steps</div></div>
      <div class="fact"><div class="big">24h</div><div class="lbl">Reminder + reschedule</div></div>
      <div class="fact"><div class="big">0</div><div class="lbl">Front-desk effort</div></div>
      <div class="fact"><div class="big">4–5★</div><div class="lbl">Reviews captured</div></div>
    </div>
  </div>
</section>

<section class="offer" id="offer">
  <div class="wrap">
    <p class="eyebrow">The offer</p>
    <div class="offer-card">
      <div class="offer-head">
        <h2>Salon Autopilot — done for you</h2>
        <span class="tag">Limited build slots</span>
      </div>
      <div class="offer-body">
        <div class="offer-list">
          <div class="row"><span class="tick">✓</span><span><b>Full 7-step automation</b> — built end to end for your salon</span></div>
          <div class="row"><span class="tick">✓</span><span><b>Website &amp; booking integration</b> on your existing site</span></div>
          <div class="row"><span class="tick">✓</span><span><b>Tablet check-in kit</b> with music &amp; lighting triggers configured</span></div>
          <div class="row"><span class="tick">✓</span><span><b>Loyalty &amp; review engines</b> connected and tested</span></div>
          <div class="row"><span class="tick">✓</span><span><b>Staff training</b> so your team runs it day one</span></div>
          <div class="row"><span class="tick">✓</span><span><b>Monitoring &amp; support</b> — we keep it humming</span></div>
        </div>
        <div class="price">
          <div class="setup">$1,500 <small>one-time build</small></div>
          <div class="mo">then $297 / month · support &amp; hosting</div>
          <p class="note">No long-term contract — stay because it works. Pricing shown is a starting point you can set to your market.</p>
          <a class="btn btn-primary" href="#book">Claim your build slot</a>
        </div>
      </div>
    </div>
    <div class="guarantee">
      <span class="seal">Guarantee</span>
      <p><b>Live, or it's on us.</b> If your system isn't up and running exactly as promised, you don't pay a cent of the monthly until it is. The risk is ours to carry.</p>
    </div>
  </div>
</section>

<section class="close" id="book">
  <div class="wrap">
    <p class="eyebrow">Ready when you are</p>
    <h2>Let your salon run itself.</h2>
    <p class="lede">Book a 15-minute walkthrough and see the full journey live — from the booking tap to the five-star review.</p>
    <div class="cta-row" style="justify-content:center">
      <a class="btn btn-primary" href="#book">Book a 15-minute walkthrough</a>
      <a class="btn btn-ghost" href="#journey">Replay the journey</a>
    </div>
  </div>
</section>

<footer>Salon Autopilot · Done-for-you client-experience automation</footer>

<script>
(function(){
  var els=document.querySelectorAll('.step');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches){
    els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){
    if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.25});
  els.forEach(function(e){io.observe(e)});
})();
</script>
"""

HTML = HTML.replace("__ITALIANA__", italiana).replace("__DMMONO__", dmmono)
out = pathlib.Path("/home/user/my-claude-project/nail_salon_offer/offer.html")
out.write_text(HTML, encoding="utf-8")
print("wrote", out, len(HTML), "bytes")
