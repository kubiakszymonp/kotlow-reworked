'use server';

import { apiClient } from '../api-client';
import { apiCall } from '../api-utils';

// Upload files
export async function uploadFiles(files: Array<Blob>, options?: {
  path?: string;
  refId?: string;
  ref?: string;
  field?: string;
}) {
  return apiCall(
    () => apiClient.upload.uploadPost({
      files,
      path: options?.path,
      refId: options?.refId,
      ref: options?.ref,
      field: options?.field,
    })
  );
}

// Get uploaded files
export async function getUploadedFiles() {
  return apiCall(
    () => apiClient.upload.uploadFilesGet()
  );
}

// Get uploaded file by ID
export async function getUploadedFile(id: string) {
  return apiCall(
    () => apiClient.upload.uploadFilesIdGet({ id })
  );
}

// Delete uploaded file
export async function deleteUploadedFile(id: string) {
  return apiCall(
    () => apiClient.upload.uploadFilesIdDelete({ id })
  );
}

// Upload file with additional info
export async function uploadFileWithInfo(
  id: string,
  fileInfo?: {
    name?: string;
    alternativeText?: string;
    caption?: string;
  },
  files?: Blob
) {
  return apiCall(
    () => apiClient.upload.uploadididPost({
      id,
      fileInfo,
      files,
    })
  );
} 