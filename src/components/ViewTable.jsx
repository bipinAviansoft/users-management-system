export default function ViewTable({ user }) {
  console.log("user Data: ", user);

  return (
    <>
      <table width="100%">
        <tbody>
          <tr className="bg-gray-100">
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[500]"
            >
              Name:
            </td>
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[400]"
            >
              {user?.name}
            </td>
          </tr>
          <tr className="bg-white">
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[500]"
            >
              Email:
            </td>
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[400]"
            >
              {user?.email}
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[500]"
            >
              Role:
            </td>
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[400]"
            >
              {user?.role?.name}
            </td>
          </tr>
          <tr className="bg-white">
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[500]"
            >
              DOB:
            </td>
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[400]"
            >
              {user?.dob}
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[500]"
            >
              Gender:
            </td>
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[400]"
            >
              {user?.gender_text}
            </td>
          </tr>
          <tr className="bg-white">
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[500]"
            >
              Status:
            </td>
            <td
              width="50%"
              className="text-start text-[14px] p-[15px] font-[400]"
            >
              {user?.status_text}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
