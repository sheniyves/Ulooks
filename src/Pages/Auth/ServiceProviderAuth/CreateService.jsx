import React from "react";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import ulooksBoard from "../../../assets/Images/ulooks-board.svg";
import CreateServiceForm from "./CreateServiceForm";
import FormProgress from "../CustomerAuth/FormProgress";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import addIcon from "../../../assets/Images/add.svg";
import { IconButton } from "@mui/material";
import seeExample from "../../../assets/Images/seeExample.svg";
import { Link } from "react-router-dom";

const CreateService = () => {
  return (
    <div>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="hidden lg:block sticky top-0 h-screen">
              <img
                src={ulooksBoard}
                alt="Company logo on a wooden board"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-h-screen overflow-y-auto px-4 md:px-6 py-20 w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <PageTransition>
                <div className="flex items-center justify-between">
                  <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold ">
                    Create Service
                  </h2>
                  <Link to={"/serviceProviderWebApp/created_service"}>
                    <div className="flex items-center gap-2 text-yellow_gold font-medium">
                      See Example <img src={seeExample} arial-hidden />{" "}
                    </div>
                  </Link>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-yellow_gold text-xl font-medium">
                    Service 1
                  </h2>
                  <IconButton>
                    <img className="w-[90%]" src={addIcon} alt="Add icon" />
                  </IconButton>
                </div>

                <CreateServiceForm />
              </PageTransition>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default CreateService;
