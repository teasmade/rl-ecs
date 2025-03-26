import { Component } from './Component';

export class RenderComponent extends Component {
    private symbol: string;
    private color: string;

    constructor(entityId: string, symbol: string, color: string = '#ffffff') {
        super(entityId);
        this.symbol = symbol;
        this.color = color;
    }

    public getSymbol(): string {
        return this.symbol;
    }

    public getColor(): string {
        return this.color;
    }

    public setSymbol(symbol: string): void {
        this.symbol = symbol;
    }

    public setColor(color: string): void {
        this.color = color;
    }
} 