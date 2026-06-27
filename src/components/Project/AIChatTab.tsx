import { useState } from "react";
import { useParams } from "react-router-dom";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";

import {

    askAI

} from "../../services/aiChatService";

interface Message{

    role:"user"|"assistant";

    message:string;

}

export default function AIChatTab(){

    const {

        projectId

    }=useParams();

    const[

        loading,

        setLoading

    ]=useState(false);

    const[

        messages,

        setMessages

    ]=useState<Message[]>([

        {

            role:"assistant",

            message:"Hello 👋 I'm your AI Project Manager. Ask me anything about your project."

        }

    ]);

    const ask=async(

        question:string

    )=>{

        setMessages(prev=>

            [

                ...prev,

                {

                    role:"user",

                    message:question

                }

            ]

        );

        setLoading(true);

        try{

            const response=

                await askAI({

                    projectId:projectId!,

                    question

                });

            setMessages(prev=>

                [

                    ...prev,

                    {

                        role:"assistant",

                        message:response.answer

                    }

                ]

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="space-y-6">

            <SuggestedQuestions

                ask={ask}

            />

            <div

                className="bg-gray-100 rounded-xl p-6 h-[500px] overflow-y-auto"

            >

                {

                    messages.map(

                        (m,index)=>(

                            <ChatBubble

                                key={index}

                                role={m.role}

                                message={m.message}

                            />

                        )

                    )

                }

                {

                    loading &&

                    <ChatBubble

                        role="assistant"

                        message="🤖 AI is thinking..."

                    />

                }

            </div>

            <ChatInput

                loading={loading}

                onSend={ask}

            />

        </div>

    );

}