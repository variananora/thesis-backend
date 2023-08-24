import { first } from 'lodash';
import Conversation from '../models/Conversation';
import { conversationQuery, conversationsQuery } from './queries/ConversationQuery';

export const saveConversation = async (conversation) => Conversation
  .create(conversation);

export const updateConversation = async (conversationId, messageId) => Conversation
  .findOneAndUpdate(
    { _id: conversationId },
    {
      $push: {
        messages: messageId,
      },
    },
    { new: true },
  );

export const fetchConversation = async (conversationId) => {
  const query = conversationQuery(conversationId);
  return first(await Conversation.aggregate(query));
};

export const fetchConversations = async (userId) => {
  const query = conversationsQuery(userId);
  return Conversation.aggregate(query);
};

export const fetchConversationByParticipants = async (participants) => Conversation
  .findOne({ participants: { $all: participants } });
