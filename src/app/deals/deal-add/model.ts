export class Model {
    constructor(
        public client_id?: number,
        public amt_client_recvd?: number,
        public profit?: number,
        public status?: string,
        public payments_remaining?: number,
        public payments_purchased?: number,
        public sales_person?: string,
        public updated_at?: string,
        public notes?: string
    ) { }
}
