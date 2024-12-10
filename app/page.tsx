'use client';
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    // エラーチェックを削除
  };

  const handleSubmit = () => {
    if (inputValue.length !== 11) {
      setError("学籍番号は11文字である必要があります");
    } else {
      setError("");
      console.log("画面遷移");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        PVT TEST
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="学籍番号を入力してください"
        value={inputValue}
        onChange={handleInputChange}
      />
      {error && <div className={styles.error}>{error}</div>}
      <button className={styles.button} onClick={handleSubmit}>
        テスト開始
      </button>
    </div>
  );
}