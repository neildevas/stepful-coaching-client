import {Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Text, VStack, Box, useDisclosure} from "@chakra-ui/react";
import {Appointment, User} from "../types";
import {useCallback, useEffect, useState} from "react";
import {stepfulFetch} from "../actions/users";
import moment from "moment-timezone";
import EditAppointmentDetails from "./EditAppointmentDetails";

interface Props {
  user: User;
}

const ViewAppointmentsCoach: React.FC<Props> = ({ user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = useCallback(async () => {
    try {
      if (!user.Coach?.id) throw new Error('Must be a coach to do this');
      const appointments = await stepfulFetch(`/coaches/${user.Coach.id}/appointments`);
      setAppointments(appointments);
    } catch (err) {
      console.log(err);
      alert('We had trouble fetching your appointments')
    }
  }, [user.Coach?.id]);

  const editAppointment = useCallback(async (appointmentId: number, updates: Record<string, any>) => {
    try {
      const updatedAppointment: Appointment = await stepfulFetch(`/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates)
      });
      setAppointments(prevAppointments => {
        return prevAppointments.map(it => {
          if (it.id === updatedAppointment.id) {
            return updatedAppointment;
          }
          return it;
        })
      })
      // await fetchAppointments(); // instead of fetching, let's replace the appointment in the array
    } catch (err) {
      console.log(err);
      alert('We had trouble ending the appointment')
    }
  }, [])

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const upComingAppointments: Appointment[] = [];
  const pastAppointments: Appointment[] = [];
  appointments.forEach(appt => {
    if (moment(appt.start_time).isAfter(moment()) && appt.status !== 'ended') {
      upComingAppointments.push(appt);
    } else {
      pastAppointments.push(appt);
    }
  });

  return (
    <>
    <Button colorScheme={"blue"} onClick={fetchAppointments}>Refetch appointments</Button>
    <VStack spacing={'80px'}>
      <Box>
        <Heading>Upcoming Appointments</Heading>
        <VStack>
          {!upComingAppointments.length && <Text>You do not have any upcoming appointments</Text>}
          {upComingAppointments.map(it => (
            <CoachAppointmentCard appointment={it} key={it.id} onEnd={() => editAppointment(it.id, { status: 'ended'} )} editAppointment={(values) => editAppointment(it.id, values)} />
          ))}
        </VStack>
      </Box>
      <Box>
        <Heading>Past, Current, and Ended Appointments</Heading>
        <VStack>
          {pastAppointments.map(it => (
            <CoachAppointmentCard appointment={it} key={it.id} onEnd={() => editAppointment(it.id, { status: 'ended'} )} editAppointment={(values) => editAppointment(it.id, values)} />
          ))}
        </VStack>
      </Box>
    </VStack>
    </>
  )
}

const CoachAppointmentCard = ({ appointment, onEnd, editAppointment }: { appointment: Appointment, onEnd: (apptId: number) => void; editAppointment: (values: Record<string, any>) => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <EditAppointmentDetails
        isOpen={isOpen}
        onClose={onClose}
        appointment={appointment}
        onSave={(vals) => {
          editAppointment(vals);
          onClose();
        }}
      />
    <Card>
      <CardBody>
        <Text>With student: {appointment.Student  ? appointment.Student.User.name : 'Not booked yet'}</Text>
        <Text>Start time: {moment(appointment.start_time).format('MMMM Do YYYY, h:mm a')}</Text>
        <Text>End time: {moment(appointment.end_time).format('MMMM Do YYYY, h:mm a')}</Text>
        <Text>Student satisfaction rating: {appointment.student_satisfaction_rating}</Text>
        <Text>Notes: {appointment.notes}</Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing='2'>
          {appointment.status !== 'ended' ? (
            <Button variant='solid' colorScheme='blue' onClick={() => { onEnd(appointment.id) }}>
              End Appointment
            </Button>
          ) : (
            <Button variant='solid' colorScheme='blue' onClick={onOpen}>
              Edit details
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
    </>
  )
}
export default ViewAppointmentsCoach;
