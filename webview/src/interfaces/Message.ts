export interface Message {
    role: string;
    content: string;
    images?: Uint8Array[] | string[];
    // tool_calls?: ToolCall[];
}