import Footer from "./Footer";
import Navigation from "./Navigation";
import styles from "@/styles/Home.module.css";

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
