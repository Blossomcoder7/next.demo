export default interface User {
  userType: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  age: string;
  dob: string;
  email: string;
  phone: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: Record<string, any>;
  fullName?: string;
  fullAddress?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
