import httpStatus from 'http-status';
import {
  createConversation,
  getConversation,
  getConversations,
  updateConversation as updateConversationService,
} from '../services/ConversationService';

export const registerConversation = async (req, res, next) => {
  try {
    const {
      userId,
      body,
    } = req;

    const conversation = await createConversation(userId, body);

    res.status(httpStatus.CREATED);
    res.send(conversation);
  } catch (error) {
    next(error);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const {
      userId,
      body: { message },
    } = req;

    const conversation = await updateConversationService(conversationId, userId, message);

    res.status(httpStatus.OK);
    res.send(conversation);
  } catch (error) {
    next(error);
  }
};

export const obtainConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const conversation = await getConversation(conversationId);

    res.status(httpStatus.OK);
    res.send(conversation);
  } catch (error) {
    next(error);
  }
};

export const obtainConversations = async (req, res, next) => {
  try {
    const { userId } = req;

    const conversations = await getConversations(userId);

    res.status(httpStatus.OK);
    res.send(conversations);
  } catch (error) {
    next(error);
  }
};
