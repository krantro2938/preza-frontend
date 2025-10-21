import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import {usePresentationsContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
// import data from '/public/generated_slide.json'

const Presentation = () => {
    const {id} = useParams();
    const { getPresentation, presentations } = usePresentationsContext();
    const [presentationData, setPresentationData] = useState(getPresentation(id).presentation);
    const navigate = useNavigate();

    useEffect(()=>{
        setPresentationData(getPresentation(id).presentation)
        console.log(presentationData, getPresentation(Number(id)))
    },[presentations])
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const nextSlide = useCallback(() => {
        if (currentSlideIndex < presentationData?.slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    }, [currentSlideIndex]);

    const prevSlide = useCallback(() => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    }, [currentSlideIndex]);

    const handleDownload = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const res = await fetch(`${backendUrl}/presentations/${id}/download`);
            if (!res.ok) throw new Error("Не удалось загрузить презентацию");

            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const contentDisposition = res.headers.get('content-disposition');
            let filename = 'presentation.pptx';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (filenameMatch) filename = filenameMatch[1];
            }

            a.download = filename;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error("Ошибка загрузки презентации:", error);
            alert("⚠️ Не удалось загрузить презентацию. Попробуйте позже.");
        }
    }



    const goToSlide = (index) => {
        setCurrentSlideIndex(index);
    };

    const handleKeyDown = useCallback((event) => {
        switch (event.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                event.preventDefault();
                prevSlide();
                break;
            default:
                break;

        }
    }, [nextSlide, prevSlide])


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);



    const renderSlideThumbnail = (slide, index) => {
        const isActive = index === currentSlideIndex;

        return (
            <div
                key={slide.id}
                className={`${styles.thumbnail} ${isActive ? styles.thumbnailActive : ''}`}
                onClick={() => goToSlide(index)}
            >
                <div className={styles.thumbnailNumber}>{index + 1}</div>
                <div className={styles.thumbnailContent}>
                    <div className={styles.thumbnailTitle}>{slide.title}</div>
                    {slide.id === 'title_slide' && (
                        <div className={styles.thumbnailPreview}>
                            <div className={styles.thumbTitleLine}></div>
                            <div className={styles.thumbSubtitleLine}></div>
                        </div>
                    )}
                    {slide.id === 'agenda_slide' && (
                        <div className={styles.thumbnailPreview}>
                            <div className={styles.thumbBullet}></div>
                            <div className={styles.thumbBullet}></div>
                            <div className={styles.thumbBullet}></div>
                        </div>
                    )}
                    {(slide.id === 'introduction_slide' ||
                        slide.id === 'milestones_slide' ||
                        slide.id === 'business_segments_slide' ||
                        slide.id === 'financial_highlights_slide' ||
                        slide.id === 'case_study_slide' ||
                        slide.id === 'conclusion_slide') && (
                        <div className={styles.thumbnailPreview}>
                            <div className={styles.thumbTextLine}></div>
                            <div className={styles.thumbTextLineShort}></div>
                            <div className={styles.thumbBullet}></div>
                            <div className={styles.thumbBullet}></div>
                        </div>
                    )}
                    {slide.id === 'qna_slide' && (
                        <div className={styles.thumbnailPreview}>
                            <div className={styles.thumbTextLine}></div>
                            <div className={styles.thumbThankYou}>?</div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderSlideContent = (slide = currentSlide) => {
        console.log(slide)

        // Helper function to get field value by id
        const getFieldValue = (fields, fieldId) => {
            return fields[fieldId]?.value || '';
        };

        // Helper function to get array field values
        const getArrayFieldValues = (fields, fieldId) => {
            const field = fields[fieldId];
            if (!field || !field.value) return [];

            // For array fields, value is an array of objects like [{item1: {value: "text"}}, {item2: {value: "text"}}]
            return field.value.map(item => {
                const key = Object.keys(item)[0];
                return item[key].value;
            });
        };

        switch (slide.id) {
            case 'title_slide':
                return (
                    <div className={styles.titleSlide}>
                        <h1 className={styles.mainTitle}>{getFieldValue(slide.fields, 'title')}</h1>
                        <h2 className={styles.subtitle}>{getFieldValue(slide.fields, 'subtitle')}</h2>
                        <div className={styles.metaInfo}>
                            <p className={styles.presenter}>{getFieldValue(slide.fields, 'presenter')}</p>
                            <p className={styles.date}>{getFieldValue(slide.fields, 'date')}</p>
                        </div>
                    </div>
                );

            case 'agenda_slide':
                return (
                    <div className={styles.agendaSlide}>
                        <h2 className={styles.slideTitle}>Agenda</h2>
                        <ul className={styles.agendaList}>
                            {getArrayFieldValues(slide.fields, 'agenda_items').map((item, index) => (
                                <li key={index} className={styles.agendaItem}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'introduction_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>Introduction to Disney</h2>
                        <p className={styles.introText}>{getFieldValue(slide.fields, 'introduction_text')}</p>
                        <ul className={styles.factsList}>
                            {getArrayFieldValues(slide.fields, 'key_facts').map((fact, index) => (
                                <li key={index} className={styles.factItem}>
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'milestones_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>Key Milestones</h2>
                        <ul className={styles.milestonesList}>
                            {getArrayFieldValues(slide.fields, 'milestones').map((milestone, index) => (
                                <li key={index} className={styles.milestoneItem}>
                                <span className={styles.milestoneYear}>
                                    {milestone.split(':')[0]}:
                                </span>
                                    <span className={styles.milestoneText}>
                                    {milestone.split(':').slice(1).join(':')}
                                </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'business_segments_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>Business Segments</h2>
                        <ul className={styles.segmentsList}>
                            {getArrayFieldValues(slide.fields, 'segments').map((segment, index) => (
                                <li key={index} className={styles.segmentItem}>
                                    {segment}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'financial_highlights_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>Financial Highlights</h2>
                        <ul className={styles.dataList}>
                            {getArrayFieldValues(slide.fields, 'financial_data').map((data, index) => (
                                <li key={index} className={styles.dataItem}>
                                    {data}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'case_study_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>Case Study: Disney+</h2>
                        <p className={styles.contentText}>{getFieldValue(slide.fields, 'case_study_text')}</p>
                        <ul className={styles.metricsList}>
                            {getArrayFieldValues(slide.fields, 'key_metrics').map((metric, index) => (
                                <li key={index} className={styles.metricItem}>
                                    {metric}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'conclusion_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>Conclusion</h2>
                        <p className={styles.contentText}>{getFieldValue(slide.fields, 'conclusion_text')}</p>
                        <ul className={styles.takeawaysList}>
                            {getArrayFieldValues(slide.fields, 'takeaways').map((takeaway, index) => (
                                <li key={index} className={styles.takeawayItem}>
                                    {takeaway}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'qna_slide':
                return (
                    <div className={styles.qnaSlide}>
                        <h2 className={styles.slideTitle}>Q&A</h2>
                        <p className={styles.qnaText}>{getFieldValue(slide.fields, 'qna_text')}</p>
                    </div>
                );

            default:
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>{slide.id}</h2>
                        <p>Slide content not defined</p>
                    </div>
                );
        }
    };


    if (!presentationData || !presentationData.slides || presentationData.slides.length === 0) {
        return (
            <div className={styles.presentationContainer}>
                <div className={styles.noPresentation}>
                    <div className={styles.noPresentationIcon}>📊</div>
                    <h1 className={styles.noPresentationTitle}>Презентация не найдена</h1>
                    <p className={styles.noPresentationText}>
                        {!presentationData
                            ? "Данные презентации не загружены"
                            : "Нет доступных слайдов для отображения"
                        }
                    </p>
                    <div className={styles.noPresentationActions}>
                        <button className={styles.refreshButton} onClick={() => navigate(0)}>
                            Обновить страницу
                        </button>
                        <button className={styles.backButton} onClick={() => navigate(-1)}>
                            Вернуться назад
                        </button>
                    </div>
                    <div className={styles.noPresentationHelp}>
                        <p>Если проблема сохраняется, проверьте:</p>
                        <ul>
                            <li>Корректность данных презентации</li>
                            <li>Наличие интернет-соединения</li>
                            <li>Доступность всех ресурсов</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    const currentSlide = presentationData?.slides[currentSlideIndex];


    return (
        <div
            className={styles.presentationContainer}
            tabIndex={0}
        >
                <div className={styles.thumbnailsSidebar}>
                    <div className={styles.thumbnailsHeader}>
                        <h3>Слайды</h3>
                        <span className={styles.slidesCount}>
              {currentSlideIndex + 1} / {presentationData.slides.length}
            </span>
                    </div>
                    <div className={styles.thumbnailsList}>
                        {presentationData.slides.map((slide, index) =>
                            renderSlideThumbnail(slide, index)
                        )}
                    </div>
                </div>

            <div
                className={`${styles.slideContainer} ${styles.withThumbnails}`}
            >
                {renderSlideContent()}


            </div>

            <div className={styles.presentationHeader}>
                <button
                    className={styles.downloadPptxButton}
                    onClick={handleDownload}
                    title="Скачать в формате PPTX"
                    disabled={!presentationData || !presentationData.slides.length}
                >
                    📥 Скачать PPTX
                </button>
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
            </div>

            <div className={styles.navigation}>
                <button
                    className={styles.navButton}
                    onClick={prevSlide}
                    disabled={currentSlideIndex === 0}
                >
                    Назад
                </button>

                <div className={styles.slideIndicators}>
                    {presentationData.slides.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.slideDot} ${currentSlideIndex === index ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                            title={`Слайд ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    className={styles.navButton}
                    onClick={nextSlide}
                    disabled={currentSlideIndex === presentationData.slides.length - 1}
                >
                    Вперед
                </button>
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{
                        width: `${((currentSlideIndex + 1) / presentationData.slides.length) * 100}%`
                    }}
                />
            </div>
        </div>
    );
};

export default Presentation;