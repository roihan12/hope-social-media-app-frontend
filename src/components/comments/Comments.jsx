import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequset } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequset.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  // console.log(data);

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (newComment) => {
      // console.log(newComment);
      return makeRequset.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ comment, postId });
    setComment("");
  };

  //Dummy commets
  const comments = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic: "https://picsum.photos/200/300?random=15",
      desc: "Exercitationem facere aspernatur expedita quam animi dolores.",
    },
    {
      id: 2,
      name: "Rosse Doe",
      userId: 2,
      profilePic: "https://picsum.photos/200/300?random=9",
      img: "https://picsum.photos/900/600?random=8",
      desc: "tur adipisicing elit. Doloribus, quae.",
    },
    {
      id: 3,
      name: "Jane Doe",
      userId: 3,
      profilePic: "https://picsum.photos/200/300?random=12",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, quae.",
    },
    {
      id: 4,
      name: "John Doe",
      userId: 1,
      profilePic: "https://picsum.photos/200/300?random=11",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, quae.",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Write a comment.."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading..."
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />

              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.comment}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
