import badge1 from "../assets/Images/sp_badge_grade_1.svg";
import badge2 from "../assets/Images/sp_badge_grade_2.svg";
import badge3 from "../assets/Images/sp_badge_grade_3.svg";
import badge4 from "../assets/Images/sp_badge_grade_4.svg";

export const handlePriceFormatting = (price) => {
  if (price >= 1_000) {
    const formattedPrice = (price / 1000).toFixed(1);
    return `₦${formattedPrice}K`;
  } else {
    return `₦${price}`;
  }
};

export function handleFormatting(amount, currency = "NGN") {
  const locale = currency === "USD" ? "en-US" : "en-NG";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/['’]/g, "") // remove apostrophes
    .replace(/&/g, "and") // replace &
    .replace(/\s+/g, "_"); // spaces → _

export const handleDurationFormatting = (duration) => {
  if (duration >= 60) {
    const formattedDuration = (duration / 60).toFixed(1);
    return `${formattedDuration} hour`;
  } else {
    return `${duration} min`;
  }
};

export const handleRatingFormaatting = (rating) => {
  const array = new Array(5).fill(0);
  return array.map((_, i) => (i < rating ? 1 : 0));
};

export function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

export function stringAvatar(name) {
  if (!name) {
    return {
      sx: {
        bgcolor: "#ccc",
      },
      children: "",
    };
  }
  const nameParts = name.split(" ");
  let children = "";

  if (nameParts.length === 1) {
    children = nameParts[0][0];
  } else if (nameParts.length >= 2) {
    children = `${nameParts[0][0]}${nameParts[1][0]}`;
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 60,
      height: 60,
      fontSize: 24,
    },
    children: children.toUpperCase(),
  };
}

export function getFrequencyCount(option) {
  const mapping = {
    Twice: 2,
    Three: 3,
    Four: 4,
    Five: 5,
  };

  for (const word in mapping) {
    if (option.includes(word)) {
      return mapping[word];
    }
  }

  return 0;
}

export const getBadgeType = (badge) => {
  if (!badge) return
  const badgeInLowercase = badge.toLowerCase();
  switch (badgeInLowercase) {
    case "starter stylist":
      return badge1;
    case "growing pro":
      return badge2;
    case "trusted expert":
      return badge3;
    case "service master":
      return badge4;

    default:
      return badge1;
  }
};
