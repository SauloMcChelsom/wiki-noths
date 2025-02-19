export interface iNote {
    uid?: string;
    title: string;
    link: string;
    text: string;
    current_position?: number;
    is_favorite?: boolean;
    timestamp?: string;
}