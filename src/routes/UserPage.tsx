import {Flex, Heading, Text} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import {Appointment, User} from "../types";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import BookAppointment from "../components/BookAppointment";
import ViewAppointmentsStudent from "../components/ViewAppointmentsStudent";
import {useCallback, useState} from "react";
import {stepfulFetch} from "../actions/users";
import AddAppointment from "../components/AddAppointment";
import ViewAppointmentsCoach from "../components/ViewAppointmentsCoach";

// Assumes a user will either have a student or a coach
export default function UserPage() {
  const response = useLoaderData() as { user: User };
  if (!response) return (
    <Flex direction={'column'}>
      <Heading size={'sm'}>
        Error
      </Heading>
      <Text>Body will go here</Text>
    </Flex>
  )
  const { user } = response;
  const { Coach } = user;

  return (
    <Flex direction={'column'}>
      <Heading size={'md'} mb={16}>
        Welcome {user.name}!
      </Heading>
      {Coach ? <CoachDashboard user={user} /> : <StudentDashboard user={user} />}
    </Flex>
  )
}

const CoachDashboard = ({ user }: { user: User }) => (
  <Tabs>
    <TabList>
      <Tab>Add an appointment</Tab>
      <Tab>View my appointments</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <AddAppointment />
      </TabPanel>
      <TabPanel>
        <ViewAppointmentsCoach user={user} />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Book an appointment</Tab>
        <Tab>View my appointments</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <BookAppointment user={user} />
        </TabPanel>
        <TabPanel>
          <ViewAppointmentsStudent user={user} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
