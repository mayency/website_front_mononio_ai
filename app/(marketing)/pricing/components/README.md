# Pricing Page Components

This directory contains additional components that can be integrated with the `PricingPageClient.tsx` to enhance the pricing page functionality.

## Available Components

### 1. PricingComparisonTable.tsx
A detailed, interactive feature comparison table that allows users to expand/collapse different categories of features.

**Features:**
- Expandable category sections
- Visual indicators for feature availability (checkmarks/X marks)
- Color-coded plan differentiation
- Call-to-action buttons for demos and sales contact

**Usage:**
```tsx
import PricingComparisonTable from './PricingComparisonTable';

// Add this component to your pricing page
<PricingComparisonTable />
```

### 2. PricingBenefits.tsx
A benefits section highlighting why customers should choose MONONIO AI over traditional agencies.

**Features:**
- 6 key benefit cards with icons
- Social proof statistics
- Hover animations and effects
- Call-to-action buttons

**Usage:**
```tsx
import PricingBenefits from './PricingBenefits';

// Add this component to your pricing page
<PricingBenefits />
```

### 3. PricingTestimonials.tsx
A carousel of customer testimonials with real savings data and ratings.

**Features:**
- Rotating testimonial carousel
- Customer avatars and company information
- Savings amounts displayed
- Star ratings
- Navigation controls and dot indicators

**Usage:**
```tsx
import PricingTestimonials from './PricingTestimonials';

// Add this component to your pricing page
<PricingTestimonials />
```

## Integration with PricingPageClient.tsx

To integrate these components into your existing pricing page, you can add them in strategic locations:

1. **After the pricing cards section** - Add `PricingComparisonTable`
2. **Before the FAQ section** - Add `PricingBenefits`
3. **After the FAQ section** - Add `PricingTestimonials`

### Example Integration:

```tsx
// In your PricingPageClient.tsx
import PricingComparisonTable from './components/PricingComparisonTable';
import PricingBenefits from './components/PricingBenefits';
import PricingTestimonials from './components/PricingTestimonials';

export default function PricingPageClient() {
  // ... existing code ...

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ... existing sections ... */}

      {/* Pricing Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        {/* ... existing pricing cards ... */}
      </section>

      {/* Add the new components here */}
      <PricingComparisonTable />
      <PricingBenefits />
      <PricingTestimonials />

      {/* ... rest of existing sections ... */}
    </div>
  );
}
```

## Styling Notes

All components are designed to match the existing dark theme and gradient styling of the pricing page. They use:
- Tailwind CSS for styling
- Consistent color scheme (indigo/purple gradients)
- Responsive design patterns
- Smooth animations and transitions
- Safari-compatible button styling

## Dependencies

These components require the following dependencies (already included in your project):
- React
- Lucide React (for icons)
- Tailwind CSS (for styling)

## Customization

Each component can be easily customized by:
- Modifying the data arrays (testimonials, benefits, features)
- Adjusting colors and gradients
- Changing animation timings
- Adding or removing features

The components are built with TypeScript for better type safety and maintainability.
