import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(`Middleware running for ${req.nextUrl.pathname}`);
  const res = await fetch(
    `https://gato-api-server.herokuapp.com/authorization/required?organization=developer_dao&gateType=Web Page&gateId=${req.nextUrl.pathname}`
  );
  const data = await res.json();

  // Page is protected
  if (data) {
    const walletAddress = req.cookies.getWithOptions("wallet");

    // User never signed, need to login
    if (!walletAddress.value) {
      return NextResponse.redirect(
        new URL(`/login?from=${req.nextUrl.pathname}`, req.url)
      );
    }

    console.log(
      `https://gato-api-server.herokuapp.com/authorization/authorized?organization=developer_dao&gateType=Web Page&gateId=${req.nextUrl.pathname}&address=${walletAddress.value}`
    );
    const res = await fetch(
      `https://gato-api-server.herokuapp.com/authorization/authorized?organization=developer_dao&gateType=Web Page&gateId=${req.nextUrl.pathname}&address=${walletAddress.value}`
    );
    const data = await res.json();
    console.log(data);

    if (!data) {
      return NextResponse.redirect(new URL(`/unauthorized`, req.url));
    }
  }

  return NextResponse.next();
}
