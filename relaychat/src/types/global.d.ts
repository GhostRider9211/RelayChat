declare module "*.css";

interface GroupChatType {
    id: string;
    title: string;
    passcode: string;
    user_id: number;
    created_at: string;
}

interface GroupChatUserType {
    id: number;
    group_id: string;
    name: string;
    created_at: string;
}

interface MessageType {
    id: string;
    group_id: string;
    name: string;
    message: string | null;
    file?: string | null;
    created_at: string;
}