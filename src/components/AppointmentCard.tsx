import {Appointment} from "../types";
import {Button, ButtonGroup, Card, CardBody, CardFooter, Text} from "@chakra-ui/react";
import moment from "moment-timezone";

type Props = {
  appointment: Appointment;
  onBook: null | ((id: number) => void)
  isBooked: boolean;
};

export const AppointmentCard = ({appointment, onBook, isBooked}: Props) => {
  const {Coach, start_time, end_time, id} = appointment;
  return (
    <Card>
      <CardBody>
        <Text>With coach: {Coach.User.name}</Text>
        <Text>Start time: {moment(start_time).format('MMMM Do YYYY, h:mm a')}</Text>
        <Text>End time: {moment(end_time).format('MMMM Do YYYY, h:mm a')}</Text>
      </CardBody>
      {!isBooked && (
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' onClick={() => { if (onBook) { onBook(id) } }}>
              Book Now
            </Button>
          </ButtonGroup>
        </CardFooter>
      )}
    </Card>
  )
}
