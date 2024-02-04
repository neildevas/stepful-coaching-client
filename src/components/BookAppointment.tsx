// Fetch all available appointments
// Clicking one changes to a detail view or opens a model and allows a user to book
import {useCallback, useEffect, useState} from "react";
import {Appointment, User} from "../types";
import {stepfulFetch} from "../actions/users";
import {VStack} from "@chakra-ui/react";
import {AppointmentCard} from "./AppointmentCard";

type Props = {
  user: User
}
const BookAppointment: React.FC<Props> = ({ user }) => {
  const [availableAppts, setAvailableAppts] = useState<Appointment[]>([]);
  const [error, setError] = useState(null);

  const fetchAvailableAppointments = useCallback(async () => {
    try {
      const appointments = await stepfulFetch('/appointments/available');
      setAvailableAppts(appointments);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchAvailableAppointments();
  }, [fetchAvailableAppointments]);

  const onBook = useCallback(async (appointmentId: number) => {
    try {
      if (!user.Student) throw new Error('must be a student to book');
      await stepfulFetch(`/appointments/${appointmentId}/book`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id: user.Student?.id })
      });
      fetchAvailableAppointments();
    } catch (err) {
      console.log(err);
      alert('Error booking appt');
    }
  }, [fetchAvailableAppointments, user.Student])

  return (
    <VStack spacing={'24px'}>
      {availableAppts.map(appt => (
        <AppointmentCard appointment={appt} key={appt.id} onBook={onBook} isBooked={false} />
      ))}
    </VStack>
  )
};

export default BookAppointment
