import styles from "../styles/dashboardhead.module.css";

interface DashBoardHeadProps {
  title: string;
}

export default function DashBoardHead({ title }: DashBoardHeadProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <button type="button" className={styles.logoutButton}>
        로그아웃
      </button>
    </header>
  );
}
