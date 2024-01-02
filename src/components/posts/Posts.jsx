import React from "react";
import Post from "../post/Post";

const Posts = () => {
  //Dummy Post

  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic: "https://picsum.photos/200/300?random=5",
      img: "https://picsum.photos/900/600?random=1",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, quae.",
    },
    {
      id: 2,
      name: "Rosse Doe",
      userId: 2,
      profilePic: "https://picsum.photos/200/300?random=9",
      img: "https://picsum.photos/900/600?random=8",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, quae.",
    },
    {
      id: 3,
      name: "Jane Doe",
      userId: 3,
      profilePic: "https://picsum.photos/200/300?random=12",
      img: "https://picsum.photos/900/600?random=7",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, quae.",
    },
    {
      id: 4,
      name: "John Doe",
      userId: 1,
      profilePic: "https://picsum.photos/200/300?random=11",
      img: "https://picsum.photos/900/600?random=6",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, quae.",
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        
          <Post post={post}  key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
