/* ============================================
   Main JS — ticker, calculator, cards, FAQ, mobile nav
   ============================================ */

(function() {
  'use strict';
  const D = window.DATA;

  /* ====== Ticker ====== */
  function renderTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    const items = D.ticker.map(t => {
      const dir = t.change >= 0 ? 'up' : 'down';
      const arrow = t.change >= 0 ? '▲' : '▼';
      const sign = t.change >= 0 ? '+' : '';
      return `<span class="ticker__item ${dir}"><b>${t.sym}</b> $${t.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 4})} <span style="color:${t.change >= 0 ? 'var(--mint)' : 'var(--danger)'};font-weight:600;">${arrow} ${sign}${t.change.toFixed(2)}%</span></span>`;
    }).join('');
    track.innerHTML = items + items; // duplicate for seamless scroll
  }

  /* ====== Hero floating cards ====== */
  function renderHeroCards() {
    const stack = document.getElementById('heroStack');
    if (!stack) return;
    const cards = [
      { cls: 'hero-card--1', label: 'Портфель', value: '$124,532.18', delta: '+12.4% за месяц', chart: [40,55,48,62,58,72,68,82,76,92,88,96] },
      { cls: 'hero-card--2', label: 'Доход за день', value: '$2,847', delta: '+8.2%', chart: [30,42,38,55,48,62,58,72,68,82,78,90] },
      { cls: 'hero-card--3', label: 'Рефералы', value: '1,247', delta: '+47 за неделю', chart: null }
    ];
    stack.innerHTML = cards.map(c => `
      <div class="hero-card ${c.cls}">
        <div class="hc-label">${c.label}</div>
        <div class="hc-value">${c.value}</div>
        <div class="hc-delta">▲ ${c.delta}</div>
        ${c.chart ? `<div class="hc-chart">${c.chart.map(h => `<span style="height:${h}%"></span>`).join('')}</div>` : ''}
      </div>
    `).join('');
  }

  /* ====== Exchanges grid ====== */
  function renderExchanges() {
    const grid = document.getElementById('exchangesGrid');
    if (!grid) return;
    grid.innerHTML = D.exchanges.map(ex => `
      <div class="ex-card" id="${ex.id}">
        <div class="ex-card__top">
          <div class="ex-card__name">
            <div class="ex-card__logo" style="background:${ex.color}">${ex.logo}</div>
            <div>
              <h3>${ex.name}</h3>
              <span>${ex.bonusType}</span>
            </div>
          </div>
          <span class="ex-card__rank">#${ex.rank}</span>
        </div>
        <div class="ex-card__bonus">🎁 <b>${ex.bonus}</b></div>
        <div class="ex-card__fees">
          <div><small>Спот</small><b>${ex.spotFee}</b></div>
          <div><small>Фьючерсы</small><b>${ex.futuresFee}</b></div>
        </div>
        <ul class="ex-card__features">
          ${ex.features.map(([text, ok]) => `<li class="${ok ? '' : 'no'}">${text}</li>`).join('')}
        </ul>
        <div class="ex-card__cta">
          <a href="${ex.link}" target="_blank" rel="nofollow sponsored noopener" class="btn btn--primary" data-exchange="${ex.name}">
            Получить бонус на ${ex.name} →
          </a>
        </div>
      </div>
    `).join('');

    // Cursor follow effect on cards
    grid.querySelectorAll('.ex-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    // Track clicks
    grid.querySelectorAll('.ex-card__cta a').forEach(a => {
      a.addEventListener('click', () => {
        const ex = a.getAttribute('data-exchange');
        if (typeof ym === 'function') ym(0, 'reachGoal', 'exchange_click', { exchange: ex });
        if (typeof gtag === 'function') gtag('event', 'affiliate_click', { exchange: ex });
      });
    });
  }

  /* ====== Compare table ====== */
  function renderCompare() {
    const tbody = document.getElementById('compareBody');
    if (!tbody) return;
    tbody.innerHTML = D.exchanges.map(ex => `
      <tr>
        <td><div class="ex-name"><div class="ex-logo" style="background:${ex.color}">${ex.logo}</div>${ex.name}</div></td>
        <td class="bonus-cell">${ex.bonus}</td>
        <td>${ex.spotFee}</td>
        <td>${ex.futuresFee}</td>
        <td class="${ex.p2p ? 'yes' : 'no'}">${ex.p2p ? '✓' : '—'}</td>
        <td>${ex.kyc}</td>
        <td>${ex.ru}</td>
        <td><a href="${ex.link}" target="_blank" rel="nofollow sponsored noopener" class="btn btn--ghost btn--sm">→</a></td>
      </tr>
    `).join('');
  }

  /* ====== Articles preview ====== */
  function renderArticles() {
    const grid = document.getElementById('articlesPreview');
    if (!grid) return;
    grid.innerHTML = D.articles.map(a => `
      <a href="${a.url}" class="article-card">
        <span class="article-card__tag">${a.tag}</span>
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <div class="article-card__meta">
          <span>📅 ${a.date}</span>
          <span>⏱ ${a.read}</span>
        </div>
      </a>
    `).join('');
  }

  /* ====== FAQ ====== */
  function renderFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = D.faq.map((item, i) => `
      <div class="faq-item">
        <button class="faq-item__q" aria-expanded="false">${item.q}</button>
        <div class="faq-item__a"><p>${item.a}</p></div>
      </div>
    `).join('');

    list.querySelectorAll('.faq-item__q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
      });
    });

    // Open first item
    list.querySelector('.faq-item')?.classList.add('open');
  }

  /* ====== Calculator ====== */
  function calc() {
    const refs = +document.getElementById('refs').value || 0;
    const volume = +document.getElementById('volume').value || 0;
    const share = +document.getElementById('exchange').value || 0;

    const feeRate = 0.001; // 0.1% combined taker+maker
    const feePerRef = volume * feeRate;
    const totalFee = feePerRef * refs;
    const income = totalFee * share;
    const rub = income * 92; // RUB/USD

    document.getElementById('calcAmount').textContent = '$' + income.toLocaleString('en-US', {maximumFractionDigits: 0});
    document.getElementById('calcFee').textContent = '$' + totalFee.toLocaleString('en-US', {maximumFractionDigits: 0});
    document.getElementById('calcShare').textContent = '$' + income.toLocaleString('en-US', {maximumFractionDigits: 0});
    document.getElementById('calcRub').textContent = rub.toLocaleString('ru-RU', {maximumFractionDigits: 0}) + ' ₽';
  }

  function bindCalc() {
    ['refs', 'volume', 'exchange'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calc);
    });
  }

  /* ====== Mobile burger ====== */
  function bindBurger() {
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    if (!burger || !nav) return;
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  /* ====== Cookie bar ====== */
  function bindCookie() {
    const bar = document.getElementById('cookie');
    const ok = document.getElementById('cookieOk');
    if (!bar || !ok) return;
    if (!localStorage.getItem('cookieAccepted')) {
      setTimeout(() => bar.classList.add('show'), 1500);
    }
    ok.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', '1');
      bar.classList.remove('show');
    });
  }

  /* ====== Header shadow on scroll ====== */
  function bindScroll() {
    const h = document.getElementById('header');
    if (!h) return;
    let last = 0;
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      h.style.boxShadow = s > 8 ? '0 8px 32px rgba(0,0,0,0.4)' : 'none';
      last = s;
    }, { passive: true });
  }

  /* ====== Init ====== */
  document.addEventListener('DOMContentLoaded', () => {
    renderTicker();
    renderHeroCards();
    renderExchanges();
    renderCompare();
    renderArticles();
    renderFAQ();
    bindCalc();
    bindBurger();
    bindCookie();
    bindScroll();
    calc();
  });
})();