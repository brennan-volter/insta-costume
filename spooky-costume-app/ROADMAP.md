# Spooky Costume App - Product Roadmap

## Vision
A commercial-grade AI-powered costume portrait generator that allows users to transform themselves into any character they can imagine. The app emphasizes reusability, organization, and social sharing through features like person management, output galleries, and group selfies.

---

## Current Status ✅

### Completed (Phase 1)
- [x] Basic React + TypeScript + Vite setup
- [x] Tailwind CSS styling
- [x] Subscribe.dev integration with authentication
- [x] Single costume portrait workflow
  - Upload selfie (optional)
  - Enter costume description
  - Generate AI portrait
- [x] User management (sign in/out)
- [x] Credits tracking and subscription management
- [x] Comprehensive error handling
- [x] Responsive UI with loading states
- [x] Image preview and download functionality

---

## Phase 2: Landing Page & Multi-Language Support 🚧

**📱 CRITICAL: Mobile-First Design**
- 83% of landing page visits happen on mobile
- Design for 375px screens first, then scale up
- Target: <3 second page load time
- See `LANDING_PAGE_RESEARCH.md` for comprehensive best practices

### Landing Page Structure
Replace the current sign-in screen with a full commercial landing page at root (`/`)

#### Design Principles:
- **Mobile-first**: Design for mobile screens first (375px), enhance for desktop
- **Performance**: Page load <3 seconds (critical for conversion)
- **Conversion-focused**: Single clear path to sign-up
- **Spooky-fun tone**: Halloween-themed but approachable and modern

#### Components:
1. **Hero Section**
   - Eye-catching headline: specific, benefit-focused (e.g., "Transform Into Any Character with AI")
   - Sub-headline: Brief explanation of value
   - Primary CTA: "Create My Costume Portrait" (specific > generic)
   - Visual: Transformation showcase (before/after or animated carousel)
   - Multi-language selector in header (🌐 icon)
   - **Mobile**: Stack vertically, full-width CTA button, 16px+ font size

2. **Example Gallery**
   - Grid: 3 columns desktop, 2 columns mobile
   - 6-9 curated best examples (quality > quantity)
   - Lazy loading for performance
   - WebP format, compressed images
   - Desktop: Hover effects reveal details
   - Mobile: Tap to expand/view details

3. **How It Works** (3-Step Process)
   - Step 1: Upload your selfie (optional but recommended)
   - Step 2: Describe any costume you can imagine
   - Step 3: Download your portrait in seconds
   - Numbered steps with clear icons
   - Brief copy: 1-2 sentences per step
   - **Mobile**: Vertical stack layout

4. **FAQ Section**
   - Accordion/collapsible design (all collapsed by default)
   - 6-8 essential questions:
     - "Do I need a selfie?"
     - "How many credits does it cost?" (5 credits per generation)
     - "Can I use these images commercially?"
     - "What makes a good costume description?"
     - "How long does generation take?"
     - "What if I don't like my result?"
     - "Is my photo data secure?"
   - Friendly, conversational tone
   - **Mobile**: Full-width touch targets (44px+ height)

5. **Final CTA Section**
   - Repeat value prop: "Ready to transform into your dream character?"
   - Remove final objection: "Start free. No credit card required."
   - Large CTA button (20-30% bigger than other buttons)
   - Optional social proof
   - **Mobile**: Full-width button, prominent placement

### Multi-Language Support
- **Languages**: English, Spanish, French
- **Implementation**:
  - Use `react-i18next` for translations
  - Language detection: User-selected via dropdown in header
  - Persist language preference in localStorage
  - Translate all UI text, button labels, FAQ content
  - Keep costume descriptions in user's input language (don't translate user input)

### Technical Stack for Phase 2
- React Router for navigation (`/` landing, `/app` workflow)
- `react-i18next` + `i18next` for internationalization
- Translation JSON files: `en.json`, `es.json`, `fr.json`
- Design inspiration: TBD (user will provide reference sites)

---

## Phase 3: Person Management System 👤

### Goal
Allow users to create reusable "person" profiles so they don't have to re-upload selfies every time.

### Features:
- **Person Creation**
  - Name/label for each person
  - Upload and store selfie
  - Edit/delete person profiles
  - Set default person (optional)

- **Person Selection in Workflow**
  - Dropdown or card selector: "Choose a person" or "Upload new selfie"
  - Show thumbnail preview of selected person
  - Quick access to frequently used persons

- **Storage**
  - Use `useStorage` from @subscribe.dev/react for cloud sync
  - Store person data structure:
    ```typescript
    interface Person {
      id: string;
      name: string;
      selfieBase64: string;
      createdAt: timestamp;
      usageCount: number;
    }
    ```
  - Sync across devices for logged-in users

### UI Components:
- Person management page/modal
- Person selector component in workflow
- "Manage People" button in header/settings

---

## Phase 4: Output History & Gallery 🖼️

### Goal
Save all generated portraits so users can browse, download, and reuse previous generations.

### Features:
- **Output Storage**
  - Automatically save every successful generation
  - Store metadata:
    ```typescript
    interface OutputHistory {
      id: string;
      imageUrl: string;
      costumeDescription: string;
      personUsed?: string; // Person ID if applicable
      createdAt: timestamp;
      credits: number;
    }
    ```
  - Use @subscribe.dev/react `useStorage` for cloud sync

- **Gallery View**
  - Grid layout showing all previous generations
  - Filter/sort options:
    - By date (newest/oldest)
    - By person used
    - By costume type (if we categorize)
  - Search by costume description
  - Hover to see full details (date, credits used, etc.)

- **Actions on Outputs**
  - Download individual images
  - Delete from history
  - "Recreate" button → loads same settings into workflow
  - Share functionality (future: social media sharing)

### Storage Strategy:
- Use Subscribe.dev storage for metadata
- Image URLs stored (already hosted by subscribe.dev)
- Pagination for large galleries

---

## Phase 5: Group Selfie Workflow 👥📸

### Goal
Second workflow that combines two previously generated costume portraits into a "group selfie" scene.

### Workflow ID
- `workflow/[TBD - second workflow ID from subscribe.dev]`

### Features:
- **Input Selection**
  - Select 2 previous outputs from gallery
  - Preview both selections side-by-side
  - Optional: Additional customization (scene, pose, etc.)

- **Generation**
  - Combine both costume characters
  - Generate a scene where both characters are "taking a selfie together"
  - Same credit system and error handling

- **Output**
  - Save to gallery like other outputs
  - Tag as "group selfie" for filtering
  - Show source images in metadata

### UI Flow:
1. New tab/page: "Group Selfie"
2. "Select Character 1" → opens gallery modal
3. "Select Character 2" → opens gallery modal
4. Preview both characters
5. "Generate Group Selfie" button
6. Show result with download/save options

### Technical Considerations:
- Reuse existing gallery component for selection
- New workflow component similar to WorkflowComponent
- Shared error handling and loading states

---

## Phase 6: Polish & Optimization 🎨

### Design & UX
- Design inspiration from reference websites (TBD)
- Consistent spooky-fun theme throughout
- Animations and transitions
- Mobile optimization and testing
- Accessibility improvements (ARIA labels, keyboard navigation)

### Performance
- Image optimization (lazy loading in gallery)
- Code splitting for faster initial load
- Optimize bundle size
- Progressive Web App (PWA) features?

### Analytics & Monitoring
- Track generation success rate
- Popular costume types
- User retention metrics
- Error tracking

---

## Phase 7: Future Enhancements 🚀

### Potential Features:
- **Social Sharing**
  - One-click share to social media
  - Generate shareable links
  - Watermark option

- **Advanced Customization**
  - Style presets (realistic, cartoon, vintage)
  - Background selection
  - Lighting/mood adjustments

- **Community Features**
  - Public gallery of best generations
  - Costume idea suggestions from community
  - Voting/favorites system

- **Subscription Tiers**
  - Free tier: Limited generations
  - Pro tier: Unlimited generations, HD outputs
  - Business tier: Commercial usage rights

- **Additional Workflows**
  - Full-body costume generation
  - Video transformations
  - Couple/family portraits (3+ people)

---

## Technical Architecture

### Current Stack:
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend/Auth**: Subscribe.dev
- **AI Workflows**: Subscribe.dev workflows
  - Single portrait: `workflow/6b5a15ea-9961-4a24-b68e-bbfba9adf95d`
  - Group selfie: TBD

### Planned Additions:
- **Routing**: React Router v6
- **i18n**: react-i18next
- **State Management**: React Context (or Zustand if needed)
- **Storage**: Subscribe.dev useStorage hook

### File Structure (Planned):
```
src/
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── ExampleGallery.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── workflow/
│   │   ├── SinglePortrait.tsx
│   │   ├── GroupSelfie.tsx
│   │   └── WorkflowShared.tsx
│   ├── person/
│   │   ├── PersonManager.tsx
│   │   ├── PersonSelector.tsx
│   │   └── PersonCard.tsx
│   ├── gallery/
│   │   ├── OutputGallery.tsx
│   │   ├── OutputCard.tsx
│   │   └── GalleryFilters.tsx
│   └── shared/
│       ├── Header.tsx
│       ├── LanguageSelector.tsx
│       └── UserMenu.tsx
├── locales/
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── hooks/
│   ├── usePersons.ts
│   ├── useOutputHistory.ts
│   └── useWorkflow.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## Success Metrics

### Key Performance Indicators:
- User sign-ups
- Generation completion rate
- Average generations per user
- Subscription conversion rate
- User retention (7-day, 30-day)
- Gallery engagement (views, downloads)
- Language distribution of users

---

## Timeline (Estimated)

- **Phase 2** (Landing + i18n): 1-2 days
- **Phase 3** (Person Management): 1-2 days
- **Phase 4** (Gallery): 1-2 days
- **Phase 5** (Group Selfies): 1 day
- **Phase 6** (Polish): Ongoing

**Total MVP with all core features**: ~1 week of focused development

---

## Notes

- **Mobile-first is mandatory**: 83% of users are on mobile - design for mobile first, always
- Design research completed (see `LANDING_PAGE_RESEARCH.md`)
- Design references TBD (user will provide specific sites for inspiration)
- Second workflow ID needed from subscribe.dev for group selfie feature
- All user data syncs via Subscribe.dev storage
- Maintain spooky-fun Halloween aesthetic throughout
- Keep code modular and well-documented for future developers
- Focus on user experience and ease of use
- Performance target: <3 second page load time

---

**Last Updated**: October 21, 2025
**Current Phase**: Phase 1 Complete, Starting Phase 2
