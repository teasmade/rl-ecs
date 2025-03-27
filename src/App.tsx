import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { GameScene } from './game/scenes/GameScene';
import { EntityEditor } from './components/EntityEditor';
import { Entity } from './game/ecs/entities/Entity';
import './App.css';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    parent: 'game-container',
    scene: GameScene,
    backgroundColor: '#000000'
};

function App() {
    const gameRef = useRef<Phaser.Game | null>(null);
    const gameSceneRef = useRef<GameScene | null>(null);
    const [isGameReady, setIsGameReady] = useState(false);

    useEffect(() => {
        if (!gameRef.current) {
            gameRef.current = new Phaser.Game(config);
            
            // Wait for the game to be ready
            gameRef.current.events.once('ready', () => {
                console.log('Game is ready');
                gameSceneRef.current = gameRef.current?.scene.getScene('GameScene') as GameScene;
                setIsGameReady(true);
            });
        }

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    const handleAddEntity = (entity: Entity) => {
        console.log('App: handleAddEntity called', { isGameReady, hasScene: !!gameSceneRef.current });
        if (isGameReady && gameSceneRef.current) {
            gameSceneRef.current.addEntity(entity);
        } else {
            console.warn('Cannot add entity: Game not ready or scene not available');
        }
    };

    return (
        <div className="app">
            <div id="game-container" className="game-container" />
            <div className="editor-container">
                <EntityEditor
                    onAddEntity={handleAddEntity}
                    gridWidth={20}
                    gridHeight={17}
                />
            </div>
        </div>
    );
}

export default App;
