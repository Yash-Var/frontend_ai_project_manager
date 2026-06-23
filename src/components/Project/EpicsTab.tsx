import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
    getProjectEpics
}
from "../../services/epicService";

export default function EpicsTab() {

    const { projectId } =
        useParams();

    const {
        data: epics,
        isLoading
    } = useQuery({

        queryKey: [
            "epics",
            projectId
        ],

        queryFn: () =>
            getProjectEpics(
                projectId!
            )
    });

    if(isLoading){

        return(
            <div>
                Loading Epics...
            </div>
        );
    }

    return(

        <div>

            <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
            >
                Project Epics
            </h2>

            <div
                className="
                grid
                grid-cols-2
                gap-4
                "
            >

                {
                    epics?.map(
                        (epic:any) => (

                        <div
                            key={epic.id}
                            className="
                            bg-white
                            border
                            rounded-xl
                            p-5
                            shadow
                            "
                        >

                            <h3
                                className="
                                text-lg
                                font-semibold
                                "
                            >
                                {epic.name}
                            </h3>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}