import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

function Stories() {
  const { currentUser } = useContext(AuthContext);

  //Dummy Data
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://picsum.photos/200/300?random=2",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://picsum.photos/200/300?random=3",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://picsum.photos/200/300",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories;
