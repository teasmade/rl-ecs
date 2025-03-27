import Phaser from 'phaser';
import { World } from '../ecs/World';
import { MovementSystem } from '../ecs/systems/MovementSystem';
import { RenderSystem } from '../ecs/systems/RenderSystem';
import { Entity } from '../ecs/entities/Entity';
import { PositionComponent } from '../ecs/components/PositionComponent';
import { RenderComponent } from '../ecs/components/RenderComponent';

export class GameScene extends Phaser.Scene {
    private world: World;
    private movementSystem: MovementSystem;
    private renderSystem: RenderSystem;
    private player: Entity;
    private gridWidth: number = 20;
    private gridHeight: number = 20;
    private tileSize: number = 32;
    private gridOffsetX: number = 50; // Space for Y-axis labels
    private gridOffsetY: number = 50; // Space for X-axis labels

    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Draw grid and labels
        this.drawGrid();
        this.drawCoordinateLabels();

        // Initialize ECS
        this.world = new World();
        
        // Create systems
        this.movementSystem = new MovementSystem(this.gridWidth, this.gridHeight);
        this.renderSystem = new RenderSystem(this, this.tileSize);
        
        // Add systems to world
        this.world.addSystem(this.movementSystem);
        this.world.addSystem(this.renderSystem);

        // Create player
        this.player = new Entity('player');
        this.player.addComponent(new PositionComponent('player', 10, 10));
        this.player.addComponent(new RenderComponent('player', '👤', '#ffffff'));
        this.world.addEntity(this.player);

        // Set up input handling
        if (this.input.keyboard) {
            this.input.keyboard.on('keydown-W', () => this.movementSystem.moveEntity(this.player, 0, -1));
            this.input.keyboard.on('keydown-S', () => this.movementSystem.moveEntity(this.player, 0, 1));
            this.input.keyboard.on('keydown-A', () => this.movementSystem.moveEntity(this.player, -1, 0));
            this.input.keyboard.on('keydown-D', () => this.movementSystem.moveEntity(this.player, 1, 0));
        }
    }

    private drawGrid(): void {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x333333);

        // Draw vertical lines
        for (let x = 0; x <= this.gridWidth; x++) {
            const xPos = this.gridOffsetX + x * this.tileSize;
            graphics.moveTo(xPos, this.gridOffsetY);
            graphics.lineTo(xPos, this.gridOffsetY + this.gridHeight * this.tileSize);
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.gridHeight; y++) {
            const yPos = this.gridOffsetY + y * this.tileSize;
            graphics.moveTo(this.gridOffsetX, yPos);
            graphics.lineTo(this.gridOffsetX + this.gridWidth * this.tileSize, yPos);
        }

        graphics.strokePath();
    }

    private drawCoordinateLabels(): void {
        // Draw X-axis labels (numbers)
        for (let x = 0; x < this.gridWidth; x++) {
            this.add.text(
                this.gridOffsetX + x * this.tileSize + this.tileSize / 2,
                this.gridOffsetY - 30,
                x.toString(),
                {
                    color: '#666666',
                    fontSize: '16px'
                }
            ).setOrigin(0.5);
        }

        // Draw Y-axis labels (numbers)
        for (let y = 0; y < this.gridHeight; y++) {
            this.add.text(
                this.gridOffsetX - 30,
                this.gridOffsetY + y * this.tileSize + this.tileSize / 2,
                y.toString(),
                {
                    color: '#666666',
                    fontSize: '16px'
                }
            ).setOrigin(0.5);
        }
    }

    update(time: number, delta: number) {
        this.world.update(delta);
    }

    public addEntity(entity: Entity): void {
        console.log('GameScene: Adding entity to world:', {
            id: entity.getId(),
            hasPosition: entity.hasComponent('PositionComponent'),
            hasRender: entity.hasComponent('RenderComponent')
        });
        this.world.addEntity(entity);
    }
} 