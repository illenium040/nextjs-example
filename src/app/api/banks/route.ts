import { Bank, getBanks } from '@/utils/data';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<Bank[]>> {
    return NextResponse.json(await getBanks());
}
