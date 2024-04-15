import { Font, fonts } from "./font.model";

export interface Theme {
    font: Font;
    backgroundColor: string;
    cardColor: string;
    textColor: string;
    bold: boolean;
    textShadow: boolean;
    uppercase: boolean;
}

export const defaultTheme: Theme = {
    font: fonts[3],
    backgroundColor: '#361b07',
    cardColor: '#3e372e',
    textColor: '#ffffff',
    bold: false,
    textShadow: true,
    uppercase: true
}
