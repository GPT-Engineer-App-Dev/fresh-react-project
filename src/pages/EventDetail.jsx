import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEvent } from '../integrations/supabase/index.js';

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useEvent(id);

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error loading event details</Box>;

  return (
    <Box p={4}>
      <Heading>{event.name}</Heading>
      <Text>Date: {event.date}</Text>
      <Text>Description: {event.description}</Text>
      <Text>Venue ID: {event.venue_id}</Text>
    </Box>
  );
};

export default EventDetail;