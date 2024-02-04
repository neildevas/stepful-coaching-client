import React, {useState} from 'react';
import './App.css';
import { Box, Flex, Heading } from "@chakra-ui/react";
import {User} from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  // Fetch all users here
  return (
    <Flex>
      <Box flex="1" p="4" ml="250px">
        <Heading>Main Content</Heading>
        <p>
          {/* Your main content goes here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          aliquet nisi id tristique efficitur.
        </p>
      </Box>
    </Flex>
  );
}

export default App;
