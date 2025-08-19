import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePoem } from "./openai";
import { insertVisitSchema } from "@shared/schema";
import { z } from "zod";

const poemRequestSchema = z.object({
  theme: z.string().min(1)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics - Record visit
  app.post("/api/visits", async (req, res) => {
    try {
      const userAgent = req.headers['user-agent'] || 'Unknown';
      const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';
      
      const visit = await storage.recordVisit({
        userAgent,
        ipAddress
      });
      
      res.json({ success: true, visitId: visit.id });
    } catch (error) {
      console.error("Error recording visit:", error);
      res.status(500).json({ error: "Error al registrar la visita" });
    }
  });

  // Analytics - Get all visits
  app.get("/api/visits", async (req, res) => {
    try {
      const visits = await storage.getVisits();
      res.json(visits);
    } catch (error) {
      console.error("Error getting visits:", error);
      res.status(500).json({ error: "Error al obtener las visitas" });
    }
  });

  // Poem generation endpoint
  app.post("/api/generate-poem", async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
