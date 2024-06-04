import React, { useState } from 'react';
import { Box, Text, Heading, VStack, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEvent, useComments, useAddComment } from '../integrations/supabase/index.js';

const EventDetail = () => {
  const { eventId } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(eventId);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments(eventId);
  const addComment = useAddComment();
  const toast = useToast();

  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    try {
      await addComment.mutateAsync({ content: newComment, event_id: eventId });
      toast({ title: 'Comment added successfully', status: 'success' });
      setNewComment('');
    } catch (error) {
      toast({ title: 'Error adding comment', status: 'error' });
    }
  };

  if (eventLoading || commentsLoading) return <Box>Loading...</Box>;
  if (eventError || commentsError) return <Box>Error loading event details</Box>;

  return (
    <Box p={4}>
      <Heading>{event.name}</Heading>
      <Text>Date: {event.date}</Text>
      <Text>Description: {event.description}</Text>
      <Text>Venue ID: {event.venue_id}</Text>

      <Box mt={8}>
        <Heading size="md">Comments</Heading>
        <VStack spacing={4} mt={4}>
          {comments.map((comment) => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      <Box mt={8}>
        <Heading size="md">Add a Comment</Heading>
        <FormControl id="new-comment" mt={4}>
          <FormLabel>Comment</FormLabel>
          <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <Button mt={4} onClick={handleAddComment}>Submit</Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default EventDetail;