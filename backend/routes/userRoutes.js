import express from "express";
import { create, deleteUser, getAll, getOne, update  } from "../controller/userController.js";

const route = express.Router();

// for Create api  and using post->to insert the data

route.post("/create", create);

// for fetching data using get 

route.get("/getall", getAll);

// fetching single data by using id

route.get("/getone/:id",getOne);

// to update the existing data 

route.put("/update/:id",update );

// to delete the existing data

route.delete("/delete/:id",deleteUser);

export default route;