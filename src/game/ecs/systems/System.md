## Ok, now why in the System class do we use a Set for storing entities?

Using a Set for storing entities in the System class is a great design choice for several reasons:

1. **Unique Entities**: A Set guarantees that each entity can only be added once to a system. This prevents duplicate processing of the same entity, which could cause bugs or performance issues. For example:
```typescript
// Even if called multiple times, entity only exists once in the set
system.addEntity(entity);
system.addEntity(entity); // No effect - entity already in set
```

2. **Efficient Operations**: Sets provide O(1) average time complexity for:
   - Adding entities (`add`)
   - Removing entities (`delete`)
   - Checking if an entity exists (`has`)
   - Iterating over entities (no need to check for duplicates)

3. **No Order Requirement**: Since systems typically don't care about the order in which they process entities, a Set is perfect as it doesn't maintain any specific ordering. This is different from an Array where order matters.

4. **Memory Efficient**: Sets are optimized for storing unique values and don't need to maintain index-based relationships like arrays do.

5. **Clean API**: The Set interface aligns perfectly with what systems need to do with entities:
```typescript
public addEntity(entity: Entity): void {
    if (this.shouldProcessEntity(entity)) {
        this.entities.add(entity);  // Simple, clear intent
    }
}

public removeEntity(entity: Entity): void {
    this.entities.delete(entity);   // Simple removal
}
```

If we were using an Array instead, we'd need additional checks:
```typescript
// With Array - less efficient
private entities: Entity[] = [];
public addEntity(entity: Entity): void {
    if (this.shouldProcessEntity(entity) && !this.entities.includes(entity)) {
        this.entities.push(entity);  // O(n) check before add
    }
}
```

The Set implementation is more elegant and efficient for the system's needs of maintaining a unique collection of entities that it needs to process.


## Ok, so what's behind the choice of a Map for storing Entity Components vs. a Set for storing System Entities?

The key difference in choosing Map vs Set comes down to how these collections are used in their respective contexts:

**Entity Components (Map)**
- Need key-value pairing: Each component type (key) maps to its specific component instance (value)
- Components are accessed by their type name: `entity.getComponent('PositionComponent')`
- Only one component of each type per entity
- Frequent lookups to check for and retrieve specific component types
```typescript
// Map is perfect for component lookup by type
private components: Map<string, Component>;
entity.getComponent<PositionComponent>('PositionComponent')
```

**System Entities (Set)**
- Just need a collection of unique entities
- No need for key-value relationships
- Don't need to look up entities by any key
- Just need to iterate over all entities and ensure uniqueness
```typescript
// Set is perfect for unique collection + iteration
protected entities: Set<Entity>;
this.entities.forEach(entity => this.processEntity(entity));
```

Think of it like:
- Entity Components are like a toolbelt where each slot (key) holds a specific tool (component)
- System Entities are like a group of people in a room - you just need to make sure each person is unique and be able to interact with all of them

The choice reflects the different access patterns:
- Components: "Get me the position component of this entity"
- Entities: "Process all these entities once, no duplicates"
