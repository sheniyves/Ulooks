import ads1 from "../assets/Images/ads1.png";
import ads2 from "../assets/Images/ads2.png";
import client from "../assets/Images/clientCheck.svg";
import client2 from "../assets/Images/clientCheck2.svg";

export const topService = [
  {
    id: "7",
    badge: "master",
    name: "Davina's Beauty Spa",
    service: "Spa and Wellness",
    address: "45, Eleganza Street, Victoria Island, Lagos",
    location: "Eko Plaza",
    distance: "4.5 km",
    rating: 4.8,
    status: "Active",
    image: ads1,
    gallery: [ads1, ads1, ads1, ads1],
    aboutUs: {
      description:
        "At Davina's Beauty Spa, we believe relaxation is a necessity. Our certified spa professionals offer a blend of modern and traditional therapies to leave you refreshed, revitalized, and glowing.",
      openingHours: {
        days: "Monday - Sunday",
        time: "09:00 am - 09:00 pm",
      },
    },
    services: [
      {
        image: ads1,
        styles: "Full Body Massage",
        spec: "Adults only",
        price: 8000,
        duration: 60,
      },
      {
        image: client,
        styles: "Facial Treatment",
        spec: "Unisex",
        price: 5000,
        duration: 45,
      },
      {
        image: client,
        styles: "Aromatherapy",
        spec: "Adults only",
        price: 6000,
        duration: 50,
      },
    ],
    reviews: [
      {
        image: client2,
        name: "Amaka Bello",
        rating: 5,
        review: "One of the best spa experiences I've ever had. So relaxing!",
      },
      {
        image: client2,
        name: "Uche Chukwu",
        rating: 4,
        review: "Professional staff and cozy environment. Highly recommend!",
      },
    ],
    availableForHomeService: false,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Spa and Wellness",
  },
  {
    id: "8",
    badge: "trusted",
    name: "Ariana's Saloon",
    service: "Hair Stylist",
    address: "10, Fashion Close, Lekki Phase 1, Lagos",
    location: "Lekki Mall",
    distance: "2.2 km",
    rating: 4.5,
    status: "Active",
    image: ads2,
    gallery: [ads2, ads2, ads2, ads2],
    aboutUs: {
      description:
        "Ariana's Saloon redefines beauty through modern haircare and styling. From natural textures to glam looks, our stylists are here to transform your vision into reality.",
      openingHours: {
        days: "Tuesday - Sunday",
        time: "10:00 am - 07:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Silk Press",
        spec: "Female",
        price: 3000,
        duration: 40,
      },
      {
        image: client,
        styles: "Cornrows",
        spec: "All hair types",
        price: 2000,
        duration: 35,
      },
      {
        image: client,
        styles: "Wig Install",
        spec: "Female",
        price: 7000,
        duration: 60,
      },
    ],
    reviews: [
      {
        image: client2,
        name: "Sandra Gold",
        rating: 5,
        review: "They slayed my hair! I’m beyond impressed. 😍",
      },
      {
        image: client2,
        name: "Teni Blaq",
        rating: 4,
        review: "Clean environment and friendly staff. Good pricing too.",
      },
    ],
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Hair Stylist",
  },
  {
    id: "9",
    badge: "growing",
    name: "Davina's Beauty Spa",
    service: "Spa and Wellness",
    address: "45, Eleganza Street, Victoria Island, Lagos",
    location: "Eko Plaza",
    distance: "4.5 km",
    rating: 4.8,
    status: "Active",
    image: ads1,
    gallery: [ads1, ads1, ads1, ads1],
    aboutUs: {
      description:
        "At Davina's Beauty Spa, we believe relaxation is a necessity. Our certified spa professionals offer a blend of modern and traditional therapies to leave you refreshed, revitalized, and glowing.",
      openingHours: {
        days: "Monday - Sunday",
        time: "09:00 am - 09:00 pm",
      },
    },
    services: [
      {
        image: ads1,
        styles: "Full Body Massage",
        spec: "Adults only",
        price: 8000,
        duration: 60,
      },
      {
        image: client,
        styles: "Facial Treatment",
        spec: "Unisex",
        price: 5000,
        duration: 45,
      },
      {
        image: client,
        styles: "Aromatherapy",
        spec: "Adults only",
        price: 6000,
        duration: 50,
      },
    ],
    reviews: [
      {
        image: client2,
        name: "Amaka Bello",
        rating: 5,
        review: "One of the best spa experiences I've ever had. So relaxing!",
      },
      {
        image: client2,
        name: "Uche Chukwu",
        rating: 4,
        review: "Professional staff and cozy environment. Highly recommend!",
      },
    ],
    availableForHomeService: false,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Spa and Wellness",
  },
  {
    id: "10",
    badge: "master  ",
    name: "Ariana's Saloon",
    service: "Hair Stylist",
    address: "10, Fashion Close, Lekki Phase 1, Lagos",
    location: "Lekki Mall",
    distance: "2.2 km",
    rating: 4.5,
    status: "Active",
    image: ads2,
    gallery: [ads2, ads2, ads2, ads2],
    aboutUs: {
      description:
        "Ariana's Saloon redefines beauty through modern haircare and styling. From natural textures to glam looks, our stylists are here to transform your vision into reality.",
      openingHours: {
        days: "Tuesday - Sunday",
        time: "10:00 am - 07:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Silk Press",
        spec: "Female",
        price: 3000,
        duration: 40,
      },
      {
        image: client,
        styles: "Cornrows",
        spec: "All hair types",
        price: 2000,
        duration: 35,
      },
      {
        image: client,
        styles: "Wig Install",
        spec: "Female",
        price: 7000,
        duration: 60,
      },
    ],
    reviews: [
      {
        image: client2,
        name: "Sandra Gold",
        rating: 5,
        review: "They slayed my hair! I’m beyond impressed. 😍",
      },
      {
        image: client2,
        name: "Teni Blaq",
        rating: 4,
        review: "Clean environment and friendly staff. Good pricing too.",
      },
    ],
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Hair Stylist",
  },
];
