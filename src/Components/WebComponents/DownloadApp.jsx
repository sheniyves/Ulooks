import AlertDialog from "../SharedComponents/AlertDialog";
import googlePlayLogo from "../../assets/Images/g_play_logo.svg";
import appleLogo from "../../assets/Images/apple_logo.svg";
import Button from "./Button";
const DownloadApp = ({ downloadOnAppRef, handleClose = () => {} }) => {
  return (
    <AlertDialog
      ref={downloadOnAppRef}
      onClose={handleClose}
      iconPresence={false}
    >
      <div className="mt-[-3rem] p-6">
        <h1 className="text-darkPurple text-[28px] text-center font-bold font-fashion mb-4">
          Download App to use Lite Mode
        </h1>
        <p className="text-darkPurple text-xl font-medium text-center mb-10">
          Lite Mode is not available for the web, It’s only available for mobile
          app. Download the Mobile app to access the lite mode or more
        </p>
        <Button backgroundColor={"#1B1B1B"} sx={{ width: "100%", py: ".5rem" }}>
          <div className="flex items-center gap-2 text-white">
            <img
              src={googlePlayLogo}
              alt="Google play icon"
              className="w-6 h-7"
            />
            <div className="text-left">
              <span className="text-xs">Download on the</span>
              <h1 className="text-xl font-bold capitalize -mt-2">App Store</h1>
            </div>
          </div>
        </Button>
        <Button
          backgroundColor={"#1B1B1B"}
          sx={{ marginTop: "1rem", width: "100%", py: ".5rem" }}
        >
          <div className="flex items-center gap-2 text-white">
            <img src={appleLogo} alt="Google play icon" className="w-6 h-7" />
            <div className="text-left">
              <span className="text-xs">Get on</span>
              <h1 className="text-xl font-bold capitalize -mt-2">
                Google Play
              </h1>
            </div>
          </div>
        </Button>
      </div>
    </AlertDialog>
  );
};

export default DownloadApp;
