import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProp) {
  return <Component {...pageProps} />;
}
