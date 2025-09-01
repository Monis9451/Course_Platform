# Course Platform Development Log

## Date: September 1, 2025

### Feature Addition: Description with Image Component & Info Card Pair Component

#### Summary
Added two new components to the course creation system:
1. **Description with Image Box** - Interactive content sections with images, descriptions, and input fields
2. **Info Card Pair** - Two-column informational cards with icons and content, designed for half-width rendering

#### Changes Made

1. **New Component Creation**
   - Created `DescriptionWithImageBox.jsx` in `/src/components/course-components/`
   - Component renders a styled box with:
     - Customizable title and box title
     - Image upload and display
     - Description text below image
     - Input field for terms/definitions
     - Responsive grid layout

   - Created `InfoCardPair.jsx` in `/src/components/course-components/`
   - Component renders two informational cards with:
     - Customizable titles for each card
     - Selectable icons (heart, lightbulb, star, info, check)
     - Multi-paragraph content support
     - Half-width responsive layout
     - Professional card styling with borders

2. **Component Integration**
   - Added both components to `/src/components/course-components/index.js`
   - Added new component types `DESCRIPTION_WITH_IMAGE_BOX` and `INFO_CARD_PAIR`
   - Registered both components in componentLibrary with default data structures
   - Modified rendering logic to treat `INFO_CARD_PAIR` as half-width like `LEFT_BORDER_BOX`

3. **Admin Interface Updates**
   - Added both components to allowed components list in `AddCourse.jsx`
   - **Description with Image Box** controls:
     - Section title input
     - Box title input
     - Image upload functionality
     - Alt text field
     - Description text field
     - Term label customization
     - Placeholder text customization
   - **Info Card Pair** controls:
     - Section title input
     - Two separate card configuration sections
     - Title input for each card
     - Icon selection dropdown (5 options)
     - Multi-line content textarea for each card
     - Real-time preview updates

4. **Half-Width Rendering System**
   - Modified preview rendering logic in `AddCourse.jsx`
   - `INFO_CARD_PAIR` now renders as half-width like `LEFT_BORDER_BOX`
   - Supports side-by-side placement with other half-width components
   - Maintains responsive behavior on different screen sizes

#### Component Features

**Description with Image Box:**
- **Styling**: Matches existing design system with border styling (#f7f1e9 outer, #bd6334 dashed inner)
- **Image Handling**: Supports image upload through existing cloudinary integration
- **Accessibility**: Includes alt text field for images
- **Flexibility**: All text fields are customizable by instructors
- **Responsive**: Uses CSS Grid for proper layout

**Info Card Pair:**
- **Layout**: Two-column card layout with consistent spacing
- **Icons**: 5 customizable SVG icons with brand color (#bd6334)
- **Content**: Supports multi-paragraph content with automatic line break handling
- **Styling**: Clean white cards with subtle borders matching design system
- **Responsive**: Stacks on mobile, side-by-side on desktop
- **Half-Width**: Designed to take 50% width and pair with other half-width components

#### Default Configurations

**Description with Image Box:**
```javascript
{
  title: 'Description with Image Section',
  boxTitle: 'Your Body Map',
  description: 'Description',
  imageUrl: '/img.jpg',
  alt: 'Image',
  termLabel: 'Term:',
  termPlaceholder: 'Describe answer...'
}
```

**Info Card Pair:**
```javascript
{
  title: 'Info Card Pair Section',
  card1Title: 'First Card Title',
  card1Content: 'Content for the first card goes here. This can be multiple paragraphs of information.',
  card1Icon: 'heart',
  card2Title: 'Second Card Title',
  card2Content: 'Content for the second card goes here. This can also be multiple paragraphs of information.',
  card2Icon: 'lightbulb'
}
```

#### Technical Details
- Component follows existing architecture patterns
- Integrates with file upload system
- Uses consistent styling classes
- Maintains compatibility with preview system
- Supports validation and error handling

#### Files Modified
1. `/src/components/course-components/DescriptionWithImageBox.jsx` (new)
2. `/src/components/course-components/InfoCardPair.jsx` (new)
3. `/src/components/course-components/index.js` (updated)
4. `/src/pages/AddCourse.jsx` (updated)

#### Testing Recommendations
- Verify both components appear in component library
- Test image upload functionality for Description with Image Box
- Confirm text customization works for both components
- Test icon selection for Info Card Pair
- Check responsive layouts on different screen sizes
- Validate half-width rendering behavior
- Test side-by-side placement of half-width components
- Validate preview rendering for both components
- Test save/load functionality

#### Impact
- Expands content creation capabilities for instructors
- **Description with Image Box**: Enables structured format for image-based learning content and body mapping exercises
- **Info Card Pair**: Provides professional two-column information presentation
- Both components maintain consistency with existing component system
- Half-width rendering system allows for flexible page layouts
- General naming makes components reusable across different course topics

#### Next Steps
- Monitor usage and gather feedback for both components
- Consider additional icon options for Info Card Pair
- Evaluate need for more half-width component types
- Review accessibility compliance for both components
- Consider adding color theme options
