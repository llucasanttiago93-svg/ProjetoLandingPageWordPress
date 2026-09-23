import { useState } from "react";

import {
    AnimatePresence,
    motion,
    type Variants,
} from "motion/react";

import "./HowTo.css";


/* =====================================================
   ANIMAÇÃO
===================================================== */

const ease = [
    0.22,
    1,
    0.36,
    1,
] as const;


const fadeUp: Variants = {

    hidden: {
        opacity: 0,
        y: 20,
    },


    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: .65,
            ease,
        },
    },

};


const cardVariants: Variants = {

    hidden: {
        opacity: 0,
        y: 18,
    },


    visible: (index: number) => ({
        opacity: 1,
        y: 0,

        transition: {
            duration: .55,
            delay: index * .07,
            ease,
        },
    }),

};


/* =====================================================
   JORNADA
===================================================== */

type JourneyStep = {

    number: string;

    eyebrow: string;

    title: string;

    description: string;

    detail: string;

    image: string;

    imageAlt: string;

};


const journeySteps: JourneyStep[] = [

    {
        number: "01",

        eyebrow: "NO SALÃO",

        title: "Você finaliza.",

        description:
            "Depois da escova ou prancha, aplique uma pequena quantidade no comprimento e nas pontas.",

        detail:
            "1–2 pumps são suficientes para completar o último passo da produção.",

        image:
            "images/aplicando-na-mao.webp",

        imageAlt:
            "Cabeleireira aplicando o Queridinho Supreme nas mãos",
    },


    {
        number: "02",

        eyebrow: "O RESULTADO",

        title: "Ela percebe.",

        description:
            "Brilho, maciez, alinhamento e perfume ajudam a deixar o acabamento mais completo e perceptível.",

        detail:
            "O resultado aparece no espelho e também na experiência do toque.",

        image:
            "images/finalizando.webp",

        imageAlt:
            "Cabelo sendo finalizado com o Queridinho Supreme",
    },


    {
        number: "03",

        eyebrow: "A REAÇÃO",

        title: "Ela pergunta.",

        description:
            "Quando a cliente percebe uma diferença no acabamento, o produto usado no atendimento entra naturalmente na conversa.",

        detail:
            "“O que você passou no meu cabelo?”",

        image:
            "images/espalhando-no-cabelo.webp",

        imageAlt:
            "Profissional distribuindo o produto no comprimento e nas pontas",
    },


    {
        number: "04",

        eyebrow: "SALÃO → CASA",

        title: "Ela leva para casa.",

        description:
            "Você pode indicar o mesmo produto para ela continuar a experiência na rotina de cuidados em casa.",

        detail:
            "Seu atendimento termina. O produto pode continuar presente depois dele.",

        image:
            "images/hero-supreme.webp",

        imageAlt:
            "Queridinho Supreme associado à experiência de cabelo finalizado",
    },

];


/* =====================================================
   COMPONENTE
===================================================== */

function HowTo() {

    const [
        activeStep,
        setActiveStep,
    ] = useState(0);


    const currentStep =
        journeySteps[activeStep];


    return (

        <section
            className="howto"
            id="como-usar"
        >

            <div className="howto-container">


                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    className="howto-header"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .25,
                    }}
                >

                    <span className="howto-eyebrow">
                        05 • SALÃO → CASA
                    </span>


                    <h2>
                        Você finaliza.

                        <span>
                            A experiência continua.
                        </span>
                    </h2>


                    <p>
                        O último passo acontece no salão.
                        A percepção da cliente pode continuar
                        depois dele.
                    </p>

                </motion.div>


                {/* =================================================
                    JORNADA
                ================================================= */}

                <div className="howto-journey">


                    {/* =================================================
                        NAVEGAÇÃO
                    ================================================= */}

                    <motion.div
                        className="howto-navigation"

                        initial="hidden"

                        whileInView="visible"

                        viewport={{
                            once: true,
                            amount: .15,
                        }}

                        variants={{
                            hidden: {},

                            visible: {
                                transition: {
                                    staggerChildren: .08,
                                },
                            },
                        }}
                    >

                        {journeySteps.map(
                            (
                                step,
                                index,
                            ) => (

                                <motion.button

                                    key={
                                        step.number
                                    }

                                    type="button"

                                    className={`journey-tab ${
                                        activeStep === index
                                            ? "is-active"
                                            : ""
                                    }`}

                                    onClick={() =>
                                        setActiveStep(index)
                                    }

                                    aria-selected={
                                        activeStep === index
                                    }

                                    variants={
                                        cardVariants
                                    }

                                    custom={
                                        index
                                    }

                                    whileTap={{
                                        scale: .99,
                                    }}
                                >

                                    <span className="journey-tab-number">
                                        {step.number}
                                    </span>


                                    <span className="journey-tab-content">

                                        <small>
                                            {
                                                step.eyebrow
                                            }
                                        </small>


                                        <strong>
                                            {
                                                step.title
                                            }
                                        </strong>

                                    </span>

                                </motion.button>

                            ),
                        )}

                    </motion.div>


                    {/* =================================================
                        PALCO
                    ================================================= */}

                    <motion.div
                        className="howto-stage"

                        key={
                            currentStep.number
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
                            duration: .55,
                            ease,
                        }}
                    >


                        {/* =================================================
                            IMAGEM
                        ================================================= */}

                        <div className="howto-stage-image">

                            <AnimatePresence
                                mode="wait"
                            >

                                <motion.img

                                    key={
                                        currentStep.image
                                    }

                                    src={
                                        `${import.meta.env.BASE_URL}${currentStep.image}`
                                    }

                                    alt={
                                        currentStep.imageAlt
                                    }

                                    loading="lazy"

                                    decoding="async"

                                    initial={{
                                        opacity: 0,
                                        scale: 1.03,
                                    }}

                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}

                                    exit={{
                                        opacity: 0,
                                        scale: .985,
                                    }}

                                    transition={{
                                        duration: .5,
                                        ease,
                                    }}

                                />

                            </AnimatePresence>


                            <div className="howto-stage-badge">

                                <span>
                                    {
                                        currentStep.number
                                    }
                                </span>


                                <small>
                                    {
                                        currentStep.eyebrow
                                    }
                                </small>

                            </div>

                        </div>


                        {/* =================================================
                            CONTEÚDO
                        ================================================= */}

                        <div className="howto-stage-content">

                            <AnimatePresence
                                mode="wait"
                            >

                                <motion.div

                                    key={
                                        currentStep.number
                                    }

                                    className="howto-active-content"

                                    variants={
                                        fadeUp
                                    }

                                    initial="hidden"

                                    animate="visible"

                                    exit={{
                                        opacity: 0,
                                        y: -10,
                                    }}
                                >

                                    <span className="howto-active-eyebrow">
                                        {
                                            currentStep.eyebrow
                                        }
                                    </span>


                                    <h3>
                                        {
                                            currentStep.title
                                        }
                                    </h3>


                                    <p className="howto-active-description">
                                        {
                                            currentStep.description
                                        }
                                    </p>


                                    <div className="howto-detail">

                                        <span aria-hidden="true">
                                            ✦
                                        </span>


                                        <p>
                                            {
                                                currentStep.detail
                                            }
                                        </p>

                                    </div>

                                </motion.div>

                            </AnimatePresence>


                            {/* =================================================
                                SEQUÊNCIA
                            ================================================= */}

                            <div className="howto-sequence">

                                <span className="sequence-line" />


                                <p>
                                    Você entrega o resultado.

                                    <strong>
                                        {" "}Ela leva a experiência com ela.
                                    </strong>
                                </p>

                            </div>

                        </div>

                    </motion.div>

                </div>


                {/* =================================================
                    COMO USAR — RESUMO
                ================================================= */}

                <motion.div
                    className="howto-mini-steps"

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .2,
                    }}

                    variants={{
                        hidden: {},

                        visible: {
                            transition: {
                                staggerChildren: .1,
                            },
                        },
                    }}
                >

                    <motion.div
                        className="mini-step"

                        variants={cardVariants}

                        custom={0}
                    >

                        <span>
                            01
                        </span>


                        <div>

                            <strong>
                                Aplique
                            </strong>


                            <p>
                                1–2 pumps nas mãos.
                            </p>

                        </div>

                    </motion.div>


                    <motion.div
                        className="mini-step"

                        variants={cardVariants}

                        custom={1}
                    >

                        <span>
                            02
                        </span>


                        <div>

                            <strong>
                                Distribua
                            </strong>


                            <p>
                                Comprimento e pontas.
                            </p>

                        </div>

                    </motion.div>


                    <motion.div
                        className="mini-step"

                        variants={cardVariants}

                        custom={2}
                    >

                        <span>
                            03
                        </span>


                        <div>

                            <strong>
                                Finalize
                            </strong>


                            <p>
                                Sem enxágue.
                            </p>

                        </div>

                    </motion.div>

                </motion.div>


                {/* =================================================
                    FECHAMENTO
                ================================================= */}

                <motion.div
                    className="howto-closing"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .25,
                    }}
                >

                    <span className="howto-closing-mark">
                        ✦
                    </span>


                    <p>
                        Você entrega o resultado.

                        <strong>
                            {" "}O Queridinho ajuda a entregar o acabamento.
                        </strong>
                    </p>

                </motion.div>

            </div>

        </section>
    );
}


export default HowTo;