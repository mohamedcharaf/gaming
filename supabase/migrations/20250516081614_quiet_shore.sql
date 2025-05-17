/*
  # Create orders table
  
  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `phone` (text)
      - `wilaya` (text)
      - `address` (text)
      - `items` (jsonb)
      - `subtotal` (numeric)
      - `shipping` (numeric)
      - `tax` (numeric)
      - `total` (numeric)
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on `orders` table
    - Add policy for authenticated users to read their own orders
    - Add policy for public to create orders (since we don't require authentication)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  wilaya text NOT NULL,
  address text NOT NULL,
  items jsonb NOT NULL,
  subtotal numeric NOT NULL,
  shipping numeric NOT NULL DEFAULT 0,
  tax numeric NOT NULL,
  total numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create orders (since we don't require authentication)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own orders if we implement authentication later
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);