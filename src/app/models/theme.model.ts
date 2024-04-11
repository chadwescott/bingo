export interface Theme {
    backgroundColor: string;
    textColor: string;
    cardColor: string;
    textShadow: boolean;
}

export const defaultTheme: Theme = {
    backgroundColor: '#501414',
    textColor: '#ffffff',
    cardColor: '#ffffff',
    textShadow: true
}
