import React, { useState } from "react";
import { connect } from "react-redux";
import { selectList } from "../../../actions/list";
import { Accordion, AccordionPanel, Box, Button, List, Text } from "grommet";
import { Add, List as ListIcon } from "grommet-icons";

const TaskLists = ({ selectedList, lists, selectList, loading }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  let data = [];
  data.push({ name: "All", id: null });
  lists.map((list) => {
    data.push({ name: list.name, id: list._id, color: list.color });
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
          itemProps={
            selectedItem >= 0
              ? { [selectedItem]: { background: "brand" } }
              : undefined
          }
          onClickItem={(event) => onClickItem(event)}
        >
          {(datum, index) => (
            <Box
              key={index}
              direction='row-responsive'
              gap='small'
              size='xsmall'
              align='center'
              fill
              hoverIndicator
            >
              <Box
                round='full'
                pad='xsmall'
                align='center'
                justify='center'
                background={datum.color}
              >
                <ListIcon size='small' color={datum.color ? "white" : null} />
              </Box>
              <Text size='small' weight='bold'>
                {datum.name}
              </Text>
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
