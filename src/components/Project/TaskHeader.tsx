import { X } from "lucide-react";

export default function TaskHeader({

    task,

    onClose

}: any) {

    return (

        <div
            className="
border-b
p-6
flex
justify-between
items-center
"
        >

            <div>

                <h1
                    className="
text-2xl
font-bold
"
                >

                    {task.title}

                </h1>

                <div className="flex gap-4 mt-3">

                    <span
                        className="
bg-blue-100
px-3
py-1
rounded-full
"
                    >

                        {task.status}

                    </span>

                    <span>

                        ⭐ {task.storyPoints} SP

                    </span>

                </div>

            </div>

            <button
                onClick={onClose}
            >

                <X />

            </button>

        </div>

    );

}