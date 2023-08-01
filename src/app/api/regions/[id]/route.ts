import { BankRegion } from '@/models/bank-region';
import { getBanks, getRegions } from '@/utils/data';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    params: {
        id: string;
    };
}

export async function GET(
    request: NextRequest,
    { params }: Params
): Promise<NextResponse<BankRegion[]>> {
    const { id } = params;

    const regions = await getRegions();
    const banks = await getBanks();

    const region = regions.find((x) => x.id === Number(id));

    if (!region) {
        return new NextResponse(`No region find with ${id} id`, {
            status: 400,
        });
    }

    const data: BankRegion[] = [];
    for (const bank of banks) {
        if (region?.bankIds.includes(bank.id)) {
            data.push({
                bank: bank,
                region: region,
            });
        }
    }

    return NextResponse.json(data);
}
