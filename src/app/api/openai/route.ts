import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({ text: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('Error creating chat completion:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
