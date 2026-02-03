import React from "react";
import backgroundIcon from "../../../assets/Images/background-icon-gray.svg";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import logoWithText from "../../../assets/Images/logo-with-text.svg";
import Button from "../../../Components/WebComponents/Button";
import { Link } from "react-router-dom";
import PageTransition from "../../../Components/SharedComponents/PageTransition";

const GetStartedSignIn = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <PageTransition>
        <ContainerHeight>
          <ConatinerWidth>
            <div className="flex items-center justify-center w-full min-h-screen overflow-hidden">
              <div className="w-[92%] sm:w-[80%] md:w-[31.25rem]">
                <div className="flex items-center justify-center mt-[18rem] md:mt-20">
                  <img
                    src={logoWithText}
                    alt="Company's logo with text 'Where convinence meets quality' "
                  />
                </div>
                <div className="mt-[20%]">
                  <Link to={"/customerAuth/customer_signIn"}>
                    <Button
                      sx={{
                        backgroundColor: "#6A0DAD",
                        width: "100%",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#5a0a99",
                        },
                      }}
                    >
                      Sign in as Customer
                    </Button>
                  </Link>
                  <Link to={"/serviceProviderAuth/serviceProvider_signIn"}>
                    <Button
                      backgroundColor="transparent"
                      sx={{
                        border: "2px solid #FEB200",
                        width: "100%",
                        marginTop: "1rem",
                        color: "#FEB200",
                      }}
                    >
                      Sign in as Service Provider
                    </Button>
                  </Link>
                  <Link
                    to="#"
                    style={{ width: "100%" }}
                  >
                    {/* <div
                      style={{
                        position: "relative",
                        borderRadius: ".5rem",
                        padding: "2px",
                        background: "linear-gradient(to right, purple, gold)",
                        width: "100%",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        backgroundColor="transparent"
                        sx={{
                          background: "white",
                          borderRadius: ".5rem",
                          color: "#FEB200",
                          width: "100%",
                        }}
                      >
                        Sign in as Organization
                      </Button>
                    </div> */}
                  </Link>
                </div>
                <p className="text-[#2f034e] font-bold text-center mt-12">
                  I don't have an account:{" "}
                  <Link
                    to={"/customerAuth/getStarted_SignUp"}
                    className="text-purple"
                  >
                    Create Account
                  </Link>{" "}
                </p>
              </div>
            </div>
          </ConatinerWidth>
        </ContainerHeight>
      </PageTransition>
    </div>
  );
};

export default GetStartedSignIn;
