import { DataTypes } from "sequelize";
import sequelize from "../config/database-config.js";


const chatHistory = sequelize.define(
    "chat-history",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { timeStamps: true, underscored: true }
  );
  
  sequelize
    .sync()
    .then(() => {
      console.log("chat-history table created successfully!");
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
  
  export default chatHistory;