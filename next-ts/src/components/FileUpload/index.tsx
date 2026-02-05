"use client";

import { Upload } from "antd";
import { InboxOutlined, FileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { useState } from "react";
import { useFileUploadStyles } from "./style";
import { FileUploadProps } from "@/src/lib/common/constants";
import { handleUpload, renameFile } from "@/src/lib/common/helper-methods";

export const FileUpload: React.FC<FileUploadProps> = ({
  studentId,
  filename,
  label,
  accept = ".pdf,.jpg,.jpeg,.png",
}: FileUploadProps) => {
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

      await handleUpload(f, studentId, uploadedFile.name, label);
      setFile(uploadedFile);

      return Upload.LIST_IGNORE;
    },
  };

  return (
    <div className={styles.wrapper}>
      <Upload {...props} className={file ? `${styles.uploadBox} disabled` : styles.uploadBox}>
        {!file ? (
          <>
            <InboxOutlined className={styles.icon} />
            <div className={styles.textGroup}>
              <div className={styles.title}>{label}</div>
              <div className={styles.subtitle}>
                Click to upload · Max 5MB · {accept}
              </div>
            </div>
          </>
        ) : (
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
        )}
      </Upload>
    </div>
  );
};

export default FileUpload;
