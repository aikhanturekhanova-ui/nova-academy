# Компоненты дизайн-системы sapiens-nova.com

Источник: разбор разметки и CSS (02.08.2026). Все размеры — из Tailwind-классов оригинала.

## 1. Кнопки (Buttons)

| Компонент | Стиль | Состояния |
|---|---|---|
| **Hero CTA** (`ENROL NOW` / `EXPLORE PROGRAMMES`) | radius 30px, px-8/9, py-3.5/4, uppercase, tracking-wide, 14-16px/500; фон `--brand-primary-light` + чёрный текст ИЛИ `--brand-primary` + белый текст | hover: opacity-90 + scale-105; transition-all 300ms |
| **Кнопка навигации** `ENROL NOW` (хедер) | rounded-full, px-5 py-2, h-9, 14px/500 uppercase, `bg-program-cornfield` (#2563EB) + белый | hover: opacity/90 (bg-/90) |
| **Текстовые nav-ссылки** | 14px/500 uppercase tracking-wide чёрный | hover: opacity-70 |
| **"Find out more"** (карточки программ) | rounded-full h-10 px-6 14px/500 + стрелка →, `bg-brand-primary` | hover: bg-/90 |
| **"Learn More"** (Our Services) | rounded-full h-10 px-6 14px/500, `bg-brand-coral-light` (#DBEAFE) + чёрный текст | hover: bg-/90 |
| **"MEET OUR TEAM"** | rounded-full px-10 py-6 16px/700 uppercase, `bg-brand-coral` | hover: bg-/90 |
| **"EXPLORE PROGRAMMES"** (страница programs) | rounded-full px-12 py-6 16px/500 uppercase tracking-wide shadow-lg, `bg-brand-coral` | hover: bg-/90 |
| **"Proceed to Payment"** (чекаут) | rounded-[30px] px-10 py-4 uppercase tracking-wider 16px/500, `bg-program-azure` (#AA63EB), иконка замка | hover: bg-/90 + scale-105; disabled: спиннер "Processing..." |
| **Промо-код "Apply"** | outline: border-2, rounded-[20px], h-12 px-5 | disabled без кода/программы |

## 2. Пилюли / бейджи (Pills/Badges)

- Круглые (rounded-full) с px-4 py-1 / px-6 py-2.5.
- Текстовые: "Who We Are" (жёлтая/синяя пилюля `brand-primary`, белый текст uppercase), "Our Programmes", "Featured Programmes", "Customised Programmes", "Our Track Record" (страница programs), "Enrollment" (чекаут), "Meet Our Founders" (`brand-primary-light` + чёрный).
- Бейдж категории программы: `bg-program-cornfield` белый текст, capitalize, в чекауте `text-sm`.
- Бейдж локации (Featured карточки): `bg-brand-coral-light` + чёрный текст, uppercase text-sm.
- Бейдж раздела карточек программ: `bg-program-cornfield text-white px-5 py-3 text-xl/2xl uppercase font-semibold rounded-full inline-flex`.

## 3. Карточки (Cards)

**Карточка программы (главная / другие программы)**:
- Ряды: `flex-col md:flex-row` + чередование `md:even:flex-row-reverse`, gap-x-12, rounded-2xl p-8 shadow-lg.
- Цвета фона чередуются: `bg-linen` (текст чёрный), `brand-azure` (белый), `brand-stromboli` (белый), `brand-coral` (белый).
- Медиа: aspect-[4/3], rounded-xl, basis-1/2, тень, фон white/20.
- Кнопка "Find out more" → mailto:info@sapiens-nova.com?subject=Enquiry: SNA {название} programme.

**Карточка Featured Programme (динамическая, API)**:
- rounded-xl p-6 pb-8 shadow-lg; фон: `brand-stromboli` / `brand-azure` (по очереди).
- hover: scale-105 shadow-xl, transition-all 300ms.
- Содержимое: медиа h-48 object-cover (видео autoplay loop muted / img), бейдж локации, заголовок serif text-2xl/3xl semibold, описание text-white/90, баннер Imperial (bg-white/20 border-l-4 white), кнопки "Learn More" (outline) + "Enroll Now" (светлая) / "Registration Closed" (disabled white/30).
- Ссылки: Learn More → /programmes/{id}; Enroll Now → /checkout?programmeId={id}.

**Карточка отзыва (testimonial)**:
- w 300/350/400px, rounded-[35px], min-h-400px, p-8, фон чередуется: program-coral, white, program-linen, program-azure, program-stromboli; shadow-lg.
- Наклон: rotate -6°..+5°; hover: rotate-0 scale-105 z-10.
- Структура: иконка цитаты (lucide quote, 40-48px), текст 15px/24px по центру, разделитель h-px w-60px opacity-20, имя 17px/24px, подпись 10px uppercase tracking-widest opacity-80.
- Бегущая строка (marquee 70s), пауза на hover.

**Карточка основателя (Founder)**:
- w 320px, rounded-[24px] p-6 pb-8 min-h-550px shadow-xl; фон: bg-linen (Benny Lo), brand-azure (Sammi Wong), brand-coral (Rina Lai).
- Десктоп: абсолютное позиционирование в контейнере h 650px; hover: -rotate-1, scale-105, -translate-y-2, z-60.
- Структура: имя serif 20-24px, роль 12px uppercase tracking-wide, фото 220px rounded-16 object-cover (object-position center 8-15%), список заслуг text-xs leading-1.45, соцссылки LinkedIn (lucide) + Google Scholar (кастомная).

## 4. Навигация (Header)

- Фиксированный (fixed top-0), bg-white/95 shadow-sm, z-index 1700.
- Десктоп: 3 колонки (ссылки слева: WHO WE ARE / PROGRAMMES / GALLERIES; логотип по центру h-12 mix-blend-multiply; справа: ENROL NOW / CONTACT + кнопка).
- Мобайл (<md): логотип h-10 + бургер (lucide menu 32px). Панель справа 85%/400px, z-1800, оверлей black/50 z-1799, ссылки 16px uppercase py-5 border-b + chevron-right.
- Ссылки-якоря: `/#who-we-are`, `/#footer` (плавный скролл).

## 5. Hero-секция

- min-h-svh/md:min-h-screen, bg-black, padding-top clamp(7rem,20vw,314px).
- Слайд-шоу из 4 фото (crossfade 1s, интервал 5s), эффект ken-burns 20s, object-position top.
- Градиентные оверлеи: горизонтальный (black/80→60→30) + вертикальный (black/40→transparent→black/60).
- Заголовок serif белый 40-72px, text-shadow, white-space pre-line ("Embrace Your Future:\nInnovate, Heal, Inspire").
- CTA-кнопки (2 шт.) с GSAP-анимацией появления (fade-up).
- Бегущая строка-анонс внизу: фон brand-primary-light, текст serif 18-30px чёрный + иконка календаря brand-primary: "Enrollment for Summer Programmes is now open".

## 6. Формы (Checkout)

- Поля: Programme (селект), Student's Information (First/Last Name, Age, Gender-селект, School, Country), Your Information (First/Last Name, Email, Relationship-селект, Phone optional), промо-код.
- Инпуты: h-12, border-2, radius 20px, border-black/10 (ошибка: border-program-coral), placeholder text-base.
- Ошибки: text-sm text-program-coral под полем.
- Order Summary (sticky top-24): фото, название, категория, длительность, локация, Application Fee/Deposit/Programme Fee (early bird — с зачёркнутой ценой и пометкой), "Charging now" + сумма, подсказка о письме подтверждения (bg-program-cornfield/30 p-4 rounded-[20px]).
- Декоративные элементы фона: victory.svg (opacity-20), spiky.webp (opacity-15 rotate-15), circle.svg (opacity-15).
- Секция "Registration Is Closed" вместо формы, если рег. закрыта.

## 7. Табы (Track Record, страница programs)

- Пилюля-навигация: белый текст на bg-blue-300 (active — absolute-индикатор bg-brand-primary rounded-lg), 12-14px semibold.
- Мобайл: карусель с chevron-кнопками и текущим названием в pill-контейнере.
- Контент: карточка white rounded-3xl shadow-lg p-8/12, сетка 2 колонки: медиаслайдер (видео autoplay, стрелки, точки-индикаторы) + список benefits с буллетами-галочками (lucide check, text-brand-coral).

## 8. FAQ-аккордеон (страницы программ)

- white rounded-lg border border-gray-200; кнопка w-full px-6 py-4 semibold gray-900 + chevron (rotate-180 при открытии); контент px-6 pb-4 text-gray-700 leading-relaxed, маркеры "- " → ul list-disc.

## 9. Галереи (/media)

- Карточка галереи: rounded-3xl border slate-200 bg-white p-8 shadow-sm, hover: -translate-y-1 shadow-xl; иконка изображения в bg-blue-50, заголовок text-2xl semibold, "Private gallery — Password required", "Open gallery →" с group-hover:translate-x-1.
- Страница входа: bg-slate-950 (тёмная), форма с input password (rounded-xl bg-white/10) + кнопка bg-blue-600; ошибка text-red-300.

## 10. Футер

- bg-sage (#F9FAFB), py-16/24, min-h-600px; сетка 3 колонки (бренд+соцсети / Quick Links / Contact Us).
- Логотип h-14/16, слоган "Embrace Your Future: Innovate, Heal, Inspire".
- Соцсети: LinkedIn, Instagram, Facebook (lucide 24-28px).
- Нижняя строка: © 2026 Sapiens Nova. All rights reserved. + Privacy Policy / Terms of Service (ссылки на /data-privacy-terms и /#footer).

## 11. Чат-виджет (Sapiens AI)

- Фиксированная кнопка bottom-4/8 right-4/8, 56px, rounded-full, bg-card shadow-lg, логотип sapiens-logo.svg 32px; hover: opacity-80 scale-110; z-1900.

## 12. Прочее

- Scrollbar-hide: утилита скрытия скроллбаров у табов.
- Ken-burns перезапуск: при смене слайда класс animate-ken-burns снимается/добавляется.
- prefers-reduced-motion: отключает GSAP-анимации hero.
