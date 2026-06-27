import {
    useQuery
} from "@tanstack/react-query";

import {
    getTaskDetails,
    getTaskActivity
} from "../../services/taskService";

import TaskHeader from "./TaskHeader";
import TaskOverview from "./TaskOverview";
import TaskActivity from "./TaskActivity";

interface Props {

    taskId: string;

    onClose: () => void;

}

export default function TaskDrawer({

    taskId,

    onClose

}: Props) {

    const {

        data: task,

        isLoading

    } = useQuery({

        queryKey: [

            "task",

            taskId

        ],

        queryFn: () =>
            getTaskDetails(
                taskId
            )

    });

    const {

        data: activity

    } = useQuery({

        queryKey: [

            "activity",

            taskId

        ],

        queryFn: () =>
            getTaskActivity(
                taskId
            )

    });

    if (isLoading) {

        return null;

    }

    return (

        <div
            className="
fixed
top-0
right-0
w-[600px]
h-screen
bg-white
shadow-2xl
z-50
overflow-y-auto
"
        >

            <TaskHeader

                task={task}

                onClose={onClose}

            />

            <div className="p-6">

                <TaskOverview

                    task={task}

                />

                <TaskActivity

                    activity={activity}

                />

            </div>

        </div>

    );

}