import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import jsCookie from "js-cookie";
import middleware from "./middleware";
import { useEffect } from "react";
import { NextResponse } from "next/server";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const cookie = jsCookie.get("access-token");
  const role_id = jsCookie.get('role_id');
  const url = router.pathname;

  const handleMiddleware = async () => {
    const response = await middleware({ cookie, url });
    if (response instanceof NextResponse) {
      const location = response.headers.get("Location");
      if (location) {
        router.replace(location);
      }
    }
  };

  useEffect(() => {
    handleMiddleware();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} role_id={role_id} />
    </QueryClientProvider>
  );
}
