import express from 'express';
import checkToken from '../middlewares/CheckToken';
import {
  obtainConversation,
  obtainConversations,
  registerConversation,
  updateConversation,
} from '../controller/ConversationController';

const conversationRoute = express.Router();

conversationRoute.get('/', checkToken, obtainConversations);
conversationRoute.get('/:conversationId', checkToken, obtainConversation);
conversationRoute.post('/', checkToken, registerConversation);
conversationRoute.put('/:conversationId', checkToken, updateConversation);

export default conversationRoute;
