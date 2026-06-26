# CryptoAffiliate.hub

Партнёрский лендинг для криптобирж (Bybit, OKX, Binance, HTX, MEXC, Bitget, KuCoin) с SEO-блогом.

## Структура

```
affiliate-landing/
├── index.html              # Главная
├── articles/
│   ├── index.html          # Блог (с фильтрами)
│   ├── rss.xml             # RSS фид
│   ├── bybit-okx-binance-sravnenie-2026.html
│   ├── kak-pokupat-kriptovalyutu-rossiya-2026.html
│   ├── zarabotok-na-partnyorkah-kriptobirzh.html
│   ├── kyc-kriptobirzhi-2026.html
│   └── bybit-obzor-2026.html
├── src/
│   ├── styles.css          # Все стили (premium dark SaaS)
│   ├── data.js             # Данные бирж, FAQ, статей
│   └── main.js             # Интерактив (тикер, калькулятор, FAQ, карточки)
├── assets/
│   ├── logo.svg            # Логотип
│   └── favicon.svg         # Favicon
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Запуск локально

```bash
cd /root/freelance-warroom/affiliate-landing
python3 -m http.server 8080
# Открой http://localhost:8080
```

## Деплой

Vercel: `vercel deploy --prod`

## Что нужно сделать

1. **Заменить партнёрские ссылки** в `src/data.js` (поле `link` для каждой биржи) на реальные реферальные ID.
2. **Получить Yandex Metrika ID** и раскомментировать строку `ym(XXXXXXXX, "init", ...)` в `index.html`.
3. **Добавить Google Analytics** (gtag).
4. **Подключить домен** в Vercel Dashboard.
5. **Прогнать по PageSpeed Insights** и оптимизировать если нужно.

## Технологии

- Чистый статический HTML (никаких сборок/фреймворков)
- Vanilla JS для интерактива
- Никаких зависимостей
- Mobile-first responsive
- Schema.org разметка (Organization, WebSite, FAQPage, BreadcrumbList, Blog, Article)
- OpenGraph + Twitter Cards
- RSS feed

## Монетизация

- Партнёрские комиссии с бирж (CPA + revenue share)
- Целевой трафик: 500+ уников/день за 3 месяца → $1 500–$5 000/мес