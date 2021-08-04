import Link from "next/link";
import styles from "./Challenge.module.css";

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  goals: string[];
}

export default function Challenge({ id, title, description }: IChallenge) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>
      <Link href={`/challenges/${id}`}>
        <a className={styles.link}>See More</a>
      </Link>
    </div>
  );
}
