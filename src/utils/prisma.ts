import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias de Prisma Client en desarrollo
declare global {
  var prisma: PrismaClient | undefined;
}

// Configuración del cliente Prisma con logging
const prisma = globalThis.prisma || new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

// Guardar en global solo en entorno no de producción
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Opcional: Manejo de logs
prisma.$on('warn' as never, (e) => {
  console.warn('Prisma Warning:', e);
});

prisma.$on('info' as never, (e) => {
  console.info('Prisma Info:', e);
});

prisma.$on('error' as never, (e) => {
  console.error('Prisma Error:', e);
});



export default prisma;