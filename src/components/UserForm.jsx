import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../redux/userSlice";

const UserForm = ({ selectedUser }) => {
  console.log("user form: ", selectedUser);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role_id: "",
    dob: "",
    profile_image: "",
    gender: "",
    status: "1",
    user_galleries: [],
    user_pictures: [],
    password: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({ ...selectedUser, password: "" }); // Reset password for security reasons
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profile_image") {
      setFormData({ ...formData, profile_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: [...files] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(updateUser({ ...formData, id: selectedUser.id }));
    } else {
      console.log("ajsgdfyugauygfyewgfiegfgufgiu");

      dispatch(createUser(formData));
    }
  };

  return (
    <div className=" bg-white rounded">
      <h2 className="text-xl font-bold mb-4">
        {selectedUser ? "Edit User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          placeholder="Role ID"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="profile_image"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="gender"
          value={formData.gender_text}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <input
          type="file"
          name="user_galleries"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="user_pictures"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        {!selectedUser && (
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <button
          type="submit"
          className="w-full bg-[#007190] text-white p-2 rounded"
        >
          {selectedUser ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
