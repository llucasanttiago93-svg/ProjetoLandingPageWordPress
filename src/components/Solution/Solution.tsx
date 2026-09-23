import { useState } from "react";
import {
    motion,
    type Variants,
} from "motion/react";

import "./Solution.css";


const ease = [0.22, 1, 0.36, 1] as const;


/* =====================================================
   TIPAGEM
===================================================== */

type OpportunityStep = {
    number: string;
    label: string;
    title: string;
    description: string;
    detail: string;
};


/* =====================================================
   ETAPAS DA OPORTUNIDADE
===================================================== */

const opportunitySteps: OpportunityStep[] = [
    {
        number: "01",
        label: "NO SALÃO",
        title: "Você já conquistou o mais difícil.",
        description:
            "A cliente sentou na sua cadeira, confiou no seu trabalho e chegou até o resultado final.",
        detail:
            "Existe confiança. Existe atenção. Existe uma experiência acontecendo naquele momento.",
    },

    {
        number: "02",
        label: "NO ACABAMENTO",
        title: "É aqui que o detalhe ganha valor.",
        description:
            "Brilho, maciez, alinhamento e perfume ajudam a transformar uma boa finalização em uma experiência mais completa.",
        detail:
            "O acabamento não substitui o seu trabalho. Ele ajuda a revelar tudo o que você acabou de fazer.",
    },

    {
        number: "03",
        label: "DEPOIS DO SALÃO",
        title: "E a experiência não precisa terminar ali.",
        description:
            "Quando a cliente gosta do que percebe, o produto usado na finalização pode continuar presente na rotina dela em casa.",
        detail:
            "A conversa pode sair do “o que você usou?” e chegar ao “posso levar um para mim?”.",
    },
];


/* =====================================================
   ANIMAÇÕES
===================================================== */

const headerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 22,
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


const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 18,
    },

    visible: (index: number) => ({
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.6,
            delay: index * 0.08,
            ease,
        },
    }),
};


/* =====================================================
   SOLUTION / OPORTUNIDADE
===================================================== */

function Solution() {

    const [activeStep, setActiveStep] = useState(0);

    const currentStep =
        opportunitySteps[activeStep];


    return (

        <section
            className="solution"
            id="beneficios"
        >

            <div className="solution-container">


                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    className="solution-header"

                    variants={headerVariants}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                >

                    <span className="solution-eyebrow">
                        02 • OPORTUNIDADE
                    </span>


                    <h2>
                        Você já conquistou o mais difícil.

                        <span>
                            A cliente está na sua cadeira.
                        </span>
                    </h2>


                    <p>
                        Agora, o último detalhe pode fazer parte
                        da experiência — e abrir espaço para
                        continuar essa relação depois do salão.
                    </p>

                </motion.div>


                {/* =================================================
                    OPORTUNIDADES
                ================================================= */}

                <div className="solution-opportunities">


                    {opportunitySteps.map(
                        (step, index) => (

                            <motion.button
                                key={step.number}

                                type="button"

                                className={`solution-opportunity ${
                                    activeStep === index
                                        ? "is-active"
                                        : ""
                                }`}

                                onClick={() =>
                                    setActiveStep(index)
                                }

                                custom={index}

                                variants={cardVariants}

                                initial="hidden"

                                whileInView="visible"

                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}

                                whileHover={{
                                    y: -4,
                                }}

                                whileTap={{
                                    scale: 0.99,
                                }}

                                aria-pressed={
                                    activeStep === index
                                }
                            >

                                <div className="solution-opportunity-top">

                                    <span className="solution-opportunity-number">
                                        {step.number}
                                    </span>

                                    <span className="solution-opportunity-label">
                                        {step.label}
                                    </span>

                                </div>


                                <strong>
                                    {step.title}
                                </strong>


                                <span className="solution-opportunity-arrow">
                                    →
                                </span>

                            </motion.button>

                        ),
                    )}

                </div>


                {/* =================================================
                    CONTEÚDO ATIVO
                ================================================= */}

                <motion.div
                    className="solution-stage"

                    key={currentStep.number}

                    initial={{
                        opacity: 0,
                        y: 18,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        duration: 0.5,
                        ease,
                    }}
                >

                    <div className="solution-stage-meta">

                        <span>
                            {currentStep.number}
                        </span>

                        <strong>
                            {currentStep.label}
                        </strong>

                    </div>


                    <div className="solution-stage-main">

                        <div className="solution-stage-copy">

                            <h3>
                                {currentStep.title}
                            </h3>


                            <p className="solution-stage-description">
                                {currentStep.description}
                            </p>

                        </div>


                        <div className="solution-stage-detail">

                            <span aria-hidden="true">
                                ✦
                            </span>

                            <p>
                                {currentStep.detail}
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        PROGRESSO
                    ================================================= */}

                    <div
                        className="solution-progress"
                        aria-hidden="true"
                    >

                        {opportunitySteps.map(
                            (step, index) => (

                                <span
                                    key={step.number}
                                    className={
                                        index === activeStep
                                            ? "is-active"
                                            : ""
                                    }
                                />

                            ),
                        )}

                    </div>

                </motion.div>


                {/* =================================================
                    PONTES DE OPORTUNIDADE
                ================================================= */}

                <motion.div
                    className="solution-points"

                    initial={{
                        opacity: 0,
                        y: 16,
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}

                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}

                    transition={{
                        duration: 0.65,
                        delay: 0.08,
                        ease,
                    }}
                >

                    <div className="solution-point">

                        <span>
                            01
                        </span>

                        <div>
                            <strong>
                                Você entrega.
                            </strong>

                            <p>
                                O serviço termina com um resultado que você pode mostrar.
                            </p>
                        </div>

                    </div>


                    <div className="solution-point">

                        <span>
                            02
                        </span>

                        <div>
                            <strong>
                                Ela percebe.
                            </strong>

                            <p>
                                O acabamento ajuda a tornar essa diferença visível.
                            </p>
                        </div>

                    </div>


                    <div className="solution-point">

                        <span>
                            03
                        </span>

                        <div>
                            <strong>
                                Ela pergunta.
                            </strong>

                            <p>
                                E uma pergunta pode abrir uma nova conversa.
                            </p>
                        </div>

                    </div>

                </motion.div>


                {/* =================================================
                    FECHAMENTO
                ================================================= */}

                <motion.div
                    className="solution-closing"

                    initial={{
                        opacity: 0,
                    }}

                    whileInView={{
                        opacity: 1,
                    }}

                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}

                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}
                >

                    <span className="solution-closing-line" />


                    <div>

                        <span className="solution-closing-eyebrow">
                            A OPORTUNIDADE
                        </span>


                        <p>
                            Quando o acabamento chama atenção,

                            <strong>
                                {" "}o produto deixa de ser só um detalhe
                                e passa a fazer parte da experiência.
                            </strong>
                        </p>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}


export default Solution;