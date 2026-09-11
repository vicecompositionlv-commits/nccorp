# Корпорація ЕНСІ — лендинг

Односторінковий сайт за макетом Figma. Vue 3 + Vite, дві мови (UA/EN), тільки десктоп (1440px).

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

## Структура

```
index.html                 підключення шрифтів (Geologica, Inter)
src/i18n.js                усі тексти обома мовами
src/App.vue                стан мови, композиція секцій
src/components/            AppHeader, HeroSection, AboutSection, ContactsSection
src/assets/                фото, логотип, іконки з макета
.github/workflows/         автодеплой на GitHub Pages
```

Щоб змінити текст, редагуй `src/i18n.js`. Щоб замінити фото, поклади новий файл з тією ж назвою в `src/assets/`.
