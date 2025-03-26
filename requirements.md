## React-Phaser Roguelike ECS Framework - Project Overview

This document outlines the requirements for building a flexible starting framework for 2d grid-based, turn-based web games.

## Starting Template

This project has been scaffolded using the React Phaser Typescript template: https://github.com/phaserjs/template-react-ts

An overview of the structure of this template and features available can be found in the local file ./phaser-template.md

Existing folders and files used in this started template can be adapted or removed as needed

## Initial Feature Requirements

- A square grid based, tile based, bounded map 
- A player character with movement controllable in 2 axes with WASD
- An entity-component system allowing for as broad based control as possible of all entity properties and interactions
- A basic interface on the React side allowing for creation and x,y placement of static (scenery) and mobile (adversary / npc) entities 
- A turn-based game loop integrating player movement and random adversary / npc movement

## Guidelines

- Basic map tiles can be generated using classic roguelike text character conventions
- All character / entity / scenery sprites can currently use emojis as placeholders
- The aim of the framework is to allow quick and flexible development, at the same time as increasingly deep and complex interaction
- To achieve this, the entity-component system will be key. It should allow for entities to be flexibly modified, extended and associated
- The React interface for this initial version should be focused on development and testing, rather than final polished game controls
- We're making a development frameworka and experiment editor rather than a final game release 