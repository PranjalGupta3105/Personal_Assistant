import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_SERVER, process.env.DB_NAME, process.env.DB_PWD, {
    dialect: 'postgres',
    host: process.env.DB_HOST
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 export default sequelize;
