import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";

const TermsAndCondition = ({ drawerRef, forSp = false }) => {
   const color = forSp ? "text-yellow_gold" : "text-darkPurple";
  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"Terms and Conditions"} />
      <div className={` ${color} font-medium text-base`}>
        <p>Effective Date: [DATE OF LAUNCH]</p>
        <p>
          Welcome to Ulooks, the digital
          marketplace for beauty and grooming services. These Terms and
          Conditions ("Terms") govern your use of our Platform. Please read them
          carefully before using Ulooks
        </p>
        <p>
          By accessing or using Ulooks, you agree to be bound by these Terms.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">1.</b>
          <b>Eligibility </b>
        </div>
        <p>
          You must be at least 18 years old to use the platform. By registering,
          you cinfirm that you are legal age and have the legal capacity to
          enter into a binding agreement.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">2.</b>
          <b>Account Regitration </b>
        </div>
        <p>
          You agree to provide accurate, complete information, including your
          name as ut appears on your government-issued ID.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">3.</b>
          <b>Service Provider Verification </b>
        </div>
        <p>
          All service providers must undergo identity and business verification
          including. <br /> Government-issued ID and live selfie capture <br />{" "}
          Business registration (Where applicable). <br /> Physical shop check
          geo-tagged verification.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">4.</b>
          <b>Bookings & Payments </b>
        </div>
        <p>
          Customers can book services for home or shop visits. <br /> Payments
          can be made online or offline with applicable cancellation policies.{" "}
          <br /> Service providers agree to fufil all booked services
          professionally and on time.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">5.</b>
          <b>User Conduct </b>
        </div>
        <p>
          You agre not to: <br /> Use Ulooks for illegal or unauthorized
          purposes. <br /> Misrepresent yourself or services. <br /> Harass or
          harm other users.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">6.</b>
          <b>Reviews and Ratings </b>
        </div>
        <p>
          Customers may rate and review services. Ulooks reserves the right to
          moderate or remove reviews that violate our policies.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">7.</b>
          <b>Intellectual Property </b>
        </div>
        <p>
          All content, trademarks, and media on the Platform remain the property
          of Ulooks or its licensors. Users grant Ulooks the right to use
          service-related media content, including images, for promotional
          purposes unless opted out.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">8.</b>
          <b>Termination</b>
        </div>
        <p>
          We may suspend or terminate your account if you violate these Terms or
          engage in harmful behavior.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">9.</b>
          <b>Late Start & Timeliness Policy</b>
        </div>
        <p>
          To ensure a smooth and respectful experience for both customers and
          service providers, Ulooks has implemented a Late Start Policy. If a
          user (customer or service provider) snoozes or delays a scheduled
          appointment beyond 15 minutes, a small additional fee may be charged.
          This fee compensates the other party for their time and inconvenience.
          By using Ulooks, you agree to this policy and understand that
          punctuality helps maintain service quality and fairness for all users
          on the platform.
        </p>
       <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">10.</b>
          <b>Amendements</b>
        </div>
        <p>We reserve the right to update these Terms. Continued use means acceptance of the revised Terms</p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">11.</b>
          <b>Governing Law</b>
        </div>
        <p>These Terms are governed by the laws of your country or residence</p>
          <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">12.</b>
          <b>Contact</b>
        </div>
        <p>For inquires please contact us at:  <span className="hover:underline text-[#2E90FA] cursor-pointer">legal@ulooks.com</span> or  <span className="hover:underline text-[#2E90FA] cursor-pointer">support@ulooks.com</span></p>
      </div>
    </div>
  );
};

export default TermsAndCondition;
