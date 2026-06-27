import {
    useParams
} from "react-router-dom";

import {
    useQuery
} from "@tanstack/react-query";

import {
    getProjectRisk
} from "../../services/aiService";

export default function AIHealthCard() {

    const { projectId } =
        useParams();

    const {
        data,
        isLoading
    } = useQuery({

        queryKey: [
            "project-risk",
            projectId
        ],

        queryFn: () =>
            getProjectRisk(
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
                Analyzing Project...
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const scoreColor =
        data.riskScore >= 70
            ? "text-red-600"
            : data.riskScore >= 40
            ? "text-yellow-600"
            : "text-green-600";

    return (

        <div
            className="
            bg-white
            rounded-xl
            shadow
            p-6
            "
        >

            <div
                className="
                flex
                justify-between
                items-center
                mb-6
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    "
                >
                    🤖 AI Project Health
                </h2>

                <div
                    className={`
                    text-3xl
                    font-bold
                    ${scoreColor}
                    `}
                >
                    {data.riskScore}/100
                </div>

            </div>

            <div
                className="
                mb-6
                "
            >

                <h3
                    className="
                    font-semibold
                    text-lg
                    mb-3
                    "
                >
                    Risks
                </h3>

                {
                    data.risks?.length > 0
                    ? (
                        <ul
                            className="
                            space-y-2
                            "
                        >

                            {
                                data.risks.map(
                                    (
                                        risk:string,
                                        index:number
                                    ) => (

                                        <li
                                            key={index}
                                            className="
                                            text-red-600
                                            "
                                        >
                                            ⚠ {risk}
                                        </li>
                                    )
                                )
                            }

                        </ul>
                    )
                    : (
                        <p
                            className="
                            text-green-600
                            "
                        >
                            No risks detected
                        </p>
                    )
                }

            </div>

            <div>

                <h3
                    className="
                    font-semibold
                    text-lg
                    mb-3
                    "
                >
                    Recommendations
                </h3>

                {
                    data.recommendations?.length > 0
                    ? (
                        <ul
                            className="
                            space-y-2
                            "
                        >

                            {
                                data.recommendations.map(
                                    (
                                        recommendation:string,
                                        index:number
                                    ) => (

                                        <li
                                            key={index}
                                            className="
                                            text-green-600
                                            "
                                        >
                                            ✓ {recommendation}
                                        </li>
                                    )
                                )
                            }

                        </ul>
                    )
                    : (
                        <p>
                            No recommendations
                        </p>
                    )
                }

            </div>

        </div>
    );
}