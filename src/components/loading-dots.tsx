import styles from './loading-dots.module.css';

export function LoadingDots() {
    return (
        <span className={styles.loading}>
            <span className='bg-black' />
            <span className='bg-black' />
            <span className='bg-black' />
        </span>
    );
};
