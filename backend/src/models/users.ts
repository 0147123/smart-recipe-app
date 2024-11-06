export interface Users {
  u_name: string;
  u_email: string;
  u_hashedpassword: string;
  u_image: string;
}

export interface Users_preference {
  u_id: number;
  rt_id: number;
}

export interface Users_recipe {
  u_id: number;
  r_id: number;
}
