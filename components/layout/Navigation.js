import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Fira_Code,
  Inter,
  Josefin_Sans,
  Jost,
  Limelight,
  Montserrat,
} from "next/font/google";

import styles from "@/styles/Home.module.css";
import classes from "./Navigation.module.css";
const josefin = Josefin_Sans({ subsets: ["latin"] });

const Navigation = () => {
  const router = useRouter();
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.logoWrapper}>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/DiapLogoXL.png"
              alt="DiapOneOne Logo"
              width={200}
              height={200}
              priority
            />
          </Link>
        </div>
        <div className={classes.linksWrapper}>
          <ul>
            <li>
              <Link
                href="/"
                className={router.pathname == "/" ? `${classes.active}` : ""}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/budget-checker"
                className={
                  router.pathname == "/budget-checker"
                    ? `${classes.active}`
                    : ""
                }
              >
                DIAPP
              </Link>
            </li>
            <li>
              <Link
                href="/budget-lists"
                className={
                  router.pathname == "/budget-lists" ? `${classes.active}` : ""
                }
              >
                BUDGETS
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
