import Link from "next/link"

import styles from '../../styles/Home.module.css'
import { ConnectWallet } from '../components/ConnectWallet'

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Gato Sample Application
        </h2>

        <div> 
          <ConnectWallet/>
        </div>

        <div className={styles.grid}>
          <Link href="/" >
            <a className={styles.card}>
            <h2>Home &rarr;</h2>
            </a>
          </Link>

          <Link href="/about" >
          <a className={styles.card}>
            <h2>About &rarr;</h2>
            </a>
          </Link>

          <Link href="/contact" >
            <a className={styles.card}>
            <h2>Contact &rarr;</h2>
            </a>
          </Link>

        </div>
      </main>
    </div>
  )
}