import React from "react";
import SubServicesRow from "../../Components/WebComponents/SubServicesRow";
import PaymentSummary from "../../Components/WebComponents/PaymentSummary";


const CheckoutPriceCard = ({ subServices }) => {

  return (
    <div>
   
          <SubServicesRow subServiceId={subServices} />
          <PaymentSummary subServiceId={subServices} />
       
    </div>
  );
};

export default CheckoutPriceCard;
