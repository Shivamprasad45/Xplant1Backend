import express from "express";
import { getPlantsCoordinatesByUserId } from "../controllers/Plant_coords/Plant_coords_fetch";

const router = express.Router();

router.get("/", getPlantsCoordinatesByUserId);

export const Plant_Coords_route = router;
