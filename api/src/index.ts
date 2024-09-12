import {REPServer, TypedClient, WebError, WebsocketClient, WebsocketOutboundMethod} from 'rest-exchange-protocol';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export type Client = TypedClient<{ id: string }>;

async function start() {
    console.log('Starting server...');

    const server = new REPServer({
        port: parseInt(process.env.PORT) || 5000,
    });

    server.action('open', async request => {
        const {token, url} = request.data as { token: string, url: string };

        try {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

            const client = server.getClient(id);
            if (!(client instanceof WebsocketClient)) throw new Error('Invalid client');

            await client.send('open', WebsocketOutboundMethod.ACTION, { url });
        } catch (e) {
            throw new WebError('Invalid token', 400);
        }
    });

    await server.start();

    console.log('Server started!');

    const interval = setInterval(() => {
        const clients = server.getClients();
        for (const client of clients) {
            if (client instanceof WebsocketClient) {
                const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, { expiresIn: '5s' });
                client.send('auth', WebsocketOutboundMethod.UPDATE, { token });
            }
        }
    }, 1000);

    return async () => {
        console.log('Stopping server...');

        await server.stop();
        clearInterval(interval);

        console.log('Server stopped!');
        process.exit(0);
    };
}

async function main() {
    try {
        const stop = await start();

        process.on('uncaughtException', (e) => {
            console.error(e);
            return false;
        });

        process.on('unhandledRejection', (e) => {
            console.error(e);
            return false;
        });

        process.on('exit', () => {
            console.log('Exiting...');
        });

        const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
        signals.forEach((signal) => {
            process.on(signal, () => {
                stop();
                return false;
            });
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

if (require.main === module) main();
