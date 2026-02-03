import React from "react";
import Input from "./Input";
import house from "../../assets/Images/house.svg";
import ReviewComment from "./ReviewComment";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "../../Schema/reviewSchema";
import { useDispatch } from "react-redux";
import { addReviewForm } from "../../redux/reviewSlice";
//
const ReviewForm = ({submitRef}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });
  const onSubmit = (data) => {
    console.log("Review form submitted", data);
  };

  const formValues = useWatch({ control });
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const { review, opnion } = formValues || {};
      const hasRequiredField = review?.trim() && opnion?.trim();
      dispatch(addReviewForm(hasRequiredField ? formValues : {}));
    }, 500);

    return () => clearTimeout(timeout);
  }, [formValues, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        icon={house}
        textArea
        label={"Review"}
        name={"review"}
        inputType="text"
        placeholder={"Write review here"}
        {...register("review")}
        error={errors?.review?.message}
      />
      <ReviewComment />
      <Input
        textArea
        label={"Observation or Opinions  for Improvements"}
        name={"opinion"}
        inputType="text"
        placeholder={"Write opinions here"}
        {...register("opinion")}
        error={errors?.opinion?.message}
      />
      <button type="submit" ref={submitRef} className="hidden" />
    </form>
  );
};

export default ReviewForm;
