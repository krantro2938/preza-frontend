import React from 'react';
import styles from './styles.module.css';
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.slideContainer}>
            <div className={styles.notFoundContent}>
                <div className={styles.notFoundIcon}>🔍</div>
                <h1 className={styles.notFoundTitle}>404</h1>
                <h2 className={styles.notFoundSubtitle}>Страница не найдена</h2>
                <p className={styles.notFoundText}>
                    К сожалению, запрашиваемая вами страница не существует.<br/>
                    Возможно, она была перемещена или удалена.
                </p>

                <div className={styles.notFoundActions}>
                    <button
                        className={styles.refreshButton}
                        onClick={() => navigate(-1)}
                    >
                        ← Вернуться назад
                    </button>
                    <button
                        className={styles.primaryButton}
                        onClick={() => navigate('/')}
                    >
                        🏠 На главную
                    </button>
                    <button
                        className={styles.refreshButton}
                        onClick={() => navigate(0)}
                    >
                        🔄 Обновить
                    </button>
                </div>


            </div>

    </div>
)
    ;
};

export default NotFoundPage;