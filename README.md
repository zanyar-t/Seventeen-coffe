# Seventeen Coffee — سایت کافه

نسخه‌ی اول: معرفی، منو، سفارش آنلاین (با درگاه زرین‌پال)، رزرو میز.

## اجرا روی ترموکس (لوکال)

```
pkg install nodejs -y
cd seventeen-coffee
npm install
npm run dev
```

سایت روی `http://localhost:3000` بالا میاد.

## دیپلوی روی Railway (دقیقاً مثل CactusStore)

1. یه پروژه‌ی جدید توی Railway بساز و از GitHub وصلش کن (یا با `railway up`).
2. توی تنظیمات پروژه یک **Volume** بساز و به مسیر `/data` مونت کن — دقیقاً مثل چیزی که برای CactusStore ساختیم. اینجا سفارش‌ها و رزروها ذخیره میشن.
3. توی Railway → Variables این‌ها رو اضافه کن:
   - `ZARINPAL_MERCHANT_ID` (از پنل زرین‌پال بگیر)
   - `ZARINPAL_SANDBOX` → روی `true` بذار برای تست، بعد از گرفتن مرچنت واقعی بذارش `false`
   - `NEXT_PUBLIC_BASE_URL` → آدرس نهایی سایتت روی Railway (بعد از اولین دیپلوی مشخص میشه)
4. Railway به‌صورت خودکار `npm install` و `npm run build` و `npm start` رو اجرا می‌کنه (Next.js رو تشخیص می‌ده).

## ساختار پروژه

- `app/page.js` — صفحه‌ی اصلی
- `app/menu/page.js` — منو (آیتم‌ها توی `lib/menu-data.js`)
- `app/order/page.js` — سفارش آنلاین + اتصال به زرین‌پال
- `app/reserve/page.js` — فرم رزرو میز
- `lib/db.js` — ذخیره‌سازی ساده روی فایل JSON (روی Volume ماندگاره)
- `lib/zarinpal.js` — اتصال به درگاه پرداخت

## قدم بعدی

- جایگزین کردن آیتم‌های منو با منوی واقعی کافه
- اضافه کردن پنل ادمین برای دیدن سفارش‌ها و رزروها
- آپلود لوگو و عکس‌های واقعی کافه
