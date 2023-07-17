import type {SegmentName} from "./model"

export function clampToLength(state: SegmentName[][], length: number): SegmentName[][] {
    return state
        .concat(emptyDisplays(Math.max(0, length - state.length)))
        .slice(0, length);
}
export function emptyDisplays(amount: number) {
    return Array.from({ length: amount }, () => []);
}
