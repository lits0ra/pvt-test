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
  const [randomTime, setRandomTime] = useState<number>(Math.floor(Math.random() * 8000) + 2000);

  async function displayCircleLogic() {
    setRandomTime(Math.floor(Math.random() * 8000) + 2000);
    console.log(randomTime);
    setTimeout(() => {
      setIsCircle(true);
      setStartTime(Date.now());
    }, randomTime)
  }

  setTimeout(() => {
    setIsCircle(false);
    setShowResults(true);
  }, 30000)

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

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'n' && startTime !== null && !showResults) {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setIsCircle(false);
      setStartTime(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [startTime]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    const studentId = 'results';
    XLSX.writeFile(workbook, `${studentId}.xlsx`);
  };

  return (
    <div className={styles.container}>
        <>
          {isCircle && !showResults && (
            <div className={styles.circle}>
            </div>
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
        </>
    </div>
  )
}