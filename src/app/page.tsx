import styles from '@/css/rows.module.css';
import { BankRegion } from '@/models/bank-region';
import { fetchApi } from '@/utils/fetch';
import Link from 'next/link';

export default async function Home() {
    const res = await fetchApi('/data');
    const data = (await res.json()) as BankRegion[];

    return (
        <div className={styles.rowContainer}>
            {data.map((d, i) => {
                return (
                    <div key={`${i + 1}-data`} className={styles.row}>
                        <div className={styles.rowRegionId}>{i + 1}</div>
                        <div className={styles.rowBankName}>
                            <Link href={`/banks/${d.bank.id}`}>
                                {d.bank.name}
                            </Link>
                        </div>
                        <div className={styles.rowRegionName}>
                            <Link href={`/regions/${d.region.id}`}>
                                {d.region.name}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
