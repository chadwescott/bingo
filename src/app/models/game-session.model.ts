import { Game } from "./game.model";
import { Theme, defaultTheme } from "./theme.model";

export interface GameSession {
    sessionId: string | null,
    theme: Theme,
    games: Game[],
    currentGame: Game | null
}

export const defaultGameSession: GameSession = {
    sessionId: null,
    theme: defaultTheme,
    games: [],
    currentGame: null
}