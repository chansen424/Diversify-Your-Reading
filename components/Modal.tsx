import styles from "./Modal.module.css";
import { BsX } from "react-icons/bs";

interface Showable {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ show, children, onClose }: Showable) => {
  if (!show) {
    return null;
  }
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <button className={styles.closeBtn} onClick={onClose}>
            <BsX />
            <span>Close Modal</span>
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
