import {
    useRef,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
    type Variants,
} from "motion/react";

import "./Results.css";


const ease = [0.22, 1, 0.36, 1] as const;


/* =====================================================
   ANIMAÇÕES
===================================================== */

const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.7,
            ease,
        },
    },
};


const imageVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 1.025,
    },

    animate: {
        opacity: 1,
        scale: 1,

        transition: {
            duration: 0.5,
            ease,
        },
    },

    exit: {
        opacity: 0,
        scale: .99,

        transition: {
            duration: 0.24,
            ease,
        },
    },
};


/* =====================================================
   RESULTADOS
===================================================== */

const resultOptions = [

    {
        key: "brilho",

        label: "Brilho",

        title: "Brilho que aparece.",

        text:
            "Um acabamento mais luminoso, que chama atenção no espelho.",

        image:
            `${import.meta.env.BASE_URL}images/brilho-intenso.webp`,

        alt:
            "Cabelo com brilho intenso após a finalização com o Queridinho Supreme",
    },


    {
        key: "alinhamento",

        label: "Alinhamento",

        title: "Mais alinhamento.",

        text:
            "Pontas com aparência mais cuidada e fios visualmente mais polidos.",

        image:
            `${import.meta.env.BASE_URL}images/frizz-controlado.webp`,

        alt:
            "Cabelo alinhado e com frizz visualmente controlado após a finalização",
    },


    {
        key: "maciez",

        label: "Maciez",

        title: "Toque que entrega cuidado.",

        text:
            "Maciez e sedosidade sem aquela sensação pesada nos fios.",

        image:
            `${import.meta.env.BASE_URL}images/maciez-absoluta.webp`,

        alt:
            "Cabelo macio e sedoso após a finalização com o Queridinho Supreme",
    },


    {
        key: "perfume",

        label: "Perfume",

        title: "O detalhe que fica.",

        text:
            "Uma fragrância sofisticada que completa a experiência do atendimento.",

        image:
            `${import.meta.env.BASE_URL}images/perfume-marcante.webp`,

        alt:
            "Cabelo finalizado com a fragrância do Queridinho Supreme",
    },

];


/* =====================================================
   PROVAS SOCIAIS
===================================================== */

const testimonials = [

    `${import.meta.env.BASE_URL}images/prova2.webp`,
    `${import.meta.env.BASE_URL}images/prova1.webp`,
    `${import.meta.env.BASE_URL}images/prova3.webp`,
    `${import.meta.env.BASE_URL}images/prova4.webp`,
    `${import.meta.env.BASE_URL}images/prova5.webp`,
    `${import.meta.env.BASE_URL}images/prova6.webp`,
    `${import.meta.env.BASE_URL}images/prova7.webp`,
    `${import.meta.env.BASE_URL}images/prova8.webp`,
    `${import.meta.env.BASE_URL}images/prova9.webp`,
    `${import.meta.env.BASE_URL}images/prova10.webp`,
    `${import.meta.env.BASE_URL}images/prova11.webp`,
    `${import.meta.env.BASE_URL}images/prova12.webp`,

];


/* =====================================================
   COMPONENTE
===================================================== */

function Results() {

    const [
        activeResult,
        setActiveResult,
    ] = useState(0);


    const [
        selectedTestimonial,
        setSelectedTestimonial,
    ] = useState<number | null>(null);


    const testimonialRef =
        useRef<HTMLDivElement>(null);


    const currentResult =
        resultOptions[activeResult];


    /* =================================================
       ROLAGEM DAS PROVAS
    ================================================= */

    const scrollTestimonials = (
        direction: "next" | "prev",
    ) => {

        const element =
            testimonialRef.current;


        if (!element) {
            return;
        }


        element.scrollBy({

            left:
                direction === "next"
                    ? element.clientWidth * .82
                    : -element.clientWidth * .82,

            behavior:
                "smooth",

        });

    };


    /* =================================================
       RESULTADO
    ================================================= */

    const handleResultChange = (
        index: number,
    ) => {

        setActiveResult(index);

    };


    return (

        <section
            className="results"
            id="resultados"
        >

            <div className="results-container">


                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    className="results-header"

                    variants={fadeUpVariants}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .25,
                    }}
                >

                    <span className="results-eyebrow">
                        03 • RESULTADO + PROVA
                    </span>


                    <h2>
                        O acabamento aparece.

                        <span>
                            A cliente percebe.
                        </span>
                    </h2>


                    <p>
                        Escolha um detalhe e veja como o último
                        passo pode mudar a percepção de uma
                        finalização.
                    </p>

                </motion.div>


                {/* =================================================
                    RESULTADO INTERATIVO
                ================================================= */}

                <div className="results-showcase">


                    {/* =================================================
                        CONTROLES
                    ================================================= */}

                    <motion.div
                        className="results-controls"

                        variants={fadeUpVariants}

                        initial="hidden"

                        whileInView="visible"

                        viewport={{
                            once: true,
                            amount: .15,
                        }}
                    >

                        <span className="results-small-label">
                            ESCOLHA O QUE VOCÊ QUER VER
                        </span>


                        <div
                            className="results-selector"

                            role="tablist"

                            aria-label="Resultados do Queridinho Supreme"
                        >

                            {resultOptions.map(
                                (
                                    option,
                                    index,
                                ) => (

                                    <button
                                        key={option.key}

                                        type="button"

                                        role="tab"

                                        aria-selected={
                                            activeResult === index
                                        }

                                        className={
                                            activeResult === index
                                                ? "results-selector-button active"
                                                : "results-selector-button"
                                        }

                                        onClick={() =>
                                            handleResultChange(index)
                                        }
                                    >

                                        <span>
                                            0{index + 1}
                                        </span>


                                        <strong>
                                            {option.label}
                                        </strong>


                                        <em>
                                            →
                                        </em>

                                    </button>

                                ),
                            )}

                        </div>


                        <div
                            className="results-interaction-hint"
                            aria-hidden="true"
                        >
                            <span>
                                ↓
                            </span>
                        </div>

                    </motion.div>


                    {/* =================================================
                        VISUAL
                    ================================================= */}

                    <motion.div
                        className="results-visual"

                        initial={{
                            opacity: 0,
                            y: 24,
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}

                        viewport={{
                            once: true,
                            amount: .18,
                        }}

                        transition={{
                            duration: .8,
                            delay: .05,
                            ease,
                        }}
                    >

                        <AnimatePresence
                            mode="wait"
                        >

                            <motion.img

                                key={
                                    currentResult.key
                                }

                                className="results-main-image"

                                src={
                                    currentResult.image
                                }

                                alt={
                                    currentResult.alt
                                }

                                loading="lazy"

                                decoding="async"

                                variants={
                                    imageVariants
                                }

                                initial="initial"

                                animate="animate"

                                exit="exit"

                            />

                        </AnimatePresence>


                        <div className="results-visual-label">

                            <span>
                                QUERIDINHO SUPREME
                            </span>


                            <strong>
                                {currentResult.label}
                            </strong>

                        </div>

                    </motion.div>


                    {/* =================================================
                        RESULTADO ATIVO
                    ================================================= */}

                    <motion.div
                        className="results-result-info"

                        key={
                            currentResult.key
                        }

                        initial={{
                            opacity: 0,
                            y: 18,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            duration: .45,
                            ease,
                        }}
                    >

                        <span className="results-result-label">
                            0{activeResult + 1}
                        </span>


                        <h3>
                            {currentResult.title}
                        </h3>


                        <p>
                            {currentResult.text}
                        </p>


                        <div className="results-belief">

                            <span aria-hidden="true">
                                ✦
                            </span>


                            <p>
                                Porque quando o último detalhe
                                está certo,

                                <strong>
                                    {" "}todo o seu trabalho aparece.
                                </strong>
                            </p>

                        </div>

                    </motion.div>

                </div>


                {/* =================================================
                    PROVA SOCIAL
                ================================================= */}

                <motion.div
                    className="results-proof"

                    variants={fadeUpVariants}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .15,
                    }}
                >

                    <div className="results-proof-heading">

                        <div>

                            <span className="results-small-label">
                                EXPERIÊNCIAS DE PROFISSIONAIS
                            </span>


                            <h3>
                                Quem entende de cabelo,

                                <em>
                                    recomenda.
                                </em>
                            </h3>


                            <p className="results-proof-subtitle">
                                Veja o que profissionais compartilham
                                sobre o Queridinho no dia a dia.
                            </p>

                        </div>


                        <div className="results-proof-controls">

                            <button
                                type="button"

                                className="results-arrow"

                                onClick={() =>
                                    scrollTestimonials("prev")
                                }

                                aria-label="Mostrar provas anteriores"
                            >
                                ‹
                            </button>


                            <button
                                type="button"

                                className="results-arrow"

                                onClick={() =>
                                    scrollTestimonials("next")
                                }

                                aria-label="Mostrar próximas provas"
                            >
                                ›
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        CARROSSEL
                    ================================================= */}

                    <div
                        ref={testimonialRef}

                        className="results-testimonials"
                    >

                        <div className="results-testimonials-track">

                            {testimonials.map(
                                (
                                    image,
                                    index,
                                ) => (

                                    <motion.button
                                        key={image}

                                        type="button"

                                        className="results-testimonial"

                                        whileHover={{
                                            y: -5,
                                        }}

                                        whileTap={{
                                            scale: .985,
                                        }}

                                        onClick={() =>
                                            setSelectedTestimonial(
                                                index,
                                            )
                                        }

                                        aria-label={
                                            `Ampliar experiência ${index + 1}`
                                        }
                                    >

                                        <img
                                            src={image}

                                            alt={
                                                `Experiência profissional ${index + 1} sobre o Queridinho Supreme`
                                            }

                                            loading="lazy"

                                            decoding="async"
                                        />

                                    </motion.button>

                                ),
                            )}

                        </div>

                    </div>


                    <div className="results-proof-hint">

                        <span>
                            ←
                        </span>

                        <span>
                            Deslize para ver mais experiências
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </motion.div>


                {/* =================================================
                    PONTE PARA FÓRMULA
                ================================================= */}

                <motion.div
                    className="results-transition"

                    variants={fadeUpVariants}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .3,
                    }}
                >

                    <span
                        aria-hidden="true"
                    />


                    <div>

                        <span className="results-transition-eyebrow">
                            O RESULTADO CHAMA ATENÇÃO
                        </span>


                        <p>
                            Mas existe uma razão por trás desse acabamento.

                            <strong>
                                {" "}E ela começa na fórmula.
                            </strong>
                        </p>

                    </div>

                </motion.div>

            </div>


            {/* =====================================================
                LIGHTBOX
            ===================================================== */}

            <AnimatePresence>

                {selectedTestimonial !== null && (

                    <motion.div
                        className="results-lightbox"

                        initial={{
                            opacity: 0,
                        }}

                        animate={{
                            opacity: 1,
                        }}

                        exit={{
                            opacity: 0,
                        }}

                        role="dialog"

                        aria-modal="true"

                        aria-label="Experiência profissional ampliada"

                        onClick={() =>
                            setSelectedTestimonial(null)
                        }
                    >

                        <button
                            type="button"

                            className="results-lightbox-close"

                            onClick={() =>
                                setSelectedTestimonial(null)
                            }

                            aria-label="Fechar"
                        >
                            ×
                        </button>


                        <motion.img

                            src={
                                testimonials[
                                    selectedTestimonial
                                ]
                            }

                            alt={
                                `Experiência profissional ampliada ${selectedTestimonial + 1}`
                            }

                            initial={{
                                opacity: 0,
                                scale: .96,
                            }}

                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}

                            transition={{
                                duration: .35,
                                ease,
                            }}

                            onClick={(event) =>
                                event.stopPropagation()
                            }

                        />

                    </motion.div>

                )}

            </AnimatePresence>

        </section>
    );
}


export default Results;