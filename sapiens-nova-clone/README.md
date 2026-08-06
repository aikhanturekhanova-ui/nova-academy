# Sapiens Nova Academy — Static Clone & Redesign Baseline

Статическая копия сайта https://www.sapiens-nova.com/ («как есть»), подготовленная как
основа для редизайна в рамках стажировки.

## Запуск

```bash
# из корня проекта
cd pages
python -m http.server 8080
# открыть http://localhost:8080/
```

Либо открыть `pages/index.html` напрямую в браузере (работают все страницы; файловый
протокол допустим, т.к. клон не использует fetch).

## Структура

```
sapiens-nova-clone/
├── pages/                  # статический сайт (HTML/CSS/JS)
│   ├── index.html          # главная (hero, who-we-are, featured, founders, footer)
│   ├── programs.html       # программы (hero, customised, track record)
│   ├── programme-imperial.html      # детальная страница Imperial Motorsport
│   ├── programme-human-tech.html    # детальная страница Human+Tech
│   ├── checkout.html       # запись на программу (форма + order summary)
│   ├── media.html          # галереи программ
│   ├── media-human-tech.html        # вход в приватную галерею (пароль)
│   ├── media-imperial-motorsport.html
│   ├── data-privacy-terms.html
│   ├── css/styles.css      # полная дизайн-система клона
│   └── js/main.js          # интерактив (меню, слайд-шоу, табы, чекаут, FAQ, галерея)
├── assets/
│   ├── images/             # оригинальные изображения и видео (переименованы)
│   ├── fonts/              # Karla-VF, Tobias-VF, Tobias-Italic-VF, Mulish-VF
│   ├── icons/              # sapiens-logo, victory, circle, spiky
│   └── favicon.ico
├── design-tokens/          # цвета, типографика, сетка/спейсинг, компоненты
├── content/                # тексты всех страниц, sitemap, ссылки, API-данные
├── screenshots/            # эталонные скриншоты оригинала (desktop + mobile)
└── CHANGELOG.md            # что отличается от оригинала (подготовка к редизайну)
```

## Демо-доступы

- Приватные галереи (`media-human-tech.html`, `media-imperial-motorsport.html`):
  пароль `SNA2026` (в оригинале галереи закрыты паролем, контент не публичный).
- Чекаут: форма не отправляет данные (демо-режим). Промо-код: любой текст.

## Что такое клон «как есть»

- Структура страниц, тексты, изображения, видео, иконки, шрифты, цвета, радиусы,
  анимации (marquee 70s, ken-burns 20s, слайд-шоу 5s) воспроизведены по оригиналу.
- Программы и цены взяты из API оригинала: Imperial Motorsport (London, 19–25 Jul 2026,
  GBP 4,580 / early bird 3,980, app fee GBP 100) и Human+Tech (Awaji Island, 13–17 Jul 2026,
  HKD 17,000 / early bird 15,000, deposit HKD 3,000).
- На момент копирования регистрация на обе программы закрыта — кнопки записи
  заменены состоянием «Registration Closed» (как в оригинале).

## Технологии

Оригинал: Astro 5 (SSG) + Tailwind CSS 4 + React-островки (shadcn/ui-стиль) + GSAP.
Клон: чистый HTML/CSS/JS без зависимостей — для удобства анализа и редизайна.
