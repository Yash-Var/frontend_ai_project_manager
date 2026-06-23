import {
    DragDropContext,
    Droppable,
    Draggable
} from "@hello-pangea/dnd";

import {
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import { useParams } from "react-router-dom";

import {
    getTasks
} from "../../services/taskService";

import {
    updateTaskStatus
} from "../../services/taskService";

export default function KanbanTab() {

    const { projectId } =
        useParams();

    const queryClient =
        useQueryClient();

    const {
        data: tasks = [],
        isLoading
    } = useQuery({

        queryKey: [
            "tasks",
            projectId
        ],

        queryFn: () =>
            getTasks(
                projectId!
            )
    });

    if (isLoading) {

        return (
            <div>
                Loading Kanban...
            </div>
        );
    }

    const columns = {

        TODO:
            tasks.filter(
                (task:any) =>
                    task.status === "TODO"
            ),

        IN_PROGRESS:
            tasks.filter(
                (task:any) =>
                    task.status ===
                    "IN_PROGRESS"
            ),

        DONE:
            tasks.filter(
                (task:any) =>
                    task.status ===
                    "DONE"
            )
    };

    const onDragEnd =
        async (
            result:any
        ) => {

            if (
                !result.destination
            ) {
                return;
            }

            const taskId =
                result.draggableId;

            const newStatus =
                result.destination
                    .droppableId;

            try {

                await updateTaskStatus(
                    taskId,
                    newStatus
                );

                queryClient.invalidateQueries({
                    queryKey:[
                        "tasks",
                        projectId
                    ]
                });

                queryClient.invalidateQueries({
                    queryKey:[
                        "dashboard",
                        projectId
                    ]
                });

            } catch {

                alert(
                    "Failed to update task"
                );
            }
        };

    return (

        <DragDropContext
            onDragEnd={
                onDragEnd
            }
        >

            <div
                className="
                grid
                grid-cols-3
                gap-6
                "
            >

                {
                    Object.entries(
                        columns
                    ).map(
                        (
                            [
                                status,
                                tasks
                            ]
                        ) => (

                        <Droppable
                            key={status}
                            droppableId={
                                status
                            }
                        >

                            {
                                (
                                    provided
                                ) => (

                                <div

                                    ref={
                                        provided.innerRef
                                    }

                                    {
                                        ...provided.droppableProps
                                    }

                                    className="
                                    bg-gray-100
                                    rounded-xl
                                    p-4
                                    min-h-[600px]
                                    "
                                >

                                    <h2
                                        className="
                                        text-xl
                                        font-bold
                                        mb-4
                                        "
                                    >
                                        {
                                            status
                                        }
                                    </h2>

                                    {
                                        tasks.map(
                                            (
                                                task:any,
                                                index:number
                                            ) => (

                                            <Draggable

                                                key={
                                                    task.id
                                                }

                                                draggableId={
                                                    task.id
                                                }

                                                index={
                                                    index
                                                }
                                            >

                                                {
                                                    (
                                                        provided
                                                    ) => (

                                                    <div

                                                        ref={
                                                            provided.innerRef
                                                        }

                                                        {
                                                            ...provided.draggableProps
                                                        }

                                                        {
                                                            ...provided.dragHandleProps
                                                        }

                                                        className="
                                                        bg-white
                                                        rounded-xl
                                                        shadow
                                                        p-4
                                                        mb-3
                                                        "
                                                    >

                                                        <h3
                                                            className="
                                                            font-semibold
                                                            "
                                                        >
                                                            {
                                                                task.title
                                                            }
                                                        </h3>

                                                        <p
                                                            className="
                                                            text-sm
                                                            text-gray-500
                                                            mt-2
                                                            "
                                                        >
                                                            {
                                                                task.requiredSkill
                                                            }
                                                        </p>

                                                        <div
                                                            className="
                                                            mt-3
                                                            flex
                                                            justify-between
                                                            text-sm
                                                            "
                                                        >

                                                            <span>
                                                                SP:
                                                                {" "}
                                                                {
                                                                    task.storyPoints
                                                                }
                                                            </span>

                                                            <span>
                                                                {
                                                                    task.assignee
                                                                        ?.name ||
                                                                    "Unassigned"
                                                                }
                                                            </span>

                                                        </div>

                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }

                                    {
                                        provided.placeholder
                                    }

                                </div>
                            )}
                        </Droppable>
                    ))
                }

            </div>

        </DragDropContext>
    );
}