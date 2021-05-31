export class GasPrice {
    safeLow: number = 0;
    get safeLowDesc(): string {
        return "Save Low (< 30 mins to confirm)";
    }
    standard: number = 0;
    get standardDesc(): string {
        return "Normal (< 5 mins to confirm)"
    }
    fast: number = 0;
    get fastDesc(): string {
        return "Fast (1-2 mins to confirm)"
    }
    fastest: number = 0;
    get fastestDesc(): string {
        return "Fastest (Confirms in 1-2 blocks)"
    }

    get value(): string {
        return "GWei";
    }

}