declare module 'tape' {
    export interface Test {
        equal(actual: any, expected: any, message?: string): void;
        ok(value: any, message?: string): void;
        throws(fn: Function, error?: any, message?: string): void;
        doesNotThrow(fn: Function, message?: string): void;
        end(): void;
        // Add more methods as needed
    }

    export default function test(name: string, fn: (t: Test) => void): void;
}