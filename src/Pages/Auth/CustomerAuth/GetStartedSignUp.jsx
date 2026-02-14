import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import logoWithText from "../../../assets/Images/logo-with-text.svg";
import Button from "../../../Components/WebComponents/Button";
import { Link } from "react-router-dom";
import PageTransition from "../../../Components/SharedComponents/PageTransition";

const GetStartedSignUp = () => {
  return (
    <div>
      <PageTransition>
        <ConatinerWidth>
          <ContainerHeight>
            <div className="flex items-center justify-center w-full min-h-screen">
              <div className="w-[92%] sm:w-[80%] md:w-[31.25rem]">
                <div className="flex items-center justify-center mt-[18rem] md:mt-20">
                  <img
                    src={logoWithText}
                    alt="Company's logo with text 'Where convinence meets quality' "
                  />
                </div>
                      <div className="mt-[20%]">
                  <Link to={"/customerAuth/customer_createAccount"}>
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
                      Create account as Customer
                    </Button>
                  </Link>
                  <Link
                    to={"/serviceProviderAuth/serviceProvider_createAccount"}
                  >
                    <Button
                      backgroundColor="transparent"
                      color="#FEB200"
                      sx={{
                        border: "2px solid #FEB200",
                        width: "100%",
                        marginTop: "1rem",
                      }}
                    >
                      Create account as Service Provider
                    </Button>
                  </Link>
                  {/* <Link to="#" style={{ width: "100%" }}>
                    <div
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
                    </div>
                  </Link> */}
                </div>
                
                <p className="text-[#2f034e] font-bold text-center mt-12">
                  I have an account:{" "}
                  <Link to={"/"} className="text-purple">
                    Login
                  </Link>{" "}
                </p>
              </div>
            </div>
          </ContainerHeight>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default GetStartedSignUp;
