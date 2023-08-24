import Message from '../models/Message';

// eslint-disable-next-line import/prefer-default-export
export const saveMessage = async (message) => Message.create(message);
