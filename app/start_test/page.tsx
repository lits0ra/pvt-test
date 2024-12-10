'use client';
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isCircle, setIsCircle] = useState(true);
  const router = useRouter();
  setTimeout(() => {
    setIsCircle(false);
    router.push(`/result`);
  }, 300000)

  return (
    <div className={styles.container}>
      {isCircle && (
        <div className={styles.circle} onClick={() => setIsCircle(false)}>
        </div>
      )}
    </div>
  )
}
