export class RefundsExternalPaymentDto {
  payment_intent_id: string;
  refund_request?: {
    amount: number;
  };
  gateway_response: {
    created_at: string;
    auth_code?: string;
    retrieval_reference: string;
    response_raw?: string;
  };
}
