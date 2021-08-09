import Head from "next/head";
import { useRouter } from "next/router";
import Challenge, { IChallenge } from "../../components/Challenge";
import styles from "../../styles/Challenges.module.css";
import { firestore, auth, logout } from "../../config";
import { GetServerSideProps } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormEvent, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { BsPlusCircleFill } from "react-icons/bs";

interface ChallengesProps {
  challenges: IChallenge[];
}

export default function Challenges({ challenges }: ChallengesProps) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [goalValues, setGoalValues] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    // Documentation said user === undefined if logged out, but apparently not
    if (!loading && user === null && router) {
      router.push("/");
    }
  }, [user, loading, router]);

  const onCreateChallenge = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firestore.collection("challenges").add({
      title: createTitle,
      description: createDescription,
      goals: Object.values(goalValues),
    });
    setCreateTitle("");
    setCreateDescription("");
    setGoalValues({});
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Challenges</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        show={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCreateTitle("");
          setCreateDescription("");
          setGoalValues([]);
        }}
        title="Create A Challenge"
      >
        <form onSubmit={onCreateChallenge}>
          <label htmlFor="create-title">Title</label>
          <input
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
            name="create-title"
            id="create-title"
            placeholder="Title"
          />
          <label htmlFor="create-desc">Description</label>
          <input
            value={createDescription}
            onChange={(e) => setCreateDescription(e.target.value)}
            id="create-desc"
            placeholder="Description"
          />
          {Object.entries(goalValues).map((value) => {
            const goalNumber = Number(value[0]);
            const goalText = value[1];
            return (
              <div key={`goal-${goalNumber}`}>
                <label
                  htmlFor={`goal-${goalNumber}`}
                >{`Goal #${goalNumber}`}</label>
                <input
                  onChange={(e) =>
                    setGoalValues({
                      ...goalValues,
                      [goalNumber]: e.target.value,
                    })
                  }
                  value={goalText}
                  id={`goal-${goalNumber}`}
                  placeholder={`Goal #${goalNumber}`}
                />
              </div>
            );
          })}
          <button
            className={styles.addGoalsBtn}
            type="button"
            onClick={() =>
              setGoalValues({
                ...goalValues,
                [Object.keys(goalValues).length + 1]: "",
              })
            }
          >
            <BsPlusCircleFill />
            <span>Add Goal</span>
          </button>

          <button
            style={{ marginTop: "10px" }}
            className={styles.basicBtn}
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>

      <main className={styles.main}>
        <h1 className={styles.title}>Challenges</h1>
        <p>Logged in as {user?.displayName}</p>
        <span>
          <button
            className={styles.basicBtn}
            onClick={() => logout(() => router.push("/"))}
          >
            Logout
          </button>

          <button
            className={styles.basicBtn}
            onClick={() => setModalOpen(true)}
          >
            Create A Challenge
          </button>
        </span>

        {challenges.map((challenge) => (
          <Challenge key={challenge.id} {...challenge} />
        ))}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let challenges: IChallenge[] = [];
  const querySnapshot = await firestore
    .collection("challenges")
    .limit(25)
    .get();
  querySnapshot.forEach((doc) => {
    challenges.push({ id: doc.id, ...doc.data() } as IChallenge);
  });

  return {
    props: {
      challenges,
    },
  };
};
