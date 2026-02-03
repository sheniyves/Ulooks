import React, { useEffect } from "react";
import Input from "./Input";
import user from "../../assets/Images/user.svg";
import sms from "../../assets/Images/sms.svg";
import calling from "../../assets/Images/calling.svg";
import coupon from "../../assets/Images/coupon.svg";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../Schema/bookingFormSchema";
import { useDispatch } from "react-redux";
import { addBookingForm } from "../../redux/bookingsSlice";
import { useNavigate, useParams } from "react-router-dom";

const BookingServiceForm = ({ submitRef }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const formValues = useWatch({ control });

  useEffect(() => {
    const { fullName, email, phoneNumber } = formValues || {};

    const hasAllRequiredFields =
      fullName?.trim() && email?.trim() && phoneNumber?.trim();

    if (hasAllRequiredFields) {
      dispatch(addBookingForm(formValues));
    } else {
      dispatch(addBookingForm({}));
    }
  }, [formValues, dispatch]);

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    navigate(`/customerWebApp/bookings/checkout/${serviceId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          icon={user}
          label={"Full Name"}
          name={"fullName"}
          inputType="text"
          placeholder={"Enter your full name here"}
          backgroundInput="bg-[#f9fafb]"
          {...register("fullName")}
          error={errors?.fullName?.message}
        />
        <Input
          icon={sms}
          label={"Email Address"}
          name={"email"}
          inputType="email"
          placeholder={"Enter your email address"}
          backgroundInput="bg-[#f9fafb]"
          {...register("email")}
          error={errors?.email?.message}
        />
        <Input
          icon={calling}
          label={"Phone Number"}
          name={"phoneNumber"}
          inputType="text"
          placeholder={"Enter phone number here"}
          backgroundInput="bg-[#f9fafb]"
          {...register("phoneNumber")}
          error={errors?.phoneNumber?.message}
        />
        <Input
          icon={coupon}
          label={"Coupon Code"}
          name={"coupon"}
          inputType="text"
          placeholder={"Enter coupon code here"}
          backgroundInput="bg-[#f9fafb]"
          {...register("coupon")}
          error={errors?.coupon?.message}
        />
      </div>
      <button className="hidden" ref={submitRef} type="submit"></button>
    </form>
  );
};

export default BookingServiceForm;
