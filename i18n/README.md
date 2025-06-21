# Internationalization (i18n) System

This project uses `react-i18next` for internationalization support with Turkish and English languages.

## File Structure

```
i18n/
├── config.ts          # i18n configuration
├── translations/
│   ├── en/
│   │   └── index.json # English translations
│   └── tr/
│       └── index.json # Turkish translations (default)
└── README.md
```

## Usage

### 1. Import useTranslation Hook

```typescript
import { useTranslation } from "react-i18next";

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("teachers.form.title")}</h1>
      <p>{t("teachers.form.description")}</p>
    </div>
  );
}
```

### 2. Using Translation Keys

The translation system supports nested keys using dot notation:

```typescript
// Simple text
{
  t("common.loading");
} // "Yükleniyor..." / "Loading..."

// Nested objects
{
  t("teachers.form.title");
} // "Öğretmen Bilgileri" / "Teacher Information"
{
  t("teachers.actions.save");
} // "Kaydet" / "Save"

// Form placeholders
{
  t("teachers.form.placeholders.email");
} // "ornek@email.com" / "example@email.com"
```

### 3. Language Switching

The default language is Turkish (`tr`). You can change language using:

```typescript
const { i18n } = useTranslation();

// Switch to English
i18n.changeLanguage("en");

// Switch to Turkish
i18n.changeLanguage("tr");
```

## Available Translation Categories

### Common UI Elements

- `common.*` - General UI elements (loading, save, cancel, etc.)
- `breadcrumbs.*` - Navigation breadcrumbs
- `forms.validation.*` - Form validation messages

### Module-Specific Translations

#### Teachers Module

- `teachers.title` - Page title
- `teachers.form.*` - Form labels and placeholders
- `teachers.actions.*` - Action buttons and confirmations
- `teachers.messages.*` - Success/error messages
- `teachers.table.*` - Table column headers

#### Students Module

- `students.title` - Page title
- `students.form.*` - Form labels and placeholders
- `students.actions.*` - Action buttons and confirmations
- `students.messages.*` - Success/error messages
- `students.table.*` - Table column headers

#### Firms Module

- `firms.title` - Page title
- `firms.table.*` - Table column headers

### Utility Translations

- `gender.*` - Gender options (male, female, etc.)
- `roles.*` - User role names
- `errors.*` - Error pages and messages

## Example Implementation

Here's how the teacher edit form uses translations:

```typescript
// Form title
<CardTitle>{t("teachers.form.editTitle")}</CardTitle>

// Form fields
<Label htmlFor="name">{t("teachers.form.name")}</Label>
<Input
  placeholder={t("teachers.form.placeholders.name")}
  // ...
/>

// Actions
<Button type="submit" disabled={saving}>
  {saving ? t("teachers.actions.saving") : t("teachers.actions.save")}
</Button>

// Error handling
alert(t("teachers.messages.updateError"));

// Confirmation dialogs
if (window.confirm(t("teachers.actions.confirmDelete"))) {
  // delete action
}
```

## Adding New Translations

### 1. Add to Turkish file (`i18n/translations/tr/index.json`)

```json
{
  "newModule": {
    "title": "Yeni Modül",
    "form": {
      "title": "Form Başlığı",
      "submit": "Gönder"
    }
  }
}
```

### 2. Add to English file (`i18n/translations/en/index.json`)

```json
{
  "newModule": {
    "title": "New Module",
    "form": {
      "title": "Form Title",
      "submit": "Submit"
    }
  }
}
```

### 3. Use in Components

```typescript
const { t } = useTranslation();

return (
  <div>
    <h1>{t("newModule.title")}</h1>
    <Button>{t("newModule.form.submit")}</Button>
  </div>
);
```

## Best Practices

1. **Use descriptive keys**: `teachers.form.name` instead of `teacherName`
2. **Group related translations**: Keep all form-related keys under `form.*`
3. **Consistent naming**: Use the same pattern across modules
4. **Provide fallbacks**: Always add translations for both languages
5. **Use placeholders**: Store placeholder text in `placeholders.*` subkeys

## Language Configuration

The default language is set to Turkish in `i18n/config.ts`:

```typescript
i18n.use(initReactI18next).init({
  lng: "tr", // Default language
  fallbackLng: "tr", // Fallback language
  // ...
});
```

## Integration with Components

The i18n system is already integrated with:

- ✅ Login/Register forms
- ✅ Navigation sidebar
- ✅ Teacher management (create/edit/list)
- ✅ Error pages
- ✅ Settings page (language switcher)

Ready to integrate with:

- 🔄 Student management forms
- 🔄 Firm management forms
- 🔄 Data tables and search functionality
