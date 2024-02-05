import {Box, Button, Flex, Text, FormControl, FormLabel, Input} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';

import "react-datepicker/dist/react-datepicker.css";
import {useCallback, useState} from "react";
import {User} from "../types";
import {stepfulFetch} from "../actions/users";

const AddAppointment = ({ user }: { user: User }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const addAppointment = useCallback(async () => {
    try {
      if (!user.Coach?.id) throw new Error('You must be a coach to do this');
      const appointment = await stepfulFetch('/appointments', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coach_id: user.Coach.id, start_time: moment(startDate).toDate() })
      });
      alert('Successfully added appointment');
      console.log('CREATED APPOINTMENT', appointment);
    } catch (err) {
      console.log(err);
      alert('We had trouble creating your appointment');
    }
  }, [startDate, user.Coach?.id]);

  const isValidDate = (date: Date | null) => {
    if (!date) return false;
    const start = moment(date).startOf('day').hour(8);
    const end = moment(date).startOf('day').hour(20);
    return moment(date).isBetween(start, end, null, '[]'); // '[]' includes start and end
  };

  const minTime = new Date();
  minTime.setHours(8,0,0);
  const maxTime = new Date();
  maxTime.setHours(20,0,0);
  return (
    <Flex p={4}>
      <Flex justifyContent={'center'} flex={1} direction={'column'} ml={'48px'}>
        <FormControl>
          <FormLabel>Choose a date and time:</FormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/dd/yyyy h:mm aa"
            customInput={<Input />}
            placeholderText={'Select a date'}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="time"
            minDate={moment().toDate()}
            minTime={minTime}
            maxTime={maxTime}
          />
        </FormControl>
        <Box mt={8}>
          <Text>Start time: {startDate ? moment(startDate).format('MMMM Do YYYY, h:mm a') : ''}</Text>
          <Text mt={2}>End time: {startDate ? moment(startDate).add(2, 'hours').format('MMMM Do YYYY, h:mm a') : ''}</Text>
        </Box>
        <Box>
          <Button colorScheme="blue" isDisabled={!isValidDate(startDate)} onClick={addAppointment} mt={8}>Add appointment</Button>
        </Box>
      </Flex>
    </Flex>


  );
}
export default AddAppointment;
