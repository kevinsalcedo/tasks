import React, { useState } from "react";
import { connect } from "react-redux";
import { selectList } from "../../../actions/list";
import {
  Accordion,
  AccordionPanel,
  Box,
  List,
  Text,
  ResponsiveContext,
} from "grommet";
import { List as ListIcon } from "grommet-icons";

const TaskLists = ({ lists, selectList }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  let data = [];
  data.push({ name: "All", id: null });
  lists.forEach((list) => {
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
    <ResponsiveContext.Consumer>
      {(responsive) => (
        <Accordion fill='horizontal'>
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
                  direction='row'
                  gap='small'
                  align='center'
                  fill='horizontal'
                  hoverIndicator
                >
                  <Box
                    round='full'
                    pad='xsmall'
                    align='center'
                    justify='center'
                    background={datum.color}
                  >
                    <ListIcon
                      size='small'
                      color={datum.color ? "white" : null}
                    />
                  </Box>
                  <Text
                    size={responsive === "small" ? "medium" : "small"}
                    weight='bold'
                  >
                    {datum.name}
                  </Text>
                </Box>
              )}
            </List>
          </AccordionPanel>
        </Accordion>
      )}
    </ResponsiveContext.Consumer>
  );
};
const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  lists: state.list.lists,
  tasks: state.list.tasks,
});

export default connect(mapStateToProps, { selectList })(TaskLists);
