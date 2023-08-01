import { Bank, Region } from '@/utils/data';

export interface BankRegion {
    bank: Bank;
    region: Region;
}

export interface BankWithRegions {
    bank: Bank;
    regions: Region[];
}
