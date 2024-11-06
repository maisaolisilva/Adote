'use client';
import styles from "./page.module.css";
import Titulo from "@/components/Titulo";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Titulo>Bem vindo!</Titulo>
      </main>
      
    </div>
  );
}
