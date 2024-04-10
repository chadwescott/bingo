import { WinPattern } from "./win-pattern";
import { FullBoardPattern } from "./win-patterns/full-board.pattern";
import { StraightLinePattern } from "./win-patterns/straight-line.pattern";
import { XPattern } from "./win-patterns/x.pattern";

export const WinPatterns: WinPattern[] =
    [
        StraightLinePattern,
        FullBoardPattern,
        XPattern
    ];