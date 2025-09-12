# System Flow Diagram: Three Core Features

## Visual System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  Safari Purple Frame Fix  │  Real-Time Calculator  │  LogoCloud │
│  • Button clicks          │  • Form interactions    │  • Scrolling│
│  • No purple highlights   │  • Live calculations    │  • Hover effects│
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT COMPONENT LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  PricingPageClient.tsx                                          │
│  ├── useState(showCalculator)                                   │
│  ├── useState(isVisible)                                        │
│  ├── useEffect() for animations                                 │
│  └── Conditional rendering                                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT INTEGRATION                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Safari Fix     │  │  Calculator     │  │  LogoCloud      │  │
│  │  • CSS overrides│  │  • Form state   │  │  • Logo array   │  │
│  │  • Inline styles│  │  • Calculations │  │  • Animations   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STYLING & ANIMATION LAYER                    │
├─────────────────────────────────────────────────────────────────┤
│  app/globals.css                                                │
│  ├── Safari-specific CSS fixes                                  │
│  ├── Animation keyframes                                        │
│  └── Responsive design classes                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER RENDERING LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│  • HTML DOM updates                                             │
│  • CSS animations execution                                     │
│  • JavaScript state management                                  │
│  • User interaction handling                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Feature-Specific Flow Diagrams

### 1. Safari Purple Frame Fix Flow
```
User Clicks Button
        │
        ▼
┌───────────────┐
│ CSS Override  │ ← Global CSS loads first
│ Applied       │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Inline Styles │ ← Component-level backup
│ Applied       │
└───────────────┘
        │
        ▼
┌───────────────┐
│ No Purple     │ ← Visual result
│ Highlights    │
└───────────────┘
```

### 2. Real-Time Savings Calculator Flow
```
User Clicks "Calculate Your Savings"
        │
        ▼
┌───────────────┐
│ State Change  │ ← setShowCalculator(true)
│ Triggered     │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Component     │ ← Conditional rendering
│ Mounts        │
└───────────────┘
        │
        ▼
┌───────────────┐
│ User Inputs   │ ← Form interactions
│ Data          │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Real-time     │ ← State updates
│ Calculations  │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Results       │ ← Visual feedback
│ Displayed     │
└───────────────┘
```

### 3. LogoCloud Component Flow
```
Page Loads
        │
        ▼
┌───────────────┐
│ Component     │ ← Renders at bottom
│ Renders       │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Images Load   │ ← Next.js optimization
│ (12 logos)    │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Animation     │ ← CSS keyframes
│ Starts        │
└───────────────┘
        │
        ▼
┌───────────────┐
│ Smooth        │ ← Infinite loop
│ Scrolling     │
└───────────────┘
```

## Data Flow Summary

### State Management
```typescript
// PricingPageClient.tsx
const [showCalculator, setShowCalculator] = useState(false);
const [isVisible, setIsVisible] = useState(false);

// useEffect for animations
useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 100);
  return () => clearTimeout(timer);
}, []);
```

### Component Communication
```
PricingPageClient
├── Navbar (imported)
├── SavingsCalculator (conditional)
│   ├── mode="inline"
│   └── onClose={() => setShowCalculator(false)}
└── LogoCloud (always rendered)
```

### CSS Integration
```
globals.css
├── Safari fixes (*, button, input selectors)
├── Animation keyframes (@keyframes scroll-logos)
└── Responsive classes (sm:, md:, lg:)
```

## Performance Considerations

### Optimization Strategies
1. **Conditional Rendering**: Calculator only loads when needed
2. **Image Optimization**: Next.js Image component for logos
3. **CSS Animations**: Hardware-accelerated transforms
4. **State Management**: Efficient React hooks usage
5. **Bundle Splitting**: Components loaded on demand

### Memory Management
- Calculator component unmounts when closed
- Logo images are optimized and cached
- CSS animations use transform (GPU accelerated)
- No memory leaks from event listeners

## Error Handling

### Graceful Degradation
1. **Safari Fix**: CSS fallbacks for older browsers
2. **Calculator**: Error boundaries for form validation
3. **LogoCloud**: Image loading fallbacks
4. **Animations**: Reduced motion support

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
