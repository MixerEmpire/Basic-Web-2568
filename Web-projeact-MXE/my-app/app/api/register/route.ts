import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, nickName } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: name || null,
        nickName: nickName || null,
      },
    });

    // do not return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...safe } = user as any;

    return NextResponse.json({ user: safe }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
