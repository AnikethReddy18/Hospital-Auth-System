import { addEmployee, addRoom, getRoom, logEmployeeMovement, getEmployee, getRoomsByAdmin } from "../queries.js"
import { getAllLogsByAdmin, getEmployeeLogs, getRoomLogs, getEmployeesByAdmin } from "../queries.js"

export async function createEmployee(req, res) {
    const adminId = req.user.id
    const { name, id, email, role } = req.body

    await addEmployee(adminId, id, name, email, role)

    res.sendStatus(200)
}

export async function createRoom(req, res) {
    const adminId = req.user.id
    const { name, allowedRolesRaw } = req.body
    const allowedRoles = allowedRolesRaw.split(',')

    await addRoom(name, allowedRoles, adminId)

    res.sendStatus(200)
}

export async function logMovement(req, res) {
    const { employeeId, roomId } = req.body
    const { allowedRoles } = await getRoom(roomId)
    const { role } = await getEmployee(employeeId)

    if (allowedRoles.includes(role)) {
        await logEmployeeMovement(employeeId, roomId)
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

export async function getLogMovements(req, res){
    const adminId = req.user.id
    const logs = await getAllLogsByAdmin(adminId);

    res.json({logs})
}

export async function getLogMovementsByEmployee(req, res){
    const employeeId = req.params.id

    const logs = await getEmployeeLogs(employeeId)
    res.json({logs})
}

export async function getLogMovementsByRoom(req, res){
    const roomId = req.params.id

    const logs = await getRoomLogs(roomId)
    res.json({logs})
}

export async function getEmployees(req, res){
    const adminId = req.user.id

    const employees = await getEmployeesByAdmin(adminId)
    res.json(employees)
}

export async function getRooms(req, res){
    const adminId = req.user.id

    const rooms = await getRoomsByAdmin(adminId)
    res.json(rooms)
}