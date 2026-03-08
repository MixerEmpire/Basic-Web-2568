import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, currency, game, method, reference, status } = await req.json();

    if (!userId || amount === undefined || amount <= 0) {
      return NextResponse.json({ error: 'userId and valid amount are required' }, { status: 400 });
    }

    const topup = await prisma.topUpHistory.create({
      data: {
        userId: Number(userId),
        game: game || null,
        amount: Number(amount),
        currency: currency || 'THB',
        method: method || null,
        reference: reference || null,
        status: status || undefined,
      },
    });

    return NextResponse.json({ topup }, { status: 201 });
  } catch (err: any) {
    console.error('[TopUp API Error]:', err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const limitParam = url.searchParams.get('limit');
    const take = limitParam ? Number(limitParam) : 50;

    console.log('[TopUp GET] Fetching with:', { userId, take });

    const where = userId ? { userId: Number(userId) } : undefined;

    const items = await prisma.topUpHistory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
    });

    console.log('[TopUp GET] Found:', items.length, 'records');
    return NextResponse.json({ topups: items });
  } catch (err: any) {
    console.error('[TopUp GET Error]:', err, err.stack);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
