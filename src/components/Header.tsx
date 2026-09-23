import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Dev Insights</h1>
      <nav>
        <a href="#" className={styles.navLink}>
          New Post
        </a>
      </nav>
    </header>
  );
}

export default Header;