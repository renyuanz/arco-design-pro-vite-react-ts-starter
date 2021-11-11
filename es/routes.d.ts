export declare const defaultRoute = "welcome";
export declare const routes: ({
    name: string;
    key: string;
    icon: JSX.Element;
    componentPath: string;
    children?: undefined;
} | {
    name: string;
    key: string;
    icon: JSX.Element;
    children: {
        name: string;
        key: string;
        componentPath: string;
    }[];
    componentPath?: undefined;
})[];
