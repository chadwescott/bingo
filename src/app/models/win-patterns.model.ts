import { WinPattern } from "./win-pattern.model";
import { AnyLinePattern } from "./win-patterns/any-line.pattern";
import { BullseyePattern } from "./win-patterns/bullseye.pattern";
import { ButterflyPattern } from "./win-patterns/butterfly.pattern";
import { CandlestickPattern } from "./win-patterns/candlestick.pattern";
import { CrossFlagsPattern } from "./win-patterns/cross-flags.pattern";
import { CrossPattern } from "./win-patterns/cross.pattern";
import { DiamondPattern } from "./win-patterns/diamond.pattern";
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
import { TwoLinesPattern } from "./win-patterns/two-lines.pattern";
import { WindowPattern } from "./win-patterns/window.pattern";
import { XPattern } from "./win-patterns/x.pattern";

export const winPatterns: WinPattern[] =
    [
        NonePattern,
        OneCornerPostageStampPattern,
        TwoLinesPattern,
        FourCornerPostageStampsPattern,
        AnyLinePattern,
        CandlestickPattern,
        CrossPattern,
        CrossFlagsPattern,
        DiamondPattern,
        BullseyePattern,
        ButterflyPattern,
        FullBoardPattern,
        HeartPattern,
        HourglassPattern,
        HousePattern,
        LargeKitePattern,
        PlusPattern,
        PostageStamps,
        WindowPattern,
        XPattern
    ];