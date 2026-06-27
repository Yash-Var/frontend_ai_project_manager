import { useState } from "react";

interface Props {

    onSend: (

        message: string

    ) => void;

    loading: boolean;

}

export default function ChatInput({

    onSend,

    loading

}: Props) {

    const [

        value,

        setValue

    ] = useState("");

    const send = () => {

        if (!value.trim()) return;

        onSend(value);

        setValue("");

    };

    return (

        <div className="flex gap-3 mt-6">

            <input

                value={value}

                onChange={(e)=>

                    setValue(e.target.value)

                }

                onKeyDown={(e)=>{

                    if(e.key==="Enter"){

                        send();

                    }

                }}

                className="flex-1 border rounded-lg px-4 py-3"

                placeholder="Ask your AI Project Manager..."

            />

            <button

                onClick={send}

                disabled={loading}

                className="bg-blue-600 text-white px-6 rounded-lg"

            >

                Send

            </button>

        </div>

    );

}