import { sequelize } from "./databaseConnection.js";
import { app } from "../app.js";
export async function serverStart(){
    const syncConfig = {
        force: process.env.SYNC_FORCE == 'false' ? false : true,
        alter: process.env.SYNC_ALTER == 'false' ? false : true
    }
    try {
        setTimeout( async () => {
            await sequelize.sync(syncConfig)
            app.listen(80, () => console.log('Server running on port 80.'))
        }, 5000)
    } catch (error) {
        console.log('Could not start the server...', error)
    }
}