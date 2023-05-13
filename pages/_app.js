import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"] }); // setting josefin sans as the main font for the app in here and passing it to the wrapper div as a classname

export default function App({ Component, pageProps }) {
  return (
    <div className={josefin.className}>
      {/* the layout includes the navigation and footer components and is wrapping the main contents of the app so they are used on all pages */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
