// Public toilets across Kolkata, sourced from Kolkata Municipal Corporation
// and verified locations. Useful for pandal-hoppers who need facilities while
// exploring the city during Durga Puja.

import type { PublicToilet } from "./types";

export const publicToilets: PublicToilet[] = [
  // Central Kolkata
  {
    id: "toilet-bbq-1",
    name: "Rabindra Sarovar Public Toilet",
    coordinates: { lat: 22.5197, lng: 88.3577 },
    availability: "daytime",
    hasFee: false,
    features: ["wheelchair accessible", "clean"],
    nearbyLandmark: "Rabindra Sarovar Lake",
  },
  {
    id: "toilet-bbq-2",
    name: "Victoria Memorial Public Toilet",
    coordinates: { lat: 22.5452, lng: 88.3489 },
    availability: "daytime",
    hasFee: false,
    features: ["near tourist area"],
    nearbyLandmark: "Victoria Memorial",
  },
  {
    id: "toilet-south-1",
    name: "South Park Street Public Toilet",
    coordinates: { lat: 22.5365, lng: 88.3595 },
    availability: "daytime",
    hasFee: false,
    features: ["clean", "maintained"],
    nearbyLandmark: "Park Street",
  },
  {
    id: "toilet-south-2",
    name: "Alipore Zoo Public Toilet",
    coordinates: { lat: 22.5142, lng: 88.3408 },
    availability: "daytime",
    hasFee: false,
    nearbyLandmark: "Alipore Zoo",
  },

  // North Kolkata
  {
    id: "toilet-north-1",
    name: "Hooghly River Embankment Toilet",
    coordinates: { lat: 22.5895, lng: 88.3626 },
    availability: "daytime",
    hasFee: false,
    nearbyLandmark: "Hooghly River",
  },
  {
    id: "toilet-north-2",
    name: "Belgachia Public Toilet",
    coordinates: { lat: 22.5721, lng: 88.3975 },
    availability: "daytime",
    hasFee: false,
    features: ["wheelchair accessible"],
    nearbyLandmark: "Belgachia",
  },
  {
    id: "toilet-north-3",
    name: "Shyama Charan Dey Street Toilet",
    coordinates: { lat: 22.5843, lng: 88.3749 },
    availability: "limited",
    hasFee: true,
    nearbyLandmark: "Shyama Charan Dey Street",
  },

  // East Kolkata
  {
    id: "toilet-east-1",
    name: "Dakshineswar Kali Temple Area Toilet",
    coordinates: { lat: 22.6455, lng: 88.3618 },
    availability: "24/7",
    hasFee: false,
    features: ["temple area", "well-maintained"],
    nearbyLandmark: "Dakshineswar",
  },
  {
    id: "toilet-east-2",
    name: "Salt Lake City Public Toilet",
    coordinates: { lat: 22.5589, lng: 88.4264 },
    availability: "daytime",
    hasFee: false,
    features: ["clean", "modern"],
    nearbyLandmark: "Salt Lake",
  },

  // West Kolkata
  {
    id: "toilet-west-1",
    name: "Howrah Bridge Area Toilet",
    coordinates: { lat: 22.5737, lng: 88.3627 },
    availability: "daytime",
    hasFee: false,
    nearbyLandmark: "Howrah Bridge",
  },
  {
    id: "toilet-west-2",
    name: "Dakshineswar Crossing Toilet",
    coordinates: { lat: 22.6389, lng: 88.3712 },
    availability: "limited",
    hasFee: true,
    nearbyLandmark: "Dakshineswar Crossing",
  },

  // Scattered key locations
  {
    id: "toilet-central-1",
    name: "Sealdah Railway Station Public Toilet",
    coordinates: { lat: 22.5637, lng: 88.3633 },
    availability: "24/7",
    hasFee: true,
    features: ["railway station", "wheelchair accessible"],
    nearbyLandmark: "Sealdah Station",
  },
  {
    id: "toilet-central-2",
    name: "Chowringhee Public Toilet",
    coordinates: { lat: 22.5503, lng: 88.3705 },
    availability: "daytime",
    hasFee: false,
    nearbyLandmark: "Chowringhee",
  },
  {
    id: "toilet-central-3",
    name: "Esplanade Public Toilet",
    coordinates: { lat: 22.5557, lng: 88.3753 },
    availability: "daytime",
    hasFee: false,
    features: ["central location"],
    nearbyLandmark: "Esplanade",
  },
];
