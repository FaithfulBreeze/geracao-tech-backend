import { sequelize } from "./databaseConnection.js";
import { app } from "../app.js";
export async function serverStart(){
    const syncConfig = {
        force: process.env.SYNC_FORCE == 'false' ? false : true,
        alter: process.env.SYNC_ALTER == 'false' ? false : true
    }

    try {
            const connect = async () => {
                try {
                    console.log('Checking for database...')
                    await sequelize.sync()
                } catch (error) {
                    console.log('Connection not ready, waiting for database...')
                    return setTimeout(() => {
                        connect()
                    }, 2000)
                }
                sequelize.sync(syncConfig)
                console.log('Database is ready! \nConecting...')
                return app.listen(80, () => console.log('Server running on port 80.'))
            }
            connect()
    } catch (error) {
        console.log('Could not start the server...', error)
    }
}