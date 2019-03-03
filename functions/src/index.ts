import * as functions from 'firebase-functions';
import { books_v1, google } from 'googleapis';

export const searchBook = functions.https.onCall(async (args, context: functions.https.CallableContext) => {
    google.options({
        params: {
            country: 'US'
        }
    });
    console.log('received args ', args);
    const client = new books_v1.Books({
        auth: functions.config().googlebooks.api_key
    }, google);

    try {
        const response = await client.volumes.list({q: args.q});
        console.log('received response ', response);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error };
    }
});
