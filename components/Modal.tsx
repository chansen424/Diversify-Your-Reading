import styles from "./Modal.module.css";

interface Showable {
  show: boolean;
  children?: React.ReactNode;
}

const Modal = ({ show, children }: Showable) => {
  return <>{show && <div className={styles.container}>{children}</div>}</>;
};

export default Modal;
