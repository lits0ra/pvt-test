'use client';
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import styles from "./page.module.css";

interface Result {
  id: number;
  ReactionTime: number;
  isShorterThan100ms: number;
  isLongerThan500ms: number;
}

export default function Home() {
  const [isCircle, setIsCircle] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [showResults, setShowResults] = useState(false);

  async function displayCircleLogic() {
    const randomTime = Math.floor(Math.random() * 8000) + 2000;
    setTimeout(() => {
      setIsCircle(true);
      setStartTime(Date.now());
    }, randomTime)
  }

  setTimeout(() => {
    setIsCircle(false);
    setShowResults(true);
  }, 20000)

  useEffect(() => {
    if (!isCircle) {
      displayCircleLogic();
    }
  }, [isCircle]);

  useEffect(() => {
    if (reactionTime !== null) {
      const newResult: Result = {
        id: results.length + 1,
        ReactionTime: reactionTime,
        isShorterThan100ms: reactionTime < 100 ? 1 : 0,
        isLongerThan500ms: reactionTime > 500 ? 1 : 0,
      };
      setResults(prevResults => [...prevResults, newResult]);
    }
  }, [reactionTime]);

  const handleClick = () => {
    if (startTime !== null) {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
    }
    setIsCircle(false);
    setStartTime(null);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "results.xlsx");
  };

  return (
    <div className={styles.container}>
      {isCircle && !showResults && (
        <div className={styles.circle} onClick={handleClick}>
        </div>
      )}
      {reactionTime !== null && !showResults && (
        <div style={{
          color: "white",
        }}>Reaction Time: {reactionTime} ms</div>
      )}
      {showResults && (
        <>
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Reaction Time (ms)</th>
                  <th>Shorter than 100ms</th>
                  <th>Longer than 500ms</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.ReactionTime}</td>
                    <td>{result.isShorterThan100ms==1 ? "1" : "0"}</td>
                    <td>{result.isLongerThan500ms==1 ? "1" : "0"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <button onClick={downloadExcel} style={{ marginTop: "10px" }}>Download Excel</button>
        </>
      )}

    </div>
  )
}