import React from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/reviewSlice";

const ReviewComment = () => {
  const commentsAsObject = comments.map((comment, i) => ({
    id: i + 1,
    text: comment,
  }));

  const [selectedComments, setSelectedComments] = React.useState([]);

  const handleClickedOptions = (commentId) => {
    setSelectedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((n) => n !== commentId)
        : [...prev, commentId]
    );
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      addReview(commentsAsObject.filter((x) => selectedComments.includes(x.id)))
    );
  }, [selectedComments, dispatch]);

  return (
    <ul className="flex flex-wrap gap-2 my-4">
      {commentsAsObject.map((comment) => (
        <Comments
          key={comment.id}
          comment={comment}
          onSelect={handleClickedOptions}
          isSelected={selectedComments.includes(comment.id)}
        />
      ))}
    </ul>
  );
};

export default ReviewComment;

const Comments = ({ comment, onSelect, isSelected }) => {
  return (
    <li
      onClick={() => onSelect(comment.id)}
      className={`text-base font-medium p-2 cursor-pointer rounded-lg border transition
        ${
          isSelected
            ? "bg-[#F4E2FE] text-darkPurple border-darkPurple"
            : "text-[#98A2B3] border-transparent"
        }
      `}
    >
      {comment.text}
    </li>
  );
};

const comments = [
  "Overall good",
  "Good service",
  "Satisfying",
  "Comfortable",
  "Recomended",
  "Perfect results",
  "Accurate estimate",
  "Cheap",
];
