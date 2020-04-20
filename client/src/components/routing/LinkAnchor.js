import React from "react";
import { Anchor } from "grommet";
import { useHistory } from "react-router-dom";

const LinkAnchor = (props) => {
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <Anchor primary={props.primary} onClick={() => handleClick(props.to)}>
      {props.children}
    </Anchor>
  );
};

export default LinkAnchor;
