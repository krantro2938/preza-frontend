import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { usePresentationsContext } from "../../App";

function CreatePresentation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  const { presentations, createPresentation, addPresentation} = usePresentationsContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getTemplates = async () => {
    try {
      const res = await fetch(`http://${backendUrl}/templates/`);
      if (!res.ok) throw new Error("Не удалось загрузить шаблоны");
      const resTemplates = await res.json();
      setTemplates(resTemplates);
      if (resTemplates.length > 0) {
        setTemplateId(resTemplates[0].id);
      }
    } catch (error) {
      console.error("Ошибка загрузки шаблонов:", error);
      alert("⚠️ Не удалось загрузить шаблоны. Попробуйте позже.");
    }
  };

  useEffect(() => {
    console.log(presentations)
    getTemplates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!templateId) {
      alert("Пожалуйста, выберите шаблон");
      return;
    }

    const presentationData = {
      title,
      description,
      template_id: templateId, // 👈 Make sure this matches backend field name!
    };

    try {
      const newPresentation = await createPresentation(presentationData);

      alert("✅ Презентация успешно создана!");
      navigate(`/presentation/${newPresentation.id}`);
    } catch (error) {
      console.error("Ошибка создания презентации:", error);
      alert("❌ Ошибка создания презентации");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.aiSparkle}></div>
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

          <div className={styles.templateSection}>
            <h3>Выберите шаблон</h3>
            <div className={styles.templateGrid}>
              {templates.length > 0 ? (
                templates.map((template) => (
                  <label
                    key={template.id}
                    className={`${styles.templateCard} ${
                      templateId === template.id ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={templateId === template.id}
                      onChange={() => setTemplateId(template.id)}
                      className={styles.radioInput}
                    />
                    <div className={styles.templateImage}>
                      <img
                        src={template.preview_url || "/placeholder-template.png"}
                        alt={template.name}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgMjAwIDE0MCI+PGFscGhhIGZpbGw9IiM5OTkiPjxwYXRoIGQ9Ik0wIDBoMjAwdjE0MEgwVjB6Ii8+PC9hbHBoYT48L3N2Zz4=";
                        }}
                      />
                    </div>
                    <div className={styles.templateName}>{template.title}</div>
                  </label>
                ))
              ) : (
                <p className={styles.loading}>Загрузка шаблонов...</p>
              )}
            </div>
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
