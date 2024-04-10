import { WinPattern } from "./win-pattern";
import { BullseyePattern } from "./win-patterns/bullseye.pattern";
import { ButterflyPattern } from "./win-patterns/butterfly.pattern";
import { FourCornerPostageStamps } from "./win-patterns/four-corner-postage-stamps.pattern";
import { FullBoardPattern } from "./win-patterns/full-board.pattern";
import { OneCornerPostageStamp } from "./win-patterns/one-corner-postage-stamp.pattern";
import { PostageStamps } from "./win-patterns/postage-stamps.pattern";
import { StraightLinePattern } from "./win-patterns/straight-line.pattern";
import { XPattern } from "./win-patterns/x.pattern";

export const WinPatterns: WinPattern[] =
    [
        OneCornerPostageStamp,
        FourCornerPostageStamps,
        BullseyePattern,
        ButterflyPattern,
        StraightLinePattern,
        FullBoardPattern,
        PostageStamps,
        XPattern
    ];