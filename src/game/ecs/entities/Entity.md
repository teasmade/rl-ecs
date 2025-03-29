## Why use a Map for the Entity class's components?

Using a Map for storing components in the Entity class offers several advantages:

1. **Unique Component Types**: A Map ensures that each entity can only have one instance of each component type, as the component's constructor name is used as the key. This enforces the ECS pattern where an entity should not have duplicate component types.

2. **Efficient Lookup**: Maps provide O(1) average time complexity for lookups, insertions, and deletions. When systems need to check if an entity has a specific component or retrieve a component, it's very efficient:
```typescript
entity.hasComponent('PositionComponent')  // O(1) lookup
entity.getComponent('RenderComponent')    // O(1) lookup
```

3. **Type Safety**: The Map's key-value structure helps maintain type safety. The key is always a string (the component type name), and the value is always a Component instance.

4. **Memory Efficiency**: Unlike arrays or objects, Maps are designed specifically for frequent additions and removals of key-value pairs, with optimized memory handling for this use case.

5. **Clear Intent**: Using a Map makes it explicit that we're storing a collection of named components, where each component type can only exist once per entity. This is more semantically correct than using an array or regular object.

Alternative approaches and why they're less suitable:
- **Array**: Would require linear O(n) search to find components
- **Regular Object**: Less type-safe and lacks some of Map's useful methods
- **Set**: Wouldn't allow easy retrieval of components by type name

For example, if we were using an array instead:
```typescript
// With array - O(n) lookup
private components: Component[] = [];
public hasComponent(componentName: string): boolean {
    return this.components.some(c => c.constructor.name === componentName);
}

// With Map - O(1) lookup
private components: Map<string, Component> = new Map();
public hasComponent(componentName: string): boolean {
    return this.components.has(componentName);
}
```

The Map implementation is cleaner, more efficient, and better represents the relationship between component types and their instances.
