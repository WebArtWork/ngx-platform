# 📂 Timelone `/sections/content/timelone`

Vertical timeline for presenting a sequence of items or events. Each entry can include an optional title and description.

## ✅ Features

-   Renders a list of timeline items
-   Optional title and description per item
-   Uses CSS variables for spacing, colors, and typography
-   Responsive sizing across breakpoints

---

## 🧾 Section Data Schema

This section expects the following data structure passed via `section`:

```json
{
        "src": "/sections/content/timelone/timelone.html",
        "items": [
                {
                        "title": "Step title",
                        "description": "Optional details for this step"
                }
        ]
}
```

## 🧱 HTML Structure

```html
<div class="timelone">
        <ul class="timelone__list">
                {% for item in section.items %}
                <li class="timelone__item">
                        {% if item.title %}
                        <div class="timelone__title">{{{item.title}}}</div>
                        {% endif %}
                        {% if item.description %}
                        <div class="timelone__description">{{{item.description}}}</div>
                        {% endif %}
                </li>
                {% endfor %}
        </ul>
</div>
```

---

## 🎨 Styling Notes

-   Timeline markers use `--c-primary` for emphasis and `--c-border` for the connecting line
-   Typography and spacing adapt using theme variables like `--font-size` and `--padding-scale`
-   Layout maintains a maximum width of `70ch` for readability

---

## 📨 Theme Variables Used (from `template.json`)

| Variable                  | Description                                   |
| ------------------------- | --------------------------------------------- |
| `--padding-scale`         | Controls overall section padding              |
| `--margin-scale`          | Spacing below titles                          |
| `--font-size`             | Base font size for text                       |
| `--line-height`           | Line height for descriptions                  |
| `--letter-spacing`        | Letter spacing for descriptions               |
| `--ff-base`               | Base font for text                            |
| `--ff-title`              | Font for item titles                          |
| `--c-primary`             | Color of timeline markers                     |
| `--c-border`              | Color of the vertical connector               |
| `--c-text-primary`        | Title text color                              |
| `--c-text-body-secondary` | Description text color                        |
| `--bp-md`, `--bp-sm`      | Breakpoints for responsive font adjustments   |

---
