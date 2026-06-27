import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import DashboardCard from "./DashboardCard";
import AIHealthCard from "./AIHealthCard";
import {
    getDashboard
} from "../../services/dashboardService";
import TeamWorkloadCard
from "./TeamWorkloadCard";

export default function DashboardTab() {

    const { projectId } =
        useParams();

    const {
        data,
        isLoading,
        error
    } = useQuery({

        queryKey: [
            "dashboard",
            projectId
        ],

        queryFn: () =>
            getDashboard(
                projectId!
            )
    });

    if (isLoading) {

        return (

            <div
                className="
                bg-white
                p-6
                rounded-xl
                shadow
                "
            >
                Loading Dashboard...
            </div>
        );
    }

    if (error) {

        return (

            <div
                className="
                bg-red-100
                text-red-600
                p-6
                rounded-xl
                "
            >
                Failed to load dashboard
            </div>
        );
    }

    const progress =
        data.totalStoryPoints === 0
            ? 0
            : Math.round(
                  (
                      data.completedStoryPoints /
                      data.totalStoryPoints
                  ) * 100
              );

    return (

        <div
            className="
            space-y-6
            "
        >

            <h2
                className="
                text-3xl
                font-bold
                "
            >
                Project Dashboard
            </h2>

            {/* TOP METRICS */}

            <div
                className="
                grid
                grid-cols-4
                gap-4
                "
            >

                <DashboardCard
                    title="Total Tasks"
                    value={data.totalTasks}
                />

                <DashboardCard
                    title="Team Members"
                    value={data.teamMembers}
                />

                <DashboardCard
                    title="Epics"
                    value={data.epics}
                />

                <DashboardCard
                    title="Sprints"
                    value={data.sprints}
                />

            </div>

            {/* TASK STATUS */}

            <div
                className="
                bg-white
                rounded-xl
                shadow
                p-6
                "
            >

                <h3
                    className="
                    text-xl
                    font-semibold
                    mb-4
                    "
                >
                    Task Status
                </h3>

                <div
                    className="
                    grid
                    grid-cols-3
                    gap-4
                    "
                >

                    <DashboardCard
                        title="TODO"
                        value={data.todoTasks}
                    />

                    <DashboardCard
                        title="IN PROGRESS"
                        value={data.inProgressTasks}
                    />

                    <DashboardCard
                        title="DONE"
                        value={data.completedTasks}
                    />

                </div>

            </div>

            {/* STORY POINT PROGRESS */}

            <div
                className="
                bg-white
                rounded-xl
                shadow
                p-6
                "
            >

                <h3
                    className="
                    text-xl
                    font-semibold
                    mb-4
                    "
                >
                    Sprint Progress
                </h3>

                <div
                    className="
                    flex
                    justify-between
                    mb-2
                    "
                >

                    <span>
                        Completed Story Points
                    </span>

                    <span>
                        {
                            data.completedStoryPoints
                        }
                        /
                        {
                            data.totalStoryPoints
                        }
                    </span>

                </div>

                <div
                    className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-4
                    "
                >

                    <div
                        className="
                        bg-green-500
                        h-4
                        rounded-full
                        transition-all
                        "
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <p
                    className="
                    mt-2
                    text-sm
                    text-gray-600
                    "
                >
                    {progress}% Completed
                </p>

            </div>

            {/* PROJECT SUMMARY */}

            <div
                className="
                bg-white
                rounded-xl
                shadow
                p-6
                "
            >

                <h3
                    className="
                    text-xl
                    font-semibold
                    mb-4
                    "
                >
                    Project Summary
                </h3>

                <div
                    className="
                    grid
                    grid-cols-2
                    gap-4
                    "
                >

                    <div>
                        <p className="text-gray-500">
                            Total Tasks
                        </p>

                        <p className="font-semibold">
                            {data.totalTasks}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Completed Tasks
                        </p>

                        <p className="font-semibold">
                            {data.completedTasks}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Team Members
                        </p>

                        <p className="font-semibold">
                            {data.teamMembers}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Active Sprints
                        </p>

                        <p className="font-semibold">
                            {data.sprints}
                        </p>
                    </div>

                </div>

            </div>
<AIHealthCard />
<TeamWorkloadCard />
        </div>
    );
}