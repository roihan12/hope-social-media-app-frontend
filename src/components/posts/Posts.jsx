import React from "react";
import Post from "../post/Post";
import { useQuery } from "react-query";
import { makeRequset } from "../../axios";

const Posts = ({ userId }) => {
  console.log("post");
  //Dummy Post
  const { isLoading, error, data } = useQuery(["posts"], () => {
    if (userId)
      return makeRequset.get("/posts?userId=" + userId).then((res) => {
        return res.data;
      });
    return makeRequset.get("/posts").then((res) => {
      return res.data;
    });
  });

  // console.log(data);
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
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading.."
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
