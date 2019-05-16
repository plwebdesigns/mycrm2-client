export class Model {
    constructor(
        public client_id?: number,
        public employee_id?: number,
        public status?: string,
        public county?: string,
        public transaction_date?: string,
        public amt_client_recvd?: number,
        public profit?: number,
        public payments_remaining?: number,
        public payments_purchased?: number,
        public sales_person?: string,
        public company?: string,
        public notes?: string,
        public updated_at?: string,
        public created_at?: string,
    ) { }
}
