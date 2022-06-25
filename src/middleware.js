import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(`Middleware running for ${req.nextUrl.pathname}`);
  const res = await fetch(
    `https://gato-api-server.herokuapp.com/authorization/required?organization=developer_dao&gateType=Web Page&gateId=${req.nextUrl.pathname}`
  );
  const data = await res.json();

  // Page is protected
  if (data) {
    const walletAddress = req.cookies.getWithOptions("wallet").value;
    const signature = req.cookies.getWithOptions("signature").value;

    // User never signed, need to login
    if (!walletAddress || !signature) {
      return NextResponse.redirect(
        new URL(`/login?from=${req.nextUrl.pathname}`, req.url)
      );
    }

    const request = `https://gato-api-server.herokuapp.com/authorization/authorized?organization=developer_dao&gateType=Web Page&gateId=${req.nextUrl.pathname}&address=${walletAddress}&signature=${signature}`;
    console.log(request);
    const res = await fetch(request);
    const data = await res.json();
    console.log(data);

    if (!data) {
      return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
