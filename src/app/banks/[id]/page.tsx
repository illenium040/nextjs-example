import styles from '@/css/rows.module.css';
import { BankWithRegions } from '@/models/bank-region';
import { fetchApi } from '@/utils/fetch';
import Link from 'next/link';

interface Props {
    params: {
        id: string;
    };
}

export default async function Page(props: Props) {
    const res = await fetchApi(`/banks/${props.params.id}`);
    const { bank, regions } = (await res.json()) as BankWithRegions;

    return (
        <div className={styles.rowContainer}>
            {regions.map((r, i) => {
                return (
                    <div key={`${i}-${r.name}`} className={styles.row}>
                        <div className={styles.rowId}>{i + 1}</div>
                        <div className={styles.rowBankName}>{bank.name}</div>
                        <div className={styles.rowRegionName}>
                            <Link href={`/regions/${r.id}`}>{r.name}</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
