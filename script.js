/* ===== Configuración: edita estos valores ===== */
const WHATSAPP = "573000000000";   // número con código de país, sin + ni espacios
const MONEDA = { locale: "es-CO", currency: "COP" };

/* ===== Productos: agrega, quita o cambia juegos aquí ===== */
const BANDAS = { PlayStation: "#4aa3ff", Xbox: "#2bb673", Switch: "#ff5c5c", PC: "#ffd23f" };

const PRODUCTOS = [
  /* PlayStation */
  { id: 1,  titulo: "God of War Ragnarök",                plataforma: "PlayStation", precio: 259900, color: "#4a6fa5", fondo: "#14213d" },
  { id: 2,  titulo: "Marvel's Spider-Man 2",              plataforma: "PlayStation", precio: 269900, color: "#d62828", fondo: "#3a0d14" },
  { id: 3,  titulo: "The Last of Us Part II",             plataforma: "PlayStation", precio: 149900, color: "#6b705c", fondo: "#1f2420" },
  { id: 4,  titulo: "Horizon Forbidden West",             plataforma: "PlayStation", precio: 169900, color: "#f4845f", fondo: "#7a2e1b" },
  { id: 5,  titulo: "Gran Turismo 7",                     plataforma: "PlayStation", precio: 179900, color: "#3a86ff", fondo: "#0b1f4d" },
  { id: 6,  titulo: "Elden Ring",                         plataforma: "PlayStation", precio: 199900, color: "#c9a227", fondo: "#3b2f0a" },
  { id: 7,  titulo: "EA Sports FC 25",                    plataforma: "PlayStation", precio: 249900, color: "#16a085", fondo: "#0a3d4a" },
  { id: 8,  titulo: "Ghost of Tsushima Director's Cut",   plataforma: "PlayStation", precio: 189900, color: "#b5179e", fondo: "#3a0a4a" },
  /* Xbox */
  { id: 9,  titulo: "Forza Horizon 5",                    plataforma: "Xbox",        precio: 219900, color: "#f39c12", fondo: "#7a3b00" },
  { id: 10, titulo: "Halo Infinite",                      plataforma: "Xbox",        precio: 169900, color: "#27ae60", fondo: "#0b3d2a" },
  { id: 11, titulo: "Starfield",                          plataforma: "Xbox",        precio: 239900, color: "#5e60ce", fondo: "#10104a" },
  { id: 12, titulo: "Gears 5",                            plataforma: "Xbox",        precio: 119900, color: "#e63946", fondo: "#3d0a10" },
  { id: 13, titulo: "Call of Duty: Modern Warfare III",   plataforma: "Xbox",        precio: 249900, color: "#6c757d", fondo: "#1b1f23" },
  { id: 14, titulo: "Hogwarts Legacy",                    plataforma: "Xbox",        precio: 189900, color: "#7b2cbf", fondo: "#240046" },
  { id: 15, titulo: "Red Dead Redemption 2",              plataforma: "Xbox",        precio: 139900, color: "#bc4749", fondo: "#4a1416" },
  /* Nintendo Switch */
  { id: 16, titulo: "The Legend of Zelda: Tears of the Kingdom", plataforma: "Switch", precio: 279900, color: "#2bb673", fondo: "#0e5b44" },
  { id: 17, titulo: "Mario Kart 8 Deluxe",                plataforma: "Switch",      precio: 229900, color: "#ff5c5c", fondo: "#8f1d3a" },
  { id: 18, titulo: "Super Mario Odyssey",                plataforma: "Switch",      precio: 219900, color: "#e63946", fondo: "#7a0f1a" },
  { id: 19, titulo: "Animal Crossing: New Horizons",      plataforma: "Switch",      precio: 219900, color: "#6ccf8a", fondo: "#1f6b4a" },
  { id: 20, titulo: "Super Smash Bros. Ultimate",         plataforma: "Switch",      precio: 229900, color: "#ff7b00", fondo: "#7a2f00" },
  { id: 21, titulo: "Pokémon Escarlata",                  plataforma: "Switch",      precio: 239900, color: "#d00000", fondo: "#4a0000" },
  { id: 22, titulo: "Metroid Dread",                      plataforma: "Switch",      precio: 199900, color: "#ff6d00", fondo: "#3d1a00" },
  { id: 23, titulo: "Kirby y la tierra olvidada",         plataforma: "Switch",      precio: 209900, color: "#ff8fab", fondo: "#8a2f55" },
  /* PC */
  { id: 24, titulo: "Cyberpunk 2077",                     plataforma: "PC",          precio: 139900, color: "#ffd23f", fondo: "#3d2f00" },
  { id: 25, titulo: "The Witcher 3: Wild Hunt",           plataforma: "PC",          precio: 99900,  color: "#adb5bd", fondo: "#212529" },
  { id: 26, titulo: "Civilization VI",                    plataforma: "PC",          precio: 119900, color: "#4361ee", fondo: "#10195a" },
  { id: 27, titulo: "Age of Empires IV",                  plataforma: "PC",          precio: 129900, color: "#bc6c25", fondo: "#4a2a0a" },
  { id: 28, titulo: "Baldur's Gate 3",                    plataforma: "PC",          precio: 219900, color: "#9d4edd", fondo: "#2a0a4a" }
];

/* ===== Utilidades ===== */
const $ = (sel) => document.querySelector(sel);
const dinero = (n) => new Intl.NumberFormat(MONEDA.locale, { style: "currency", currency: MONEDA.currency, maximumFractionDigits: 0 }).format(n);

let carrito = [];
try { carrito = JSON.parse(localStorage.getItem("carrito")) || []; } catch (e) { carrito = []; }
const guardar = () => { try { localStorage.setItem("carrito", JSON.stringify(carrito)); } catch (e) {} };

/* ===== Catálogo ===== */
const grid = $("#grid");

function pintarCatalogo(filtro = "todos") {
  const lista = filtro === "todos" ? PRODUCTOS : PRODUCTOS.filter(p => p.plataforma === filtro);
  grid.innerHTML = lista.map(p => `
    <article class="card">
      <div class="cover" data-platform="${p.plataforma}"
           style="background: linear-gradient(160deg, ${p.color}, ${p.fondo}); --band: ${BANDAS[p.plataforma]};">
        ${p.titulo}
      </div>
      <h3>${p.titulo}</h3>
      <div class="price-row">
        <span class="price">${dinero(p.precio)}</span>
        <button class="add" data-id="${p.id}">Agregar</button>
      </div>
    </article>`).join("");
}

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  pintarCatalogo(chip.dataset.filter);
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  const prod = PRODUCTOS.find(p => p.id === Number(btn.dataset.id));
  carrito.push(prod.id);
  guardar();
  pintarCarrito();
  avisar(`${prod.titulo} agregado al carrito`);
});

/* ===== Carrito ===== */
const drawer = $("#drawer");
const overlay = $("#overlay");

function pintarCarrito() {
  const lista = $("#cartList");
  if (!carrito.length) {
    lista.innerHTML = `<li class="empty">Tu carrito está vacío. Elige un juego del catálogo.</li>`;
  } else {
    lista.innerHTML = carrito.map((id, i) => {
      const p = PRODUCTOS.find(x => x.id === id);
      return `<li><div>${p.titulo}<small>${p.plataforma} · ${dinero(p.precio)}</small></div>
              <button class="remove" data-index="${i}">Quitar</button></li>`;
    }).join("");
  }
  const total = carrito.reduce((s, id) => s + PRODUCTOS.find(x => x.id === id).precio, 0);
  $("#cartTotal").textContent = dinero(total);
  $("#cartCount").textContent = carrito.length;
}

function abrirCarrito() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
}
function cerrarCarrito() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.hidden = true;
}

$("#openCart").addEventListener("click", abrirCarrito);
$("#closeCart").addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarCarrito(); });

$("#cartList").addEventListener("click", (e) => {
  const btn = e.target.closest(".remove");
  if (!btn) return;
  carrito.splice(Number(btn.dataset.index), 1);
  guardar();
  pintarCarrito();
});

$("#checkout").addEventListener("click", () => {
  if (!carrito.length) { avisar("Agrega al menos un juego"); return; }
  const lineas = carrito.map(id => {
    const p = PRODUCTOS.find(x => x.id === id);
    return `- ${p.titulo} (${p.plataforma}): ${dinero(p.precio)}`;
  });
  const total = carrito.reduce((s, id) => s + PRODUCTOS.find(x => x.id === id).precio, 0);
  const msg = `Hola, quiero hacer este pedido:\n${lineas.join("\n")}\nTotal: ${dinero(total)}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ===== Aviso ===== */
let timer;
function avisar(texto) {
  const t = $("#toast");
  t.textContent = texto;
  t.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ===== Menú móvil ===== */
const menuBtn = $("#menuBtn");
const nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", abierto);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
});

/* ===== Inicio ===== */
$("#waLink").href = `https://wa.me/${WHATSAPP}`;
$("#year").textContent = new Date().getFullYear();
pintarCatalogo();
pintarCarrito();
