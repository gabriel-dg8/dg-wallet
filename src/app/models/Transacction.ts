export interface Transacction {
    blockHash: string;
    blockNumber: number;
    from: string;
    gas: number;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: number;
    r: string;
    s: string;
    to: string;
    transactionIndex: number;
    type: string;
    v: string;
    value: string;
}