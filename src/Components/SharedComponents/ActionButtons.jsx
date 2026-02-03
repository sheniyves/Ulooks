import map from "../../assets/Images/logos_google-maps.svg";
import chat from "../../assets/Images/follow_icon.svg";
import share from "../../assets/Images/Sharer.svg";
import heart from "../../assets/Images/heart.svg";
import { IconButton } from "@mui/material";
const actions = [
  {
    label: "Maps",
    icon: map,
  },
  {
    label: "Share",
    icon: share,
  },
  {
    label: "Favorite",
    icon: heart,
  },
  {
    label: "Folow",
    icon: chat,
  },
];

const ActionButtons = ({ dialogRef, icons = [0, 4] }) => {
  const handleAction = (tab) => {
    if (tab === "Maps") {
      dialogRef.current?.openDialog();
    } else {
      return;
    }
  };
  return (
    <ul className="flex items-center justify-between px-2 gap-2">
      {actions?.slice(icons[0], icons[1]).map((action, idx) => (
        <li
          key={idx}
          className="flex  flex-col items-center justify-center text-sm font-normal text-darkPurple"
          onClick={() => handleAction(action.label)}
        >
          <IconButton>
            <img src={action.icon} alt={`${action.label} icon`} />
          </IconButton>
          <span>{action.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default ActionButtons;
