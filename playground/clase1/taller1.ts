import { buildUser } from './userFactory'
import type { LoginCredentials } from './types'

// Tipos primitivos
const baseUrl: string = 'https://www.saucedemo.com'
const maxAttempts: number = 3
const isAutomationProject: boolean = true

// Tipos especiales básicos
let errorMessage: string | null = null
let selectedUser: LoginCredentials | undefined

// Objetos tipados
const validUser: LoginCredentials = {
username: 'standard_user',
password: 'secret_sauce',
expectedResult: 'success',
}

// Arrays tipados
const users: LoginCredentials[] = [
validUser,
buildUser('locked_out_user', 'secret_sauce', 'locked'),
buildUser('problem_user', 'secret_sauce', 'success'),
buildUser('invalid_user', 'wrong_password', 'invalid'),
]

// Función tipada tradicional
function printProjectInfo(url: string, attempts: number): void {
console.log(`URL base del proyecto: ${url}`)
console.log(`Número máximo de intentos: ${attempts}`)
}

// Arrow function tipada
const printUser = (user: LoginCredentials): void => {
console.log('------------------------------')
console.log(`Usuario: ${user.username}`)
console.log(`Resultado esperado: ${user.expectedResult}`)
}

// Condicionales
if (isAutomationProject) {
console.log('Proyecto de automatización E2E iniciado correctamente')
}

// Recorrido de arrays
for (const user of users) {
printUser(user)
if (user.expectedResult === 'locked') {
errorMessage = 'El sistema debe mostrar usuario bloqueado'
selectedUser = user
}
}
printProjectInfo(baseUrl, maxAttempts)
console.log('Mensaje de error esperado:', errorMessage)
console.log('Usuario seleccionado:', selectedUser?.username)
