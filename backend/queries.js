import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createAdmin(name, password) {
    await prisma.admin.create({
        data: { name, password }
    })
}

export async function getAdmin(name) {
    const admin = await prisma.admin.findFirst({
        where: {
            name
        }
    })

    return admin
}

export async function addRoom(name, allowedRoles, adminId) {
    await prisma.room.create({
        data: { name, allowedRoles, adminId }
    })
}

export async function getRoom(id) {
    const room = await prisma.room.findFirst({
        where: {
            id
        }
    })

    return room
}

export async function addEmployee(adminId, id, name, email, role) {
    await prisma.employee.create({
        data: {
            adminId, id, name, email, role
        }
    })
}

export async function getEmployee(id) {
    const emp = await prisma.employee.findFirst({
        where: {
            id
        }
    })

    return emp
}

export async function getEmployeesByAdmin(adminId){
    const emps = await prisma.employee.findMany({
        where:{
            adminId
        }
    })

    return emps
}

export async function deleteEmployee(id) {
    await prisma.employee.delete({
        where: {
            id
        }
    })
}

export async function updateEmployee(id, name, email) {
    await prisma.employee.update({
        where: {
            id
        },
        data: {
            name, email
        }
    })
}

export async function logEmployeeMovement(employeeId, roomId) {
    await prisma.movementLog.create({
        data: {
            employeeId, roomId
        }
    })
}

export async function getAllLogsByAdmin(adminId) {
    const logs = await prisma.movementLog.findMany({
        where: {
            room: {
                adminId: adminId,
            },
        },
        include: {
            employee: true,
            room: true,
        },
    });

    return logs;

}

export async function getEmployeeLogs(employeeId) {
    const logs = await prisma.movementLog.findMany({
        where:{
            employeeId: employeeId
        },

        orderBy: {
            timestamp: 'desc'
        },

        include:{
            room: true,
            employee: true
        }
    })

    return logs
}

export async function getRoomLogs(roomId){
    const logs = await prisma.movementLog.findMany({
        where: {
            roomId
        },

        orderBy: {
            timestamp: 'desc'
        },

        include: {
            employee: true,
            room: true
        }
    })

    return logs
}

export async function getRoomsByAdmin(adminId){
    const rooms = await prisma.room.findMany({
        where:{
            adminId
        }
    })

    return rooms
}