import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout
from "../../layouts/MainLayout";

import {
    createAIProject
}
from "../../services/projectService";

export default function CreateProject() {

    const navigate =
        useNavigate();

    const [name,setName] =
        useState("");

    const [requirement,setRequirement] =
        useState("");

    const [loading,setLoading] =
        useState(false);

    const [result,setResult] =
        useState<any>(null);

    const handleGenerate =
        async () => {

        try {

            setLoading(true);

            const response =
                await createAIProject({

                    name,
                    requirement

                });

            setResult(
                response
            );

        }
        catch(error){

            console.error(
                error
            );

            alert(
                "Failed to create project"
            );
        }
        finally {

            setLoading(false);
        }
    };

    const totalTasks =
        result
        ? result.epics.reduce(
            (
                sum:any,
                epic:any
            ) =>
                sum +
                epic.tasks.length,
            0
        )
        : 0;

    return (

        <MainLayout>

            <div
                className="
                max-w-4xl
                mx-auto
                "
            >

                <h1
                    className="
                    text-4xl
                    font-bold
                    mb-2
                    "
                >
                    AI Project Builder
                </h1>

                <p
                    className="
                    text-slate-500
                    mb-8
                    "
                >
                    Describe your product
                    and AI will generate
                    project structure,
                    epics and tasks.
                </p>

                {
                    !result &&
                    <>
                        <input

                            type="text"

                            placeholder=
                            "Project Name"

                            value={name}

                            onChange={(e)=>
                                setName(
                                    e.target.value
                                )
                            }

                            className="
                            w-full
                            border
                            rounded-xl
                            p-4
                            mb-4
                            "
                        />

                        <textarea

                            value={requirement}

                            onChange={(e)=>
                                setRequirement(
                                    e.target.value
                                )
                            }

                            placeholder="
Build an e-commerce platform with authentication,
payments, inventory,
analytics and AI recommendations.
                            "

                            className="
                            w-full
                            h-64
                            border
                            rounded-xl
                            p-4
                            "
                        />

                        <button

                            disabled={loading}

                            onClick={
                                handleGenerate
                            }

                            className="
                            mt-6
                            bg-slate-900
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            hover:bg-slate-800
                            disabled:opacity-50
                            "
                        >

                            {
                                loading
                                ?
                                "Generating..."
                                :
                                "✨ Generate Project Workspace"
                            }

                        </button>
                    </>
                }

                {
                    loading &&
                    (
                        <div
                            className="
                            mt-8
                            bg-white
                            border
                            rounded-2xl
                            p-8
                            shadow-lg
                            "
                        >

                            <h2
                                className="
                                text-xl
                                font-semibold
                                "
                            >
                                🤖 AI Building Project
                            </h2>

                            <div
                                className="
                                mt-6
                                space-y-4
                                "
                            >

                                <div>
                                    📝 Analyzing Requirements
                                </div>

                                <div>
                                    🏗️ Generating Project Structure
                                </div>

                                <div>
                                    📚 Creating Epics
                                </div>

                                <div>
                                    ✅ Breaking Work Into Tasks
                                </div>

                            </div>

                            <div
                                className="
                                mt-6
                                h-2
                                bg-slate-200
                                rounded-full
                                overflow-hidden
                                "
                            >

                                <div
                                    className="
                                    h-full
                                    w-3/4
                                    bg-blue-600
                                    animate-pulse
                                    "
                                />

                            </div>

                            <p
                                className="
                                mt-4
                                text-sm
                                text-slate-500
                                "
                            >
                                This usually takes
                                5-15 seconds...
                            </p>

                        </div>
                    )
                }

                {
                    result &&
                    (

                        <div
                            className="
                            mt-8
                            bg-white
                            border
                            rounded-2xl
                            p-8
                            shadow-lg
                            "
                        >

                            <h2
                                className="
                                text-3xl
                                font-bold
                                text-green-600
                                "
                            >
                                🎉 Project Created
                            </h2>

                            <div
                                className="
                                mt-6
                                grid
                                grid-cols-3
                                gap-4
                                "
                            >

                                <div
                                    className="
                                    p-4
                                    bg-slate-100
                                    rounded-xl
                                    "
                                >
                                    <div
                                        className="
                                        text-sm
                                        text-slate-500
                                        "
                                    >
                                        Project
                                    </div>

                                    <div
                                        className="
                                        font-bold
                                        "
                                    >
                                        {
                                            result.projectName
                                        }
                                    </div>
                                </div>

                                <div
                                    className="
                                    p-4
                                    bg-slate-100
                                    rounded-xl
                                    "
                                >
                                    <div>
                                        Epics
                                    </div>

                                    <div
                                        className="
                                        text-3xl
                                        font-bold
                                        "
                                    >
                                        {
                                            result.epics.length
                                        }
                                    </div>
                                </div>

                                <div
                                    className="
                                    p-4
                                    bg-slate-100
                                    rounded-xl
                                    "
                                >
                                    <div>
                                        Tasks
                                    </div>

                                    <div
                                        className="
                                        text-3xl
                                        font-bold
                                        "
                                    >
                                        {
                                            totalTasks
                                        }
                                    </div>
                                </div>

                            </div>

                            <button

                                onClick={() =>
                                    navigate(
 `/projects/${result.projectId}`
)
                                }

                                className="
                                mt-8
                                bg-blue-600
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                "
                            >

                                View Generated Project

                            </button>

                        </div>

                    )
                }

            </div>

        </MainLayout>
    );
}