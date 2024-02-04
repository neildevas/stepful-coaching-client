import {Flex, Heading, Text} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import {User} from "../types";

export default function UserPage() {
  const { user } = useLoaderData() as { user: User };

  return (
    <Flex direction={'column'}>
      <Heading size={'sm'}>
        Logged in as {user.name}
      </Heading>
      <Text>Body will go here</Text>
    </Flex>
  )
}
