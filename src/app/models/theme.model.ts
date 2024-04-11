export interface Theme {
    backgroundColor: string;
    textColor: string;
    darkMode: boolean;
    intensity: number;
}

export const defaultTheme: Theme = {
    backgroundColor: '#501414',
    textColor: '#ffffff',
    darkMode: true,
    intensity: 0.5
}
