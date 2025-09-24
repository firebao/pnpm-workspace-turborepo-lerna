export async function chat(messageList) {
    try {
        const url = "http://21.76.121.229:7861/chat/kb_chat";
        const params = {
            "query": messageList.replace(/\n$/, ''),
            "mode": "local_kb",
            "kb_name": "rule",
            "top_k": 3,
            "score_threshold": 2,
            "stream": true,
            "model": "qwen1.5-chat",
            "temperature": 0.7,
            "max_tokens": 0,
            "prompt_name": "default",
            "return_direct": false
        }
        const result = await fetch(url, {
            // const result = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "post",
            // signal: AbortSignal.timeout(8000),
            // 开启后到达设定时间会中断流式输出
            headers: {
                "Content-Type": "application/json"
                // Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(params)
        });
        return result;
    } catch (error) {
        throw error;
    }
}