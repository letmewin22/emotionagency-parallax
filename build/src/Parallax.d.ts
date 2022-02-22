interface IOpts {
    inViewDetection?: boolean;
    mobile?: boolean;
    breakpoint?: number;
}
export declare class Parallax {
    protected opts?: IOpts;
    $els: NodeListOf<HTMLElement>;
    constructor(opts?: IOpts);
    init(): void;
    bounds(): void;
    isInView($el: HTMLElement): boolean;
    getPosition($el: HTMLElement): number;
    move($el: HTMLElement, distance: number, scale?: number): void;
    animate(): void;
    off(): void;
    resize(): void;
    update(): void;
    reset(): void;
    destroy(): void;
}
export {};
