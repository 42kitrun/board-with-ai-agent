import "../styles/global.css";
import DashBoardHead from "../components/header";
import Navigation from "../components/navigation";
import styles from "../styles/layout.module.css";

export const metadata = {
  title: "CareBoard AI",
  description: "Healthcare dashboard portfolio extended with AI Agent workflows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={styles.body}>
        <DashBoardHead title="CareBoard AI" /> {/* 상단 고정 헤더 */}
        <div className={styles.container}>
          <aside className={styles.nav}>
            <Navigation /> {/* 헤더 아래 왼쪽 고정 네비게이션 */}
          </aside>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
