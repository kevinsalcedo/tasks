import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Layer, Box, Heading, Tabs, Tab } from "grommet";
import { openBacklog } from "../../actions/dashboard";
import TaskCard from "./containers/TaskCard";
import { Close } from "grommet-icons";

const Backlog = ({ backlog, backlogOpen, openBacklog }) => {
  const [index, setIndex] = useState(0);

  const onActive = (nextIndex) => setIndex(nextIndex);
  return (
    backlogOpen && (
      <Layer
        responsive={false}
        fill='vertical'
        position='right'
        onClickOutside={() => openBacklog(false)}
        onEsc={() => openBacklog(false)}
      >
        <Box fill pad='small' width='medium' elevation='medium'>
          <Box direction='row' align='center' justify='between'>
            <Heading level={4}>Backlog</Heading>
            <Button icon={<Close />} onClick={() => openBacklog(false)} />
          </Box>
          <Box overflow='auto'>
            {backlog &&
              backlog.map((task) => <TaskCard key={task._id} task={task} />)}
          </Box>
        </Box>
      </Layer>
    )
  );
};

const mapStateToProps = (state) => ({
  backlog: state.list.backlog,
  backlogOpen: state.dashboard.backlogOpen,
});

export default connect(mapStateToProps, { openBacklog })(Backlog);
