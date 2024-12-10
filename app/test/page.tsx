import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        PVT TEST
      </div>
      <input className={styles.input} type="text" placeholder="学籍番号を入力してください" />
      <button className={styles.button}>テスト開始</button>
    </div>
  )
}