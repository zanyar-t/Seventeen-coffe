import { NextResponse } from "next/server";
import { appendItem } from "../../../lib/db";
import { requestPayment } from "../../../lib/zarinpal";

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerName, phone, items } = body;

    if (!customerName || !phone || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "اطلاعات سفارش ناقصه." }, { status: 400 });
    }

    const amount = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    if (amount <= 0) {
      return NextResponse.json({ error: "مبلغ سفارش نامعتبره." }, { status: 400 });
    }

    const order = appendItem("orders", {
      customerName,
      phone,
      items,
      amount,
      status: "pending_payment",
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    const { authority, paymentUrl } = await requestPayment({
      amount,
      description: `سفارش Seventeen Coffee - ${order.id}`,
      callbackUrl: `${baseUrl}/api/payment/callback?orderId=${order.id}`,
      mobile: phone,
    });

    // authority رو روی سفارش ذخیره می‌کنیم تا موقع verify پیداش کنیم
    const { updateItem } = await import("../../../lib/db");
    updateItem("orders", order.id, { authority });

    return NextResponse.json({ paymentUrl });
  } catch (err) {
    console.error("order create error:", err);
    return NextResponse.json({ error: err.message || "خطای سرور" }, { status: 500 });
  }
}
