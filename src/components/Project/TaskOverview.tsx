export default function TaskOverview({

    task

}: any) {

    return (

        <div
            className="
bg-gray-50
rounded-xl
p-6
mb-6
"
        >

            <h2
                className="
font-bold
text-xl
mb-4
"
            >

                Overview

            </h2>

            <p>

                {task.description}

            </p>

            <div
                className="
grid
grid-cols-2
gap-4
mt-6
"
            >

                <div>

                    <strong>

                        Project

                    </strong>

                    <br />

                    {task.projectName}

                </div>

                <div>

                    <strong>

                        Epic

                    </strong>

                    <br />

                    {task.epicName}

                </div>

                <div>

                    <strong>

                        Assignee

                    </strong>

                    <br />

                    {task.assigneeName}

                </div>

                <div>

                    <strong>

                        Skill

                    </strong>

                    <br />

                    {task.requiredSkill}

                </div>

            </div>

        </div>

    );

}