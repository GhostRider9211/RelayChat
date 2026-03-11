type ChatGroupType = {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;

}
type GroupUserType = {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
}
