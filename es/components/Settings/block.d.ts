import { ReactNode } from "react";
export interface BlockProps {
    title?: ReactNode;
    options?: {
        name: string;
        value: string;
        type?: "switch" | "number";
    }[];
    children?: ReactNode;
}
export default function Block(props: BlockProps): JSX.Element;
