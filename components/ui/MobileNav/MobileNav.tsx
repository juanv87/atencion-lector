import Link from "next/link";
import IconLike from "../../Icons/IconLike";
import styles from "./MobileNav.module.scss";
import { IconBtnSave } from "../../Icons/IconBtnSave";

export const MobileNav = () => {
  return (
    <nav className={styles.mobileNav}>
      <ul>
        <li>
          <Link href="/">
            <a>
              <IconLike size={24} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <IconBtnSave size="24" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
