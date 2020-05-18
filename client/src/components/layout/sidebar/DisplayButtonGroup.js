import React from "react";
import { connect } from "react-redux";
import { Box, RadioButtonGroup, Button, Nav, ResponsiveContext } from "grommet";
import { Task, Schedule } from "grommet-icons";
import { changeView } from "../../../actions/dashboard";

const DisplayButtonGroup = ({ view, changeView }) => {
  const radioButtons = () => (
    <Box align='center'>
      <RadioButtonGroup
        name='radio'
        direction='row'
        gap='xsmall'
        options={["task", "calendar"]}
        value={view}
        onChange={(event) => changeView(event.target.value)}
      >
        {(option, { checked, hover }) => {
          const Icon = option === "task" ? Task : Schedule;
          let background;
          if (checked) background = "brand";
          else if (hover) background = "light-4";
          else background = "light-2";
          return (
            <Box background={background} pad='xsmall'>
              <Icon />
            </Box>
          );
        }}
      </RadioButtonGroup>
    </Box>
  );

  const navButtons = () => (
    <Nav direction='row'>
      <Button
        label='List'
        active={view === "task"}
        onClick={() => changeView("task")}
        hoverIndicator
      />
      <Button
        label='Calendar'
        active={view !== "task"}
        onClick={() => changeView("calendar")}
        hoverIndicator
      />
    </Nav>
  );
  return (
    <ResponsiveContext.Consumer>
      {(responsive) => (responsive === "small" ? radioButtons() : navButtons())}
    </ResponsiveContext.Consumer>
  );
};

const mapStateToProps = (state) => ({
  view: state.dashboard.view,
});

export default connect(mapStateToProps, { changeView })(DisplayButtonGroup);
