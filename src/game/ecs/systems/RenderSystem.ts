import { System } from './System';
import { Entity } from '../entities/Entity';
import { PositionComponent } from '../components/PositionComponent';
import { RenderComponent } from '../components/RenderComponent';
import Phaser from 'phaser';

export class RenderSystem extends System {
    private scene: Phaser.Scene;
    private tileSize: number;
    private sprites: Map<string, Phaser.GameObjects.Text>;
    private gridOffsetX: number = 50;
    private gridOffsetY: number = 50;

    constructor(scene: Phaser.Scene, tileSize: number) {
        super();
        this.scene = scene;
        this.tileSize = tileSize;
        this.sprites = new Map();
    }

    public update(): void {
        this.entities.forEach(entity => {
            const position = entity.getComponent<PositionComponent>('PositionComponent');
            const render = entity.getComponent<RenderComponent>('RenderComponent');
            
            if (position && render) {
                const sprite = this.sprites.get(entity.getId());
                if (sprite) {
                    sprite.setPosition(
                        this.gridOffsetX + position.getX() * this.tileSize + this.tileSize / 2,
                        this.gridOffsetY + position.getY() * this.tileSize + this.tileSize / 2
                    );
                }
            }
        });
    }

    protected shouldProcessEntity(entity: Entity): boolean {
        const shouldProcess = entity.hasComponent('PositionComponent') && entity.hasComponent('RenderComponent');
        console.log('RenderSystem: Checking if should process entity:', {
            id: entity.getId(),
            hasPosition: entity.hasComponent('PositionComponent'),
            hasRender: entity.hasComponent('RenderComponent'),
            shouldProcess
        });
        return shouldProcess;
    }

    public addEntity(entity: Entity): void {
        console.log('RenderSystem: Adding entity:', {
            id: entity.getId(),
            hasPosition: entity.hasComponent('PositionComponent'),
            hasRender: entity.hasComponent('RenderComponent')
        });
        
        if (this.shouldProcessEntity(entity)) {
            super.addEntity(entity);
            this.createSprite(entity);
        }
    }

    public removeEntity(entity: Entity): void {
        const sprite = this.sprites.get(entity.getId());
        if (sprite) {
            sprite.destroy();
            this.sprites.delete(entity.getId());
        }
        super.removeEntity(entity);
    }

    private createSprite(entity: Entity): void {
        const position = entity.getComponent<PositionComponent>('PositionComponent');
        const render = entity.getComponent<RenderComponent>('RenderComponent');

        if (position && render) {
            console.log('RenderSystem: Creating sprite for entity:', {
                id: entity.getId(),
                position: { x: position.getX(), y: position.getY() },
                symbol: render.getSymbol()
            });

            const sprite = this.scene.add.text(
                this.gridOffsetX + position.getX() * this.tileSize + this.tileSize / 2,
                this.gridOffsetY + position.getY() * this.tileSize + this.tileSize / 2,
                render.getSymbol(),
                {
                    fontSize: `${this.tileSize}px`,
                    color: render.getColor(),
                    align: 'center'
                }
            ).setOrigin(0.5);

            this.sprites.set(entity.getId(), sprite);
        }
    }
} 