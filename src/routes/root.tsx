import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";
import {Form, Outlet, useLoaderData, Link} from "react-router-dom";
import {User} from "../types";

// TODO - would ideally split out the sidebar, but
// the POST API and useLoaderData API have to be reworked

export default function Root() {
  const { users } = useLoaderData() as { users?: User[] };
  console.log('USERS', users);
  return (
    <Flex>
      <Box
        w="250px"
        bg="gray.200"
        h="100vh"
        position="fixed"
        top="0"
        left="0"
        overflowY="auto"
        boxShadow="md"
        zIndex="100"
        p={4}
        display={'flex'}
        flexDirection={'column'}
      >
        {/* Your sidebar content goes here */}
        <Heading size={'sm'}>Users</Heading>
        {!users?.length && <Text fontSize={'sm'} mt={2}>No users to display. Please create a user to get started</Text>}
        {users?.map(it => {
          return <Box key={it.id} mt={2}><Button as={Link} to={`users/${it.id}`} variant={'link'}>{it.name}</Button></Box>
        })}
        <Box mt={8}>
          <Form method="post">
            <Button type="submit" colorScheme={'blue'} mb={4}>Add a User</Button>
          </Form>
        </Box>
      </Box>
      <Box flex="1" p="4" ml="250px">
        <div id="detail">
          <Outlet />
        </div>
      </Box>
    </Flex>
  )
}
