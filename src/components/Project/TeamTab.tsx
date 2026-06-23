import { useState } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
    getUsers
} from "../../services/userService";

import {
    getProjectMembers,
    addProjectMember
} from "../../services/projectMemberService";
import {
    autoAssignTasks
}
from "../../services/projectService";

export default function TeamTab() {

    const { projectId } =
        useParams();

    const [
        selectedUser,
        setSelectedUser
    ] = useState("");

    const {
        data: users,
        isLoading: usersLoading
    } = useQuery({

        queryKey: ["users"],

        queryFn: getUsers
    });

    const {
        data: members,
        isLoading: membersLoading,
        refetch
    } = useQuery({

        queryKey: [
            "project-members",
            projectId
        ],

        queryFn: () =>
            getProjectMembers(
                projectId!
            )
    });

    const handleAddMember =
        async () => {

        try {

            if (!selectedUser) {

                alert(
                    "Please select a user"
                );

                return;
            }

            await addProjectMember(
                projectId!,
                selectedUser
            );

            setSelectedUser("");

            refetch();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to add member"
            );
        }
    };
    const handleAutoAssign =
async () => {

    try {

        await autoAssignTasks(
            projectId!
        );

        alert(
            "Tasks Assigned Successfully"
        );

    } catch {

        alert(
            "Assignment Failed"
        );
    }
};

    if (
        usersLoading ||
        membersLoading
    ) {

        return (
            <div>
                Loading Team...
            </div>
        );
    }

    return (

        <div>

            <div
                className="
                flex
                items-center
                justify-between
                mb-6
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    "
                >
                    Team Management
                </h2>

            </div>
            <button
    onClick={handleAutoAssign}
    className="
    mt-6
    bg-green-600
    text-white
    px-6
    py-3
    mb-6
    rounded-lg
    hover:bg-green-700
    "
>
    ⚡ Auto Assign Tasks
</button>

            <div
                className="
                bg-white
                p-6
                rounded-xl
                shadow
                border
                mb-6
                "
            >

                <h3
                    className="
                    text-lg
                    font-semibold
                    mb-4
                    "
                >
                    Add Team Member
                </h3>

                <div
                    className="
                    flex
                    gap-4
                    "
                >

                    <select
                        value={
                            selectedUser
                        }
                        onChange={(e) =>
                            setSelectedUser(
                                e.target.value
                            )
                        }
                        className="
                        flex-1
                        border
                        rounded-lg
                        p-3
                        "
                    >

                        <option value="">
                            Select User
                        </option>

                        {
                            users?.map(
                                (user: any) => (

                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                    {" "}
                                    (
                                    {user.role}
                                    )
                                </option>
                            ))
                        }

                    </select>

                    <button
                        onClick={
                            handleAddMember
                        }
                        className="
                        bg-blue-600
                        text-white
                        px-6
                        rounded-lg
                        hover:bg-blue-700
                        "
                    >
                        Add Member
                    </button>

                </div>

            </div>

            <div
                className="
                bg-white
                rounded-xl
                shadow
                border
                "
            >

                <div
                    className="
                    p-4
                    border-b
                    "
                >

                    <h3
                        className="
                        text-lg
                        font-semibold
                        "
                    >
                        Project Members
                    </h3>

                </div>

                {
                    members?.length === 0 && (

                        <div
                            className="
                            p-6
                            text-gray-500
                            "
                        >
                            No members added yet.
                        </div>
                    )
                }

                {
                    members?.map(
                        (
                            member: any
                        ) => (

                        <div
                            key={
                                member.userId
                            }
                            className="
                            flex
                            justify-between
                            items-center
                            p-4
                            border-b
                            "
                        >

                            <div>

                                <p
                                    className="
                                    font-medium
                                    "
                                >
                                    {
                                        member.name
                                    }
                                </p>

                                <p
                                    className="
                                    text-sm
                                    text-gray-500
                                    "
                                >
                                    {
                                        member.email
                                    }
                                </p>

                            </div>

                            <span
                                className="
                                bg-blue-100
                                text-blue-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                "
                            >
                                {
                                    member.role
                                }
                            </span>

                        </div>
                    ))
                }

            </div>


        </div>
    );
}