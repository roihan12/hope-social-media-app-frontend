import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequset } from "../../axios";

import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import UpdateProfile from "../../components/updateProfile/UpdateProfile";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery("user", () =>
    makeRequset.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: relationshipIsloading, data: relationshipData } = useQuery(
    "relationship",
    () =>
      makeRequset.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  console.log(relationshipData);

  console.log(data);

  const queryClient = useQueryClient();

  // console.log(data);
  // Mutations
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequset.delete("/relationships?userId=" + userId);
      return makeRequset.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleFollow = async (e) => {
    e.preventDefault();
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img
              src={`http://localhost:5000/upload/${data.coverPic}`}
              alt=""
              className="cover"
            />
            <img
              src={`http://localhost:5000/upload/${data.profilePic}`}
              alt=""
              className="profilePic"
            />
          </div>

          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="https://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="https://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="https://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="https://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
                <a href="https://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city === null ? "-" : data?.city}</span>
                  </div>
                  <div className="item">
                    <WorkIcon />
                    <span>
                      {data?.occupation === null ? "-" : data?.occupation}
                    </span>
                  </div>
                </div>

                {relationshipIsloading ? (
                  "loading..."
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdateProfile(true)}>
                    Update
                  </button>
                ) : (
                  <button onClick={handleFollow}>
                    {" "}
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdateProfile && (
        <UpdateProfile
          setOpenUpdateProfile={setOpenUpdateProfile}
          user={data}
        />
      )}
    </div>
  );
};

export default Profile;
