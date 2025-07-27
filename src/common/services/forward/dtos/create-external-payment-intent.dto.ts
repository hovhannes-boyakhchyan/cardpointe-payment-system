export class CreateExternalPaymentIntentDto {
  payment_intent: {
    amount: number;
    tax_amount?: number;
    tip_amount?: number;
    surcharge_amount?: number;
    payment_splits?: [
      {
        account_id: string;
        amount: number;
        description: string;
      },
    ];
    order_details?: {
      po_number: string;
      tax_exempt: boolean;
      tax_amount: number;
      freight_amount: number;
      duty_amount: number;
      initiated_by: string;
      order_date: string;
      ship_to_zip: string;
      ship_from_zip: string;
      ship_to_country: string;
      items: [
        {
          line_number: number;
          material: string;
          description: string;
          upc: number;
          quantity: number;
          uom: string;
          unit_cost: number;
          net_amount: number;
          tax_amount: number;
          tax_exempt: boolean;
          discount_amount: number;
        },
      ];
    };
    capture?: boolean;
    currency?: string;
    reference_id?: string;
    user_fields?: {
      [name: string]: string | number | null;
    };
    description?: string;
  };
  payment_method: {
    payment_method_type: string; //card
    source_type: string; //cardPointe
    billing_details?: {
      address: {
        city: string;
        country: string;
        state: string;
        line1: string;
        line2: string;
        postal_code: string;
      };
      email: string;
      name: string;
      phone: string;
    };
    card: {
      last_four_digits: string;
      first_six_digits: string;
      brand: string;
      exp_month: string;
      exp_year: string;
      token: string;
    };
    bank?: {
      masked_account: string;
      masked_routing: string;
      token: string;
    };
  };
  gateway_response: {
    auth_code: string;
    retrieval_reference: string;
    response_raw: string;
    created_at: string;
  };
}
