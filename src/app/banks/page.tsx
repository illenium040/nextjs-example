import styles from '@/css/rows.module.css';
import { fetchApi } from '@/utils/fetch';
import { Bank } from '../../utils/data';

// Тестовая страницы, чтобы посмотреть все банки
export default async function Page() {
    const res = await fetchApi('/banks');
    const banks = (await res.json()) as Bank[];

    return (
        <div className={styles.rowContainer}>
            {banks.map((b) => {
                return (
                    <div key={`${b.id}-bank}`} className={styles.row}>
                        <p className={styles.rowId}>{b.id}</p>
                        <p>{b.name}</p>
                    </div>
                );
            })}
        </div>
    );
}
