import defaultSettings from '../settings.json';
export interface GlobalState {
    theme?: string;
    settings?: typeof defaultSettings;
    userInfo?: {
        name?: string;
        avatar?: string;
        job?: string;
        organization?: string;
        location?: string;
        email?: string;
    };
}
export default function (state: GlobalState, action: any): GlobalState | {
    theme: any;
    settings?: {
        colorWeek: boolean;
        navbar: boolean;
        menu: boolean;
        footer: boolean;
        themeColor: string;
        menuWidth: number;
    };
    userInfo?: {
        name?: string;
        avatar?: string;
        job?: string;
        organization?: string;
        location?: string;
        email?: string;
    };
} | {
    settings: any;
    theme?: string;
    userInfo?: {
        name?: string;
        avatar?: string;
        job?: string;
        organization?: string;
        location?: string;
        email?: string;
    };
};
