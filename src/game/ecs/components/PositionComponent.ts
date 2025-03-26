import { Component } from './Component';

export class PositionComponent extends Component {
    private x: number;
    private y: number;

    constructor(entityId: string, x: number, y: number) {
        super(entityId);
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
} 