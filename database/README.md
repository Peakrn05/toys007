# Database

PostgreSQL-compatible schema and seed data generated from the current WORLDOFTOYS mock/static data.

## Files

- `schema.sql` creates the normalized storefront, app-content, user, order, wishlist, and cart tables.
- `seed.sql` loads the mock catalog and UI content:
  - 15 categories
  - 42 products
  - 2 hero banners
  - 4 age filters
  - 4 brand trust features
  - 12 brands
  - 273 translation strings
  - 5 mock users
  - 4 mock orders

## Load

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/seed.sql
```

The seed preserves UI mock order item labels even when a label does not exactly match a product name, so `order_items.product_id` is nullable by design.
