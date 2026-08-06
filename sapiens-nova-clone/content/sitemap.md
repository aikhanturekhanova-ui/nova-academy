# Карта сайта sapiens-nova.com

Стек: **Astro v5.16.6** (SSG) + **Tailwind CSS v4** + **React 19** (островки-гидрация, shadcn/ui-стиль) + **GSAP** (анимации hero) + **lucide** (иконки). Серверные API: `/api/programmes`, `/api/geo`, `/api/validate-promo`, `/api/checkout`. Данные программ — в БД (Supabase). Шрифты самoxоcтed: Tobias (serif), Karla (sans), Mulish.

## Публичные страницы

| URL | Название | Тип |
|---|---|---|
| `/` | Главная — "Embrace Your Future: Innovate, Heal, Inspire" | Статическая (секции: Hero, Who We Are, Our Programmes, Featured Programmes (React/API), Other Programmes, Student Success Stories, Meet Our Founders, Footer) |
| `/programs` | Programmes — "Unlock Your Future" | Статическая + React-островки (Featured Programmes, Our Services, Curriculum) |
| `/media` | Programme galleries | Статическая |
| `/media/human-tech` | Private gallery: Human+Tech Programme (пароль) | Статическая (форма пароля) |
| `/media/imperial-motorsport` | Private gallery: Imperial Motorsport (пароль) | Статическая (форма пароля) |
| `/checkout` | Enroll Now — форма записи | React SPA-форма (CheckoutForm) |
| `/programmes/{id}` | Карточка программы (динамическая) | React (ProgrammeDetail) — 2 активные программы |
| `/data-privacy-terms` | Data Privacy Terms | Статическая |
| `/favicon.ico`, `/og-image.png`, `/logo.png`, `/sapiens-logo.svg`, `/advanced-research.webp` | Статические ассеты | — |

## API

| URL | Назначение |
|---|---|
| `GET /api/programmes` | Список программ (JSON): id, slug, name, description, category, location, duration_text, price_cents, currency, application_fee, deposit, early_bird_price_cents, early_bird_deadline, age_range, language |
| `GET /api/geo` | Определение страны (для цен/сессий в HKT/ICT) |
| `POST /api/validate-promo` | Проверка промо-кода |
| `POST /api/checkout` | Создание Stripe checkout-сессии |

## Активные программы (данные API на 02.08.2026)

1. **Imperial College London Motorsport Engineering Summer School** — slug `imperial-motorsport`, курс, Лондон (South Kensington), 19-25 июля 2026, £4,580 (early bird £3,980 до 30.03.2026), аппликационный сбор £100, возраст 15-17, English.
2. **Human+Tech Futures Summer Camp** — slug `human-tech-summer-camp`, буткемп, Awaji Island, Япония, 13-17 июля 2026, HK$17,000 (early bird HK$15,000 до 29.04.2026), депозит HK$3,000, возраст 15-22, English.

Статус регистрации на обе программы (по коду `registration-status`): **закрыта** ("Registration for this programme is now closed. Thank you for your interest.").
