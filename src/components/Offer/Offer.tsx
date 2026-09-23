import { useState } from "react";

import {
    AnimatePresence,
    motion,
    type Variants,
} from "motion/react";

import "./Offer.css";


/* =====================================================
   ANIMAÇÃO
===================================================== */

const ease = [
    0.22,
    1,
    0.36,
    1,
] as const;


const reveal: Variants = {

    hidden: {
        opacity: 0,
        y: 24,
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


/* =====================================================
   PLANOS
===================================================== */

type Plan = {

    id:
        | "single"
        | "professional";

    eyebrow: string;

    title: string;

    description: string;

    price: string;

    cents: string;

    oldPrice?: string;

    unitPrice?: string;

    saving?: string;

    badge?: string;

    image: string;

    alt: string;

    benefits: string[];

    featured?: boolean;

    cta: string;

};


const plans: Plan[] = [

    {
        id: "single",

        eyebrow:
            "PARA CONHECER",

        title:
            "1 Queridinho",

        description:
            "Para experimentar o produto na sua finalização e conhecer a experiência no atendimento.",

        price:
            "47",

        cents:
            ",00",

        image:
            "images/product-front.webp",

        alt:
            "Reparador de pontas Queridinho Supreme 30 ml",

        benefits: [
            "30 ml",
            "Ideal para experimentar no salão",
            "Uso na finalização profissional",
        ],

        cta:
            "QUERO EXPERIMENTAR",
    },


    {
        id: "professional",

        eyebrow:
            "PARA O SALÃO",

        title:
            "Kit Profissional",

        description:
            "6 unidades para usar nos atendimentos, manter estoque e oferecer às clientes.",

        price:
            "150",

        cents:
            ",00",

        oldPrice:
            "R$282,00",

        unitPrice:
            "R$25 por unidade",

        saving:
            "Economize R$132",

        badge:
            "6 UNIDADES",

        image:
            "images/product-front-2un.webp",

        alt:
            "Kit profissional Queridinho Supreme",

        benefits: [
            "6 unidades de 30 ml",
            "R$25 por unidade",
            "Use + indique + revenda",
        ],

        featured:
            true,

        cta:
            "QUERO O KIT PROFISSIONAL",
    },

];


/* =====================================================
   OBJEÇÕES
===================================================== */

const objections = [

    {
        question:
            "Vai pesar no cabelo?",

        answer:
            "A orientação é aplicar uma pequena quantidade no comprimento e nas pontas, evitando a raiz. A proposta é entregar brilho, maciez e alinhamento sem deixar uma sensação pesada.",
    },


    {
        question:
            "Posso usar na finalização profissional?",

        answer:
            "Sim. O Queridinho é apresentado pela Vanti como produto de finalização e pode fazer parte do acabamento do atendimento profissional.",
    },


    {
        question:
            "Serve para diferentes tipos de cabelo?",

        answer:
            "A página atual informa uso em diferentes tipos de cabelo, incluindo lisos, ondulados, cacheados e crespos.",
    },


    {
        question:
            "Minha cliente pode usar em casa?",

        answer:
            "Sim. O produto pode ser aplicado em cabelos secos ou úmidos, no comprimento e nas pontas, sem enxágue, permitindo indicar a continuidade do cuidado em casa.",
    },


    {
        question:
            "Como funciona o envio e o pagamento?",

        answer:
            "A compra é realizada pelo checkout da loja, com as opções disponíveis no momento da compra. A Vanti informa envio para todo o Brasil e compra segura.",
    },

];


/* =====================================================
   COMPONENTE
===================================================== */

function Offer() {

    const [
        activePlan,
        setActivePlan,
    ] = useState<Plan["id"]>(
        "professional",
    );


    const [
        openObjection,
        setOpenObjection,
    ] = useState<number | null>(
        null,
    );


    const currentPlan =
        plans.find(
            (plan) =>
                plan.id === activePlan,
        ) ?? plans[1];


    return (

        <section
            className="offer"
            id="comprar"
        >

            <div className="offer-container">


                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <motion.div
                    className="offer-header"

                    variants={reveal}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .2,
                    }}
                >

                    <span className="offer-eyebrow">
                        06 • OFERTA + OBJEÇÕES
                    </span>


                    <h2>
                        Transforme um bom acabamento

                        <span>
                            em uma nova oportunidade.
                        </span>
                    </h2>


                    <p>
                        Você já viu o resultado, entendeu a fórmula
                        e viu como ele pode continuar depois do salão.
                        Agora escolha como começar.
                    </p>

                </motion.div>


                {/* =================================================
                    ESCOLHA
                ================================================= */}

                <motion.div
                    className="offer-choice"

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

                    {plans.map(
                        (
                            plan,
                            index,
                        ) => (

                            <motion.button

                                key={
                                    plan.id
                                }

                                type="button"

                                className={`offer-choice-tab ${
                                    activePlan === plan.id
                                        ? "is-active"
                                        : ""
                                }`}

                                onClick={() =>
                                    setActivePlan(
                                        plan.id,
                                    )
                                }

                                variants={
                                    reveal
                                }

                                custom={
                                    index
                                }

                                aria-selected={
                                    activePlan === plan.id
                                }
                            >

                                <span>
                                    {
                                        plan.eyebrow
                                    }
                                </span>


                                <strong>
                                    {
                                        plan.title
                                    }
                                </strong>

                            </motion.button>

                        ),
                    )}

                </motion.div>


                {/* =================================================
                    OFERTA
                ================================================= */}

                <div className="offer-stage">

                    <AnimatePresence
                        mode="wait"
                    >

                        <motion.div

                            key={
                                currentPlan.id
                            }

                            className={`offer-product-card ${
                                currentPlan.featured
                                    ? "is-featured"
                                    : ""
                            }`}

                            initial={{
                                opacity: 0,
                                y: 14,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            exit={{
                                opacity: 0,
                                y: -10,
                            }}

                            transition={{
                                duration: .35,
                                ease,
                            }}
                        >


                            {/* =================================================
                                VISUAL
                            ================================================= */}

                            <div className="offer-product-visual">

                                {currentPlan.badge && (

                                    <span className="offer-badge">
                                        {
                                            currentPlan.badge
                                        }
                                    </span>

                                )}


                                <img
                                    src={`${import.meta.env.BASE_URL}${currentPlan.image}`}

                                    alt={
                                        currentPlan.alt
                                    }

                                    loading="lazy"

                                    decoding="async"
                                />

                            </div>


                            {/* =================================================
                                CONTEÚDO
                            ================================================= */}

                            <div className="offer-product-content">

                                <span className="offer-product-eyebrow">
                                    {
                                        currentPlan.eyebrow
                                    }
                                </span>


                                <h3>
                                    {
                                        currentPlan.title
                                    }
                                </h3>


                                <p className="offer-product-description">
                                    {
                                        currentPlan.description
                                    }
                                </p>


                                {/* =================================================
                                    PREÇO
                                ================================================= */}

                                <div className="offer-price-area">

                                    {currentPlan.oldPrice && (

                                        <p className="offer-old-price">
                                            De{" "}
                                            <s>
                                                {
                                                    currentPlan.oldPrice
                                                }
                                            </s>
                                        </p>

                                    )}


                                    <div className="offer-price">

                                        <span>
                                            R$
                                        </span>


                                        <strong>
                                            {
                                                currentPlan.price
                                            }
                                        </strong>


                                        <small>
                                            {
                                                currentPlan.cents
                                            }
                                        </small>

                                    </div>


                                    {currentPlan.unitPrice && (

                                        <span className="offer-unit-price">
                                            {
                                                currentPlan.unitPrice
                                            }
                                        </span>

                                    )}


                                    {currentPlan.saving && (

                                        <span className="offer-saving">
                                            {
                                                currentPlan.saving
                                            }
                                        </span>

                                    )}

                                </div>


                                {/* =================================================
                                    BENEFÍCIOS
                                ================================================= */}

                                <ul className="offer-benefits">

                                    {currentPlan.benefits.map(
                                        (benefit) => (

                                            <li
                                                key={
                                                    benefit
                                                }
                                            >

                                                <span>
                                                    ✓
                                                </span>

                                                {
                                                    benefit
                                                }

                                            </li>

                                        ),
                                    )}

                                </ul>


                                {/* =================================================
                                    CTA
                                ================================================= */}

                                <a
                                    href="#checkout"

                                    className="offer-button"
                                >

                                    {
                                        currentPlan.cta
                                    }

                                    <span
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>

                                </a>


                                <p className="offer-security">
                                    🔒 Compra segura · Pix e cartão
                                </p>

                            </div>

                        </motion.div>

                    </AnimatePresence>

                </div>


                {/* =================================================
                    TABELA DE OPORTUNIDADE
                ================================================= */}

                <motion.div

                    className="offer-opportunity"

                    variants={
                        reveal
                    }

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .15,
                    }}
                >

                    <div className="offer-opportunity-header">

                        <span>
                            SIMULAÇÃO DE OPORTUNIDADE
                        </span>


                        <h3>
                            Use no salão.

                            <em>
                                Ofereça para a cliente.
                            </em>
                        </h3>


                        <p>
                            Exemplo demonstrativo usando os valores
                            atuais da oferta e uma revenda hipotética.
                        </p>

                    </div>


                    <div className="offer-table-wrap">

                        <table className="offer-table">

                            <thead>

                                <tr>

                                    <th>
                                        Por unidade
                                    </th>

                                    <th>
                                        Valor
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                <tr>

                                    <td>
                                        Seu custo
                                    </td>

                                    <td>
                                        R$25*
                                    </td>

                                </tr>


                                <tr>

                                    <td>
                                        Revenda hipotética
                                    </td>

                                    <td>
                                        R$70*
                                    </td>

                                </tr>


                                <tr className="is-highlight">

                                    <td>
                                        Lucro bruto
                                    </td>

                                    <td>
                                        R$45*
                                    </td>

                                </tr>


                                <tr>

                                    <td>
                                        Margem bruta
                                    </td>

                                    <td>
                                        64,3%*
                                    </td>

                                </tr>

                            </tbody>

                        </table>


                        <table className="offer-table">

                            <thead>

                                <tr>

                                    <th>
                                        Kit com 6
                                    </th>

                                    <th>
                                        Valor
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                <tr>

                                    <td>
                                        Investimento
                                    </td>

                                    <td>
                                        R$150*
                                    </td>

                                </tr>


                                <tr>

                                    <td>
                                        Receita hipotética
                                    </td>

                                    <td>
                                        R$420*
                                    </td>

                                </tr>


                                <tr className="is-highlight">

                                    <td>
                                        Lucro bruto potencial
                                    </td>

                                    <td>
                                        R$270*
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>


                    <p className="offer-table-note">
                        *Valores meramente demonstrativos.
                        Substitua pelos valores comerciais reais,
                        custos, impostos, taxas e preço de revenda
                        praticados pelo seu salão.
                    </p>

                </motion.div>


                {/* =================================================
                    CAMINHO
                ================================================= */}

                <motion.div

                    className="offer-value-strip"

                    variants={
                        reveal
                    }

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .2,
                    }}
                >

                    <div>

                        <span>
                            NO SALÃO
                        </span>

                        <strong>
                            Use na finalização.
                        </strong>

                    </div>


                    <span className="offer-strip-arrow">
                        →
                    </span>


                    <div>

                        <span>
                            NA CLIENTE
                        </span>

                        <strong>
                            Ela percebe o resultado.
                        </strong>

                    </div>


                    <span className="offer-strip-arrow">
                        →
                    </span>


                    <div>

                        <span>
                            NO HOME CARE
                        </span>

                        <strong>
                            Você pode indicar.
                        </strong>

                    </div>

                </motion.div>


                {/* =================================================
                    OBJEÇÕES
                ================================================= */}

                <motion.div

                    className="offer-objections"

                    variants={
                        reveal
                    }

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .15,
                    }}
                >

                    <div className="objections-header">

                        <span>
                            ANTES DE COMPRAR
                        </span>


                        <h2>
                            Ainda ficou alguma dúvida?

                            <em>
                                É normal.
                            </em>
                        </h2>


                        <p>
                            As perguntas que mais importam antes
                            de colocar um novo produto no salão.
                        </p>

                    </div>


                    <div className="objections-list">

                        {objections.map(
                            (
                                objection,
                                index,
                            ) => {

                                const isOpen =
                                    openObjection === index;


                                return (

                                    <motion.button

                                        key={
                                            objection.question
                                        }

                                        type="button"

                                        className={`objection ${
                                            isOpen
                                                ? "is-open"
                                                : ""
                                        }`}

                                        onClick={() =>
                                            setOpenObjection(
                                                isOpen
                                                    ? null
                                                    : index,
                                            )
                                        }

                                        whileHover={{
                                            y: -2,
                                        }}

                                        aria-expanded={
                                            isOpen
                                        }
                                    >

                                        <span className="objection-question">
                                            {
                                                objection.question
                                            }
                                        </span>


                                        <span className="objection-icon">
                                            {
                                                isOpen
                                                    ? "−"
                                                    : "+"
                                            }
                                        </span>


                                        <AnimatePresence
                                            initial={false}
                                        >

                                            {isOpen && (

                                                <motion.span

                                                    className="objection-answer"

                                                    initial={{
                                                        opacity: 0,
                                                        height: 0,
                                                    }}

                                                    animate={{
                                                        opacity: 1,
                                                        height: "auto",
                                                    }}

                                                    exit={{
                                                        opacity: 0,
                                                        height: 0,
                                                    }}

                                                    transition={{
                                                        duration: .25,
                                                        ease,
                                                    }}
                                                >
                                                    {
                                                        objection.answer
                                                    }
                                                </motion.span>

                                            )}

                                        </AnimatePresence>

                                    </motion.button>

                                );

                            },
                        )}

                    </div>

                </motion.div>


                {/* =================================================
                    FECHAMENTO
                ================================================= */}

                <motion.div

                    className="offer-closing"

                    variants={
                        reveal
                    }

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: .2,
                    }}
                >

                    <span>
                        ✦
                    </span>


                    <p>
                        Seu serviço termina.

                        <strong>
                            {" "}A oportunidade não precisa terminar junto.
                        </strong>
                    </p>

                </motion.div>

            </div>

        </section>
    );
}


export default Offer;