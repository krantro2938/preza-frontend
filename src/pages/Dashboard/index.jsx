import { Link } from "react-router-dom";
import { usePresentationsContext } from "../../App";
import styles from "./styles.module.css";

function Dashboard() {
  const { presentations, deletePresentation } = usePresentationsContext();

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h1>Мои проекты</h1>
          <p className={styles.subtitle}>Управляйте своими презентациями и проектами</p>
          <div className={styles.buttonGroup}>
            <Link to="/" className={styles.backButton}>Назад на главную</Link>
            <Link to="/create-presentation" className={styles.createButton}>Создать презентацию</Link>
          </div>
        </div>
        <div className={styles.presentationsList}>
          {presentations.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>У вас пока нет презентаций</h2>
              <p>Начните создавать потрясающие презентации с помощью ИИ</p>
              <Link to="/create-presentation" className={styles.createButton}>Создать первую презентацию</Link>
            </div>
          ) : (
            presentations.map((presentation) => (
              <div key={presentation.id} className={styles.presentationCard}>
                <h3>{presentation.title || "Без названия"}</h3>
                <p>Создано: {new Date(presentation.createdAt).toLocaleDateString()}</p>
                <div className={styles.actions}>
                  <Link to={`/presentation/${presentation.id}`} className={styles.viewButton}>Просмотреть</Link>
                  <button onClick={() => deletePresentation(presentation.id)} className={styles.deleteButton}>Удалить</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;