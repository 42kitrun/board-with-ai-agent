import Link from "next/link";
import styles from "../styles/navigation.module.css";

const navItems = [
  { label: "회원 관리", path: "/" },
  { label: "설문 관리", path: "/" },
  { label: "설문 답변 관리", path: "/" },
  { label: "목표 관리", path: "/" },
  { label: "피로도 관리", path: "/" },
];

export default function Navigation() {
  return (
    <nav className={styles.navigation} aria-label="대시보드 메뉴">
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
