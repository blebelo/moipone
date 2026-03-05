"use client";

import { Upload } from "antd";
import { InboxOutlined, FileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { useState } from "react";
import { useFileUploadStyles } from "./style";
import { IFileUploadProps } from "@/src/lib/common/constants";
import { handleUpload, renameFile } from "@/src/lib/common/helper-methods";

export const FileUpload: React.FC<IFileUploadProps> = ({
  studentId,
  filename,
  label,
  accept = ".pdf",
}: IFileUploadProps) => {
  const { styles } = useFileUploadStyles();
  const [file, setFile] = useState<UploadFile | null>(null);

  const props: UploadProps = {
    accept,
    disabled: !!file,
    onRemove: () => {setFile(null)
    },
    beforeUpload: async (f) => {
      const uploadedFile: UploadFile = {
        uid: f.uid,
        name: renameFile(f, filename),
        status: "done",
      };

      try {
        await handleUpload(f, studentId, uploadedFile.name);
        setFile(uploadedFile);
      } catch (err) {
        console.error('Could Not Upload Document: ', err)
        throw new Error('Could Not Upload Document')
      }

      return Upload.LIST_IGNORE;
    },
  };

  return (
    <div className={styles.wrapper}>
      <Upload {...props} className={file ? `${styles.uploadBox} disabled` : styles.uploadBox}>
        {file ? (
          <div className={styles.filePreview}>
            <FileOutlined className={styles.fileIcon} />
            <span>{file.name}</span>
            <CloseCircleOutlined
              className={styles.removeIcon}
              onClick={(e) => {
                e.stopPropagation(); 
                setFile(null);
              }}
            />
          </div>
        ) : (
          <>
            <InboxOutlined className={styles.icon} />
            <div className={styles.textGroup}>
              <div className={styles.title}>{label}</div>
              <div className={styles.subtitle}>
                Click to upload · Max 5MB · Only {accept}s allowed
              </div>
            </div>
          </>
        )}
      </Upload>
    </div>
  );
};

export default FileUpload;
