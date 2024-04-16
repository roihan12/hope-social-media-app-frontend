import { useState } from "react";
import "./updateProfile.scss";
import { makeRequset } from "../../axios";
import { useMutation, useQueryClient } from "react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdateProfile = ({ setOpenUpdateProfile, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [inputs, setInputs] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    occupation: user.occupation,
  });

  console.log("cover", cover);

  console.log(inputs);

  const queryClient = useQueryClient();

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequset.post("/upload", formData);
      console.log("upload", res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Mutations
  const mutation = useMutation(
    (user) => {
      console.log(user);
      return makeRequset.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();
    let profilePicUrl;
    let coverUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profilePicUrl = profile ? await upload(profile) : user.profilePic;
    console.log(coverUrl);
    e.preventDefault();
    mutation.mutate({
      ...inputs,
      coverPic: coverUrl,
      profilePic: profilePicUrl,
    });
    setOpenUpdateProfile(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
    <div className="wrapper">
      <h1>Update Your Profile</h1>
      <form>
        <div className="files">
          <label htmlFor="cover">
            <span>Cover Picture</span>
            <div className="imgContainer">
              <img
                src={
                  cover
                    ? URL.createObjectURL(cover)
                    : "/upload/" + user.coverPic
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <label htmlFor="profile">
            <span>Profile Picture</span>
            <div className="imgContainer">
              <img
                src={
                  profile
                    ? URL.createObjectURL(profile)
                    : "/upload/" + user.profilePic
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="profile"
            style={{ display: "none" }}
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </div>
        <label>Email</label>
        <input
          type="text"
          value={inputs.email}
          name="email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
          value={inputs.password}
          name="password"
          onChange={handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          value={inputs.name}
          name="name"
          onChange={handleChange}
        />
        <label>Country / City</label>
        <input
          type="text"
          name="city"
          value={inputs.city}
          onChange={handleChange}
        />
        <label>Occupation</label>
        <input
          type="text"
          name="occupation"
          value={inputs.occupation}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Update</button>
      </form>
      <button className="close" onClick={() => setOpenUpdateProfile(false)}>
        close
      </button>
    </div>
  </div>
);
};

export default UpdateProfile;
