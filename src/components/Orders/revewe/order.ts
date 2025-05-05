export interface order {
  _id: string;
  user: User;
  products?: ProductsEntity[] | null;
  totalPrice: number;
  deliveryDate: string;
  adress: string;
  deliveryStatus: boolean;
  recipientName: string;
  recipientPhone: string;
  recipientNationalId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ProductsEntity {
  product: Product;
  count: number;
  color: string;
  _id: string;
}
export interface Product {
  rating: Rating;
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  details?: string[] | null;
  colors?: string[] | null;
  comment?: null[] | null;
  discount: number;
  thumbnail: string;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
export interface Rating {
  rate: number;
  count: number;
}
