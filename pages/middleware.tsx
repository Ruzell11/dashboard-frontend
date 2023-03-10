import { NextRouter, useRouter } from "next/router";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

interface MiddlewareProps {
  cookie: string | undefined;
  url: string;
}

export default async function middleware({ cookie, url }: MiddlewareProps) {
  const secret = "sfdjodhsfusfh";

  if (url.includes("/login")) {
    if (cookie != undefined) {
      return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "/dashboard/charts",
        },
      });
    }
  }

  if (url.includes("/dashboard")) {
    if (cookie == undefined) {
      return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }
    try {
      verify(cookie, secret);
      return NextResponse.next();
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }
  }

  return NextResponse.next();
}
