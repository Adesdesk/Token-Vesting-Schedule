import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'tailwindcss/tailwind.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Token Vesting DApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.adesdesk.io">Happy Vesting!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

          </div>
  )
}
