'use client';
import { SetStateAction, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputValue, setInputValue] = useState("22DC102029K");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
    // エラーチェックを削除
  };

  const handleSubmit = () => {
    if (inputValue.length !== 11) {
      setError("学籍番号は11文字である必要があります");
    } else {
      setError("");
      router.push(`/start_test`);
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