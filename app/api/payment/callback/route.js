import { NextResponse } from "next/server";
import { readAll, updateItem } from "../../../../lib/db";
import { verifyPayment } from "../../../../lib/zarinpal";

export async function GET(req) {
  const { searchParams, origin } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("Status");
  const authority = searchParams.get("Authority");

  const orders = readAll("orders");
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return NextResponse.redirect(`${origin}/order/result?status=notfound`);
  }

  if (status !== "OK") {
    updateItem("orders", orderId, { status: "canceled" });
    return NextResponse.redirect(`${origin}/order/result?status=canceled`);
  }

  try {
    const result = await verifyPayment({ amount: order.amount, authority });
    if (result.success) {
      updateItem("orders", orderId, { status: "paid", refId: result.refId });
      return NextResponse.redirect(`${origin}/order/result?status=paid&refId=${result.refId}`);
    } else {
      updateItem("orders", orderId, { status: "failed" });
      return NextResponse.redirect(`${origin}/order/result?status=failed`);
    }
  } catch (err) {
    console.error("verify error:", err);
    updateItem("orders", orderId, { status: "failed" });
    return NextResponse.redirect(`${origin}/order/result?status=failed`);
  }
}
