import { Entity } from '../entities/Entity';

export abstract class System {
    protected entities: Set<Entity>;

    constructor() {
        this.entities = new Set();
    }

    public addEntity(entity: Entity): void {
        if (this.shouldProcessEntity(entity)) {
            this.entities.add(entity);
        }
    }

    public removeEntity(entity: Entity): void {
        this.entities.delete(entity);
    }

    public abstract update(deltaTime?: number): void;

    protected abstract shouldProcessEntity(entity: Entity): boolean;
} 