import { Game } from "./game.model";
import { DefaultSession, Session } from "./session.model";
import { DefaultTheme, Theme } from "./theme.model";

export interface GameSession {
    session: Session,
    theme: Theme,
    games: Game[],
    currentGame: Game | null
}

export const DefaultGameSession: GameSession = {
    session: DefaultSession,
    theme: DefaultTheme,
    games: [],
    currentGame: null
}