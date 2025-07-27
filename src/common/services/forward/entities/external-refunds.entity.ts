export class ExternalRefundsEntity {
  id: string;
  entity: string;
  status: string;
  external: boolean;
  amount: 0;
  account_id: string;
  payment_id: string;
  created_at: string;
  updated_at: string;
  settlement_status?: string; // settled or unsettled
  settled_at?: string;
}
