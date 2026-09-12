# Корпорація ЕНСІ — лендинг

Односторінковий сайт за макетом Figma. Vue 3 + Vite, дві мови (UA/EN), три версії за макетом: телефон 390, планшет 768, десктоп 1440. На ноутбуках 1024–1439px десктопний макет пропорційно зменшується під ширину екрана.

## Локальний запуск

```bash
npm install      # один раз
npm run dev      # сайт на http://localhost:5173
npm test         # тести
npm run build    # збірка в папку dist
```

Мову можна відкрити напряму: `http://localhost:5173/?lang=en`.

## Публікація на GitHub Pages

1. На GitHub створи **порожній публічний** репозиторій (без README, без .gitignore).
2. У терміналі в папці проєкту:

```bash
git remote add origin https://github.com/<твій-логін>/<назва-репозиторію>.git
git push -u origin main
```

3. У репозиторії відкрий **Settings → Pages** і в полі **Source** вибери **GitHub Actions**.
4. Зачекай хвилину. Сайт з'явиться за адресою `https://<твій-логін>.github.io/<назва-репозиторію>/`.

Кожен наступний `git push` у гілку `main` автоматично збирає і публікує нову версію.

## Свій домен і SEO

Абсолютна адреса сайту для canonical, Open Graph, robots.txt і sitemap.xml береться зі змінної `VITE_SITE_URL`.
У workflow вона задана як `https://corpnc.com/` (домен сайту). Шлях з цієї адреси стає базовим шляхом збірки,
тому для github.io-адреси з підпапкою треба було б вказати повну адресу з назвою репозиторію.

DNS для домену (панель реєстратора): чотири A-записи `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153,
185.199.111.153 і CNAME `www` → `vicecompositionlv-commits.github.io`. У GitHub: Settings → Pages → Custom domain → `corpnc.com`,
після перевірки увімкнути Enforce HTTPS.

При збірці сторінки пререндеряться: `/` — українська, `/en/` — англійська, з готовим текстом у HTML для Google.
Картинка для шерингу — `public/og.jpg`, іконка сайту — `public/favicon.svg`.
Після публікації додай сайт у Google Search Console і вкажи там `sitemap.xml`.

## Структура

```
index.html                 підключення шрифтів (Geologica, Inter)
src/i18n.js                усі тексти обома мовами
src/App.vue                стан мови, композиція секцій
src/entry-server.js        рендер сторінки для пререндеру
scripts/prerender.mjs      генерує dist/index.html і dist/en/index.html після збірки
public/                    favicon.svg, og.jpg
src/components/            AppHeader, HeroSection, AboutSection, ContactsSection
src/assets/                фото, логотип, іконки з макета
.github/workflows/         автодеплой на GitHub Pages
```

Щоб змінити текст, редагуй `src/i18n.js`. Щоб замінити фото, поклади новий файл з тією ж назвою в `src/assets/`.
