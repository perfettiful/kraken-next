import axios from 'axios';
import crypto from 'crypto';
import queryString from 'query-string';

type OrderDetails = {
    orderId: string;
    pair: string;
    type: string;
    ordertype: string;
    volume: string;
};

class KrakenClient {
    private apiKey: string;
    private apiSecret: string;
    private baseUrl: string;

    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.baseUrl = 'https://api.kraken.com';
    }

    public async getAccountInfo(): Promise<any> {
        const path = '/0/private/Balance';
        const headers = this.createAuthHeaders(path, {});
        const response = await axios.post(`${this.baseUrl}${path}`, {}, { headers });
        return response.data;
    }

    public async createOrder(orderDetails: OrderDetails): Promise<any> {
        const path = '/0/private/AddOrder';
        const dataWithNonce = { ...orderDetails, nonce: new Date().getTime() * 1000 };
        const headers = this.createAuthHeaders(path, dataWithNonce);
        const response = await axios.post(`${this.baseUrl}${path}`, dataWithNonce, { headers });
        return response.data;
    }

    public async updateOrder(orderDetails: OrderDetails): Promise<any> {
        await this.cancelOrder(orderDetails.orderId);
        return this.createOrder(orderDetails);
    }

    public async cancelOrder(orderId: string): Promise<any> { // Replace 'any' with a proper type for the response
        const path = '/0/private/CancelOrder';
        const data = { txid: orderId, nonce: new Date().getTime() * 1000 };
        const headers = this.createAuthHeaders(path, data);
        const response = await axios.post(`${this.baseUrl}${path}`, data, { headers });
        return response.data;
    }

    private createAuthHeaders(urlPath: string, requestData: any): Record<string, string> { // Define a more specific type for requestData if possible
        return {
            'API-Key': this.apiKey,
            'API-Sign': this.generateSignature(urlPath, requestData),
        };
    }

    private generateSignature(path: string, requestData: any): string {
        const nonce = new Date().getTime() * 1000;
        const postData = queryString.stringify({ ...requestData, nonce });
        const message = path + crypto.createHash('sha256').update(nonce + postData).digest('binary');
        const secretBuffer = Buffer.from(this.apiSecret, 'base64');
        const hmac = crypto.createHmac('sha512', secretBuffer);
        const hash = hmac.update(message).digest('base64');

        return hash;
    }
}

export default KrakenClient;
