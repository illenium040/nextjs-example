import { BankRegion } from '@/models/bank-region';
import { getBanks, getRegions } from '@/utils/data';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<BankRegion[]>> {
    const regions = await getRegions();
    const banks = await getBanks();

    const data: BankRegion[] = [];
    for (const region of regions) {
        for (const bank of banks) {
            if (region.bankIds.includes(bank.id)) {
                data.push({
                    bank: bank,
                    region: region,
                });
            }
        }
    }

    return NextResponse.json(data);
}
