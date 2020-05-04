import React from "react";
import { Layer } from "grommet";
import { connect } from "react-redux";
import CreateTaskForm from "./CreateTaskForm";

const CreateTaskModal = ({ onClose }) => {
  return (
    <Layer position='center' modal onClickOutside={onClose} onEsc={onClose}>
      <CreateTaskForm closeForm={onClose} />
    </Layer>
  );
};

export default connect()(CreateTaskModal);
