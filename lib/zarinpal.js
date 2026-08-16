// اتصال به درگاه زرین‌پال (REST v4)
// راهنما: MERCHANT_ID رو از پنل زرین‌پال بگیر و توی Railway Variables بذار.
// برای تست بدون مرچنت واقعی، ZARINPAL_SANDBOX=true رو ست کن.

const SANDBOX = process.env.ZARINPAL_SANDBOX === "true";

const BASE = SANDBOX ? "https://sandbox.zarinpal.com" : "https://api.zarinpal.com";
const PAY_BASE = SANDBOX ? "https://sandbox.zarinpal.com" : "https://www.zarinpal.com";

export async function requestPayment({ amount, description, callbackUrl, mobile }) {
  const merchantId = process.env.ZARINPAL_MERCHANT_ID;
  if (!merchantId) {
    throw new Error("ZARINPAL_MERCHANT_ID تنظیم نشده. توی Railway Variables اضافه‌اش کن.");
  }

  const res = await fetch(`${BASE}/pg/v4/payment/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount, // به تومان (v4 تومان می‌گیره)
      description,
      callback_url: callbackUrl,
      metadata: mobile ? { mobile } : undefined,
    }),
  });

  const json = await res.json();
  const authority = json?.data?.authority;
  const code = json?.data?.code;

  if (!authority || code !== 100) {
    throw new Error("خطا در ایجاد تراکنش زرین‌پال: " + JSON.stringify(json.errors || json));
  }

  return {
    authority,
    paymentUrl: `${PAY_BASE}/pg/StartPay/${authority}`,
  };
}

export async function verifyPayment({ amount, authority }) {
  const merchantId = process.env.ZARINPAL_MERCHANT_ID;

  const res = await fetch(`${BASE}/pg/v4/payment/verify.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount,
      authority,
    }),
  });

  const json = await res.json();
  const code = json?.data?.code;

  return {
    success: code === 100 || code === 101, // 101 یعنی قبلاً وریفای شده
    refId: json?.data?.ref_id,
    raw: json,
  };
}
