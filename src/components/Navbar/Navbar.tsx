import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const { logoutUser } =
    useAuth();

  return (

    <div
      className="
      h-16
      bg-white
      border-b
      flex
      justify-between
      items-center
      px-6
      "
    >

      <h1
        className="
        text-xl
        font-semibold
        "
      >
        AI Project Manager
      </h1>

      <button
        onClick={logoutUser}
        className="
        bg-red-500
        text-white
        px-4
        py-2
        rounded
        "
      >
        Logout
      </button>

    </div>
  );
}