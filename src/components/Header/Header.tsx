import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./Header.css";

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
 * FALLBACK DO MENU
 * ==========================================================
 *
 * O Header não precisa esperar a API do WordPress para
 * aparecer. Estes links são usados imediatamente no primeiro
 * render e são substituídos pelos dados reais da API quando
 * ela responder.
 */

const fallbackMenu: HeaderMenuItem[] = [
  {
    id: 4418,
    label: "Linha Dignity Renewed",
    url: "/categoria-produto/linhas/linha-dignity-renewed/",
  },
  {
    id: 6757,
    label: "Linha Queridinho",
    url: "/categoria-produto/linhas/linha-queridinho/",
  },
  {
    id: 7729,
    label: "Linha VantLiss",
    url: "/categoria-produto/linha-vantliss/",
  },
  {
    id: 9365,
    label: "Kits Atacado",
    url: "/categoria-produto/kits-atacado/",
  },
];


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


    /*
     * --------------------------------------------------------
     * BUSCA A QUANTIDADE REAL
     * --------------------------------------------------------
     *
     * A fonte continua sendo o Store API do WooCommerce.
     * Não criamos um contador separado.
     */

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


        /*
         * Sempre atualiza o estado.
         *
         * Inclusive quando a quantidade volta para ZERO.
         */

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


    /*
     * --------------------------------------------------------
     * EVENTOS NATIVOS
     * --------------------------------------------------------
     *
     * Alguns componentes da loja podem disparar eventos
     * diretamente no window/document.
     */

    const handleNativeCartUpdate = () => {
      loadCart();
    };


    const nativeEvents = [
      "vanti-cart-updated",
      "wc-cart-updated",
      "updated_wc_div",
      "updated_cart_totals",
      "updated_shipping_method",
      "wc_fragments_loaded",
      "wc_fragments_refreshed",
      "added_to_cart",
      "removed_from_cart",
    ];


    nativeEvents.forEach((eventName) => {

      window.addEventListener(
        eventName,
        handleNativeCartUpdate
      );

      document.addEventListener(
        eventName,
        handleNativeCartUpdate
      );

    });


    /*
     * --------------------------------------------------------
     * EVENTOS JQUERY DO WOOCOMMERCE
     * --------------------------------------------------------
     *
     * O WooCommerce tradicional dispara vários eventos
     * pelo jQuery. Escutamos esses eventos também para que
     * o contador funcione tanto no desktop quanto no mobile.
     */

    const jq =
      (
        window as Window & {
          jQuery?: any;
        }
      ).jQuery;


    const jqueryEvents =
      [
        "added_to_cart",
        "removed_from_cart",
        "updated_wc_div",
        "updated_cart_totals",
        "updated_shipping_method",
        "wc_fragments_loaded",
        "wc_fragments_refreshed",
        "wc_fragments_ajax_error",
      ].join(" ");


    if (
      jq &&
      typeof jq === "function"
    ) {

      try {

        jq(document.body).on(
          jqueryEvents,
          handleNativeCartUpdate
        );

      } catch (error) {

        console.warn(
          "[WooCommerce] Não foi possível registrar eventos jQuery:",
          error
        );

      }

    }


    /*
     * --------------------------------------------------------
     * PRIMEIRA LEITURA
     * --------------------------------------------------------
     */

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


    /*
     * --------------------------------------------------------
     * FALLBACK DE SINCRONIZAÇÃO
     * --------------------------------------------------------
     *
     * Alguns plugins/fluxos de checkout não disparam os
     * eventos tradicionais. Por isso fazemos uma consulta
     * leve a cada 2 segundos.
     *
     * Continua usando o WooCommerce como fonte oficial.
     */

    const interval =
      window.setInterval(
        loadCart,
        1500
      );


    return () => {

      cancelled = true;

      window.clearTimeout(timer);

      window.clearInterval(interval);


      nativeEvents.forEach((eventName) => {

        window.removeEventListener(
          eventName,
          handleNativeCartUpdate
        );

        document.removeEventListener(
          eventName,
          handleNativeCartUpdate
        );

      });


      if (
        jq &&
        typeof jq === "function"
      ) {

        try {

          jq(document.body).off(
            jqueryEvents,
            handleNativeCartUpdate
          );

        } catch (error) {

          console.warn(
            "[WooCommerce] Não foi possível remover eventos jQuery:",
            error
          );

        }

      }

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
    event: FormEvent<HTMLFormElement>
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
   * 9. FECHA BUSCA AO CLICAR FORA
   * ======================================================== */

  useEffect(() => {

    if (!searchOpen) {
      return;
    }


    function handleClickOutsideSearch(event: MouseEvent) {

      const target = event.target as Element | null;

      if (!target) {
        return;
      }


      /*
       * Mantém a busca aberta quando o clique acontece:
       * - dentro da barra de pesquisa;
       * - no próprio botão/ícone que abre a pesquisa.
       *
       * Qualquer outro clique fecha a busca.
       */
      if (
        target.closest(".vanti-header-search-panel") ||
        target.closest(".vanti-header-search-trigger")
      ) {
        return;
      }


      setSearchOpen(false);

    }


    document.addEventListener(
      "mousedown",
      handleClickOutsideSearch
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutsideSearch
      );

    };

  }, [searchOpen]);


  /* ========================================================
   * 10. BUSCA TOGGLE
   * ======================================================== */

  function handleSearchToggle() {

    setMobileMenuOpen(false);

    setSearchOpen(
      (current) => !current
    );

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
    headerData?.menu?.length
      ? headerData.menu
      : fallbackMenu;


  /* ========================================================
   * 12. RENDER
   * ======================================================== */

  return (
    <>



      <header className="vanti-react-header">


        {/* ==================================================
            BARRA SUPERIOR
        ================================================== */}

        <div className="vanti-header-announcement">

          <div className="vanti-header-announcement-track">

            <span className="vanti-header-announcement-text">
              <span>• MARCA QUE ATENDE MAIS DE 5.000 PROFISSIONAIS DA BELEZA</span>
              <span>• PRODUTOS PROFISSIONAIS PARA ALISAMENTO, RECONSTRUÇÃO E FINALIZAÇÃO</span>
              <span>• FRETE GRÁTIS ACIMA DE R$297,00 POR REGIÃO</span>
              <span>• 10% NA 1ª COMPRA COM CUPOM VANTIPRO</span>
            </span>

            <span className="vanti-header-announcement-text">
              <span>• MARCA QUE ATENDE MAIS DE 5.000 PROFISSIONAIS DA BELEZA</span>
              <span>• PRODUTOS PROFISSIONAIS PARA ALISAMENTO, RECONSTRUÇÃO E FINALIZAÇÃO</span>
              <span>• FRETE GRÁTIS ACIMA DE R$297,00 POR REGIÃO*</span>
              <span>• 10% NA 1ª COMPRA COM CUPOM VANTIPRO</span>
              <span>•</span>
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
                className="vanti-header-action vanti-header-search-trigger"
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

                <span
                  className="vanti-header-cart-badge"
                  aria-label={`${cartQuantity} itens`}
                >

                  {cartQuantity}

                </span>

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