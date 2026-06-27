import {
    useParams
} from "react-router-dom";

import {
    useQuery
} from "@tanstack/react-query";

import {
    getProject
} from "../../services/projectService";

export default function ProjectHeader() {

    const { projectId } =
        useParams();

    const {
        data
    } = useQuery({

        queryKey:[
            "project",
            projectId
        ],

        queryFn:() =>
            getProject(
                projectId!
            )
    });

    if(!data) return null;

    return (

        <div
            className="
            bg-white
            rounded-xl
            shadow
            p-6
            mb-6
            "
        >

            <h1
                className="
                text-3xl
                font-bold
                "
            >
                {data.name}
            </h1>

            <p
                className="
                text-gray-600
                mt-2
                "
            >
                {data.description}
            </p>

        </div>
    );
}