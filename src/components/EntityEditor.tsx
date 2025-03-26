import React, { useState } from 'react';
import { Entity } from '../game/ecs/entities/Entity';
import { PositionComponent } from '../game/ecs/components/PositionComponent';
import { RenderComponent } from '../game/ecs/components/RenderComponent';

interface EntityEditorProps {
    onAddEntity: (entity: Entity) => void;
    gridWidth: number;
    gridHeight: number;
}

export const EntityEditor: React.FC<EntityEditorProps> = ({ onAddEntity, gridWidth, gridHeight }) => {
    const [entityType, setEntityType] = useState<'static' | 'mobile'>('static');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [symbol, setSymbol] = useState('🏠');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const entity = new Entity(`${entityType}-${Date.now()}`);
        entity.addComponent(new PositionComponent(entity.getId(), x, y));
        entity.addComponent(new RenderComponent(entity.getId(), symbol, '#ffffff'));
        
        console.log('EntityEditor: Creating new entity:', {
            id: entity.getId(),
            type: entityType,
            position: { x, y },
            symbol
        });
        
        onAddEntity(entity);
    };

    return (
        <div className="entity-editor">
            <h3>Add New Entity</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Type:
                        <select value={entityType} onChange={(e) => setEntityType(e.target.value as 'static' | 'mobile')}>
                            <option value="static">Static</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        X Position:
                        <input
                            type="number"
                            min="0"
                            max={gridWidth - 1}
                            value={x}
                            onChange={(e) => setX(parseInt(e.target.value))}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Y Position:
                        <input
                            type="number"
                            min="0"
                            max={gridHeight - 1}
                            value={y}
                            onChange={(e) => setY(parseInt(e.target.value))}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Symbol:
                        <input
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Entity</button>
            </form>
        </div>
    );
}; 