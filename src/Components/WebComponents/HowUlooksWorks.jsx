import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";

const HowUlooksWorks = ({ drawerRef, forSp = false }) => {
  const color = forSp ? "text-yellow_gold" : "text-darkPurple";
  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"How Ulooks Works"} />

      <div className={`${color} font-medium text-base`}>
        <h2 className="font-fashion text-xl">For customers</h2>
        <span>How appointments and payments work</span>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>Booking a service</b>
        <ul className="ml-4 list-disc list-inside">
          <li>Choose a service and provider, then review price and time.</li>
          <li>
            Pay securley in-app. Your money goes into escrow, not directly to
            the provider.
          </li>
          <li>
            You will see clear details of date, time, and location before
            confirming.
          </li>
        </ul>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>During the appointment</b>
        <ul className="ml-4 list-disc list-inside">
          <li>Be available at the agreed location and time.</li>
          <li>
            You can track appointment status (pending, confirmend in-progress,
            and completed).
          </li>
        </ul>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>After the service</b>
        <ul className="ml-4 list-disc list-inside">
          <li> The provider will mark the service as completed.</li>
          <li> You must confirm if the service was done properly. </li>
          <li>On the confirmation screen you can rate the provider.</li>
          <li>
            Once you confirm, the payment is released from the escrow to the
            provider{" "}
          </li>
        </ul>

        <div className="my-5 border-t border-[#D0D5DD]" />
        <h2 className="font-fashion text-xl">For service providers</h2>
        <span>Guides for the service providers</span>
        <b>Before accepting a booking</b>
        <ul className="ml-4 list-disc list-inside">
          <li> Only accept appointments you can actually deliver on time</li>
          <li> Keep your profile, prices, and services accurate</li>
        </ul>

        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>Updating appointment status</b>
        <ul className="ml-4 list-disc list-inside">
          <li>
            {" "}
            Keep your appointment status up to data: pending &rarr; confirmed
            &rarr; in-progress &rarr; completed.
          </li>
          <li>
            {" "}
            Mark an appointment as IN PROGRESS when you start the service.
          </li>
          <li>Mark it as COMPLETED only after you finish the work </li>
        </ul>

        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>When do you get paid?</b>
        <ul className="ml-4 list-disc list-inside">
          <li>Customer payment goes into escrow first.</li>
          <li>
            You will only recieve the money in your wallet after the customer
            confirms completion.
          </li>
          <li>
            You will get notifications and email once the payment is released to
            your wallet.
          </li>
        </ul>

        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>Ratings and professionalism levels</b>
        <ul className="ml-4 list-disc list-inside">
          <li>Customers can rate you after each completed appointment</li>
          <li>
            Good rating and completed jobs help you move from starter to higher
            professionalism levels.
          </li>
          <li>
            Higher levels may unlock better visibility and trust on the
            platform.
          </li>
        </ul>

        <div className="my-5 border-t border-[#D0D5DD]" />
        <b>Handling disputes</b>
        <ul className="ml-4 list-disc list-inside">
          <li>
            {" "}
            If a customer opens a dispute, respond politely and provide a clear
            information
          </li>
          <li> The admin team will review both sides and decide the outcome</li>
        </ul>
      </div>
    </div>
  );
};

export default HowUlooksWorks;
