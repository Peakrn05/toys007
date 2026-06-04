-- WORLDOFTOYS database schema
-- PostgreSQL-compatible schema generated from the project's mock data.

BEGIN;

DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS wishlist_items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customer_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS translations CASCADE;
DROP TABLE IF EXISTS collection_categories CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS brand_features CASCADE;
DROP TABLE IF EXISTS age_filters CASCADE;
DROP TABLE IF EXISTS hero_banners CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  original_price NUMERIC(10, 2) CHECK (original_price IS NULL OR original_price >= price),
  image_url TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  badge TEXT CHECK (badge IN ('new', 'sale', 'popular')),
  rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  age_group TEXT NOT NULL CHECK (age_group IN ('0-2', '3-5', '6+')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX products_category_id_idx ON products(category_id);
CREATE INDEX products_badge_idx ON products(badge);
CREATE INDEX products_age_group_idx ON products(age_group);
CREATE INDEX products_in_stock_idx ON products(in_stock);

CREATE TABLE hero_banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  gradient TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL
);

CREATE TABLE age_filters (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL
);

CREATE TABLE brand_features (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER NOT NULL
);

CREATE TABLE brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category_id TEXT REFERENCES categories(id),
  description TEXT NOT NULL,
  product_count INTEGER NOT NULL DEFAULT 0 CHECK (product_count >= 0),
  color_class TEXT NOT NULL,
  tag_color_class TEXT NOT NULL,
  display_order INTEGER NOT NULL
);

CREATE TABLE collections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('category', 'badge')),
  rule_value TEXT,
  gradient TEXT
);

CREATE TABLE collection_categories (
  collection_id TEXT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (collection_id, category_id)
);

CREATE TABLE translations (
  language TEXT NOT NULL CHECK (language IN ('en', 'th', 'zh')),
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (language, key)
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  provider TEXT CHECK (provider IN ('email', 'facebook', 'google', 'line', 'guest')),
  is_guest BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_email_unique_idx ON users(email) WHERE email IS NOT NULL AND email <> '';

CREATE TABLE customer_profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  phone TEXT,
  avatar_url TEXT,
  member_since DATE,
  loyalty_points INTEGER NOT NULL DEFAULT 0 CHECK (loyalty_points >= 0),
  address TEXT,
  tier TEXT
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  order_date DATE NOT NULL,
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL,
  status_color_class TEXT
);

CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(10, 2)
);

CREATE TABLE wishlist_items (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);

CREATE TABLE cart_items (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);

COMMIT;
