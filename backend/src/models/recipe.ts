export interface Recipe {
  r_name: string;
  r_description: string;
  r_image: string;
  r_calories: number;
  r_fat: number;
  r_protein: number;
  r_sugar: number;
  pt_time: number;
  ct_time: number;
}

export interface Recipe_ingredient {
  r_id: number;
  i_id: number;
  ri_quantity: number;
  ri_unit: string;
}

export interface Recipe_step {
  r_id: number;
  rs_description: string;
  rs_image: string;
}

export interface Recipe_tag {
  r_id: number;
  rt_name: string;
}
