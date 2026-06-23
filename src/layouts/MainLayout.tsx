import Sidebar
from "../components/Sidebar/Sidebar.tsx";

import Navbar
from "../components/Navbar/Navbar.tsx";

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
}