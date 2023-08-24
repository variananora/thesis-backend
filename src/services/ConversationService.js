import {
  fetchConversation,
  fetchConversations,
  saveConversation,
  updateConversation as updateConversationRepository,
} from '../repositories/ConversationRepository';
import { saveMessage } from '../repositories/MessageRepository';
import { getConversationByParticipants } from './CommissionService';

export const createConversation = async (userId, body) => {
  const conversation = await getConversationByParticipants([userId, body?.receiver]);

  const message = {
    userId,
    message: body?.message,
  };
  const createdMessage = await saveMessage(message);

  if (conversation) {
    return updateConversationRepository(conversation._id, createdMessage._id);
  }

  const newConversation = {
    participants: [userId, body?.receiver],
    messages: [createdMessage._id],
  };

  return saveConversation(newConversation);
};

// eslint-disable-next-line max-len
export const updateConversation = async (conversationId, userId, message) => {
  const newMessage = {
    userId,
    message,
  };
  const createdMessage = await saveMessage(newMessage);

  return updateConversationRepository(conversationId, createdMessage._id);
};

export const getConversation = async (conversationId) => {
  if (conversationId === 'null' || conversationId === '') {
    return [];
  }

  return fetchConversation(conversationId);
};

export const getConversations = async (userId) => fetchConversations(userId);
