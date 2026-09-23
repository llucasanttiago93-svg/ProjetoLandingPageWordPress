import { motion, type Variants } from "motion/react";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1] as const;


/* =====================================================
   ANIMAÇÃO DO CONTAINER
===================================================== */

const containerVariants: Variants = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.12,
        },
    },
};


/* =====================================================
   ANIMAÇÃO DOS ELEMENTOS
===================================================== */

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
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


/* =====================================================
   HERO
===================================================== */

function Hero() {
    return (
        <section
            className="hero"
            id="inicio"
        >

            <div className="hero-container">


                {/* =================================================
                    CONTEÚDO
                ================================================= */}

                <motion.div
                    className="hero-content"

                    variants={containerVariants}

                    initial="hidden"

                    animate="visible"
                >


                    {/* =================================================
                        EYEBROW
                    ================================================= */}

                    <motion.div
                        className="hero-eyebrow"
                        variants={itemVariants}
                    >

                        <span className="hero-eyebrow-dot" />

                        USO PROFISSIONAL

                        <span className="hero-eyebrow-separator">
                            •
                        </span>

                        REVENDA EM BANCADA

                    </motion.div>


                    {/* =================================================
                        HEADLINE
                    ================================================= */}

                    <motion.h1
                        variants={itemVariants}
                    >

                        O toque final de alto padrão que sua cliente sente na hora

                        <span className="hero-title-highlight">
                          — e faz questão de levar para casa.
                        </span>

                    </motion.h1>


                    {/* =================================================
                        SUBTÍTULO
                    ================================================= */}

                    <motion.p
                        className="hero-subtitle"
                        variants={itemVariants}
                    >

                        O Queridinho Supreme 30ml foi formulado para o lavatório 
                        e a bancada:  
                        
                        <strong>
                            {" "}poucas gotas entregam brilho espelhado, 
                        controle imediato do frizz e uma fragrância inesquecível.
                        </strong>
                        {" "}— Use no salão e dobre seu faturamento vendendo a unidade na recepção.

                    </motion.p>


                    {/* =================================================
                        INDICADORES
                    ================================================= */}

                    <motion.div
                        className="hero-stats"
                        variants={itemVariants}
                    >

                        <div className="hero-stat">

                            <strong>
                                Fórmula Concentrada
                            </strong>

                            <span>
                                Rende até 40+ finalizações por frasco no salão.
                            </span>

                        </div>


                        <div className="hero-stat">

                            <strong>
                                Acabamento Impecável
                            </strong>

                            <span>
                                Alinhamento e selagem perfeita pós-escova ou babyliss.
                            </span>

                        </div>


                        <div className="hero-stat">

                            <strong>
                                Margem de 100% na Revenda
                            </strong>

                            <span>
                               Custo acessível para abastecer o salão e alta lucratividade de bancada.
                            </span>

                        </div>

                    </motion.div>


                    {/* =================================================
                        CTA
                    ================================================= */}

                    <motion.a
                        href="#comprar"

                        className="hero-button"

                        variants={itemVariants}

                        whileHover={{
                            y: -3,
                            scale: 1.015,
                        }}

                        whileTap={{
                            scale: 0.97,
                        }}
                    >

                        QUERO CONHECER O QUERIDINHO

                        <span className="hero-button-arrow">
                            →
                        </span>

                    </motion.a>


                    {/* =================================================
                        MICROCOPY
                    ================================================= */}

                    <motion.p
                        className="hero-microcopy"
                        variants={itemVariants}
                    >

                        Você entrega o resultado.

                        <strong>
                            {" "}Sua cliente pode levar a experiência
                            para casa.
                        </strong>

                    </motion.p>


                    {/* =================================================
                        NOTA DEMONSTRATIVA
                    ================================================= */}

                    <motion.p
                        className="hero-demo-note"
                        variants={itemVariants}
                    >

                        *Informações de rendimento e rentabilidade
                        apresentadas como exemplo demonstrativo.

                    </motion.p>

                </motion.div>


                {/* =================================================
                    MÍDIA
                ================================================= */}

                <motion.div
                    className="hero-media"

                    initial={{
                        opacity: 0,
                        scale: 1.02,
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}

                    transition={{
                        duration: 1,
                        ease,
                    }}
                >

                    <img
                        src={`${import.meta.env.BASE_URL}images/hero-supreme.webp`}
                        alt="Queridinho Supreme sendo utilizado na finalização de um cabelo em um salão"
                        fetchPriority="high"
                        decoding="async"
                    />


                    {/* =================================================
                        BADGE
                    ================================================= */}

                    <motion.div
                        className="hero-media-badge"

                        initial={{
                            opacity: 0,
                            y: 12,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            duration: 0.65,
                            delay: 0.5,
                            ease,
                        }}
                    >

                        <span>
                            NO SALÃO
                        </span>

                        <strong>
                            Use na finalização.
                        </strong>

                    </motion.div>

                </motion.div>

            </div>

        </section>
    );
}


export default Hero;