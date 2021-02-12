import { Company } from './company.model';
import { Address } from './address.model';

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: number;
  website: string;
  company: Company;
}
