import Footer from "./Footer";
import Navigation from "./Navigation";
import styles from "@/styles/Home.module.css";

// the layout component that's used to ensure that the footer and navigation components are used on all pages
const Layout = (props) => {
  return (
    <>
      <Navigation />
      <main className={`${styles.main}`}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
