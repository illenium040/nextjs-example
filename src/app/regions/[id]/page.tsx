import styles from '@/css/rows.module.css';
import { BankRegion } from '@/models/bank-region';
import { fetchApi } from '@/utils/fetch';
import Link from 'next/link';

interface Props {
    params: {
        id: string;
    };
}

export default async function Page(props: Props) {
    const res = await fetchApi(`/regions/${props.params.id}`);
    const data = (await res.json()) as BankRegion[];

    return (
        <div className={styles.rowContainer}>
            {data.map((d, i) => {
                return (
                    <div key={`${i + 1}-region`} className={styles.row}>
                        <div className={styles.rowRegionId}>{i + 1}</div>
                        <div className={styles.rowBankName}>
                            <Link href={`/banks/${d.bank.id}`}>
                                {d.bank.name}
                            </Link>
                        </div>
                        <div className={styles.rowRegionName}>
                            {d.region.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
