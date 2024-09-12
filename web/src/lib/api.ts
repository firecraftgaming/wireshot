import {REPClient} from 'rest-exchange-protocol-client';

export class ApiInterface {
    private socket: REPClient;

    private static instance: ApiInterface;
    public static getConnection() {
        return ApiInterface.instance;
    }

    public get routes() {
        return this.socket.routes;
    }

    constructor(host: string) {
        ApiInterface.instance = this;

        this.socket = new REPClient({
            host,
        });
    }

    public async rawRequest(path: string, method: string, data: any) {
        return this.socket.request(path, method, data);
    }

    public async connect() {
        this.socket.connect();
    }

    public async disconnect() {
        this.socket.disconnect();
    }
}
