import { useState } from "react";
import { sendMessageToLex } from "../lexConnect";

export function Convo() {
    const [input, setInput] = useState("");

    async function onClick() {
        console.log(await sendMessageToLex(input));
    }

    return (
        <>
            <input
                type="text"
                onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button onClick={onClick}>ClickMe</button>
        </>
    );
}
