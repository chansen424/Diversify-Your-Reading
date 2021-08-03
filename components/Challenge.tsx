import Link from 'next/link'
import styles from './Challenge.module.css'

export interface IChallenge {
    id: string;
    title: string;
    description: string;
    goals: string[];
}

export default function Challenge({title, description}: IChallenge) {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
        <Link href=""><a className={styles.link}>See More</a></Link>
    </div>
  )
}