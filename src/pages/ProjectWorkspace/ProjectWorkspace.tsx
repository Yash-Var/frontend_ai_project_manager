import { useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout
from "../../layouts/MainLayout";
import TasksTab
from "../../components/Project/TasksTab";
import TeamTab from "../../components/Project/TeamTab";
import EpicsTab from "../../components/Project/EpicsTab";
import SprintTab from "../../components/Project/SprintTab";
import DashboardTab from "../../components/Project/DashboardTab";
import KanbanTab
from "../../components/Project/KanbanTab";

export default function ProjectWorkspace() {

    const { projectId } =
        useParams();
    
    const [activeTab,setActiveTab] =
    useState("dashboard");

    return (

        <MainLayout>

            <div>

                <h1
                    className="
                    text-3xl
                    font-bold
                    mb-6
                    "
                >
                    Project Workspace
                </h1>

                <div
                    className="
                    flex
                    gap-4
                    border-b
                    pb-3
                    "
                >
                    <button
    className={`
    px-4
    py-2
    rounded-lg
    ${
      activeTab==="dashboard"
      ? "bg-blue-600 text-white"
      : "bg-gray-100"
    }
`}
    onClick={() =>
        setActiveTab(
            "dashboard"
        )
    }
>
    Dashboard
</button>

                    <button
                    className={`
 px-4
 py-2
 rounded-lg
 ${
   activeTab==="epics"
   ? "bg-blue-600 text-white"
   : "bg-gray-100"
 }
`}
                        onClick={() =>
                            setActiveTab(
                                "epics"
                            )
                        }
                    >
                        Epics
                    </button>

                    <button
                    className={`
 px-4
 py-2
 rounded-lg
 ${
   activeTab==="tasks"
   ? "bg-blue-600 text-white"
   : "bg-gray-100"
 }
`}
                        onClick={() =>
                            setActiveTab(
                                "tasks"
                            )
                        }
                    >
                        Tasks
                    </button>

                    <button
                        className={`
 px-4
 py-2
 rounded-lg
 ${
   activeTab==="team"
   ? "bg-blue-600 text-white"
   : "bg-gray-100"
 }
`}
                        onClick={() =>
                            setActiveTab(
                                "team"
                            )
                        }
                    >
                        Team
                    </button>

                    <button
                        className={`
    px-4
    py-2    
    rounded-lg
    ${
      activeTab==="sprints"
      ? "bg-blue-600 text-white"
      : "bg-gray-100"
    }
  `}
                        onClick={() =>
                            setActiveTab(
                                "sprints"
                            )
                        }
                    >
                        Sprints
                    </button>
<button
className={`
px-4
py-2
rounded-lg
${
activeTab==="kanban"
? "bg-blue-600 text-white"
: "bg-gray-100"
}
`}
onClick={() =>
setActiveTab(
"kanban"
)
}
>
Kanban
</button>
                </div>

                <div
                    className="
                    mt-6
                    "
                >

                    {
                        activeTab ===
                        "dashboard" &&
                        <div>
                            <DashboardTab />
                        </div>
                    }

                    {
                        activeTab ===
                        "epics" &&
                        <div>
                            <EpicsTab />
                        </div>
                    }

                    {
                        activeTab ===
                        "tasks" &&
                        <div>
                            <TasksTab />
                        </div>
                    }

                    {
                        activeTab ===
                        "team" &&
                        <div>
                           <TeamTab />
                        </div>
                    }

                    {
                        activeTab ===
                        "sprints" &&
                        <div>
                            <SprintTab />
                        </div>
                    }
                    {
activeTab==="kanban" &&
<KanbanTab />
}

                </div>

            </div>

        </MainLayout>
    );
}