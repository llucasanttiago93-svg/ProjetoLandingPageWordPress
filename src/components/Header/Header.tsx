import { useEffect, useState } from "react";

/**
 * ==========================================================
 * VANTI COSMÉTICOS
 * HEADER REACT
 * ==========================================================
 *
 * Arquitetura:
 *
 * WordPress
 *    ↓
 * /wp-json/vanti/v1/header
 *    ↓
 * dados do Header
 *    ↓
 * React renderiza o Header
 *
 * WooCommerce
 *    ↓
 * /wp-json/wc/store/v1/cart
 *    ↓
 * quantidade real do carrinho
 *
 * NÃO depende do Elementor para renderização.
 * NÃO injeta HTML do Elementor.
 * NÃO depende de JavaScript do Elementor.
 * NÃO depende do CSS do Elementor.
 * ==========================================================
 */


/* ==========================================================
 * TIPOS
 * ========================================================== */

interface HeaderMenuItem {
  id: number;
  label: string;
  url: string;
}

interface HeaderResponse {
  success: boolean;

  site?: {
    name?: string;
    home_url?: string;
  };

  logo?: {
    url: string;
    alt?: string;
  };

  menu?: HeaderMenuItem[];

  links?: {
    home?: string;
    cart?: string;
    search?: string;
  };

  debug?: {
    menu_items?: number;
    menu_found?: boolean;
  };
}

interface WooCart {
  items_count?: number;
}


/* ==========================================================
 * ÍCONES
 * ========================================================== */

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


function CartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 4H5L7.1 15.1C7.28 16.05 8.11 16.75 9.08 16.75H17.7C18.6 16.75 19.38 16.15 19.6 15.28L21 9.5H6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9.5"
        cy="20"
        r="1.3"
        fill="currentColor"
      />

      <circle
        cx="17.5"
        cy="20"
        r="1.3"
        fill="currentColor"
      />
    </svg>
  );
}


function MenuIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


function CloseIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 5L19 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


/* ==========================================================
 * COMPONENTE
 * ========================================================== */

export default function Header() {

  /* --------------------------------------------------------
   * ESTADO DO HEADER
   * -------------------------------------------------------- */

  const [headerData, setHeaderData] =
    useState<HeaderResponse | null>(null);

  const [cartQuantity, setCartQuantity] =
    useState(0);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  /* ========================================================
   * 1. CARREGA DADOS DO HEADER
   * ======================================================== */

  useEffect(() => {

    let cancelled = false;


    async function loadHeader() {

      try {

        const response = await fetch(
          "/wp-json/vanti/v1/header",
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          }
        );


        if (!response.ok) {

          throw new Error(
            `Erro Header: ${response.status}`
          );

        }


        const data: HeaderResponse =
          await response.json();


        if (!data.success) {

          throw new Error(
            "API do Header retornou success=false."
          );

        }


        if (cancelled) {
          return;
        }


        console.log(
          "[Vanti Header] Dados carregados:",
          data
        );


        console.log(
          "[Vanti Header] Menu:",
          data.menu
        );


        setHeaderData(data);

      } catch (error) {

        console.error(
          "[Vanti Header] Erro:",
          error
        );

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }

    }


    loadHeader();


    return () => {
      cancelled = true;
    };

  }, []);


  /* ========================================================
   * 2. CARREGA CARRINHO REAL DO WOOCOMMERCE
   * ======================================================== */

  useEffect(() => {

    let cancelled = false;


    async function loadCart() {

      try {

        const response = await fetch(
          `/wp-json/wc/store/v1/cart?_vanti=${Date.now()}`,
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
            },
          }
        );


        if (!response.ok) {

          throw new Error(
            `Erro Carrinho: ${response.status}`
          );

        }


        const data: WooCart =
          await response.json();


        if (cancelled) {
          return;
        }


        const quantity =
          Number(data.items_count) || 0;


        console.log(
          "[WooCommerce] Quantidade real:",
          quantity
        );


        setCartQuantity(quantity);

      } catch (error) {

        if (!cancelled) {

          console.error(
            "[WooCommerce] Erro:",
            error
          );

        }

      }

    }


    loadCart();


    /*
     * Pequena atualização depois do carregamento.
     *
     * Isso ajuda quando o WooCommerce acabou de restaurar
     * a sessão do carrinho.
     */

    const timer =
      window.setTimeout(
        loadCart,
        700
      );


    return () => {

      cancelled = true;

      window.clearTimeout(timer);

    };

  }, []);


  /* ========================================================
   * 3. FECHA MENU MOBILE AO REDIMENSIONAR
   * ======================================================== */

  useEffect(() => {

    function handleResize() {

      if (window.innerWidth > 900) {

        setMobileMenuOpen(false);
        setSearchOpen(false);

      }

    }


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  /* ========================================================
   * 4. BLOQUEIA SCROLL QUANDO MENU MOBILE ESTÁ ABERTO
   * ======================================================== */

  useEffect(() => {

    if (!mobileMenuOpen) {
      return;
    }


    const originalOverflow =
      document.body.style.overflow;


    document.body.style.overflow =
      "hidden";


    return () => {

      document.body.style.overflow =
        originalOverflow;

    };

  }, [mobileMenuOpen]);


  /* ========================================================
   * 5. NAVEGAÇÃO
   * ======================================================== */

  function navigateTo(
    url: string
  ) {

    if (!url) {
      return;
    }


    setMobileMenuOpen(false);
    setSearchOpen(false);


    /*
     * URLs internas do próprio site.
     */

    try {

      const parsed =
        new URL(
          url,
          window.location.origin
        );


      if (
        parsed.origin ===
        window.location.origin
      ) {

        window.location.href =
          parsed.pathname +
          parsed.search +
          parsed.hash;

        return;

      }

    } catch {
      // fallback abaixo
    }


    window.location.href = url;

  }


  /* ========================================================
   * 6. CARRINHO
   * ======================================================== */

  function handleCartClick() {

    const cartUrl =
      headerData?.links?.cart ||
      "/carrinho/";


    navigateTo(cartUrl);

  }


  /* ========================================================
   * 7. BUSCA
   * ======================================================== */

  function handleSearchSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    const value =
      searchValue.trim();


    if (!value) {
      return;
    }


    const searchBase =
      headerData?.links?.search ||
      "/";


    try {

      const url =
        new URL(
          searchBase,
          window.location.origin
        );


      url.searchParams.set(
        "s",
        value
      );


      window.location.href =
        url.pathname +
        url.search;

    } catch {

      window.location.href =
        `/?s=${encodeURIComponent(
          value
        )}`;

    }

  }


  /* ========================================================
   * 8. MENU MOBILE
   * ======================================================== */

  function handleMobileMenuToggle() {

    setSearchOpen(false);

    setMobileMenuOpen(
      (current) => !current
    );

  }


  /* ========================================================
   * 9. BUSCA TOGGLE
   * ======================================================== */

  function handleSearchToggle() {

    setMobileMenuOpen(false);

    setSearchOpen(
      (current) => !current
    );

  }


  /* ========================================================
   * 10. LOADING
   * ======================================================== */

  if (loading && !headerData) {

    return null;

  }


  /* ========================================================
   * 11. DADOS
   * ======================================================== */

  const logoUrl =
    headerData?.logo?.url ||
    "https://vanticosmeticos.com.br/wp-content/uploads/2020/08/Logo-Vanti-Co-02.svg";


  const logoAlt =
    headerData?.logo?.alt ||
    "Vanti Cosméticos";


  const homeUrl =
    headerData?.links?.home ||
    "/";


  const menu =
    headerData?.menu || [];


  /* ========================================================
   * 12. RENDER
   * ======================================================== */

  return (
    <>
      <style>
        {`
          .vanti-react-header {
            position: relative;
            z-index: 9999;
            width: 100%;
            background: #ffffff;
          }

          .vanti-react-header *,
          .vanti-react-header *::before,
          .vanti-react-header *::after {
            box-sizing: border-box;
          }

          .vanti-header-announcement {
            width: 100%;
            overflow: hidden;
            background: #111111;
            color: #ffffff;
            height: 34px;
            display: flex;
            align-items: center;
          }

          .vanti-header-announcement-track {
            width: max-content;
            display: flex;
            white-space: nowrap;
            animation: vantiHeaderAnnouncement 35s linear infinite;
          }

          .vanti-header-announcement-text {
            margin: 0;
            padding-right: 70px;
            font-size: 11px;
            line-height: 1;
            font-weight: 500;
            letter-spacing: 0.08em;
          }

          @keyframes vantiHeaderAnnouncement {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          .vanti-header-main {
            position: sticky;
            top: 0;
            width: 100%;
            background: #ffffff;
            border-bottom: 1px solid rgba(17, 17, 17, 0.08);
          }

          .vanti-header-container {
            width: min(100% - 48px, 1400px);
            min-height: 86px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            column-gap: 40px;
          }

          .vanti-header-logo {
            display: flex;
            align-items: center;
            width: 145px;
            text-decoration: none;
            flex-shrink: 0;
          }

          .vanti-header-logo img {
            display: block;
            width: 100%;
            height: auto;
          }

          .vanti-header-navigation {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 0;
          }

          .vanti-header-menu {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(18px, 2vw, 34px);
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .vanti-header-menu-item {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .vanti-header-menu-link {
            display: inline-flex;
            align-items: center;
            min-height: 40px;
            color: #111111;
            text-decoration: none;
            white-space: nowrap;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.01em;
            transition: opacity 0.2s ease;
          }

          .vanti-header-menu-link:hover {
            opacity: 0.55;
          }

          .vanti-header-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 14px;
          }

          .vanti-header-action {
            position: relative;
            width: 42px;
            height: 42px;
            padding: 0;
            border: 0;
            background: transparent;
            color: #111111;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            text-decoration: none;
          }

          .vanti-header-action:hover {
            opacity: 0.65;
          }

          .vanti-header-cart-badge {
            position: absolute;
            top: 1px;
            right: 0;
            min-width: 18px;
            height: 18px;
            padding: 0 5px;
            border-radius: 999px;
            background: #ec7404;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            line-height: 1;
            font-weight: 700;
          }

          .vanti-header-search-panel {
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            background: #ffffff;
            border-bottom: 1px solid rgba(17, 17, 17, 0.1);
            padding: 18px 24px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          }

          .vanti-header-search-form {
            width: min(100%, 760px);
            margin: 0 auto;
            display: flex;
            align-items: center;
            border: 1px solid #d8d8d8;
            border-radius: 2px;
            overflow: hidden;
          }

          .vanti-header-search-input {
            flex: 1;
            width: 100%;
            height: 46px;
            padding: 0 15px;
            border: 0;
            outline: 0;
            background: #ffffff;
            color: #111111;
            font-size: 14px;
          }

          .vanti-header-search-submit {
            width: 52px;
            height: 46px;
            border: 0;
            background: #111111;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .vanti-header-mobile-button {
            display: none;
          }

          .vanti-header-mobile-menu {
            display: none;
          }

          @media (max-width: 900px) {

            .vanti-header-announcement {
              height: 30px;
            }

            .vanti-header-announcement-text {
              font-size: 9px;
            }

            .vanti-header-container {
              width: min(100% - 28px, 1400px);
              min-height: 72px;
              grid-template-columns: auto 1fr auto;
              column-gap: 12px;
            }

            .vanti-header-logo {
              width: 125px;
            }

            .vanti-header-navigation {
              display: none;
            }

            .vanti-header-actions {
              gap: 2px;
            }

            .vanti-header-mobile-button {
              display: inline-flex;
            }

            .vanti-header-mobile-menu {
              position: absolute;
              left: 0;
              right: 0;
              top: 100%;
              display: block;
              background: #ffffff;
              border-top: 1px solid rgba(17, 17, 17, 0.06);
              border-bottom: 1px solid rgba(17, 17, 17, 0.1);
              box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
            }

            .vanti-header-mobile-list {
              margin: 0;
              padding: 8px 24px 18px;
              list-style: none;
            }

            .vanti-header-mobile-item {
              margin: 0;
              padding: 0;
              list-style: none;
              border-bottom: 1px solid rgba(17, 17, 17, 0.08);
            }

            .vanti-header-mobile-link {
              display: flex;
              align-items: center;
              min-height: 54px;
              color: #111111;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }

            .vanti-header-mobile-link:hover {
              opacity: 0.6;
            }

          }

          @media (max-width: 480px) {

            .vanti-header-container {
              width: calc(100% - 20px);
            }

            .vanti-header-logo {
              width: 112px;
            }

            .vanti-header-action {
              width: 38px;
              height: 38px;
            }

            .vanti-header-cart-badge {
              top: 0;
              right: -1px;
            }

          }
        `}
      </style>


      <header className="vanti-react-header">


        {/* ==================================================
            BARRA SUPERIOR
        ================================================== */}

        <div className="vanti-header-announcement">

          <div className="vanti-header-announcement-track">

            <span className="vanti-header-announcement-text">
              MARCA QUE ATENDE MAIS DE 5.000 PROFISSIONAIS DA BELEZA
              • PRODUTOS PROFISSIONAIS PARA ALISAMENTO, RECONSTRUÇÃO
              E FINALIZAÇÃO • FRETE GRÁTIS ACIMA DE R$297,00 POR
              REGIÃO* • 10% NA 1ª COMPRA COM CUPOM VANTIPRO •
            </span>

            <span className="vanti-header-announcement-text">
              MARCA QUE ATENDE MAIS DE 5.000 PROFISSIONAIS DA BELEZA
              • PRODUTOS PROFISSIONAIS PARA ALISAMENTO, RECONSTRUÇÃO
              E FINALIZAÇÃO • FRETE GRÁTIS ACIMA DE R$297,00 POR
              REGIÃO* • 10% NA 1ª COMPRA COM CUPOM VANTIPRO •
            </span>

          </div>

        </div>


        {/* ==================================================
            HEADER PRINCIPAL
        ================================================== */}

        <div className="vanti-header-main">

          <div className="vanti-header-container">


            {/* ==================================================
                LOGO
            ================================================== */}

            <a
              className="vanti-header-logo"
              href={homeUrl}
              onClick={(event) => {

                event.preventDefault();

                navigateTo(homeUrl);

              }}
              aria-label="Vanti Cosméticos"
            >

              <img
                src={logoUrl}
                alt={logoAlt}
              />

            </a>


            {/* ==================================================
                MENU DESKTOP
            ================================================== */}

            <nav
              className="vanti-header-navigation"
              aria-label="Menu principal"
            >

              <ul className="vanti-header-menu">

                {menu.map((item) => (

                  <li
                    key={item.id}
                    className="vanti-header-menu-item"
                  >

                    <a
                      href={item.url}
                      className="vanti-header-menu-link"
                      onClick={(event) => {

                        event.preventDefault();

                        navigateTo(item.url);

                      }}
                    >

                      {item.label}

                    </a>

                  </li>

                ))}

              </ul>

            </nav>


            {/* ==================================================
                AÇÕES
            ================================================== */}

            <div className="vanti-header-actions">


              {/* ----------------------------------------------
                  MENU MOBILE
              ---------------------------------------------- */}

              <button
                type="button"
                className="vanti-header-action vanti-header-mobile-button"
                onClick={handleMobileMenuToggle}
                aria-label={
                  mobileMenuOpen
                    ? "Fechar menu"
                    : "Abrir menu"
                }
                aria-expanded={
                  mobileMenuOpen
                }
              >

                {mobileMenuOpen
                  ? <CloseIcon />
                  : <MenuIcon />
                }

              </button>


              {/* ----------------------------------------------
                  BUSCA
              ---------------------------------------------- */}

              <button
                type="button"
                className="vanti-header-action"
                onClick={handleSearchToggle}
                aria-label="Pesquisar"
                aria-expanded={
                  searchOpen
                }
              >

                <SearchIcon />

              </button>


              {/* ----------------------------------------------
                  CARRINHO
              ---------------------------------------------- */}

              <button
                type="button"
                className="vanti-header-action"
                onClick={handleCartClick}
                aria-label={
                  cartQuantity > 0
                    ? `Carrinho com ${cartQuantity} itens`
                    : "Carrinho vazio"
                }
              >

                <CartIcon />

                {cartQuantity > 0 && (

                  <span
                    className="vanti-header-cart-badge"
                    aria-label={`${cartQuantity} itens`}
                  >

                    {cartQuantity}

                  </span>

                )}

              </button>

            </div>


          </div>


          {/* ==================================================
              BUSCA
          ================================================== */}

          {searchOpen && (

            <div className="vanti-header-search-panel">

              <form
                className="vanti-header-search-form"
                onSubmit={
                  handleSearchSubmit
                }
              >

                <input
                  type="search"
                  className="vanti-header-search-input"
                  placeholder="O que você está procurando?"
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(
                      event.target.value
                    )
                  }
                  autoFocus
                  aria-label="Pesquisar produtos"
                />

                <button
                  type="submit"
                  className="vanti-header-search-submit"
                  aria-label="Pesquisar"
                >

                  <SearchIcon />

                </button>

              </form>

            </div>

          )}


          {/* ==================================================
              MENU MOBILE
          ================================================== */}

          {mobileMenuOpen && (

            <div
              className="vanti-header-mobile-menu"
            >

              <ul
                className="vanti-header-mobile-list"
              >

                {menu.map((item) => (

                  <li
                    key={item.id}
                    className="vanti-header-mobile-item"
                  >

                    <a
                      href={item.url}
                      className="vanti-header-mobile-link"
                      onClick={(event) => {

                        event.preventDefault();

                        navigateTo(
                          item.url
                        );

                      }}
                    >

                      {item.label}

                    </a>

                  </li>

                ))}

              </ul>

            </div>

          )}

        </div>

      </header>
    </>
  );
}