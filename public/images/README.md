# Image Assets Guide

## Where to Place Your Images:

### Hero Images (Full-screen backgrounds)
- `public/images/heroes/savannah-hero.jpg` - Homepage
- `public/images/heroes/diani-beach.jpg` - Diani Beach page
- `public/images/heroes/maasai-mara.jpg` - Maasai Mara page
- `public/images/heroes/mount-kenya.jpg` - Mount Kenya page
- `public/images/heroes/lamu-old-town.jpg` - Lamu page

### Destination Cards (Grid view)
- `public/images/destinations/card-maasai-mara.jpg`
- `public/images/destinations/card-diani-beach.jpg`
- `public/images/destinations/card-mount-kenya.jpg`
- `public/images/destinations/card-lamu.jpg`

### Team Photos
- `public/images/team/amara.jpg`
- `public/images/team/james.jpg`
- `public/images/team/fatima.jpg`
- `public/images/team/david.jpg`

## Image Recommendations:
- **Format**: Use WebP for best performance, or JPG
- **Size**: 
  - Hero images: 1920x1080px (max 500KB)
  - Card images: 800x600px (max 200KB)
  - Team photos: 400x400px (max 100KB)
- **Optimization**: Use tools like TinyPNG or Squoosh.app

## How to Reference in Code:
```tsx
// In your components/pages:
<Image 
  src="/images/heroes/savannah-hero.jpg" 
  alt="Description" 
  fill 
  priority 
/>
```
