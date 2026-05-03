# Tashkent Guide — Туристический гид

Мультиязычный интерактивный гид по Ташкенту (RU / EN / ZH).  
Сделан на React + Vite + Tailwind CSS. Деплоится на GitHub Pages автоматически.

---

## Быстрый старт (локально)

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`

---

## Деплой на GitHub Pages — пошагово

### 1. Создай репозиторий на GitHub
Назови его, например, `tashkent-guide`.

### 2. Укажи название репозитория в `vite.config.js`
```js
base: '/tashkent-guide/'
```

### 3. Включи GitHub Pages в настройках репозитория
- Зайди в репозиторий → **Settings** → **Pages**
- Source: выбери **GitHub Actions**

### 4. Залей код на GitHub
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/tashkent-guide.git
git push -u origin main
```

### 5. Готово
После пуша GitHub Actions автоматически соберёт и задеплоит сайт.  
Через ~2 минуты он будет доступен по адресу:

```
https://ВАШ_ЛОГИН.github.io/tashkent-guide/
```

---

## Структура проекта

```
tashkent-guide/
├── .github/workflows/deploy.yml   ← автодеплой
├── src/
│   ├── App.jsx                    ← весь контент и UI
│   ├── main.jsx                   ← точка входа
│   └── index.css                  ← Tailwind
├── index.html
├── vite.config.js                 ← не забудь поменять base!
└── package.json
```
