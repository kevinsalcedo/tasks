import React from "react";
import { Box, Button, Heading } from "grommet";
import { useHistory } from "react-router-dom";
import PAGES from "../../strings/pages";

export const Landing = () => {
  const history = useHistory();
  const directTo = (path) => history.push(path);

  return (
    <Box
      background='linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)'
      align='center'
      justify='center'
      fill
      round='medium'
    >
      <Heading>Taskify</Heading>
      <Heading level='3'>Lorem ipsum dolor</Heading>
      <Box align='center' pad='large' gap='small' direction='row'>
        <Button
          plain={false}
          onClick={() => directTo(PAGES.REGISTER)}
          primary
          color='white'
          label='Sign Up'
        />

        <Button
          plain={false}
          onClick={() => directTo(PAGES.LOGIN)}
          primary
          label='Sign In'
        />
      </Box>
    </Box>
  );
};

export default Landing;
