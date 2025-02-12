import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from "next/server";

export async function POST(req) {

    const Bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

    try {
        const data = await req.json();
        const fileId = data.fileId;

        const readStream = Bot.getFileStream(fileId);

        const finalResponse = await new Promise((resolve, reject) => {
            let responseData = '';

            readStream.on('data', (dataChunk) => {
                responseData += dataChunk;
            });

            readStream.on('end', () => {
                resolve(responseData);
            });

            readStream.on('error', (error) => {
                reject(error);
            });
        });

        return NextResponse.json({ data: finalResponse });

    } catch (error) {
        console.error(`Error fetching data from Telegram: ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}