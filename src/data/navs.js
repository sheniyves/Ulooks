import home from "../assets/Images/home-2.svg";
import category from "../assets/Images/category.svg";
import calender from "../assets/Images/calender-2.svg";
import earnings from "../assets/Images/moneys.svg";
import inspiration from "../assets/Images/gallery-tick.svg";
import profileNav from "../assets/Images/profileNav.svg";
import wallet from "../assets/Images/wallet-add.svg";

export const spNavs = [
  { icon: category, label: "Home", to: "/serviceProviderWebApp/home" },
  {
    icon: calender,
    label: "Appointments",
    to: "/serviceProviderWebApp/appointments",
  },
  { icon: earnings, label: "Earnings", to: "/serviceProviderWebApp/earnings" },
  { icon: inspiration, label: "Inspiration", to: "/serviceProviderWebApp/inspiration" },
  { icon: profileNav, label: "Profile", to: "/serviceProviderWebApp/profile" },
];



export const cNavs = [
  { icon: home, label: "Home", to: "/customerWebApp/home" },
  { icon: calender, label: "Appointments", to: "/customerWebApp/appointments" },
  { icon: wallet, label: "Wallet", to: "/customerWebApp/wallet" },
  { icon: inspiration, label: "Inspiration", to: "/customerWebApp/inspiration" },
  { icon: profileNav, label: "Profile", to: "/customerWebApp/profile" },
];