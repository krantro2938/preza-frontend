import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function CreatePresentation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Презентация создана:", { title, description });
    alert("✅ Презентация успешно создана!");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.designTip}>
        <p>💡 ИИ предложит стиль, макет и контент на основе вашего описания</p>
      </div>
      <div className={styles.previewCard}>
        <div className={styles.slidePreview}></div>
        <p>Предпросмотр генерируется автоматически</p>
      </div>

      <div className={styles.formCard}>
        <h1>Создать новую презентацию</h1>
        <p className={styles.subtitle}>
          Опишите свою идею — ИИ сделает всё остальное
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title">Название презентации</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Стратегия роста на 2025 год"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите подробнее: цель, аудитория, ключевые моменты..."
              rows="5"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Сгенерировать презентацию
          </button>
        </form>

        <button onClick={() => navigate("/")} className={styles.backButton}>
          ← Вернуться на главную
        </button>
      </div>
    </div>
  );
}

export default CreatePresentation;
