interface Props {

    role: "user" | "assistant";

    message: string;

}

export default function ChatBubble({

    role,

    message

}: Props) {

    const isUser =
        role === "user";

    return (

        <div

            className={`flex mb-4 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}

        >

            <div

                className={`max-w-[70%] rounded-xl px-4 py-3 whitespace-pre-wrap

                ${
                    isUser

                        ? "bg-blue-600 text-white"

                        : "bg-white shadow"
                }

                `}

            >

                {message}

            </div>

        </div>

    );

}