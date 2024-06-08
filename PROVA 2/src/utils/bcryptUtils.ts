import * as bcrypt from 'bcryptjs';
import { rounds_salt } from '../config/bcrypt';

/**
 * Função para criptografar uma senha.
 * @param password - A senha a ser criptografada.
 * @param rounds - O número de rounds para gerar o salt (padrão é 10).
 * @returns Uma Promise que resolve para o hash da senha.
 */
export async function encryptPassword(password: string, rounds: number = rounds_salt): Promise<string> {
    const salt = await bcrypt.genSalt(rounds);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

/**
 * Função para comparar uma senha fornecida com um hash armazenado.
 * @param storedPasswordHash - O hash da senha armazenada.
 * @param providedPassword - A senha fornecida a ser comparada.
 * @returns Uma Promise que resolve para um booleano indicando se as senhas correspondem.
 */
export async function comparePassword(storedPasswordHash: string, providedPassword: string): Promise<boolean> {
    return await bcrypt.compare(providedPassword, storedPasswordHash);
}

