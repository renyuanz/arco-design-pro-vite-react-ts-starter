declare type ClassNamesArg = string | string[] | {
    [key: string]: boolean;
} | undefined | null | boolean;
export default function (...args: ClassNamesArg[]): string;
export {};
