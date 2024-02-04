import {Flex, Heading, Text} from "@chakra-ui/react";

export default function UserPage() {
  const user = { name: 'Neil Devas', email: 'neil.devas97@gmail.com' }
  return (
    <Flex direction={'column'}>
      <Heading size={'sm'}>
        Logged in as {user.name}
      </Heading>
      <Text>Body will go here</Text>
    </Flex>
  )
}
