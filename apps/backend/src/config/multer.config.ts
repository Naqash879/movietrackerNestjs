import { memoryStorage } from 'multer';

export const multerMemory = {
  storage: memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
};
