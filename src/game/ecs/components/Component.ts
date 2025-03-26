export abstract class Component {
    protected entityId: string;

    constructor(entityId: string) {
        this.entityId = entityId;
    }

    public getEntityId(): string {
        return this.entityId;
    }
} 