import express from "express";
import 'dotenv/config'


import 'reflect-metadata';

import citiesRoutes from "@routes/citiesRoute";
import { corsHandler } from "@middleware/corsHandler";
import { errorHandler } from "@middleware/ errorHandler";
import { Logger } from "@middleware/Logger";




const app = express();

const POST = process.env.PORT || 8080;



// Apply middleware
app.use(Logger);
app.use(corsHandler);
app.use("/api/v1/", citiesRoutes)
app.use(errorHandler);


app.listen(POST, () => {
    console.log(`Server running on port ${POST}`);
});