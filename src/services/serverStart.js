import { sequelize } from "./databaseConnection.js";
import { app } from "../app.js";
export function serverStart(){
    try {
        sequelize.sync({force: true, alter: true})
        app.listen(80, () => console.log('Server running on port 80.\n'))
    } catch (error) {
        console.log('Could not start the server... \n', error)
    }
}