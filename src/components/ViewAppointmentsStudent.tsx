import {Appointment, User} from "../types";
import {Button, VStack} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";
import {stepfulFetch} from "../actions/users";
import {AppointmentCard} from "./AppointmentCard";

const ViewAppointmentsStudent = ({ user }: { user: User }) => {
  const [appts, setAppts] = useState<Appointment[]>([]);
  const fetchAppointments = useCallback(async () => {
    try {
      if (!user.Student?.id) throw new Error('Must be a student to do this');
      const appointments = await stepfulFetch(`/students/${user.Student?.id}/appointments`);
      setAppts(appointments);
    } catch (err) {
      console.log(err);
    }
  }, [user.Student?.id]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <>
      <Button colorScheme={'blue'} onClick={fetchAppointments}>Refresh booked appointments</Button>
      <VStack spacing={'24px'}>
        {appts.map(appt => (
          <AppointmentCard key={appt.id} appointment={appt} onBook={null} isBooked={true} />
        ))}
      </VStack>
    </>

  )
}
export default ViewAppointmentsStudent;
