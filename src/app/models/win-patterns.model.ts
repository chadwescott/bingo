import { WinPattern } from "./win-pattern.model";
import { BullseyePattern } from "./win-patterns/bullseye.pattern";
import { ButterflyPattern } from "./win-patterns/butterfly.pattern";
import { FourCornerPostageStamps } from "./win-patterns/four-corner-postage-stamps.pattern";
import { FullBoardPattern } from "./win-patterns/full-board.pattern";
import { NonePattern } from "./win-patterns/none.pattern";
import { OneCornerPostageStamp } from "./win-patterns/one-corner-postage-stamp.pattern";
import { PostageStamps } from "./win-patterns/postage-stamps.pattern";
import { StraightLinePattern } from "./win-patterns/straight-line.pattern";
import { XPattern } from "./win-patterns/x.pattern";

export const winPatterns: WinPattern[] =
    [
        NonePattern,
        OneCornerPostageStamp,
        FourCornerPostageStamps,
        BullseyePattern,
        ButterflyPattern,
        FullBoardPattern,
        PostageStamps,
        StraightLinePattern,
        XPattern
    ];