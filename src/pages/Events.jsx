import React, { useState } from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '', venue_id: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(newEvent);
      toast({ title: 'Event added successfully', status: 'success' });
      setNewEvent({ name: '', date: '', description: '', venue_id: '' });
    } catch (error) {
      toast({ title: 'Error adding event', status: 'error' });
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      await updateEvent.mutateAsync(event);
      toast({ title: 'Event updated successfully', status: 'success' });
      setEditingEvent(null);
    } catch (error) {
      toast({ title: 'Error updating event', status: 'error' });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: 'Event deleted successfully', status: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting event', status: 'error' });
    }
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error loading events</Box>;

  return (
    <Box p={4}>
      <FormControl id="new-event" mb={4}>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={newEvent.name} onChange={handleInputChange} />
        <FormLabel>Date</FormLabel>
        <Input name="date" value={newEvent.date} onChange={handleInputChange} />
        <FormLabel>Description</FormLabel>
        <Input name="description" value={newEvent.description} onChange={handleInputChange} />
        <FormLabel>Venue ID</FormLabel>
        <Input name="venue_id" value={newEvent.venue_id} onChange={handleInputChange} />
        <Button mt={4} onClick={handleAddEvent}>Add Event</Button>
      </FormControl>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Venue ID</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.id}>
              <Td>
                {editingEvent?.id === event.id ? (
                  <Input
                    name="name"
                    value={editingEvent.name}
                    onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  />
                ) : (
                  event.name
                )}
              </Td>
              <Td>
                {editingEvent?.id === event.id ? (
                  <Input
                    name="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                ) : (
                  event.date
                )}
              </Td>
              <Td>
                {editingEvent?.id === event.id ? (
                  <Input
                    name="description"
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  />
                ) : (
                  event.description
                )}
              </Td>
              <Td>
                {editingEvent?.id === event.id ? (
                  <Input
                    name="venue_id"
                    value={editingEvent.venue_id}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })}
                  />
                ) : (
                  event.venue_id
                )}
              </Td>
              <Td>
                {editingEvent?.id === event.id ? (
                  <Button onClick={() => handleUpdateEvent(editingEvent)}>Save</Button>
                ) : (
                  <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                )}
                <Button ml={2} onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Events;