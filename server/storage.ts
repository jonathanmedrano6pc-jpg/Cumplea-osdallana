import { users, visits, type User, type InsertUser, type Visit, type InsertVisit } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  recordVisit(visit: InsertVisit): Promise<Visit>;
  getVisits(): Promise<Visit[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private visits: Map<number, Visit>;
  currentUserId: number;
  currentVisitId: number;

  constructor() {
    this.users = new Map();
    this.visits = new Map();
    this.currentUserId = 1;
    this.currentVisitId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async recordVisit(insertVisit: InsertVisit): Promise<Visit> {
    const id = this.currentVisitId++;
    const visit: Visit = { 
      id, 
      visitedAt: new Date(),
      userAgent: insertVisit.userAgent || null,
      ipAddress: insertVisit.ipAddress || null
    };
    this.visits.set(id, visit);
    return visit;
  }

  async getVisits(): Promise<Visit[]> {
    return Array.from(this.visits.values()).sort((a, b) => 
      new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
    );
  }
}

export const storage = new MemStorage();
