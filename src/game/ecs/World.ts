import { Entity } from './entities/Entity';
import { System } from './systems/System';

export class World {
    private entities: Map<string, Entity>;
    private systems: System[];

    constructor() {
        this.entities = new Map();
        this.systems = [];
    }

    public addEntity(entity: Entity): void {
        this.entities.set(entity.getId(), entity);
        this.systems.forEach(system => system.addEntity(entity));
    }

    public removeEntity(entityId: string): void {
        const entity = this.entities.get(entityId);
        if (entity) {
            this.systems.forEach(system => system.removeEntity(entity));
            this.entities.delete(entityId);
        }
    }

    public getEntity(entityId: string): Entity | undefined {
        return this.entities.get(entityId);
    }

    public addSystem(system: System): void {
        this.systems.push(system);
        this.entities.forEach(entity => system.addEntity(entity));
    }

    public update(deltaTime: number): void {
        this.systems.forEach(system => system.update(deltaTime));
    }
} 