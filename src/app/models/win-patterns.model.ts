import { WinPattern } from "./win-pattern.model";
import { BullseyePattern } from "./win-patterns/bullseye.pattern";
import { ButterflyPattern } from "./win-patterns/butterfly.pattern";
import { CrossPattern } from "./win-patterns/cross.pattern";
import { FourCornerPostageStampsPattern } from "./win-patterns/four-corner-postage-stamps.pattern";
import { FullBoardPattern } from "./win-patterns/full-board.pattern";
import { HeartPattern } from "./win-patterns/heart.pattern";
import { HourglassPattern } from "./win-patterns/hourglass.pattern";
import { HousePattern } from "./win-patterns/house.pattern";
import { LargeKitePattern } from "./win-patterns/large-kite.pattern";
import { NonePattern } from "./win-patterns/none.pattern";
import { OneCornerPostageStampPattern } from "./win-patterns/one-corner-postage-stamp.pattern";
import { PlusPattern } from "./win-patterns/plus.pattern";
import { PostageStamps } from "./win-patterns/postage-stamps.pattern";
import { StraightLinePattern } from "./win-patterns/straight-line.pattern";
import { XPattern } from "./win-patterns/x.pattern";

export const winPatterns: WinPattern[] =
    [
        NonePattern,
        OneCornerPostageStampPattern,
        FourCornerPostageStampsPattern,
        CrossPattern,
        BullseyePattern,
        ButterflyPattern,
        FullBoardPattern,
        HeartPattern,
        HourglassPattern,
        HousePattern,
        LargeKitePattern,
        PlusPattern,
        PostageStamps,
        StraightLinePattern,
        XPattern
    ];