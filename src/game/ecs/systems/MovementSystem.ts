import { System } from './System';
import { Entity } from '../entities/Entity';
import { PositionComponent } from '../components/PositionComponent';

export class MovementSystem extends System {
    private gridWidth: number;
    private gridHeight: number;

    constructor(gridWidth: number, gridHeight: number) {
        super();
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }

    public update(deltaTime: number): void {
        // Movement will be handled by input events
    }

    protected shouldProcessEntity(entity: Entity): boolean {
        return entity.hasComponent('PositionComponent');
    }

    public moveEntity(entity: Entity, dx: number, dy: number): boolean {
        const position = entity.getComponent<PositionComponent>('PositionComponent');
        if (!position) return false;

        const newX = position.getX() + dx;
        const newY = position.getY() + dy;

        if (this.isValidPosition(newX, newY)) {
            position.setPosition(newX, newY);
            return true;
        }

        return false;
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight;
    }
} 