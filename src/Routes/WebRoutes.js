import React from "react";
import GetStartedSignIn from "../Pages/Auth/CustomerAuth/GetStartedSignIn";
import GetStartedSignUp from "../Pages/Auth/CustomerAuth/GetStartedSignUp";
import CustomerCreateAccount from "../Pages/Auth/CustomerAuth/CustomerCreateAccount";
import {
  CustomerAuthLayout,
  CustomerWebApp,
  ServiceProviderAuthLayout,
} from "../Routes/webLayouts";
import AccountCreatedSuccessfully from "../Pages/Auth/CustomerAuth/AccountCreatedSuccessfully";
import CustomerSignIn from "../Pages/Auth/CustomerAuth/CustomerSignIn";
import CustomerResetPaassword from "../Pages/Auth/CustomerAuth/CustomerResetPassword";
import CustomerCheckMail from "../Pages/Auth/CustomerAuth/CustomerChangePassword.jsx";
import CustomerPersonalizeAccount from "../Pages/Auth/CustomerAuth/CustomerPersonalizeAccount";
import AccountPersonalizedSuccessfully from "../Pages/Auth/CustomerAuth/AccountPersonalizedSuccessfully";
import GetStartedSignInSp from "../Pages/Auth/ServiceProviderAuth/GetStartedSignInSp";
import GetStartedSignUpSp from "../Pages/Auth/ServiceProviderAuth/GetStartedSignUpSp";
import SPCreateAccount from "../Pages/Auth/ServiceProviderAuth/SPCreateAccount";
import CustomerResetPasswordSp from "../Pages/Auth/ServiceProviderAuth/SPResetPassword";
import CustomerCheckMailSp from "../Pages/Auth/ServiceProviderAuth/SPCheckMail";
import CustomerPersonalizeAccountSp from "../Pages/Auth/ServiceProviderAuth/SPPersonalizeAccount";
import AccountPersonalizedSuccessfullySp from "../Pages/Auth/ServiceProviderAuth/AccountPersonalizedSuccessfullySp";
import AccountCreatedSuccessfullySp from "../Pages/Auth/ServiceProviderAuth/AccountCreatedSuccessfullySp";
import SPSignIn from "../Pages/Auth/ServiceProviderAuth/SPSignIn";
import SPResetPassword from "../Pages/Auth/ServiceProviderAuth/SPResetPassword";
import SPPersonalizeAccount from "../Pages/Auth/ServiceProviderAuth/SPPersonalizeAccount";
import SPCheckMail from "../Pages/Auth/ServiceProviderAuth/SPCheckMail";
import CustomerHome from "../Pages/Customer/CustomerHome";
import CustomerAppointments from "../Pages/Customer/CustomerAppointments";
import CustomerWallet from "../Pages/Customer/CustomerWallet";
import CustomerMessage from "../Pages/Customer/CustomerMessage";
import CustomerProfile from "../Pages/Customer/CustomerProfile";
import NoAppointments from "../Pages/Customer/NoAppointments";
import ServiceDetailPage from "../Pages/Customer/ServiceDetailPage";
import SearchScreen from "../Pages/Customer/SearchScreen";
import WarningToStartKYC from "../Pages/Customer/WarningToStartKYC";
import KYCSuccessfullyCreated from "../Components/WebComponents/KYCSuccessfullyCompleted";
import BookingCheckout from "../Pages/Customer/BookingCheckout";
import Booking from "../Pages/Customer/Booking";
import InsufficientFunds from "../Components/SharedComponents/InsufficentFunds";
import ServiceSuccessfullyBooked from "../Components/WebComponents/ServiceSuccessfullyBooked";
import Ticket from "../Pages/Customer/Ticket";
import SupportMessageSentSuccessfully from "../Components/WebComponents/SupportMessagesSentSuccessfully";
import TransactionHistory from "../Pages/Customer/TransactionHistory";
import AddFunds from "../Pages/Customer/AddFunds";
import Withdraw from "../Pages/Customer/Withdraw";
import EmptyWallet from "../Pages/Customer/EmptyWallet";
import ServiceFinished from "../Pages/Customer/ServiceFinished";
import Review from "../Pages/Customer/Review";
import ReviewSubmittedSuccessfully from "../Components/WebComponents/ReviewSubmittedSuccessfully";
import Queue from "../Pages/Customer/Queue";
import CancelAppointments from "../Pages/Customer/CancelAppointments";
import AppointmentCancelledSuccessfully from "../Pages/Customer/AppointmentCancelledSuccessfully";
import ServiceProviderHome from "../Pages/ServiceProvider/ServiceProviderHome";
import ServiceProviderNoAppointments from "../Pages/ServiceProvider/ServiceProviderNoAppointments";
import TodayAppointment from "../Pages/ServiceProvider/TodayAppointment";
import ServiceProviderWithdraw from "../Pages/ServiceProvider/ServiceProviderWithdraw";
import ServiceProviderAvailability from "../Pages/ServiceProvider/ServiceProviderAvailability";
import AdsInfo from "../Pages/ServiceProvider/AdsInfo";
import ServiceProviderAppointment from "../Pages/ServiceProvider/ServiceProviderAppointment";
import ServiceRenderedSuccessfully from "../Pages/ServiceProvider/ServiceRenderedSuccessfully";
import ServiceProviderWarningToStartKYC from "../Pages/ServiceProvider/ServiceProviderWarningToStartKYC";
import ServiceProviderKYCSuccessfullyCreated from "../Pages/ServiceProvider/ServiceProviderKYCSuccessfullyCreated";
import ServiceProviderEarnings from "../Pages/ServiceProvider/ServiceProviderEarnings";
import ServiceProviderTransactionHistory from "../Pages/ServiceProvider/ServiceProviderTransactionHistory";
import NoEarnings from "../Pages/ServiceProvider/NoEarnings";
import ServiceProviderCancelAppointments from "../Pages/ServiceProvider/ServiceProviderCancelAppointment";
import AppointmentCancelledSuccessfullysp from "../Pages/ServiceProvider/AppointmentCancelledSuccessfullysp";
import ServiceProviderProfile from "../Pages/ServiceProvider/ServiceProviderProfile";
import ServiceProviderMessageSent from "../Pages/ServiceProvider/ServiceProviderMessageSent";
import WelcomeBack from "../Pages/Auth/CustomerAuth/WelcomeBackPage";
import BookNow from "../Pages/Customer/BookNow";
import BadgeExplanation from "../Pages/Customer/BadgeExplanation";
import ServiceProviderMessage from "../Pages/ServiceProvider/ServiceProviderMessage";
import CustomerInspiration from "../Pages/Customer/CustomerInspiration";
import CreatePost from "../Pages/Customer/CreatePost";
import CreatePostSp from "../Pages/ServiceProvider/CreatePost";
import ServiceProviderInspiration from "../Pages/ServiceProvider/ServiceProviderInspiration";
import CustomerVerifyAccount from "../Pages/Auth/CustomerAuth/CustomerOtpVerification.jsx";
import LoginSuccessful from "../Pages/Auth/CustomerAuth/LoginSuccessful.jsx";
import CustomerOtpVerification from "../Pages/Auth/CustomerAuth/CustomerOtpVerification.jsx";
import ConfirmPassword from "../Pages/Auth/CustomerAuth/ConfirmPassword.jsx";
import ServiceProviderOtpVerification from "../Pages/Auth/ServiceProviderAuth/ServiceProviderOtpVerification.jsx";
import SPLoginSuccessful from "../Pages/Auth/ServiceProviderAuth/SPLoginSuccessful.jsx";
import SPconfirmPassword from "../Pages/Auth/ServiceProviderAuth/SPconfirmPassword.jsx";
import CreateService from "../Pages/Auth/ServiceProviderAuth/CreateService.jsx";
import CreatedServiceExamples from "../Pages/Auth/ServiceProviderAuth/CreatedServiceExamples.jsx";

export const webRoutes = [
  {
    index: true,
    element: React.createElement(GetStartedSignIn),
  },
  {
    path: "/customerAuth",
    element: React.createElement(CustomerAuthLayout),
    children: [
      {
        path: "getStarted_SignIn",
        element: React.createElement(GetStartedSignIn),
      },
      {
        path: "getStarted_SignUp",
        element: React.createElement(GetStartedSignUp),
      },
      {
        path: "customer_createAccount",
        element: React.createElement(CustomerCreateAccount),
      },
      {
        path: "customer_signIn",
        element: React.createElement(CustomerSignIn),
      },
      {
        path: "login_successful",
        element: React.createElement(LoginSuccessful),
      },
      {
        path: "customer_reset_password",
        element: React.createElement(CustomerResetPaassword),
      },
      {
        path: "change_password",
        element: React.createElement(CustomerCheckMail),
      },
      {
        path: "otp_verification",
        element: React.createElement(CustomerOtpVerification),
      },
      {
        path: "confirm_password",
        element: React.createElement(ConfirmPassword),
      },
      {
        path: "personalize_account",
        element: React.createElement(CustomerPersonalizeAccount),
      },
      {
        path: "account_personalize_successfully",
        element: React.createElement(AccountPersonalizedSuccessfully),
      },
      //  {
      //   path: "customer_welcome_back",
      //   element: React.createElement(CustomerSignIn),
      // },
      {
        path: "account_created_successfully",
        element: React.createElement(AccountCreatedSuccessfully),
      },
    ],
  },
  {
    path: "/serviceProviderAuth",
    element: React.createElement(ServiceProviderAuthLayout),
    children: [
      {
        path: "getStarted_SignIn",
        element: React.createElement(GetStartedSignInSp),
      },
      {
        path: "getStarted_SignUp",
        element: React.createElement(GetStartedSignUpSp),
      },
      {
        path: "serviceProvider_createAccount",
        element: React.createElement(SPCreateAccount),
      },
      {
        path: "serviceProvider_signIn",
        element: React.createElement(SPSignIn),
      },
      {
        path: "confirm_password",
        element: React.createElement(SPconfirmPassword),
      },
      {
        path: "login_successful",
        element: React.createElement(SPLoginSuccessful),
      },
      {
        path: "otp_verification",
        element: React.createElement(ServiceProviderOtpVerification),
      },
      {
        path: "serviceProvider_reset_password",
        element: React.createElement(SPResetPassword),
      },
      {
        path: "check_your_email",
        element: React.createElement(SPCheckMail),
      },
      {
        path: "personalize_account",
        element: React.createElement(SPPersonalizeAccount),
      },
      {
        path: "account_personalize_successfully",
        element: React.createElement(AccountPersonalizedSuccessfullySp),
      },

      {
        path: "account_created_successfully",
        element: React.createElement(AccountCreatedSuccessfullySp),
      },
    ],
  },

  {
    path: "/customerWebApp",
    element: React.createElement(CustomerWebApp),
    children: [
      {
        path: "home",
        element: React.createElement(CustomerHome),
      },
      {
        path: "no_appointments",
        element: React.createElement(NoAppointments),
      },

      {
        path: "search",
        element: React.createElement(SearchScreen),
      },
      {
        path: "insufficent_funds",
        element: React.createElement(InsufficientFunds),
      },
      {
        path: "serviceFinished",
        element: React.createElement(ServiceFinished),
      },
      {
        path: "reviewSubmittedSuccessfully",
        element: React.createElement(ReviewSubmittedSuccessfully),
      },
      {
        path: "serviceCancelledSuccessfully",
        element: React.createElement(AppointmentCancelledSuccessfully),
      },
      {
        path: "reviews/:serviceId",
        element: React.createElement(Review),
      },
      {
        path: "bookedSuccessfully/:serviceId",
        element: React.createElement(ServiceSuccessfullyBooked),
      },
      {
        path: "ticket/:serviceId",
        element: React.createElement(Ticket),
      },

      {
        path: "appointments",
        element: React.createElement(CustomerAppointments),
      },
      {
        path: "queue",
        element: React.createElement(Queue),
      },
      {
        path: "cancelAppointments/:serviceId",
        element: React.createElement(CancelAppointments),
      },
      {
        path: "wallet/withdraw",
        element: React.createElement(Withdraw),
      },
      {
        path: "inspiration/createPost",
        element: React.createElement(CreatePost),
      },
      {
        path: "inspiration",
        element: React.createElement(CustomerInspiration),
      },
      {
        path: "emptyWallet",
        element: React.createElement(EmptyWallet),
      },
      {
        path: "wallet/transactionHistory",
        element: React.createElement(TransactionHistory),
      },
      {
        path: "wallet/addFunds",
        element: React.createElement(AddFunds),
      },
      {
        path: "messageSent",
        element: React.createElement(SupportMessageSentSuccessfully),
      },
      {
        path: "appointments/:serviceId",
        element: React.createElement(ServiceDetailPage),
      },
      {
        path: ":bookings/:serviceId/startKYC",
        element: React.createElement(WarningToStartKYC),
      },
      {
        path: "book_for_later/:serviceId",
        element: React.createElement(Booking),
      },
      {
        path: "badgeExplanation",
        element: React.createElement(BadgeExplanation),
      },
      {
        path: "book_now/:serviceId",
        element: React.createElement(BookNow),
      },

      {
        path: "bookings/checkout/:serviceId",
        element: React.createElement(BookingCheckout),
      },
      {
        path: "KycSuccessful",
        element: React.createElement(KYCSuccessfullyCreated),
      },
      {
        path: "wallet",
        element: React.createElement(CustomerWallet),
      },
      {
        path: "message/:serviceId",
        element: React.createElement(CustomerMessage),
      },
      {
        path: "profile",
        element: React.createElement(CustomerProfile),
      },
    ],
  },
  {
    path: "/serviceProviderWebApp",
    element: React.createElement(CustomerWebApp),
    children: [
      {
        path: "home",
        element: React.createElement(ServiceProviderHome),
      },
      {
        path: "create_service",
        element: React.createElement(CreateService),
      },
      {
        path: "created_service",
        element: React.createElement(CreatedServiceExamples),
      },
      {
        path: "appointments",
        element: React.createElement(ServiceProviderAppointment),
      },
      {
        path: "noAppointments",
        element: React.createElement(ServiceProviderNoAppointments),
      },
      {
        path: "todayAppointment",
        element: React.createElement(TodayAppointment),
      },
      {
        path: "withdraw",
        element: React.createElement(ServiceProviderWithdraw),
      },

      {
        path: "manageAvailability",
        element: React.createElement(ServiceProviderAvailability),
      },
      {
        path: "serviceRenderedSuccessfully",
        element: React.createElement(ServiceRenderedSuccessfully),
      },
      {
        path: "adsInfo",
        element: React.createElement(AdsInfo),
      },
      {
        path: "inspiration",
        element: React.createElement(ServiceProviderInspiration),
      },
      {
        path: "createPost",
        element: React.createElement(CreatePostSp),
      },
      {
        path: "home/:serviceId/startKyc",
        element: React.createElement(ServiceProviderWarningToStartKYC),
      },
      {
        path: "KycSuccessful/:serviceId",
        element: React.createElement(ServiceProviderKYCSuccessfullyCreated),
      },
      {
        path: "earnings",
        element: React.createElement(ServiceProviderEarnings),
      },
      {
        path: "message/:serviceId",
        element: React.createElement(ServiceProviderMessage),
      },
      {
        path: "transactionHistory",
        element: React.createElement(ServiceProviderTransactionHistory),
      },
      {
        path: "noEarnings",
        element: React.createElement(NoEarnings),
      },
      {
        path: "cancelAppointments/:serviceId",
        element: React.createElement(ServiceProviderCancelAppointments),
      },
      {
        path: "serviceCancelledSuccessfully",
        element: React.createElement(AppointmentCancelledSuccessfullysp),
      },
      {
        path: "profile",
        element: React.createElement(ServiceProviderProfile),
      },
      {
        path: "messageSent",
        element: React.createElement(ServiceProviderMessageSent),
      },
    ],
  },
];
