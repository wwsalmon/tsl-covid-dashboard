export function numberOrZero(d: any): number {
    return +(Number.isFinite(d) ? d : 0);
}