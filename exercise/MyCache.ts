export interface MyCache {
    get(key: number): number;
    put(key: number, value: number): void;
}
