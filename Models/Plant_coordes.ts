import mongoose, { Schema, Document } from "mongoose";

interface Subscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface PlantCoordinatesDocument extends Document {
  find_id: string;
  UserId: string;
  Plant_id: string;
  commonName: string;
  late: number;
  long: number;
  imageURL: string;
  Plant_Addresses: string;
  subscription: Subscription;
}

const PlantsCoordinateSchema: Schema = new Schema({
  find_id: { type: String, required: true },
  UserId: { type: String, required: true },
  Plant_id: { type: String, required: true },
  commonName: { type: String, required: true },
  late: { type: Number, required: true },
  long: { type: Number, required: true },
  imageURL: { type: String, required: true },
  Plant_Addresses: { type: String, required: true },
  subscription: {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
});

// Check if the model already exists to prevent overwriting
const PlantsCoordinates =
  mongoose.models.plants_coordinates ||
  mongoose.model<PlantCoordinatesDocument>(
    "plants_coordinates",
    PlantsCoordinateSchema
  );

export default PlantsCoordinates;
