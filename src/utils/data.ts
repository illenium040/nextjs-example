import { promises as fs } from 'fs';
import path from 'path';
import { cache } from 'react';
import 'server-only';

interface RegionJson {
    id: number;
    bankName: string;
    name: string;
}

export interface Region {
    id: number;
    name: string;
    bankIds: number[];
}

export interface Bank {
    id: number;
    name: string;
    regionNames: string[];
}

const readJsonData = cache(async (): Promise<RegionJson[]> => {
    let fileContents: string = '';
    try {
        const jsonDirectory = path.join(process.cwd(), 'json');
        fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');
    } catch (e) {
        console.error(e);
    }

    return JSON.parse(fileContents);
});

export const getRegions = cache(async (): Promise<Region[]> => {
    const regionsJson = await readJsonData();
    const banks = await getBanks();

    const regions: Region[] = [];
    const uniqueRegions = [...new Set(regionsJson.map((x) => x.name))];
    for (let i = 0; i < uniqueRegions.length; i++) {
        const regionName = uniqueRegions[i];
        regions.push({
            id: i + 1,
            name: regionName,
            bankIds: [],
        });
    }

    for (const regionJson of regionsJson) {
        const regionIndex = regions.findIndex(
            (x) => x.name === regionJson.name
        )!;

        const bank = banks.find((b) => {
            if (
                b.regionNames.includes(regionJson.name) &&
                b.name === regionJson.bankName
            ) {
                return b;
            }
        });

        if (!bank) {
            throw new Error(`no bank for region ${regionJson.name}`);
        }

        regions[regionIndex].bankIds.push(bank.id);
    }

    return regions;
});

export const getBanks = cache(async (): Promise<Bank[]> => {
    const regionsJson = await readJsonData();

    const banks: Bank[] = [];
    const uniqueBanks = [...new Set(regionsJson.map((x) => x.bankName))];
    for (let i = 0; i < uniqueBanks.length; i++) {
        banks.push({
            id: i + 1,
            name: uniqueBanks[i],
            regionNames: [],
        });
    }

    for (const region of regionsJson) {
        const bankIndex = banks.findIndex((x) => x.name === region.bankName);
        if (bankIndex < 0) {
            throw new Error(`no bank find with name ${region.bankName}`);
        }

        banks[bankIndex].regionNames.push(region.name);
    }

    return banks;
});
