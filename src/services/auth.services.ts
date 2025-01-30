import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterDTO, LoginDTO, AuthResponse } from "../models/auth";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export const AuthService = {
  async register(dto: RegisterDTO): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    return this.generateTokenResponse(newUser.id);
  },

  async login(dto: LoginDTO): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error("Invalid credentials");
    }

    return this.generateTokenResponse(user.id);
  },

  generateTokenResponse(userId: number): AuthResponse {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { token, userId };
  },
};
