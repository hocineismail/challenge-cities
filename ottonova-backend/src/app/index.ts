import express from "express";
import 'dotenv/config'


const app = express();
const POST = process.env.PORT || 3001;




app.listen(POST, () => {
    console.log(`Server running on port ${POST}`);
});