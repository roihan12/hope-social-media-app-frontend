import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
    const { currentUser } = useContext(AuthContext);

 
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
            <input type="text"  placeholder="Write a comment "/>
            <button>Send</button>
        </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />

          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
