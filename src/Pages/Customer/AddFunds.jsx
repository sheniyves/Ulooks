import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import cardIcon from "../../assets/Images/card.svg";
import moneySendIcon from "../../assets/Images/money-send.svg";
import { useNavigate } from "react-router-dom";
import SlideOption from "../../Components/SharedComponents/SlideOption";
import FundWithCardForm from "../../Components/WebComponents/FundWithCardForm";
import { useForm } from "react-hook-form";
import FundCardByTransferForm from "../../Components/WebComponents/FundCardByTransferForm";
import ActionButton from "../../Components/SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import { useSelector, useDispatch } from "react-redux";
import Lottie from "lottie-react";
import {
  isCardDetailsSubmitted,
  isTransferDetailsSubmitted,
} from "../../redux/addFundsSlice";

const AddFunds = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { handleSubmit } = useForm();
  const handleTimeSelection = (index) => {
    setActiveIndex(index);
  };

  const [status, setStatus] = React.useState("idle");

  const submitCardRef = React.useRef(null);
  const submitTransferRef = React.useRef(null);
  const [lastSubmittedForm, setLastSubmittedForm] = React.useState(null);

  const isSubmitted = useSelector(
    (state) => state.fundsSlice.isDetailsSubmitted
  );

  const dispatch = useDispatch();
  const handleFormSubmit = () => {
    if (activeIndex === 0) {
      setLastSubmittedForm("card");
      submitCardRef.current?.click();
    } else {
      setLastSubmittedForm("transfer");
      submitTransferRef.current?.click();
    }
  };

  React.useEffect(() => {
    let loadingTimer;
    let idleTimer;

if (isSubmitted) {
  setStatus("loading");

  loadingTimer = setTimeout(() => {
    setStatus("success");

    idleTimer = setTimeout(() => {
      setStatus("idle");

      if (lastSubmittedForm === "card") {
        dispatch(isCardDetailsSubmitted(false));
      } else if (lastSubmittedForm === "transfer") {
        dispatch(isTransferDetailsSubmitted(false));
      }

      setLastSubmittedForm(null);
    }, 2000);
  }, 4000);
}

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(idleTimer);
    };
  }, [isSubmitted, lastSubmittedForm, dispatch]);

  const buttonStatus = {
    idle: {
      content: "Fund",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Processing...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Payment Successful",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "default",
      },
    },
    error: {
      content: "Something went wrong",
      style: {
        backgroundColor: "#D32F2F",
        color: "#fff",
        cursor: "default",
      },
    },
  };

  const { content, style } = buttonStatus[status];
  return (
    <div className="pb-10 md:pb-[8rem] mt-6 ">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between  max-w-full xl:max-w-[75%] mb-10 ">
            <Header onClick={() => navigate(-1)} iconPresence={false}>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Add funds
              </div>
            </Header>
          </div>
          <div>
            <Content useMargin={false}>
              <div className=" -mb-6 md:mb-0 max-w-[35.125rem] mx-auto">
                <SlideOption
                  setActiveIndex={handleTimeSelection}
                  activeIndex={activeIndex}
                  label={""}
                  options={["Fund with Card", "Fund by Transfer"]}
                  useIcons={[cardIcon, moneySendIcon]}
                />
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 mt-14">
                  <FundWithCardForm
                    isActive={activeIndex === 0}
                    buttonRef={submitCardRef}
                  />
                  <FundCardByTransferForm
                    handleSubmit={handleSubmit}
                    buttonRef={submitTransferRef}
                    isActive={activeIndex === 1}
                  />
                </div>
              </div>
              <div className=" max-w-full xs:max-w-[90%] sm:max-w-[50%] mx-auto">
                <ActionButton
                  onClick={handleFormSubmit}
                  disabled={status === "loading"}
                  sx={{
                    marginTop: "1rem",
                    ...style,
                    width: "100%",
                    "&:hover": {
                      backgroundColor:
                        status === "idle" ? "#5a0a99" : style.backgroundColor,
                    },
                  }}
                >
                  {status === "loading" && (
                    <Lottie
                      size={20}
                      className="w-6"
                      animationData={spinner}
                      loop={true}
                    />
                  )}{" "}
                  {content}
                </ActionButton>
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default AddFunds;
