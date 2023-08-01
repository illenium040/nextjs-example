import { Region, getRegions } from '@/utils/data';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<Region[]>> {
    return NextResponse.json(await getRegions());
}
