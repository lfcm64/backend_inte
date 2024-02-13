import { studentSchema, Student } from "../schemas/student.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllStudents = async () => {
    return await db.select().from(studentSchema);
}

export const getStudent = async (id: number) => {
    return await db.select().from(studentSchema).where(eq(studentSchema.id, id));
}

export const getStudentByEmail = async (email: string) => {
    return await db.select().from(studentSchema).where(eq(studentSchema.email, email));
}

export const createStudent = async (first_name: string, last_name: string, email: string, password: string) => {
    const newStudent: Student = { first_name, last_name, email, password, role: null, team: null };
    return await db.insert(studentSchema).values(newStudent)
}


export const deleteStudent = async (id: number) => {
    return await db.delete(studentSchema).where(eq(studentSchema.id, id));
}

export const addStudentToTeam = async (StudentId: number, TeamId: number) => {
    return await db.update(studentSchema)
        .set({ team: TeamId })
        .where(eq(studentSchema.id, StudentId));
}

export const getPasswordByEmail = async (email: string) => {
    return await db.select({password: studentSchema.password}).from(studentSchema).where(eq(studentSchema.email, email));
}