import ReactDOM from "react-dom";

import Card from "./Card";
import classes from "./Modal.module.css";

// using the modal we learned in Javascript 4 course
const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <button onClick={props.onClick}>Close X</button>
    </Card>
  );
};

const Modal = (props) => {
  if (!props.open) return null;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClick={props.onClose} title={props.header}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
