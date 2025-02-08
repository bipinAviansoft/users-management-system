import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, deleteUser } from "../redux/userSlice";
import { setModalOpen } from "../redux/modalSlice";
import Modal from "../components/Modal";
import ViewTable from "../components/ViewTable";
import UserForm from "../components/UserForm";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, totalPages } = useSelector((state) => state.users);
  const loggedInUserDetails = useSelector((state) => state.auth.loggedUser);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  // const [limit] = useState(10);
  useEffect(() => {
    dispatch(fetchUsers({ page }));
  }, [dispatch]); // Add `page` as a dependency

  useEffect(() => {
    setFilteredUsers(users); // Update filtered users when users list changes
  }, [users]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(fetchUsers({ page }));
    });
  };

  const [viewModal, setViewModal] = useState(false);
  const [userModal, setUserModal] = useState(false);

  const onClickViewHandle = (user) => {
    dispatch(setModalOpen(true));
    setSelectedUser(user);
    setViewModal(true);
  };

  const onHandleEdit = (user) => {
    dispatch(setModalOpen(true));
    setSelectedUser(user);
    setUserModal(true);
  };

  const onInputSearchHandle = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role?.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const itemsPerPage = 8; // Users per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPage = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get users for current page
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const [profileDropdown, setProfileDropdown] = useState(false);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#d5e7ec] ">
        <div className="bg-white px-[25px] py-[10px] flex justify-between items-center">
          <h3 className="text-[1.25rem] text-black font-[500] mb-0">
            User Management
          </h3>
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="p-[8px] gap-[5px] bg-transparent hover:bg-[#f3f6f9] inline-flex items-center rounded-[5px]"
              type="button"
            >
              hi, {loggedInUserDetails?.name}
              <img
                src={loggedInUserDetails?.image}
                alt="pic"
                className="w-[35px] h-[35px] rounded-[.42rem] object-cover"
              />
            </button>

            <div
              className={`absolute top-[100%] right-0 shadow-[0_0_7px_rgba(0,0,0,0.2)] w-[200px] rounded-md z-10 ${
                profileDropdown ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    onClick={logoutHandle}
                    className="w-full flex items-center gap-[10px] px-4 py-2 text-[red] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.496 19H3.5C2.395 19 1.5 17.849 1.5 16.429V3.57C1.5 2.151 2.395 1 3.5 1H10.5M13 13.5L16.5 10L13 6.5M6.5 9.996H16.5"
                        stroke="red"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-[25px] ">
          <div className="bg-white p-[30px] rounded-[10px] space-y-[20px]">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-[350px]">
                <svg
                  className="absolute left-[10px] top-[5px] "
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 11H11.71L11.43 10.73C12.444 9.55407 13.0012 8.05271 13 6.5C13 5.21442 12.6188 3.95771 11.9046 2.88879C11.1903 1.81987 10.1752 0.986752 8.98744 0.494782C7.79972 0.00281253 6.49279 -0.125909 5.23191 0.124895C3.97104 0.375699 2.81285 0.994764 1.90381 1.9038C0.994765 2.81285 0.3757 3.97104 0.124896 5.23191C-0.125908 6.49279 0.00281349 7.79972 0.494783 8.98744C0.986753 10.1752 1.81987 11.1903 2.88879 11.9046C3.95771 12.6188 5.21442 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                    fill="#007190"
                  />
                </svg>
                <input
                  type="search"
                  name="search"
                  id="search"
                  onInput={(e) => onInputSearchHandle(e)}
                  placeholder="Search"
                  className="pl-[40px] w-full text-[14px] text-[#007190] placeholder:text-[#000000de] h-[32px]  !border-b-[1px] !border-[#007190] !outline-none "
                />
              </div>
              <div className="flex items-center gap-[10px]">
                {/* Create user button */}
                <button
                  onClick={() => onHandleEdit(null)}
                  className="py-[10px] px-[15px] bg-[#007190] rounded-[7px]"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.666667 6H6M6 6H11.3333M6 6V0.666666M6 6V11.3333"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                {/* Create user button  */}
                <button className="py-[10px] px-[15px] bg-[#007190] rounded-[7px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.666667 8.66933V9.33333C0.666667 9.86377 0.87738 10.3725 1.25245 10.7475C1.62753 11.1226 2.13623 11.3333 2.66667 11.3333H9.33333C9.86377 11.3333 10.3725 11.1226 10.7475 10.7475C11.1226 10.3725 11.3333 9.86377 11.3333 9.33333V8.66667M6 1V8.33333M6 8.33333L8.33333 6M6 8.33333L3.66667 6"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {loading && (
              <div className="text-center p-[50px] bg-gray-100 flex items-center justify-center text-xl font-bold text-[#007190]">
                Loading...
              </div>
            )}

            {loading ? (
              <></>
            ) : (
              <>
                <table width="100%" className="text-start">
                  <thead>
                    <tr>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        ID
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        Name
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        Email
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        Role
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        DOB
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        Gender
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        Status
                      </th>
                      <th className="text-start bg-[#007190] text-white text-[14px] uppercase py-[10px] px-[15px] font-[500] ">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {console.log("ta din ta: ", filteredUsers)} */}
                    {!loading && filteredUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          width="100%"
                          className="text-center p-[50px] bg-gray-100 text-lg font-bold text-[#007190]"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                    {paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="odd:bg-white even:bg-gray-50"
                      >
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.id}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.name}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.email}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.role?.name}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.dob}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.gender_text}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          {user?.status_text}
                        </td>
                        <td className="text-start text-[14px] py-[10px] px-[15px] font-[500] ">
                          <div className="flex items-center gap-[10px]">
                            {/* View the user details */}
                            <button
                              onClick={() => onClickViewHandle(user)}
                              className="w-[30px] h-[30px] flex items-center justify-center bg-[#cccccc] rounded-[100%]"
                            >
                              <svg
                                width="14"
                                height="10"
                                viewBox="0 0 14 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 7.33333C8.28866 7.33333 9.33333 6.28866 9.33333 5C9.33333 3.71133 8.28866 2.66667 7 2.66667C5.71134 2.66667 4.66667 3.71133 4.66667 5C4.66667 6.28866 5.71134 7.33333 7 7.33333Z"
                                  stroke="black"
                                  stroke-width="0.666667"
                                />
                                <path
                                  d="M12.4587 4.28933C12.7173 4.604 12.8467 4.76067 12.8467 5C12.8467 5.23933 12.7173 5.396 12.4587 5.71067C11.512 6.86 9.424 9 7 9C4.576 9 2.488 6.86 1.54133 5.71067C1.28267 5.396 1.15333 5.23933 1.15333 5C1.15333 4.76067 1.28267 4.604 1.54133 4.28933C2.488 3.14 4.576 1 7 1C9.424 1 11.512 3.14 12.4587 4.28933Z"
                                  stroke="black"
                                  stroke-width="0.666667"
                                />
                              </svg>
                            </button>
                            {/* edit button */}
                            <button
                              onClick={() => onHandleEdit(user)}
                              className="w-[30px] h-[30px] flex items-center justify-center bg-[#cccccc] rounded-[100%]"
                            >
                              <svg
                                width="12"
                                height="14"
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.666667 13H11.3333M1.77733 7.79133C1.49308 8.07622 1.3334 8.46222 1.33333 8.86467V11H3.482C3.88467 11 4.27067 10.84 4.55533 10.5547L10.8887 4.218C11.1728 3.93306 11.3324 3.54708 11.3324 3.14467C11.3324 2.74226 11.1728 2.35627 10.8887 2.07133L10.2633 1.44467C10.1223 1.30357 9.95485 1.19165 9.77054 1.11531C9.58624 1.03897 9.38869 0.999713 9.1892 0.999775C8.9897 0.999837 8.79218 1.03922 8.60792 1.11567C8.42366 1.19212 8.25627 1.30415 8.11533 1.44533L1.77733 7.79133Z"
                                  stroke="black"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                            {/* delete button */}
                            <button
                              onClick={() => handleDelete(user?.id)}
                              className="w-[30px] h-[30px] flex items-center justify-center bg-[#cccccc] rounded-[100%]"
                            >
                              <svg
                                width="10"
                                height="12"
                                viewBox="0 0 10 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.07733 11.3333C1.78089 11.3333 1.52733 11.2278 1.31667 11.0167C1.106 10.8056 1.00044 10.5524 1 10.2573V2H0.666667C0.572 2 0.492889 1.968 0.429333 1.904C0.365778 1.84 0.333778 1.76067 0.333333 1.666C0.332889 1.57133 0.364889 1.49222 0.429333 1.42867C0.493778 1.36511 0.572889 1.33333 0.666667 1.33333H3C3 1.19556 3.05111 1.07556 3.15333 0.973333C3.25556 0.871111 3.37556 0.82 3.51333 0.82H6.48667C6.62444 0.82 6.74444 0.871111 6.84667 0.973333C6.94889 1.07556 7 1.19556 7 1.33333H9.33333C9.428 1.33333 9.50711 1.36533 9.57067 1.42933C9.63422 1.49333 9.66622 1.57267 9.66667 1.66733C9.66711 1.762 9.63511 1.84111 9.57067 1.90467C9.50622 1.96822 9.42711 2 9.33333 2H9V10.2567C9 10.5527 8.89444 10.806 8.68333 11.0167C8.47222 11.2273 8.21889 11.3329 7.92333 11.3333H2.07733ZM8.33333 2H1.66667V10.2567C1.66667 10.3762 1.70511 10.4744 1.782 10.5513C1.85889 10.6282 1.95733 10.6667 2.07733 10.6667H7.92333C8.04289 10.6667 8.14111 10.6282 8.218 10.5513C8.29489 10.4744 8.33333 10.3762 8.33333 10.2567V2ZM3.872 9.33333C3.96667 9.33333 4.046 9.30133 4.11 9.23733C4.174 9.17333 4.20578 9.09422 4.20533 9V3.66667C4.20533 3.572 4.17333 3.49289 4.10933 3.42933C4.04533 3.36578 3.966 3.33378 3.87133 3.33333C3.77667 3.33289 3.69756 3.36489 3.634 3.42933C3.57044 3.49378 3.53867 3.57289 3.53867 3.66667V9C3.53867 9.09467 3.57067 9.17378 3.63467 9.23733C3.69867 9.30133 3.77778 9.33333 3.872 9.33333ZM6.12867 9.33333C6.22333 9.33333 6.30244 9.30133 6.366 9.23733C6.42956 9.17333 6.46133 9.09422 6.46133 9V3.66667C6.46133 3.572 6.42933 3.49289 6.36533 3.42933C6.30133 3.36533 6.22222 3.33333 6.128 3.33333C6.03333 3.33333 5.954 3.36533 5.89 3.42933C5.826 3.49333 5.79422 3.57244 5.79467 3.66667V9C5.79467 9.09467 5.82667 9.17378 5.89067 9.23733C5.95467 9.30089 6.034 9.33289 6.12867 9.33333Z"
                                  fill="black"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                {itemsPerPage < filteredUsers.length ? (
                  <>
                    <div className="flex items-center justify-center mt-4 space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#007190] text-white"
                        }`}
                      >
                        Prev
                      </button>

                      {[...Array(totalPage)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === index + 1
                              ? "bg-[#007190] text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPage}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPage
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#007190] text-white"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {viewModal && selectedUser && (
        <Modal>
          <ViewTable user={selectedUser} />
        </Modal>
      )}

      {userModal && (
        <Modal>
          <UserForm selectedUser={selectedUser} />
        </Modal>
      )}
    </>
  );
};

export default UsersPage;
