import {
    useParams
} from "react-router-dom";

import {
    useQuery
} from "@tanstack/react-query";

import {
    getTeamWorkload
} from "../../services/workloadService";

export default function TeamWorkloadCard() {

    const { projectId } =
        useParams();

    const {

        data = [],

        isLoading,

        error

    } = useQuery({

        queryKey: [

            "team-workload",

            projectId

        ],

        queryFn: () =>
            getTeamWorkload(
                projectId!
            )
    });

    if (isLoading) {

        return (

            <div
                className="
                bg-white
                rounded-xl
                shadow
                p-6
                "
            >
                Loading Team Workload...
            </div>
        );
    }

    if (error) {

        return (

            <div
                className="
                bg-red-100
                text-red-600
                rounded-xl
                p-6
                "
            >
                Failed to load workload
            </div>
        );
    }

    return (

        <div
            className="
            bg-white
            rounded-xl
            shadow
            p-6
            "
        >

            <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
            >
                👥 Team Workload
            </h2>

            {
                data.length === 0 && (

                    <p
                        className="
                        text-gray-500
                        "
                    >
                        No workload available
                    </p>

                )
            }

            <div
                className="
                space-y-5
                "
            >

                {
                    data.map(
                        (
                            member:any
                        ) => {

                            const percentage =
                                Math.min(
                                    (member.storyPoints / 60) * 100,
                                    100
                                );

                            const color =
                                member.storyPoints > 50
                                    ? "bg-red-500"
                                    : member.storyPoints > 35
                                    ? "bg-yellow-500"
                                    : "bg-green-500";

                            return (

                                <div
                                    key={
                                        member.developer
                                    }
                                >

                                    <div
                                        className="
                                        flex
                                        justify-between
                                        mb-2
                                        "
                                    >

                                        <div>

                                            <h3
                                                className="
                                                font-semibold
                                                "
                                            >
                                                {
                                                    member.developer
                                                }
                                            </h3>

                                            <p
                                                className="
                                                text-sm
                                                text-gray-500
                                                "
                                            >
                                                {
                                                    member.taskCount
                                                }
                                                {" "}
                                                Tasks
                                            </p>

                                        </div>

                                        <div
                                            className="
                                            font-bold
                                            "
                                        >
                                            {
                                                member.storyPoints
                                            }
                                            {" "}
                                            SP
                                        </div>

                                    </div>

                                    <div
                                        className="
                                        h-3
                                        rounded-full
                                        bg-gray-200
                                        "
                                    >

                                        <div

                                            className={`
                                            h-3
                                            rounded-full
                                            ${color}
                                            `}

                                            style={{
                                                width:
                                                    `${percentage}%`
                                            }}

                                        />

                                    </div>

                                </div>

                            );

                        }
                    )
                }

            </div>

        </div>
    );
}