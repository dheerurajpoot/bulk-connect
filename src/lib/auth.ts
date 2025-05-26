import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  plan: "starter" | "professional" | "enterprise"
  isVerified: boolean
}

// In-memory user storage (replace with database in production)
const users: User[] = []

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export async function createUser(
  userData: Omit<User, "id" | "createdAt" | "password"> & { password: string },
): Promise<User> {
  const hashedPassword = await hashPassword(userData.password)
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    plan: "starter",
    isVerified: false,
  }
  users.push(user)
  return user
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  users[userIndex] = { ...users[userIndex], ...updates }
  return users[userIndex]
}
