import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";

const PrivacyPolicy = ({ drawerRef, forSp = false }) => {
  const color = forSp ? "text-yellow_gold" : "text-darkPurple";
  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"Privacy Policy"} />

      <div className={`${color} font-medium text-base`}>
        <p>Effective Date: [DATE OF LAUNCH]</p>
        <p>
          Ulooks ("we") respects your privacy and is committed to protecting
          your personal data. This Privacy Policy outlines how we collect, use,
          disclose, and protect your information when you use our mobile
          application or website (collectively, the "Platform").
        </p>
        <p>
          By using Ulooks, you agree to the practices described in this policy.
          If you do not agree, please do not use our services.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="  ">
          <div className="flex items-center">
            <b className="mr-2 block ">1.</b>
            <b>information We Collect</b>
          </div>
          <p>We collect the following types of information:</p>

          <div className="flex items-center gap-2 ">
            <p>a.</p>
            <p>Personal Information</p>
          </div>
          <ul className="ml-4 list-disc list-inside">
            <li>Full name (as seen on a valid government-issued ID)</li>
            <li>Date of birth</li>
            <li>Phone number and email address</li>
            <li>Gender</li>
            <li>Home or business address</li>
            <li>National identification Number (NIN)</li>
            <li>Emergency contact Information</li>
          </ul>
          <div className="flex items-center gap-2 ">
            <p>b.</p>
            <p>Identity Verification</p>
          </div>
          <ul className="ml-4 list-disc list-inside">
            <li>Government-issued ID card image</li>
            <li>Live facial photo for liveness and identity check</li>
          </ul>
          <div className="flex items-center gap-2 ">
            <p>c.</p>
            <p>Device and Usage Data</p>
          </div>
          <ul className="ml-4 list-disc list-inside">
            <li>IP address</li>
            <li>Device model and OS</li>
            <li>Usage patterns (e.g pages visited, buttons clicked)</li>
          </ul>
          <div className="flex items-center gap-2 ">
            <p>d.</p>
            <p>Location Data</p>
          </div>
          <ul className="ml-4 list-disc list-inside">
            <li>
              GPS data to match customers with nearby service providers to
              verify service provider locations
            </li>
          </ul>
          <div className="flex items-center gap-2 ">
            <p>e.</p>
            <p>Media Content</p>
          </div>
          <ul className="ml-4 list-disc list-inside">
            <li>
              Photos uploaded by users including before-and-after of services
            </li>
          </ul>
        </div>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">2.</b>
          <b>How we Use Your Information</b>
        </div>
        <p>We use your data to:</p>
        <ul className="ml-4 list-disc list-inside">
          <li>Create and manage your account</li>
          <li>Verify your identity and ensure platform security</li>
          <li>Facilitate bookings and payments</li>
          <li>Personalized services and recommendations</li>
          <li>Provide customer support</li>
          <li>Comply with legal and regulatory obligations</li>
          <li>Analyze usage trends to improve our services</li>
        </ul>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">3.</b>
          <b>Sharing Your Information</b>
        </div>
        <p>We may share your data with:</p>
        <ul className="ml-4 list-disc list-inside">
          <li>Verified service provider or customers (as applicable)</li>
          <li>
            Third-party payment gateways (e.g Paystack, Flutterwave, Stripe)
          </li>
          <li>Identity verification KYC vendors</li>
          <li>Government and law enforcement agencies if required by law</li>
          <li>We do not sell your personal data</li>
        </ul>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">4.</b>
          <b>Data Security</b>
        </div>
        <p>
          We implement technical and organizational measures to protect your
          data, including :
        </p>
        <ul className="ml-4 list-disc list-inside">
          <li>Encrypted storage and transmission</li>
          <li>Secure login and verification systems</li>
          <li>Access control and regular audits</li>
        </ul>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">5.</b>
          <b>Your Rights</b>
        </div>
        <p>You have the right to:</p>
        <ul className="ml-4 list-disc list-inside">
          <li>Access and correct your information</li>
          <li>
            Request deletion of your data (except where legally necessary)
          </li>
          <li>Opt out of marketing communications</li>
        </ul>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">6.</b>
          <b>Retention</b>
        </div>
        <p>
          We retain your data only as long as necessary for the purpose
          described as required by law.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">7.</b>
          <b>Children's Privacy</b>
        </div>
        <p>
          Ulooks does not knowlingly collect personal data from users under 18.
          If we become aware of such data, we will delete it promptly.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">8.</b>
          <b>Changes to This Policy </b>
        </div>
        <p>
          We may update this Privacy Policy. Continued use of Ulooks means you
          accept the Updated policy.
        </p>
        <div className="my-5 border-t border-[#D0D5DD]" />
        <div className="flex items-center">
          <b className="mr-2 block ">9.</b>
          <b>Contact Us</b>
        </div>
        <p>
          For questions or concerns us at{" "}
          <span className="hover:underline text-[#2E90FA] cursor-pointer">
            Support@ulooks
          </span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
