import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const { password: _p, ...safe } = user as any;

    return NextResponse.json({ user: safe });
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
