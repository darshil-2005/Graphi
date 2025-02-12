import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs'
import { NextResponse } from "next/server";
import path from 'path';


export async function POST(req) {

    const botToken = '7130242217:AAGDhKHDrmQzQQkSRRHNsUF0Y3q6jxkmpKU'; 
    const chatId = -1002393641410; 
    const bot = new TelegramBot(botToken);

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        const fileType = file.type;
        const fileName = `${Date.now()}-${file.name}`;
        const uploadDir = "tmp/uploads";

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.resolve(uploadDir, fileName);

        const buffer = await file.arrayBuffer(); 
        fs.writeFileSync(filePath, Buffer.from(buffer)); 

        if (fileType.startsWith('image')) {
            try {
                const response = await bot.sendPhoto(chatId, fs.createReadStream(filePath));
                fs.unlinkSync(filePath)
                return NextResponse.json({ success: true, response }, { status: 201 });
            } catch (error) {
                return NextResponse.json({ Error: 'Only proper image types allowed!', message: error.message }, {status: 400})
            }
           
        }

        if (fileType.startsWith('text/csv')) {
            const response = await bot.sendDocument(chatId, fs.createReadStream(filePath));
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true, response }, { status: 201 });
        }

        return NextResponse.json({ success: false, error: 'Only Csv Text Files and Proper Image Formats are allowed' }, { status: 400 });

    } catch (error) {
        console.error("Error processing request:", error); // Log the error for debugging
        return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Return a 500 error with the error message
    }
}





