import { config } from 'dotenv';
import { app } from "./app.js";

config({
    path: './data/config.env'
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}, in ${process.env.NODE_ENV}mode.`);
});