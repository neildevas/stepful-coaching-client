import { useRouteError } from "react-router-dom";
import { Heading, Text } from '@chakra-ui/react';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        {/*@ts-ignore*/}
        <i>{error.statusText || error.message}</i>
      </Text>
    </div>
  );
}
