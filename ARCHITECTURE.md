# Architecture

The project follows a page-local feature structure inside `app/`.

## Global

- `components/`: reusable UI components shared by multiple pages.
- `helpers/`: shared formatting and validation helpers.
- `config/`: application configuration such as the PostgreSQL pool.

## Page-local

- `app/cabinets/`: cabinet list feature.
- `app/cabinets/components/`: components used only by the cabinet list page.
- `app/cabinets/hooks/`: page-local server methods. These are intentionally named `hooks` to keep page-specific logic easy to find; they are not React hooks because the page is server-side.
- `app/cabinets/types/`: types used only by the list page.
- `app/cabinets/[id]/`: cabinet detail feature, with the same local organization.

## Rendering

The dashboard is server-side by default. Pages read URL parameters and call page-local server methods directly. Client components are only introduced when browser-only interaction is actually needed.
