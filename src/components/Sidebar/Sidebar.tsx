import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ClipboardList,
  CalendarDays,
  Plus
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: ClipboardList
    },
    {
      name: "Team",
      path: "/team",
      icon: Users
    },
    {
      name: "Sprints",
      path: "/sprints",
      icon: CalendarDays
    },
    {
 name:"Create Project",
 path:"/create-project",
 icon: Plus
}
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-4">

      <h1 className="text-2xl font-bold mb-10">
        AI PM
      </h1>

      <div className="space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-lg
              hover:bg-slate-800
              transition
              "
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}