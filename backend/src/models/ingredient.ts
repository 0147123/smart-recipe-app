export interface Ingredient {
  i_name: string;
  i_description: string;
  i_image: string;
}

export interface Ingredient_stock {
  i_id: number;
  u_id: number;
  is_quantity: number;
  is_unit: string;
}
