import Layout from "@/_components/core/Layout/Layout";
import store from "@/redux/store";
import "@/styles/globals.css";
import Theme from "@/styles/Theme/Theme";
import { ThemeProvider } from "@emotion/react";
import { Provider as StoreProvider } from "react-redux";
import type { AppProps } from "next/app";
import { Raleway } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectRoute } from "@/auth";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${raleway.className}`}>
      <StoreProvider store={store}>
        <ProtectRoute>
          <ThemeProvider theme={Theme}>
            <ToastContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ProtectRoute>
      </StoreProvider>
    </div>
  );
}
