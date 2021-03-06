import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, login } from "../config";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={styles.container}>
      <Head>
        <title>Diversify Your Reading</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Diversify Your Reading</h1>

        <p>
          Diversify your reading with fun challenges. You might learn something
          new.
        </p>
        {user ? (
          <Link href="/challenges">
            <a className={styles.getStarted}>Get Started</a>
          </Link>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() =>
              login(() => {
                router.push("/challenges");
              })
            }
          >
            Sign In With Google
          </button>
        )}
      </main>
    </div>
  );
}
