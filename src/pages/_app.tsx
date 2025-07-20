import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Toaster
        toastOptions={{
          classNames: {
            toast: "!bg-[#157F1F] !text-white !text-xl ",
          },
        }}
        position="bottom-right"
      />
    </>
  );
}
