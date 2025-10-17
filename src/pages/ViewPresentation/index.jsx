import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import {usePresentationsContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import data from '/public/generated_slide.json'

const Presentation = () => {
    const {id} = useParams();
    const { getPresentation } = usePresentationsContext();
    const presentationData = getPresentation(id) || data;
    const navigate = useNavigate();

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const currentSlide = presentationData?.slides[currentSlideIndex];

    const nextSlide = useCallback(() => {
        if (currentSlideIndex < presentationData?.slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    }, [currentSlideIndex, presentationData?.slides.length]);

    const prevSlide = useCallback(() => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    }, [currentSlideIndex]);



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

    const renderSlideContent = (slide=currentSlide) => {
        console.log(slide)
        switch (slide.id) {
            case 'title_slide':
                return (
                    <div className={styles.titleSlide}>
                        <h1 className={styles.mainTitle}>{slide.fields.title.value}</h1>
                        <h2 className={styles.subtitle}>{slide.fields.subtitle.value}</h2>
                        <div className={styles.metaInfo}>
                            <p className={styles.presenter}>{slide.fields.presenter.value}</p>
                            <p className={styles.date}>{slide.fields.date.value}</p>
                        </div>
                    </div>
                );

            case 'agenda_slide':
                return (
                    <div className={styles.agendaSlide}>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        <ul className={styles.agendaList}>
                            {slide.fields.agenda_items.value.map((item, index) => (
                                <li key={index} className={styles.agendaItem}>
                                    {Object.values(item)[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'introduction_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        <p className={styles.introText}>{slide.fields.introduction_text.value}</p>
                        <ul className={styles.factsList}>
                            {slide.fields.key_facts.value.map((fact, index) => (
                                <li key={index} className={styles.factItem}>
                                    {Object.values(fact)[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'milestones_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        <ul className={styles.milestonesList}>
                            {slide.fields.milestones.value.map((milestone, index) => (
                                <li key={index} className={styles.milestoneItem}>
                  <span className={styles.milestoneYear}>
                    {Object.values(milestone)[0].split(':')[0]}:
                  </span>
                                    <span className={styles.milestoneText}>
                    {Object.values(milestone)[0].split(':').slice(1).join(':')}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'business_segments_slide':
            case 'financial_highlights_slide':
            case 'case_study_slide':
            case 'conclusion_slide':
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        {slide.fields.introduction_text && (
                            <p className={styles.contentText}>{slide.fields.introduction_text.value}</p>
                        )}
                        {slide.fields.case_study_text && (
                            <p className={styles.contentText}>{slide.fields.case_study_text.value}</p>
                        )}
                        {slide.fields.conclusion_text && (
                            <p className={styles.contentText}>{slide.fields.conclusion_text.value}</p>
                        )}

                        {slide.fields.segments && (
                            <ul className={styles.segmentsList}>
                                {slide.fields.segments.value.map((segment, index) => (
                                    <li key={index} className={styles.segmentItem}>
                                        {Object.values(segment)[0]}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {slide.fields.financial_data && (
                            <ul className={styles.dataList}>
                                {slide.fields.financial_data.value.map((data, index) => (
                                    <li key={index} className={styles.dataItem}>
                                        {Object.values(data)[0]}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {slide.fields.key_metrics && (
                            <ul className={styles.metricsList}>
                                {slide.fields.key_metrics.value.map((metric, index) => (
                                    <li key={index} className={styles.metricItem}>
                                        {Object.values(metric)[0]}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {slide.fields.takeaways && (
                            <ul className={styles.takeawaysList}>
                                {slide.fields.takeaways.value.map((takeaway, index) => (
                                    <li key={index} className={styles.takeawayItem}>
                                        {Object.values(takeaway)[0]}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );

            case 'qna_slide':
                return (
                    <div className={styles.qnaSlide}>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        <p className={styles.qnaText}>{slide.fields.qna_text.value}</p>
                    </div>
                );

            default:
                return (
                    <div className={styles.contentSlide}>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
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