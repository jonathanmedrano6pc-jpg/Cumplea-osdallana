// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
var themePrompts = {
  birthday: "un poema de cumplea\xF1os lleno de amor y celebraci\xF3n, destacando lo especial que es Dallana en este d\xEDa",
  friendship: "un poema sobre la amistad profunda y el cari\xF1o especial, celebrando el v\xEDnculo \xFAnico con Dallana",
  stitch: "un poema inspirado en Stitch y el concepto de Ohana (familia), relacion\xE1ndolo con Dallana y el amor familiar",
  memories: "un poema sobre los recuerdos hermosos y momentos especiales compartidos con Dallana",
  dreams: "un poema sobre sue\xF1os, esperanzas y el futuro brillante que le espera a Dallana",
  adventure: "un poema sobre aventuras, descubrimientos y la emoci\xF3n de vivir nuevas experiencias con Dallana"
};
var fallbackPoems = {
  birthday: `Querida Dallana, en tu d\xEDa especial,
las estrellas brillan con luz celestial,
tu sonrisa ilumina cada rinc\xF3n,
llenando de alegr\xEDa nuestro coraz\xF3n.

Como Stitch encontr\xF3 su familia,
t\xFA llegaste a mi vida con maravilla,
trayendo colores donde antes hab\xEDa gris,
siendo mi tesoro, mi mayor feliz.

Cada a\xF1o que cumples es una celebraci\xF3n,
de tu bondad, tu gracia y tu compasi\xF3n,
que este nuevo a\xF1o te traiga mil aventuras,
y que tus sue\xF1os se vuelvan m\xE1s seguros.

\xA1Feliz cumplea\xF1os, mi querida Dallana!`,
  friendship: `En el jard\xEDn de la vida, Dallana,
t\xFA eres la flor m\xE1s temprana,
con p\xE9talos de risa y hojas de ternura,
eres mi amistad m\xE1s pura.

Como dos almas que se encontraron,
nuestros caminos se entrelazaron,
creando memorias doradas,
en aventuras compartidas.

Tu coraz\xF3n noble y sincero,
es mi refugio verdadero,
donde encuentro paz y calma,
en la m\xFAsica de tu alma.

Gracias por ser mi compa\xF1\xEDa,
mi luz en cada d\xEDa.`,
  stitch: `"Ohana significa familia", dice Stitch,
y t\xFA, Dallana, eres mi match,
una familia del coraz\xF3n elegida,
que nunca se abandona ni se olvida.

Como Lilo y su azul amigo,
tenemos un lazo de abrigo,
donde el amor trasciende la distancia,
y florece en cada circunstancia.

Eres mi peque\xF1o milagro azul,
mi Stitch en forma de \xE1ngel, es veraz,
con tu travesura y tu dulzura,
haces mi vida una aventura.

Ohana para siempre seremos,
y juntos creceremos.`,
  memories: `En las p\xE1ginas del tiempo, Dallana,
est\xE1n escritas memorias de porcelana,
cada momento contigo es un tesoro,
que guardo en mi coraz\xF3n como oro.

Recuerdo tu primera sonrisa,
como una suave brisa,
que lleg\xF3 a cambiar mi mundo,
con amor tan profundo.

Las risas compartidas en tardes de sol,
los secretos susurrados en un rinc\xF3n,
cada abrazo, cada conversaci\xF3n,
son diamantes en mi colecci\xF3n.

Estos recuerdos son mi fortuna,
mi luz bajo cualquier luna.`,
  dreams: `Dallana, peque\xF1a so\xF1adora,
el futuro te espera cada hora,
con brazos abiertos y esperanza,
para cumplir cada a\xF1oranza.

Tus sue\xF1os son mariposas de colores,
volando entre risas y amores,
cada uno m\xE1s hermoso que el anterior,
pintando tu destino con primor.

No hay meta que no puedas alcanzar,
ni estrella que no puedas tocar,
porque tienes un coraz\xF3n valiente,
y un alma verdaderamente ardiente.

Vuela alto, mi dulce ni\xF1a,
que el mundo es tu monta\xF1a.`,
  adventure: `Dallana, compa\xF1era de aventuras,
juntos exploramos alturas,
desde monta\xF1as de almohadas,
hasta islas imaginadas.

Cada d\xEDa contigo es un viaje,
lleno de magia y coraje,
donde descubrimos nuevos mundos,
en momentos tan profundos.

Eres mi co-piloto valiente,
en esta vida emocionante,
donde cada risa es un mapa,
y cada abrazo, una etapa.

Sigamos explorando juntos,
creando recuerdos \xFAnicos.`
};
async function generatePoem(request) {
  try {
    const themePrompt = themePrompts[request.theme] || themePrompts.birthday;
    const prompt = `Crea ${themePrompt}. 

Caracter\xEDsticas del poema:
- Debe ser en espa\xF1ol
- Entre 4-6 estrofas
- Tono c\xE1lido, cari\xF1oso y emotivo
- Incluye el nombre "Dallana" de manera natural
- Debe sentirse personal y sincero
- Usa un lenguaje po\xE9tico pero accesible
- Evita clich\xE9s excesivos
- Que transmita amor genuino y aprecio

El poema debe ser original, hermoso y emotivo.`;
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un poeta experto que crea poemas emotivos y personales en espa\xF1ol. Tus poemas son sinceros, c\xE1lidos y llenos de sentimiento genuino."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.8
    });
    const poem = response.choices[0].message.content;
    if (!poem) {
      throw new Error("No se pudo generar el poema");
    }
    return { poem };
  } catch (error) {
    console.error("Error generating poem with AI, using fallback:", error);
    const fallbackPoem = fallbackPoems[request.theme] || fallbackPoems.birthday;
    return { poem: fallbackPoem };
  }
}

// server/routes.ts
import { z } from "zod";
var poemRequestSchema = z.object({
  theme: z.string().min(1)
});
async function registerRoutes(app2) {
  app2.post("/api/generate-poem", async (req, res) => {
    try {
      const validation = poemRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Tema requerido para generar el poema"
        });
      }
      const { theme } = validation.data;
      const result = await generatePoem({ theme });
      return res.json(result);
    } catch (error) {
      console.error("Error in poem generation route:", error);
      return res.status(500).json({
        error: "Error interno del servidor al generar el poema"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import path3 from "path";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static(path3.join(process.cwd(), "attached_assets")));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
