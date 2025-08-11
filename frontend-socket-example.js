// Ejemplo de conexión Socket.IO para el frontend
// Guarda este archivo como socket.js en tu frontend

import io from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.isConnected = false
  }

  connect(token) {
    if (this.socket) {
      this.socket.disconnect()
    }

    this.socket = io('http://localhost:3001/realtime', {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
    })

    this.socket.on('connect', () => {
      console.log('✅ Conectado al servidor Socket.IO')
      this.isConnected = true
    })

    this.socket.on('disconnect', () => {
      console.log('❌ Desconectado del servidor Socket.IO')
      this.isConnected = false
    })

    this.socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión:', error)
      this.isConnected = false
    })

    // Eventos de tickets
    this.socket.on('ticket.created', (data) => {
      console.log('🎫 Nuevo ticket creado:', data)
      // Aquí puedes actualizar tu UI
      this.handleTicketCreated(data)
    })

    this.socket.on('ticket.updated', (data) => {
      console.log('🔄 Ticket actualizado:', data)
      this.handleTicketUpdated(data)
    })

    this.socket.on('ticket.assigned', (data) => {
      console.log('👨‍💻 Ticket asignado:', data)
      this.handleTicketAssigned(data)
    })

    this.socket.on('ticket.status_changed', (data) => {
      console.log('📊 Estado de ticket cambiado:', data)
      this.handleStatusChanged(data)
    })

    this.socket.on('tickets:unassigned', (data) => {
      console.log('📋 Actualización de tickets sin asignar:', data)
      this.handleUnassignedTickets(data)
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  // Métodos para manejar eventos (implementa según tu UI)
  handleTicketCreated(data) {
    // Ejemplo: mostrar notificación
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Nuevo Ticket', {
        body: `Ticket #${data.id}: ${data.titulo}`,
        icon: '/icon.png',
      })
    }

    // Ejemplo: actualizar lista de tickets
    // this.updateTicketList()
  }

  handleTicketUpdated(data) {
    // Actualizar ticket específico en la UI
    // this.updateTicketInList(data)
  }

  handleTicketAssigned(data) {
    // Mostrar notificación al técnico
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Ticket Asignado', {
        body: `Se te ha asignado el ticket #${data.id}`,
        icon: '/icon.png',
      })
    }
  }

  handleStatusChanged(data) {
    // Actualizar estado del ticket en la UI
    // this.updateTicketStatus(data)
  }

  handleUnassignedTickets(data) {
    // Actualizar contador de tickets sin asignar
    // this.updateUnassignedCount()
  }

  // Método para unirse a una sala específica de ticket
  joinTicketRoom(ticketId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join:ticket', { ticketId })
    }
  }

  // Método para salir de una sala específica de ticket
  leaveTicketRoom(ticketId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave:ticket', { ticketId })
    }
  }
}

// Exportar instancia singleton
const socketService = new SocketService()
export default socketService

// Ejemplo de uso en tu aplicación React/Vue/Angular:

/*
// En tu componente de login
import socketService from './socket'

const handleLogin = async (credentials) => {
  const response = await loginAPI(credentials)
  const token = response.access_token
  
  // Conectar Socket.IO después del login
  socketService.connect(token)
}

// En tu componente de logout
const handleLogout = () => {
  socketService.disconnect()
}

// En tu componente de tickets
useEffect(() => {
  // Unirse a la sala del ticket actual
  if (ticketId) {
    socketService.joinTicketRoom(ticketId)
  }

  return () => {
    // Salir de la sala al desmontar
    if (ticketId) {
      socketService.leaveTicketRoom(ticketId)
    }
  }
}, [ticketId])
*/

