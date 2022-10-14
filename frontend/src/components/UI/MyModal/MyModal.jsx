import React from "react";
import cl from "./MyModal.module.css";

const MyModal = ({ children, visible }) => {
  const rootClass = [cl.MyModal];
  if (visible) {
    rootClass.push(cl.active);
  }

  return (
    <div className={rootClass.join(" ")}>
      <div className={cl.MyModalContent}>{children}</div>
    </div>
  );
};

export default MyModal;
