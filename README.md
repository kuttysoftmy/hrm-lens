# HRM-Lens

HRM-Lens is an interactive visual debugger and playground designed specifically for Hierarchical Reasoning Models (HRM). Standard linear Chain-of-Thought (CoT) tools fail to capture the branching, multi-level nature of HRMs. HRM-Lens allows developers to visualize and debug dynamic goal trees, adjust model attention weights, step through execution frames, and inject simulated environmental anomalies to test hierarchical planning resilience.

## Tech Stack
- **Frontend**: React (with Vite setup)
- **Styling**: Tailwind CSS for a modern, dark developer dashboard style
- **Icons**: Lucide React
- **Visualization**: Custom interactive SVG-based hierarchical tree layout with multi-level zoom, real-time node state indicators, and active layer heatmaps.

## Key Features
1. **Dynamic Tree Canvas**: Visualizes three distinct layers: high-level intent/goals, medium-level subgoals, and low-level action sequences.
2. **Time-Travel Debugger**: Step forward and backward through reasoning iterations, or auto-play with adjustable FPS controls.
3. **Event Injector**: Simulate external changes (e.g., "API Rate Limit Triggered", "User Cancelled Command", "Partial Success") to observe real-time hierarchical re-planning (dynamic node pruning and spawning).
4. **Cognitive Weight Playground**: Tune decay factors, goal persistence thresholds, and layer-to-layer attention parameters using sliders, showing simulated token costs and decision metrics dynamically.
5. **State Inspector**: Click any node to drill down into its prompt context, execution confidence, raw log payload, and output tokens.