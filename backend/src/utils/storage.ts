import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
    id: string;
    originalName: string;
    filename: string;
    mimetype: string;
    size: number;
    path: string;
}

/**
 * Storage utility for handling file uploads
 */
class StorageService {
    private uploadDir: string;

    constructor() {
        this.uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
    }

    /**
     * Ensure upload directory exists
     */
    private async ensureUploadDir(): Promise<void> {
        try {
            await fs.access(this.uploadDir);
        } catch {
            await fs.mkdir(this.uploadDir, { recursive: true });
        }
    }

    /**
     * Store uploaded file
     * @param file - Multer file object
     * @returns Promise<UploadedFile>
     */
    async storeFile(file: {
        originalname: string;
        buffer: Buffer;
        mimetype: string;
        size: number;
    }): Promise<UploadedFile> {
        await this.ensureUploadDir();

        const fileId = uuidv4();
        const fileExtension = path.extname(file.originalname);
        const filename = `${fileId}${fileExtension}`;
        const filePath = path.join(this.uploadDir, filename);

        // Write file to disk
        await fs.writeFile(filePath, file.buffer);

        return {
            id: fileId,
            originalName: file.originalname,
            filename,
            mimetype: file.mimetype,
            size: file.size,
            path: filePath
        };
    }

    /**
     * Delete file from storage
     * @param filename - Name of file to delete
     */
    async deleteFile(filename: string): Promise<void> {
        const filePath = path.join(this.uploadDir, filename);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            // File might not exist, ignore error
        }
    }

    /**
     * Get file path
     * @param filename - Name of the file
     * @returns Full path to file
     */
    getFilePath(filename: string): string {
        return path.join(this.uploadDir, filename);
    }

    /**
     * Check if file exists
     * @param filename - Name of the file
     * @returns Promise<boolean>
     */
    async fileExists(filename: string): Promise<boolean> {
        try {
            const filePath = path.join(this.uploadDir, filename);
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}

export default new StorageService();
