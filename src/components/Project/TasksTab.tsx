import { useParams } from "react-router-dom";

import {
    useQuery
}
from "@tanstack/react-query";

import {
    getProjectTasks
}
from "../../services/taskService";
import { useState } from "react";
import TaskDrawer from "./TaskDrawer";

export default function TasksTab() {
    const [

selectedTask,

setSelectedTask

]=useState<
string | null
>(null);

    const { projectId } =
        useParams();

    const {

        data: tasks,

        isLoading

    } = useQuery({

        queryKey: [
            "tasks",
            projectId
        ],

        queryFn: () =>
            getProjectTasks(
                projectId!
            )
    });

    if (isLoading) {

        return (
            <div>
                Loading Tasks...
            </div>
        );
    }

    return (

        <div>

            <h2
                className="
                text-2xl
                font-bold
                mb-4
                "
            >
                Tasks
            </h2>

            <div
                className="
                overflow-x-auto
                "
            >

                <table
                    className="
                    w-full
                    bg-white
                    rounded-xl
                    shadow
                    "
                >

                    <thead>

                    <tr
                        className="
                        border-b
                        "
                    >

                        <th className="p-4 text-left">
                            Title
                        </th>

                        <th className="p-4 text-left">
                            Story Points
                        </th>

                        <th className="p-4 text-left">
                            Skill
                        </th>

                        <th className="p-4 text-left">
                            Assignee
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {tasks?.map(
                        (task:any) => (

                        <tr
                            key={task.id}
                            
                            onClick={()=>

setSelectedTask(
task.id
)

}

className="
cursor-pointer
hover:bg-gray-100
 border-b
"
                        >

                            <td className="p-4">
                                {task.title}
                            </td>

                            <td className="p-4">
                                {
                                    task.storyPoints
                                }
                            </td>

                            <td className="p-4">
                                {
                                    task.requiredSkill
                                }
                            </td>

                            <td className="p-4">
                                {
                                    task.assignee?.name
                                    ??
                                    "Unassigned"
                                }
                            </td>

                            <td className="p-4">
                                {
                                    task.status
                                }
                            </td>

                        </tr>
                    ))}

                    </tbody>

                </table>

            </div>
{

selectedTask &&

<TaskDrawer

taskId={selectedTask}

onClose={()=>

setSelectedTask(
null
)

}

/>

}
        </div>
    );
}