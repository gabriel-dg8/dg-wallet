/**
 * Datos que corresponde a un token
 */
export interface Token {
    contract: string;
    current_price: number;
    id: number;
    image: string;
    market_cap: number;
    name: string;
    price_change_percentage_24h: number;
    symbol: string;
    total_supply: number;
    total_volume: number;
}