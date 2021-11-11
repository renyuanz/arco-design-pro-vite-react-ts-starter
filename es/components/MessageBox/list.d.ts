import { ReactNode } from "react";
export interface MessageItemData {
    id: string;
    title: string;
    subTitle: string;
    avatar: string;
    content: string;
    time: string;
    status: number;
}
export declare type MessageListType = MessageItemData[];
interface MessageListProps {
    data: MessageItemData[];
    unReadData: MessageItemData[];
    avatar?: string | ReactNode;
    onItemClick?: (item: MessageItemData, index: number) => void;
    onAllBtnClick?: (unReadData: MessageItemData[], data: MessageItemData[]) => void;
}
declare function MessageList(props: MessageListProps): JSX.Element;
export default MessageList;
