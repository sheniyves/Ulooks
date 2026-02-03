import React from "react";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import IconBackground from "../../assets/Images/purple-icon.svg";
import StarRating from "../../Components/WebComponents/StarSvg";
import { services } from "../../data/barbingService";
import { useNavigate, useParams } from "react-router-dom";
import ReviewedService from "../../Components/WebComponents/ReviewedService";
import ReviewForm from "../../Components/WebComponents/ReviewForm";
import ActionButton from "../../Components/SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Button from "../../Components/WebComponents/Button";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import SmoothToggleVisibility from "../../Components/SharedComponents/SmoothToggleVisibility";

const Review = () => {
  const [rating, setRating] = React.useState(0);
  const { serviceId } = useParams();
  const finishedService = services.find((service) => service.id === serviceId);
  const [status, setStatus] = React.useState("idle");

  const formData = useSelector((state) => state.reviewSlice.reviewForm);
  const review = useSelector((state) => state.reviewSlice.review);

  const isButtonReady =
    Object.keys(formData).length > 0 &&
    Object.keys(review).length > 0 &&
    rating > 0;

  const buttonStatus = {
    idle: {
      content: "Share Review",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Submitting...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Submitted",
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
  const submitRef = React.useRef();
  const navigate = useNavigate();

  const handleSubmitReview = () => {
    submitRef.current?.click();
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("success");
      navigate("/customerWebApp/reviewSubmittedSuccessfully");
    }, 4000);
    return () => clearTimeout(timer);
  };
  return (
    <div
      style={{ backgroundImage: `url(${IconBackground})` }}
      className=" py-16 md:py-[5%] relative bg-[#e7cbfb] min-h-screen px-0 lg:px-4"
    >
      <ConatinerWidth>
          <div className="flex items-center flex-col justify-center w-full min-h-screen ">
            <div className="block md:hidden w-full px-4 lg:px-0 mb-20 mx-auto">
              <ReviewedService service={finishedService} />
            </div>
        <PageTransition>
            <SmoothToggleVisibility>
              <div className="max-w-[37.5rem] bg-white w-full mx-auto rounded-t-[30px] lg:rounded-[20px] shadow-sm px-6 md:px-[3.125rem] py-6 pb-16 md:pb-8 ">
                <div className="hidden md:block">
                  <ReviewedService service={finishedService} />
                </div>
                <div className="flex items-start md:items-center flex-col justify-center my-6">
                  <p className="text-darkerPurple font-bold text-xl mb-4">
                    Ratings
                  </p>
                  <StarRating rating={rating} setRating={setRating} />
                </div>

                <ReviewForm submitRef={submitRef} />
                <div className="mt-8" />
                {isButtonReady && (
                  <>
                    <ActionButton
                      onClick={handleSubmitReview}
                      disabled={!isButtonReady}
                      padding="1rem"
                      sx={{
                        marginTop: "1rem",
                        width: "100%",
                        fontWeight: "500",
                        backgroundColor: style.backgroundColor,
                        color: style.color,
                        cursor: style.cursor,
                        "&:hover": {
                          backgroundColor:
                            status === "idle"
                              ? "#5a0a99"
                              : style.backgroundColor,
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
                      )}
                      {content}
                    </ActionButton>

                    <Button
                      onClick={handleSubmitReview}
                      disabled={!isButtonReady}
                      backgroundColor={"transparent"}
                      color={"#6A0DAD"}
                      sx={{
                        width: "100%",

                        marginTop: "1rem",
                        "&:hover": {
                          backgroundColor: "#e0bbff ",
                        },
                      }}
                    >
                      Share review Anonymously
                    </Button>
                  </>
                )}
              </div>
            </SmoothToggleVisibility>
        </PageTransition>
          </div>
      </ConatinerWidth>
    </div>
  );
};

export default Review;
