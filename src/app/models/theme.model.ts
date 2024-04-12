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
    font: fonts[0],
    backgroundColor: '#2c1a0c',
    cardColor: '#392304',
    textColor: '#ffffff',
    bold: false,
    textShadow: true,
    uppercase: true
}
