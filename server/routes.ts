import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Define contact form schema
      const contactSchema = z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("E-mail inválido"),
        subject: z.string().min(1, "Assunto é obrigatório"),
        message: z.string().min(1, "Mensagem é obrigatória")
      });

      // Validate form data
      const validatedData = contactSchema.parse(req.body);

      // In a real implementation, we would send an email here
      // For demonstration purposes, we'll just log the data and return success
      console.log("Contact form submission:", validatedData);

      // Success response
      res.status(200).json({ 
        success: true, 
        message: "Mensagem recebida com sucesso! Entraremos em contato em breve."
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Erro de validação", 
          errors: error.errors 
        });
      }

      // Handle other errors
      console.error("Error processing contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
