import express from "express";
import 'dotenv/config'


import 'reflect-metadata';

import citiesRoutes from "@routes/citiesRoute";


const app = express();
const POST = process.env.PORT || 3001;


app.use("/api/v1/", citiesRoutes)



app.listen(POST, () => {
    console.log(`Server running on port ${POST}`);
});