import { useState } from "react";

import {
    AnimatePresence,
    motion,
    type Variants,
} from "motion/react";

import "./Formula.css";


/* =====================================================
   TIPAGEM
===================================================== */

type FormulaItem = {
    id: string;
    number: string;
    title: string;
    short: string;
    description: string;
    icon: string;
};


/* =====================================================
   FÓRMULA
===================================================== */

const items: FormulaItem[] = [

    {
        id: "jojoba",

        number: "01",

        title: "Óleo de Jojoba",

        short:
            "Maciez com toque leve.",

        description:
            "Ajuda a nutrir os fios e contribui para uma sensação macia e leve durante a finalização.",

        icon:
            "✦",
    },


    {
        id: "buriti",

        number: "02",

        title: "Óleo de Buriti",

        short:
            "Brilho que aparece.",

        description:
            "Ajuda a realçar o brilho e o aspecto luminoso do cabelo após a finalização.",

        icon:
            "◌",
    },


    {
        id: "patua",

        number: "03",

        title: "Óleo de Patauá",

        short:
            "Fios com aspecto mais alinhado.",

        description:
            "Contribui para uma aparência mais macia, sedosa e visualmente alinhada.",

        icon:
            "⌁",
    },


    {
        id: "fragrance",

        number: "04",

        title: "Fragrância sofisticada",

        short:
            "O detalhe que fica.",

        description:
            "Completa a experiência da finalização com uma fragrância marcante e sofisticada.",

        icon:
            "✧",
    },

];


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


const stagger: Variants = {

    hidden: {},


    visible: {

        transition: {

            staggerChildren:
                .07,

            delayChildren:
                .08,

        },

    },

};


/* =====================================================
   COMPONENTE
===================================================== */

function Formula() {

    const [
        activeId,
        setActiveId,
    ] = useState<string | null>(null);


    const activeItem =
        items.find(
            (item) =>
                item.id === activeId,
        );


    /* =================================================
       ABRIR / FECHAR ITEM
    ================================================= */

    const handleItemClick = (
        id: string,
    ) => {

        setActiveId(
            (currentId) =>
                currentId === id
                    ? null
                    : id,
        );

    };


    return (

        <section
            className="formula"
            id="formula"
        >

            <div className="formula-container">


                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    className="formula-header"

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .25,
                    }}
                >

                    <span className="formula-eyebrow">
                        04 • FÓRMULA
                    </span>


                    <h2>
                        É a fórmula por trás
                        <span>
                            do acabamento.
                        </span>
                    </h2>


                    <p>
                        Três óleos vegetais e uma fragrância
                        sofisticada pensados para completar
                        o último passo da finalização.
                    </p>

                </motion.div>


                {/* =================================================
                    PAINEL
                ================================================= */}

                <motion.div
                    className="formula-panel"

                    variants={stagger}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .15,
                    }}
                >


                    {/* =================================================
                        CABEÇALHO PAINEL
                    ================================================= */}

                    <motion.div
                        className="formula-panel-header"

                        variants={fadeUp}
                    >

                        <span>
                            POR QUE A FÓRMULA IMPORTA
                        </span>


                        <h3>
                            Cada ingrediente tem
                            <em>
                                um papel.
                            </em>
                        </h3>

                    </motion.div>


                    {/* =================================================
                        INGREDIENTES
                    ================================================= */}

                    <motion.div
                        className="formula-items"

                        variants={stagger}
                    >

                        {items.map(
                            (item) => {

                                const isActive =
                                    activeId === item.id;


                                return (

                                    <motion.div
                                        key={item.id}

                                        className={
                                            `formula-item ${
                                                isActive
                                                    ? "is-active"
                                                    : ""
                                            }`
                                        }

                                        variants={
                                            fadeUp
                                        }
                                    >

                                        <button
                                            type="button"

                                            className="formula-item-button"

                                            onClick={() =>
                                                handleItemClick(
                                                    item.id,
                                                )
                                            }

                                            aria-expanded={
                                                isActive
                                            }

                                            aria-controls={
                                                `formula-detail-${item.id}`
                                            }
                                        >

                                            <span className="formula-item-number">
                                                {item.number}
                                            </span>


                                            <span className="formula-item-copy">

                                                <strong>
                                                    {item.title}
                                                </strong>


                                                <small>
                                                    {item.short}
                                                </small>

                                            </span>


                                            <span
                                                className="formula-item-icon"

                                                aria-hidden="true"
                                            >
                                                {
                                                    isActive
                                                        ? "−"
                                                        : "+"
                                                }
                                            </span>

                                        </button>


                                        {/* =================================================
                                            DETALHE EXPANSÍVEL
                                        ================================================= */}

                                        <AnimatePresence
                                            initial={false}
                                        >

                                            {isActive && (

                                                <motion.div

                                                    id={
                                                        `formula-detail-${item.id}`
                                                    }

                                                    className="formula-item-detail"

                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}

                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}

                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}

                                                    transition={{
                                                        duration: .3,
                                                        ease,
                                                    }}
                                                >

                                                    <p>
                                                        {item.description}
                                                    </p>

                                                </motion.div>

                                            )}

                                        </AnimatePresence>

                                    </motion.div>

                                );

                            },
                        )}

                    </motion.div>


                    {/* =================================================
                        RESULTADO DINÂMICO
                    ================================================= */}

                    <AnimatePresence
                        mode="wait"
                    >

                        {activeItem ? (

                            <motion.div

                                key={
                                    activeItem.id
                                }

                                className="formula-result"

                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                exit={{
                                    opacity: 0,
                                    y: -8,
                                }}

                                transition={{
                                    duration: .3,
                                    ease,
                                }}
                            >

                                <div className="formula-result-icon">
                                    {
                                        activeItem.icon
                                    }
                                </div>


                                <div>

                                    <span>
                                        O QUE ELE TRAZ
                                    </span>


                                    <p>
                                        {
                                            activeItem.short
                                        }
                                    </p>

                                </div>

                            </motion.div>

                        ) : (

                            <motion.div
                                key="empty"

                                className="formula-result formula-result-empty"

                                initial={{
                                    opacity: 0,
                                }}

                                animate={{
                                    opacity: 1,
                                }}

                                exit={{
                                    opacity: 0,
                                }}
                            >

                                <div className="formula-result-icon">
                                    ✦
                                </div>


                                <div>

                                    <span>
                                        EXPLORE A FÓRMULA
                                    </span>


                                    <p>
                                        Toque em um ingrediente
                                        para entender seu papel.
                                    </p>

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </motion.div>


                {/* =================================================
                    FECHAMENTO
                ================================================= */}

                <motion.div
                    className="formula-closing"

                    initial={{
                        opacity: 0,
                        y: 15,
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}

                    viewport={{
                        once: true,
                        amount: .2,
                    }}

                    transition={{
                        duration: .6,
                        ease,
                    }}
                >

                    <span>
                        ✦
                    </span>


                    <p>
                        O resultado chama atenção.

                        <strong>
                            {" "}A fórmula ajuda a explicar por quê.
                        </strong>
                    </p>

                </motion.div>

            </div>

        </section>
    );
}


export default Formula;