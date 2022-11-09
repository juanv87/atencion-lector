import { setUserMessages } from "./userMessagesSlice";
import { loadMessages, sendMessages } from '../../services/services'

  
  export const loadUserMessages = () => {
    return async (dispatch, getState) => {
      const { uid, status } = await getState().auth;
      try {
        const userMessages = await loadMessages({ uid });
        dispatch(setUserMessages(userMessages));
      } catch (error) {
        throw error;
      }
    };
  };

  export const sendUserMessage = (uid, mensaje, messageFrom) => {    
    return async (dispatch, getState) => {
      try {
        await sendMessages(uid, mensaje, messageFrom);
      } catch (error) {
        throw error;
      }    
    }
  };