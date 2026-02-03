import recentlyUsed1 from "../assets/Images/recentlyUsed1.svg";
import recentlyUsed2 from "../assets/Images/recentlyUsed2.svg";
import recentlyUsed3 from "../assets/Images/recentlyUsed1.svg";
import recentlyUsed4 from "../assets/Images/recentlyUsed2.svg";
import recentlyUsed5 from "../assets/Images/recentlyUsed1.svg";
import recentlyUsed6 from "../assets/Images/recentlyUsed2.svg";
import client from "../assets/Images/clientCheck.svg";
import client2 from "../assets/Images/clientCheck2.svg";


export const services = [
  {
    id: "1",
    name: "Perfect Beauty Cutz",
    badge: "starter",
    step: 4,
    address: "Kayzplace barbershop",
    location: "72 Bode Thomas street, Surulere, Lagos, Nigeria",
    distance: "2 km",
    rating: 5.0,
    status: "Active",
    image: recentlyUsed1,
    gallery: [recentlyUsed1, recentlyUsed1, recentlyUsed1, recentlyUsed1],
    aboutUs: {
      description:
        "At Perfect Beauty Shop, we don't just cut hair—we craft confidence. I'm Adam Yusuf, and my team of skilled barbers is dedicated to giving you the sharpest, freshest look in town. Whether it's a classic fade, a sleek beard trim, or a modern style, we treat every cut with precision and passion.",
      openingHours: {
        days: "Monday - Friday",
        time: "09:00 am - 08:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 20,
      },
      {
        image: client,
        styles: "Designer Haircut",
        spec: "Adult and Teenagers",
        price: 2000,
        duration: 20,
      },
      {
        image: client,
        styles: "Female Haircut",
        spec: "Adult and children",
        price: 2000,
        duration: 30,
      },
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 10,
      },
      {
        image: client,
        styles: "Hair dying",
        spec: "Adult and children",
        price: 500,
        duration: 500,
      },
      {
        image: client,
        styles: "Home Service",
        spec: "You are to cover the  T-fair",
        price: 5000,
        duration: 60,
      },
    ],

    reviews: [
      {
        image: client2,
        name: "Joshua Osalobiao",
        rating: 3,
        review: "Good service i'll definitely update about your service.",
      },
      {
        image: client2,
        name: "Mark Essien",
        rating: 3,
        review: "Mad 🔥🔥🔥🔥🤜🏾🤳🏽",
      },
      {
        image: client2,
        name: "Emmy Cartier",
        rating: 3,
        review:
          "Top notch, like for real, the service and everything was lite. I’m sure to come back.",
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
    serviceType: "Barber",
  },
  {
    id: "2",
    name: "Quiver's Touch",
    badge: "growing",
    step: 1,
    address: "Jogja Expo Centre",
    location: "20, George street, Lokogoma, Lokoja",
    distance: "14 miles from you",
    rating: 2.5,
    status: "Active",
    image: recentlyUsed2,
    gallery: [recentlyUsed2, recentlyUsed2, recentlyUsed2, recentlyUsed2],
    aboutUs: {
      description:
        "At Perfect Beauty Shop, we don't just cut hair—we craft confidence. I'm Adam Yusuf, and my team of skilled barbers is dedicated to giving you the sharpest, freshest look in town. Whether it's a classic fade, a sleek beard trim, or a modern style, we treat every cut with precision and passion.",
      openingHours: {
        days: "Monday - Friday",
        time: "09:00 am - 08:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 20,
      },
      {
        image: client,
        styles: "Designer Haircut",
        spec: "Adult and Teenagers",
        price: 2000,
        duration: 20,
      },
      {
        image: client,
        styles: "Female Haircut",
        spec: "Adult and children",
        price: 2000,
        duration: 30,
      },
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 10,
      },
      {
        image: client,
        styles: "Hair dying",
        spec: "Adult and children",
        price: 500,
        duration: 500,
      },
      {
        image: client,
        styles: "Home Service",
        spec: "You are to cover the  T-fair",
        price: 5000,
        duration: 60,
      },
    ],

    reviews: [
      {
        image: client2,
        name: "Joshua Osalobiao",
        rating: 3,
        review: "Good service i'll definitely update about your service.",
      },
      {
        image: client2,
        name: "Mark Essien",
        rating: 3,
        review: "Mad 🔥🔥🔥🔥🤜🏾🤳🏽",
      },
      {
        image: client2,
        name: "Emmy Cartier",
        rating: 3,
        review:
          "Top notch, like for real, the service and everything was lite. I’m sure to come back.",
      },
    ],
    openingHours: {
      days: "Monday - Friday",
      time: "09:00 am - 08:00 pm",
    },
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Barber",
  },
  {
    id: "3",
    name: "Quality Barbershop",
    badge: "trusted",
    step: 4,
    location: "20, Rack Garden, Yamoyama, Lokoja",
    address: "Jogja Expo Centre",
    distance: "15 miles from you",
    rating: 3.0,
    status: "Active",
    image: recentlyUsed3,
    gallery: [recentlyUsed3, recentlyUsed3, recentlyUsed3, recentlyUsed3],

    aboutUs: {
      description:
        "At Perfect Beauty Shop, we don't just cut hair—we craft confidence. I'm Adam Yusuf, and my team of skilled barbers is dedicated to giving you the sharpest, freshest look in town. Whether it's a classic fade, a sleek beard trim, or a modern style, we treat every cut with precision and passion.",
      openingHours: {
        days: "Monday - Friday",
        time: "09:00 am - 08:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 20,
      },
      {
        image: client,
        styles: "Designer Haircut",
        spec: "Adult and Teenagers",
        price: 2000,
        duration: 20,
      },
      {
        image: client,
        styles: "Female Haircut",
        spec: "Adult and children",
        price: 2000,
        duration: 30,
      },
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 10,
      },
      {
        image: client,
        styles: "Hair dying",
        spec: "Adult and children",
        price: 500,
        duration: 500,
      },
      {
        image: client,
        styles: "Home Service",
        spec: "You are to cover the  T-fair",
        price: 5000,
        duration: 60,
      },
    ],

    reviews: [
      {
        image: client2,
        name: "Joshua Osalobiao",
        rating: 3,
        review: "Good service i'll definitely update about your service.",
      },
      {
        image: client2,
        name: "Mark Essien",
        rating: 3,
        review: "Mad 🔥🔥🔥🔥🤜🏾🤳🏽",
      },
      {
        image: client2,
        name: "Emmy Cartier",
        rating: 3,
        review:
          "Top notch, like for real, the service and everything was lite. I’m sure to come back.",
      },
    ],
    openingHours: {
      days: "Monday - Friday",
      time: "09:00 am - 08:00 pm",
    },
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Barber",
  },
  {
    id: "4",
    name: "Freeze Touch",
    badge: "master",
    step: 4,
    location: "Shop 20, Mallam Hassan Plaza, Ganja, Lokoja",
    address: "Jogja Expo Centre",
    distance: "18 miles from you",
    rating: 3.0,
    status: "Inactive",
    image: recentlyUsed4,
    gallery: [recentlyUsed4, recentlyUsed4, recentlyUsed4, recentlyUsed4],
    aboutUs: {
      description:
        "At Perfect Beauty Shop, we don't just cut hair—we craft confidence. I'm Adam Yusuf, and my team of skilled barbers is dedicated to giving you the sharpest, freshest look in town. Whether it's a classic fade, a sleek beard trim, or a modern style, we treat every cut with precision and passion.",
      openingHours: {
        days: "Monday - Friday",
        time: "09:00 am - 08:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 20,
      },
      {
        image: client,
        styles: "Designer Haircut",
        spec: "Adult and Teenagers",
        price: 2000,
        duration: 20,
      },
      {
        image: client,
        styles: "Female Haircut",
        spec: "Adult and children",
        price: 2000,
        duration: 30,
      },
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 10,
      },
      {
        image: client,
        styles: "Hair dying",
        spec: "Adult and children",
        price: 500,
        duration: 500,
      },
      {
        image: client,
        styles: "Home Service",
        spec: "You are to cover the  T-fair",
        price: 5000,
        duration: 60,
      },
    ],

    reviews: [
      {
        image: client2,
        name: "Joshua Osalobiao",
        rating: 3,
        review: "Good service i'll definitely update about your service.",
      },
      {
        image: client2,
        name: "Mark Essien",
        rating: 3,
        review: "Mad 🔥🔥🔥🔥🤜🏾🤳🏽",
      },
      {
        image: client2,
        name: "Emmy Cartier",
        rating: 3,
        review:
          "Top notch, like for real, the service and everything was lite. I’m sure to come back.",
      },
    ],
    openingHours: {
      days: "Monday - Friday",
      time: "09:00 am - 08:00 pm",
    },
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Hair dresser",
  },
  {
    id: "5",
    name: "Lugard's Barber shop",
    badge: "starter",
    step: 4,
    address: "20, 200 unit Ganja, Lokoja",
    location: "Shop 20, Mallam Hassan Plaza, Ganja, Lokoja",
    distance: "20 miles from you",
    rating: 3.5,
    status: "Active",
    image: recentlyUsed5,
    gallery: [recentlyUsed5, recentlyUsed5, recentlyUsed5, recentlyUsed5],
    aboutUs: {
      description:
        "At Perfect Beauty Shop, we don't just cut hair—we craft confidence. I'm Adam Yusuf, and my team of skilled barbers is dedicated to giving you the sharpest, freshest look in town. Whether it's a classic fade, a sleek beard trim, or a modern style, we treat every cut with precision and passion.",
      openingHours: {
        days: "Monday - Friday",
        time: "09:00 am - 08:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 20,
      },
      {
        image: client,
        styles: "Designer Haircut",
        spec: "Adult and Teenagers",
        price: 2000,
        duration: 20,
      },
      {
        image: client,
        styles: "Female Haircut",
        spec: "Adult and children",
        price: 2000,
        duration: 30,
      },
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 10,
      },
      {
        image: client,
        styles: "Hair dying",
        spec: "Adult and children",
        price: 500,
        duration: 500,
      },
      {
        image: client,
        styles: "Home Service",
        spec: "You are to cover the  T-fair",
        price: 5000,
        duration: 60,
      },
    ],

    reviews: [
      {
        image: client2,
        name: "Joshua Osalobiao",
        rating: 3,
        review: "Good service i'll definitely update about your service.",
      },
      {
        image: client2,
        name: "Mark Essien",
        rating: 3,
        review: "Mad 🔥🔥🔥🔥🤜🏾🤳🏽",
      },
      {
        image: client2,
        name: "Emmy Cartier",
        rating: 3,
        review:
          "Top notch, like for real, the service and everything was lite. I’m sure to come back.",
      },
    ],
    openingHours: {
      days: "Monday - Friday",
      time: "09:00 am - 08:00 pm",
    },
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Barber",
  },
  {
    id: "6",
    name: "Dewys Barbing",
    badge: "growing",
    step: 4,
    address: "20, George street, Lokogoma, Lokoja",
    location: "Shop 20, Mallam Hassan Plaza, Ganja, Lokoja",
    distance: "20 miles from you",
    rating: 2.5,

    status: "Active",
    image: recentlyUsed6,
    gallery: [recentlyUsed6, recentlyUsed6, recentlyUsed6, recentlyUsed6],
    aboutUs: {
      description:
        "At Perfect Beauty Shop, we don't just cut hair—we craft confidence. I'm Adam Yusuf, and my team of skilled barbers is dedicated to giving you the sharpest, freshest look in town. Whether it's a classic fade, a sleek beard trim, or a modern style, we treat every cut with precision and passion.",
      openingHours: {
        days: "Monday - Friday",
        time: "09:00 am - 08:00 pm",
      },
    },
    services: [
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 20,
      },
      {
        image: client,
        styles: "Designer Haircut",
        spec: "Adult and Teenagers",
        price: 2000,
        duration: 20,
      },
      {
        image: client,
        styles: "Female Haircut",
        spec: "Adult and children",
        price: 2000,
        duration: 30,
      },
      {
        image: client,
        styles: "Simple Haircut",
        spec: "Adult and children",
        price: 1000,
        duration: 10,
      },
      {
        image: client,
        styles: "Hair dying",
        spec: "Adult and children",
        price: 500,
        duration: 500,
      },
      {
        image: client,
        styles: "Home Service",
        spec: "You are to cover the  T-fair",
        price: 5000,
        duration: 60,
      },
    ],

    reviews: [
      {
        image: client2,
        name: "Joshua Osalobiao",
        rating: 3,
        review: "Good service i'll definitely update about your service.",
      },
      {
        image: client2,
        name: "Mark Essien",
        rating: 3,
        review: "Mad 🔥🔥🔥🔥🤜🏾🤳🏽",
      },
      {
        image: client2,
        name: "Emmy Cartier",
        rating: 3,
        review:
          "Top notch, like for real, the service and everything was lite. I’m sure to come back.",
      },
    ],
    openingHours: {
      days: "Monday - Friday",
      time: "09:00 am - 08:00 pm",
    },
    availableForHomeService: true,
    actions: {
      maps: true,
      chat: true,
      share: true,
      favorite: true,
    },
    tabs: ["About us", "Services", "Reviews"],
    serviceType: "Hair dresser",
  },
];
