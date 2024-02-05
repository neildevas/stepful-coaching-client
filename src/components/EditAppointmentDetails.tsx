import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea
} from '@chakra-ui/react'
import {Appointment} from "../types";
import {useState} from "react";
import moment from "moment-timezone";

type Props = {
  onSave: (values: Record<string, any>) => void;
  isOpen: boolean;
  onClose: () => void,
  appointment: Appointment
}
const EditAppointmentDetails = ({ isOpen, onClose, appointment, onSave }: Props) => {
  const [notes, setNotes] = useState<string | null>(appointment.notes);
  const [studentRating, setStudentRating] = useState<number | null>(appointment.student_satisfaction_rating);
  console.log('NEW STUDENT RATING', studentRating);
  const onSaveChanges = () => {
    onSave({
      student_satisfaction_rating: studentRating,
      notes,
    })
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View and Edit Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {appointment.Student ? (
            <Text>Student: {appointment.Student.User.name}</Text>
          ) : (
            <Text>Student: Not booked yet</Text>
          )}
          <Text>Start time: {moment(appointment.start_time).format('MMMM Do YYYY, h:mm a')}</Text>
          <Text>End time: {moment(appointment.end_time).format('MMMM Do YYYY, h:mm a')}</Text>
          <Box>
            <Text>Student satisfaction rating</Text>
            <NumberInput max={5} min={1} defaultValue={studentRating ? studentRating : undefined} onChange={(_, val) => setStudentRating(val)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Text>Notes: </Text>
          <Textarea onChange={(e) => setNotes(e.target.value)} value={notes ?? ''} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant='ghost'
            isDisabled={notes === appointment.notes && studentRating === appointment.student_satisfaction_rating}
            onClick={onSaveChanges}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default EditAppointmentDetails;
