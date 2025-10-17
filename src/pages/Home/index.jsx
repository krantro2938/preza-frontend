import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Home() {
  return (
    <div className={styles.container}>
      {/* Декоративные элементы */}
      <div className={styles.stickyNote}>
        <p>
          Превратите идеи в красивые слайды за секунды — без дизайнерских
          навыков.
        </p>
      </div>

      <div className={styles.reminderCard}>
        <div className={styles.presentationIcon}></div>
        <p>Доклад по стратегии Q3</p>
        <div className={styles.timeBadge}>Только что</div>
      </div>

      <div className={styles.tasksCard}>
        <h3>Ваш прогресс</h3>
        <div className={styles.taskItem}>
          <span>Структура создана</span>
          <div className={styles.progress} style={{ width: "100%" }}></div>
          <span>✓</span>
        </div>
        <div className={styles.taskItem}>
          <span>Слайды сгенерированы</span>
          <div className={styles.progress} style={{ width: "100%" }}></div>
          <span>✓</span>
        </div>
        <div className={styles.taskItem}>
          <span>Добавлен кастомный дизайн</span>
          <div className={styles.progress} style={{ width: "40%" }}></div>
          <span>40%</span>
        </div>
      </div>

      <div className={styles.integrationsCard}>
        <h3>Экспорт везде</h3>
        <div className={styles.integrationIcons}>
          <div className={styles.iconContainer}>
            <img
              src="/public/powerpoint.svg"
              alt="PowerPoint"
              className={styles.icon}
            />
          </div>
          <div className={styles.iconContainer}>
            <img
              src="/public/pdf.svg"
              alt="PowerPoint"
              className={styles.icon}
            />
          </div>
          <div className={styles.iconContainer}>
            <img
              src="/public/google.svg"
              alt="PowerPoint"
              className={styles.icon}
            />
          </div>
        </div>
      </div>

      <div className={styles.centerContent}>
        <h1>Создавайте потрясающие презентации</h1>
        <h2>с помощью ИИ за считанные минуты</h2>
        <p>
          От идеи до готового доклада — с умным дизайном и вашим содержанием.
        </p>
        <div className={styles.buttonGroup}>
          <Link to="/create-presentation" className={styles.ctaButton}>
            Создать первую презентацию
          </Link>
          <Link to="/dashboard" className={styles.secondaryButton}>
            Мои проекты
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
