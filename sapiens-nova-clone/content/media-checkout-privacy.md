# Контент страниц /media, /checkout, /data-privacy-terms — sapiens-nova.com

## /media (Programme galleries)
- Надзаголовок: `Participant access` (text-blue-600, uppercase, tracking 0.22em)
- H1: `Programme galleries`
- Текст: `Choose your programme and enter the password shared with participants to view and download its private photos and videos.`

Карточки галерей:
1. **Human+Tech Programme** — подпись `Private gallery · Password required` — `Open gallery →` — → `/media/human-tech`
2. **Imperial Motorsport Engineering Programme** — подпись `Private gallery · Password required` — `Open gallery →` — → `/media/imperial-motorsport`

## /media/human-tech и /media/imperial-motorsport (Private participant gallery)
- Тёмная тема (bg-slate-950, белый текст).
- Ссылка назад: `← All galleries` (→ /media)
- Надзаголовок: `Private participant gallery`
- H1: `Human+Tech Programme` / `Imperial Motorsport Engineering Programme`
- Блок входа: заголовок `Enter participant password`; текст `Use the password supplied by Sapiens Nova Academy.`
- Поля: input `Gallery password` (type=password) + кнопка **Unlock gallery** (bg-blue-600).
- Ошибка: `text-red-300` (скрыта по умолчанию).
- Примечание: в оригинале форма отправляется на серверный эндпоинт (галереи защищены паролем, контент не публичный).

## /checkout (Enroll Now)
- Meta robots: noindex, nofollow. Title: `Enroll Now - Sapiens Nova Academy`.
- Header-блок: пилюля `Enrollment`; H1: `Secure Your Spot`; текст: `Join our innovative educational programmes and unlock your future`.
- Двухколоночная форма (студент/родитель):

**Student's Information** (все поля обязательны, кроме отмеченных):
- Programme* — селект программ (по API), "Select a programme..."
- First Name* (placeholder John) / Last Name* (Doe)
- Age* (число 1–100) / Gender* (Male/Female/Other)
- Current Attending School* (placeholder ABC International School)
- Country/Region* (placeholder Hong Kong)

**Your Information**:
- Your First Name* / Your Last Name*
- Your Email* (your@email.com)
- Your Relationship to Student* (Parent/Guardian/Relative/Teacher/Other)
- Phone (Optional) (+852 1234 5678)
- Промо-код: поле + кнопка Apply ("Have a discount code?"); при валидном — зелёный блок "X% Discount applied!".

**Order Summary** (sticky):
- Изображение, название, категория (пилюля), `Duration: ...`, `Location: ...`
- Позиции: Application Fee (напр. £100.00 GBP) / Deposit (HK$3,000.00 HKD) / Programme Fee (early bird: зачёркнутая полная цена + `Early bird – offer ends {дата}`) или цена.
- Итог: `{Application Fee|Deposit|Programme Fee}` + `Charging now` + сумма.
- Заметка: `You'll receive a confirmation email after completing your payment`.
- Кнопка: **Proceed to Payment** (замок) → Stripe; подпись: `Secure checkout powered by Stripe`.
- Фоновые декорации: victory.svg (20%), spiky.webp (15%, rotate 15°), circle.svg (15%).
- Если регистрация закрыта — блок `Registration Is Closed` + кнопка `Back to Programme Page`.

## /data-privacy-terms (Data Privacy Terms)
- Title: `Data Privacy Terms - Sapiens Nova Academy` (по аналогии с остальными страницами).
- H1: `Data Privacy Terms`
- Подзаголовок: `How we collect, use, store, and protect personal data.` · `Last updated: 5 April 2026`
- Вводный текст: `These Data Privacy Terms apply to Sapiens Nova Academy services, events, forms, websites, and related communications where personal data is collected.`
- Разделы: 1. Scope · 2. Personal Data We Collect · 3. Purposes of Processing · 4. Legal Bases for Processing · 5. Sharing, Processors, and International Transfers · 6. Retention and Security · 7. Your Rights · 8. Children and Parent/Guardian Data · 9. Contact and Data Requests.
- Содержимое раздела 2: категории данных — a. Contact and Basic Information; b. Student Information; c. Address and Location; d. Operational Data; e. Additional Enrolment Information; для международных программ (напр. UK): Travel and Identification; Immigration and Compliance.
- Полный текст документа сохранён в файле `privacy-full.md` (извлечён из HTML).
