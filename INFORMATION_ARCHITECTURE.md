# Information Architecture

## Documentation Site Structure

### Navigation Hierarchy

```
ERP Components Bible
├── Getting Started
│   ├── Overview (index.html)
│   ├── Design Principles
│   ├── Color System
│   ├── Typography
│   └── Spacing & Layout
│
├── Components (Alphabetical)
│   ├── AutoComplete
│   ├── Button
│   ├── Calendar
│   ├── Checkbox
│   ├── Dropdown
│   ├── Header
│   ├── InlineMessage
│   ├── InputSwitch
│   ├── InputText ⭐ (Example)
│   ├── Modal
│   ├── SearchBox
│   └── Tag
│
├── Visual Styles
│   ├── Borders & Radius
│   ├── Shadows
│   └── Elevation
│
└── Patterns
    ├── Interaction Patterns
    └── Accessibility
```

## Sidebar Categories (Alphabetical Order)

### 1. Getting Started
**Purpose:** Foundation documentation for understanding the design system

**Pages:**
- Overview - Introduction and quick start
- Design Principles - Core design philosophy
- Color System - Complete color palette and usage
- Typography - Font system and text styles
- Spacing & Layout - Spacing scale and layout rules

### 2. Components
**Purpose:** Individual component documentation

**Organization:** Alphabetical listing for easy scanning

**Components:**
1. AutoComplete
2. Button
3. Calendar
4. Checkbox
5. Dropdown
6. Header
7. InlineMessage
8. InputSwitch
9. InputText (Example implementation)
10. Modal
11. SearchBox
12. Tag

### 3. Visual Styles
**Purpose:** Visual design tokens and styling guidelines

**Pages:**
- Borders & Radius - Border styles and radius values
- Shadows - Shadow system and elevation
- Elevation - Layering and depth system

### 4. Patterns
**Purpose:** Interaction and accessibility patterns

**Pages:**
- Interaction Patterns - Common interaction behaviors
- Accessibility - WCAG compliance and accessibility guidelines

## Page Hierarchy

### Level 1: Category Pages
- Getting Started pages
- Visual Styles pages
- Patterns pages

### Level 2: Component Pages
- Individual component documentation
- Follow standardized template structure

## Component Documentation Template Structure

Every component page includes:

1. **Overview**
   - Purpose
   - When to use
   - When not to use

2. **Variants**
   - All supported variants
   - Visual differentiation
   - Use case for each variant

3. **Usage Guidelines**
   - For Designers
     - Visual design rules
     - Layout considerations
     - Content guidelines
   - For Developers
     - Implementation notes
     - Props API table
     - Events table

4. **Accessibility Considerations**
   - Keyboard interaction table
   - Screen reader behavior
   - Contrast and focus rules

5. **Spacing and Layout**
   - Padding specifications
   - Margin specifications
   - Alignment rules
   - Dimension constraints

6. **Usage Examples**
   - Common Pattern 1
   - Common Pattern 2
   - Edge Case 1

7. **Code Snippets**
   - Basic usage
   - With validation
   - With custom styling

8. **Related Components**
   - Links to related components

9. **References**
   - PrimeVue documentation links
   - Design system references

## Navigation Features

### Sidebar
- **Persistent:** Always visible on desktop
- **Sticky Header:** Sidebar title stays at top when scrolling
- **Alphabetical Ordering:** Components listed alphabetically
- **Active State:** Current page highlighted
- **Scrollable:** Handles long navigation lists

### Breadcrumbs
- Not implemented (can be added if needed)

### Search
- Not implemented (can be added if needed)

## Scalability Considerations

### Adding New Components
1. Create new HTML file in `components/` directory
2. Follow `components/template.md` structure
3. Add link to sidebar navigation in alphabetical order
4. Update this information architecture document

### Adding New Categories
1. Create new section in sidebar
2. Add pages to appropriate directory
3. Update navigation in all HTML files
4. Maintain alphabetical ordering within categories

## File Naming Conventions

- **HTML files:** lowercase with hyphens (e.g., `inputtext.html`)
- **Component directories:** lowercase (e.g., `components/`)
- **CSS files:** lowercase with hyphens (e.g., `main.css`)
- **JavaScript files:** lowercase with hyphens (e.g., `navigation.js`)

## URL Structure

```
/                           → index.html (Overview)
/pages/design-principles.html
/pages/color-system.html
/components/inputtext.html
/components/button.html
...
```

## Mobile Considerations

- Sidebar collapses on mobile (< 1024px)
- Navigation accessible via hamburger menu (can be implemented)
- Content remains fully accessible
- Touch-friendly interaction targets

