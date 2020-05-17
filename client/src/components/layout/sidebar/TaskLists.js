import React, { useState } from "react";
import { connect } from "react-redux";
import { selectList } from "../../../actions/list";
import { Accordion, AccordionPanel, Box, Button, List, Text } from "grommet";
import { Add } from "grommet-icons";

const TaskLists = ({ selectedList, lists, selectList, loading }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  let data = [];
  data.push({ name: "All", id: null });
  lists.map((list) => {
    data.push({ name: list.name, id: list._id });
  });

  const onClickItem = (event) => {
    const { index, item } = event;
    if (event) {
      setSelectedItem(index);
      selectList(item.id);
    }
  };
  return (
    <Accordion>
      <AccordionPanel label='My Lists' pad='small' active>
        <List
          data={data}
          pad='small'
          onClickItem={(event) => onClickItem(event)}
        >
          {(datum, index) => (
            <Box
              key={index}
              direction='row-responsive'
              gap='medium'
              size='xsmall'
              align='center'
              hoverIndicator
            >
              <Text weight='bold'>{datum.name}</Text>
            </Box>
          )}
        </List>
      </AccordionPanel>
    </Accordion>
  );
};
const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  lists: state.list.lists,
  tasks: state.list.tasks,
});

export default connect(mapStateToProps, { selectList })(TaskLists);
