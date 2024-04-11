import { WinPattern } from "../win-pattern.model";

export const DiamondPattern: WinPattern = {
    name: 'Diamond',
    coordinates: [
        [
            { x: 0, y: 2 },
            { x: 1, y: 1 },
            { x: 1, y: 3 },
            { x: 2, y: 0 },
            { x: 2, y: 4 },
            { x: 3, y: 1 },
            { x: 3, y: 3 },
            { x: 4, y: 2 }
        ]
    ]
};