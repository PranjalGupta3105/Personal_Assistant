import chatHistory from "../models/chat-history.js";

export const addChatHistory = async (user_id, text, text_type) => {
  try {
    await chatHistory.create({ user_id, text, text_type });
  } catch (error) {
    throw error;
  }
};

export const getOldChatHistory = async (user_id) => {
  try {
    let {count, rows} = await chatHistory.findAndCountAll({
      attributes: ["text", "text_type"],
      where: { user_id },
      order: [["id", "DESC"]],
    });

    if (count <= 0) {
      return;
    } else {
      return rows;
    }
  } catch (error) {
    throw error;
  }
};
