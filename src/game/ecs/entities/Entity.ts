import { Component } from '../components/Component';

export class Entity {
    private id: string;
    private components: Map<string, Component>;

    constructor(id: string) {
        this.id = id;
        this.components = new Map();
    }

    public getId(): string {
        return this.id;
    }

    public addComponent(component: Component): void {
        this.components.set(component.constructor.name, component);
    }

    public removeComponent(componentName: string): void {
        this.components.delete(componentName);
    }

    public getComponent<T extends Component>(componentName: string): T | undefined {
        return this.components.get(componentName) as T | undefined;
    }

    public hasComponent(componentName: string): boolean {
        return this.components.has(componentName);
    }
} 