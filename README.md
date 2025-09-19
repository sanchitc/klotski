# Klotski - Classic Puzzle Game

A modern implementation of the classic Klotski sliding block puzzle game built with React, TypeScript, and Vite. The goal is to move the yellow hero block to the exit at the bottom of the board by sliding other blocks out of the way.

![Klotski Game](https://img.shields.io/badge/React-19.1.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.6-purple)

## 🎮 How to Play

### Objective
Move the **yellow hero block** (2×2) to the **exit** at the bottom of the board. The exit is marked by the orange indicator below the board.

### Game Rules
1. **Drag blocks** by clicking and dragging them with your mouse or touch
2. **Blocks can only move** in straight lines (up, down, left, right)
3. **Blocks cannot overlap** or move through other blocks
4. **The hero block** must reach the exit position to win
5. **Minimize moves** - try to solve the puzzle in as few moves as possible!

### Block Types
- **🟡 Hero Block (2×2)**: The main block you need to move to the exit
- **🔵 Vertical Blocks (1×2)**: Can only move up and down
- **🔵 Horizontal Blocks (2×1)**: Can only move left and right  
- **⚪ Single Blocks (1×1)**: Can move in any direction

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd klotski
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game!

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🏗️ Code Structure

### Project Architecture

```
src/
├── components/          # React components
│   ├── Block.tsx       # Individual block rendering
│   ├── Board.tsx       # Game board container
│   ├── HUD.tsx         # Heads-up display (moves, restart)
│   └── WinOverlay.tsx  # Victory screen
├── game/               # Game logic and state
│   ├── types.ts        # TypeScript type definitions
│   ├── classic.ts      # Classic Klotski puzzle setup
│   ├── useGame.ts      # Game state management hook
│   ├── useDrag.ts      # Drag and drop functionality
│   └── board.ts        # Board validation logic
└── styles/             # CSS styling
```

### Key Components

#### Block Structure
Each block is defined with the following properties:
```typescript
interface Block {
  id: string;        // Unique identifier (e.g., 'H', 'V1', 'S1')
  type: BlockType;   // 'HERO' | 'VERT_2' | 'HORIZ_2' | 'SINGLE'
  w: number;         // Width in grid cells
  h: number;         // Height in grid cells
  r: number;         // Top-left row position
  c: number;         // Top-left column position
}
```

#### Game State
```typescript
interface GameState {
  blocks: Block[];   // Array of all game blocks
  moves: number;     // Number of moves made
  isWon: boolean;    // Whether the game is won
}
```

#### Board Configuration
```typescript
interface BoardSpec {
  rows: number;      // Number of board rows (5)
  cols: number;      // Number of board columns (4)
  exit: {            // Exit position
    r: number;       // Exit row (beyond bottom edge)
    c: number;       // Exit column start
    w: number;       // Exit width
  };
}
```

### Classic Puzzle Layout

The classic Klotski puzzle uses a 5×4 grid with the following initial setup:

```
┌─────┬─────┬─────┬─────┐
│ V1  │  H  │  H  │ V2  │  Row 0
├─────┼─────┼─────┼─────┤
│ V1  │  H  │  H  │ V2  │  Row 1
├─────┼─────┼─────┼─────┤
│ V3  │ H1  │ H1  │ V4  │  Row 2
├─────┼─────┼─────┼─────┤
│     │ S1  │ S2  │     │  Row 3
├─────┼─────┼─────┼─────┤
│     │ H2  │ H2  │     │  Row 4
└─────┴─────┴─────┴─────┘
     Exit: [1,2] (below row 4)
```

**Legend:**
- `H` = Hero block (2×2, yellow)
- `V1-V4` = Vertical blocks (1×2, blue)
- `H1-H2` = Horizontal blocks (2×1, blue)
- `S1-S2` = Single blocks (1×1, gray)

## 🎯 Game Features

- **Touch & Mouse Support**: Works on both desktop and mobile devices
- **Smooth Animations**: Blocks slide smoothly with CSS transitions
- **Move Counter**: Track your progress with the move counter
- **Win Detection**: Automatic win detection when hero reaches exit
- **Restart Functionality**: Reset the puzzle at any time
- **Responsive Design**: Adapts to different screen sizes

## 🛠️ Development

### Technology Stack
- **React 19.1.1** - UI framework
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.6** - Build tool and dev server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **ESLint** - Code linting

### Key Hooks

#### `useGame()`
Manages the core game state including:
- Block positions and movements
- Move counting
- Win condition checking
- Game restart functionality

#### `useDrag()`
Handles drag and drop interactions:
- Pointer event management
- Collision detection
- Grid snapping
- Move validation

### Adding New Puzzles

To create a new puzzle layout:

1. **Define the board specification** in `src/game/classic.ts`:
   ```typescript
   export const NEW_BOARD: BoardSpec = {
     rows: 6,
     cols: 5,
     exit: { r: 6, c: 2, w: 1 }
   };
   ```

2. **Create block layout**:
   ```typescript
   export const NEW_BLOCKS: Block[] = [
     { id: 'H', type: 'HERO', w: 2, h: 2, r: 0, c: 1 },
     // ... other blocks
   ];
   ```

3. **Update the game hook** to use the new layout

## 🎨 Customization

### Styling
The game uses CSS custom properties for easy theming:
- `--cell`: Size of each grid cell
- `--board`: Total board width
- Colors are defined in the `Block.tsx` component

### Block Colors
Modify the `COLORS` object in `src/components/Block.tsx`:
```typescript
const COLORS: Record<Block['type'], string> = {
  HERO: '#fbbf24',    // Yellow
  VERT_2: '#60a5fa',  // Blue
  HORIZ_2: '#60a5fa', // Blue
  SINGLE: '#9ca3af'   // Gray
};
```

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with touch support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Tips for Solving

1. **Start with the hero block** - understand how it needs to move
2. **Clear the path** - move blocking pieces out of the way first
3. **Think ahead** - plan several moves in advance
4. **Use the single blocks** - they're the most flexible pieces
5. **Don't give up** - the classic puzzle can be solved in 81 moves!

---

**Happy puzzling! 🧩**