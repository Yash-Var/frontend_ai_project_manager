import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function ProjectDetails() {

    const { projectId } =
        useParams();

    return (
        <MainLayout>

            <h1
                className="
                text-3xl
                font-bold
                "
            >
                Project Details
            </h1>

            <p>
                {projectId}
            </p>

        </MainLayout>
    );
}