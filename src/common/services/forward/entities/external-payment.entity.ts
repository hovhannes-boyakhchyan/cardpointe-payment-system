import { StatusEnum } from '../enums';

export class ExternalPaymentEntity {
  id: string;
  entity: string; // payment_intent
  status: StatusEnum;
  amount: number;
  amount_authorized: number;
  amount_captured: number;
  amount_refunded: number;
  amount_voided: number;
  amount_disputed: number;
  tax_amount: number;
  tip_amount: number;
  surcharge_amount: number;
  payment_splits: [
    {
      account_id: string;
      amount: number;
      description: string;
    },
  ];
  order_details?: {
    po_number?: string;
    tax_exempt?: boolean;
    tax_amount?: number;
    freight_amount?: number;
    duty_amount?: number;
    initiated_by?: string; // 'merchant' or 'customer'
    order_date?: string;
    ship_to_zip?: string;
    ship_from_zip?: string;
    ship_to_country?: string;
    items: [
      {
        line_number?: number;
        material?: string;
        description?: string;
        upc?: number;
        quantity?: number;
        uom?: string;
        unit_cost?: number;
        net_amount?: number;
        tax_amount?: number;
        tax_exempt?: boolean;
        discount_amount?: number;
      },
    ];
  };
  capture: boolean;
  currency: string; // USD
  latest_payment: {
    id: string;
    entity: string; // payment
    status: StatusEnum;
    billing_details?: {
      address?: {
        city?: string;
        country?: string;
        state?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
      };
      email?: string;
      name?: string;
      phone?: string;
    };
    amount: number;
    amount_authorized: number;
    amount_captured: number;
    amount_refunded: number;
    amount_voided: number;
    amount_disputed: number;
    disputed?: boolean;
    dispute_id?: string;
    order_details?: {
      po_number?: string;
      tax_exempt?: boolean;
      tax_amount?: number;
      freight_amount?: number;
      duty_amount?: number;
      initiated_by?: string; // 'merchant' or 'customer'
      order_date?: string;
      ship_to_zip?: string;
      ship_from_zip?: string;
      ship_to_country?: string;
      items?: [
        {
          line_number?: number;
          material?: string;
          description?: string;
          upc?: number;
          quantity?: number;
          uom?: string;
          unit_cost?: number;
          net_amount?: number;
          tax_amount?: number;
          tax_exempt?: boolean;
          discount_amount?: number;
        },
      ];
    };
    payment_intent_id: string;
    payment_method_id: string;
    payment_method: {
      id: string;
      entity: string; // payment_method
      created_at: string;
      updated_at: string;
      payment_method_type: string; // 'card' or 'bank'
      source_type: string; // cardpointe or none
      billing_details: {
        address?: {
          city: string;
          country: string;
          state: string;
          line1: string;
          line2: string;
          postal_code: string;
        };
        email?: string;
        name?: string;
        phone?: string;
      };
      card: {
        last_four_digits: string;
        first_six_digits: string;
        brand: string;
        exp_month: string;
        exp_year: string;
      };
      bank?: {
        masked_account: string;
        masked_routing: string;
      };
    };
    auth_code?: string;
    auth_response_text?: string;
    external: boolean;
    created_at: string;
    updated_at: string;
    account_id: string;
    reference_id?: string;
    user_fields?: object;
    description?: string;
    settlement_status: string; // settled or unsettled
    settled_at: string;
  };
  disputed?: boolean;
  dispute_id?: string;
  external: boolean;
  partner_id: string;
  business_id: string;
  account_id: string;
  reference_id?: string;
  user_fields?: object;
  cancellation_reason?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  cancelled_at: string;
  captured_at: string;
  settlement_status: string; // settled or unsettled
  settled_at: string;
}
