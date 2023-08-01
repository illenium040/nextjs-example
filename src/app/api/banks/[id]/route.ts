import { BankWithRegions } from '@/models/bank-region';
import { Region, getBanks, getRegions } from '@/utils/data';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    params: {
        id: string;
    };
}

export async function GET(
    request: NextRequest,
    { params }: Params
): Promise<NextResponse<BankWithRegions>> {
    const { id } = params;

    const banks = await getBanks();
    const regions = await getRegions();

    const requiredBank = banks.find((x) => x.id === Number(id));

    if (!requiredBank) {
        return new NextResponse(`No bank find with ${id} id`, {
            status: 400,
        });
    }

    const bankRegions: Region[] = [];

    for (const region of regions) {
        if (requiredBank.regionNames.includes(region.name)) {
            bankRegions.push(region);
        }
    }

    const result: BankWithRegions = {
        bank: requiredBank,
        regions: regions,
    };

    return NextResponse.json(result);
}
