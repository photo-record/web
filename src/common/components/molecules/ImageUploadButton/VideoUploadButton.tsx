import React, { FunctionComponent, useRef, useState } from 'react';

import { Button } from '@components/atoms';
import { CircularProgress } from '@material-ui/core';
import { upload } from '@utils/s3';

export interface VideoUploadButtonProps {
  onUploaded?: (text: string) => void;
  renderButton?: () => JSX.Element;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}
const VideoUploadButton: FunctionComponent<VideoUploadButtonProps> = ({
  onUploaded,
  renderButton,
  multiple,
  disabled,
  className,
}) => {
  const [loading, setLoading] = useState(false);
  const fileElement = useRef(null);
  const [uploadProgess, setUploadProgress] = useState(0);

  const selectImage = () => {
    if (!loading) {
      fileElement.current.click();
    }
  };

  const uploadImage = (e) => {
    if (fileElement.current.files.length === 1) {
      try {
        e.persist();
        setLoading(true);
        upload(
          fileElement.current.files[0],
          (percent) => {
            setUploadProgress(percent);
          },
          (result) => {
            setLoading(false);
            setUploadProgress(0);
            onUploaded(`https://photo-record-bucket.s3.ap-northeast-2.amazonaws.com/${result.Key}`);
          },
        );
      } catch (err) {
        if (err) {
          alert(err.message);
          throw new Error(err);
        }
      }
    } else if (multiple) {
      const files = fileElement.current?.files;
      const filesList = [...files];
      filesList?.map((image) => {
        try {
          e.persist();
          setLoading(true);
          upload(
            image,
            (percent) => {
              setUploadProgress(percent);
            },
            (result) => {
              setLoading(false);
              setUploadProgress(0);
              onUploaded(
                `https://photo-record-bucket.s3.ap-northeast-2.amazonaws.com/${result.Key}`,
              );
              // imagesArrayTemp = [...imagesArrayTemp, result.Key];
            },
          );
        } catch (err) {
          if (err) {
            alert(err.message);
            throw new Error(err);
          }
        }
      });
    } else {
      alert('파일을 선택해주세요');
    }
  };

  return (
    <>
      <input
        onChange={uploadImage}
        ref={fileElement}
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        style={{ display: 'none' }}
        multiple={multiple}
        disabled={disabled}
      />
      {loading && <CircularProgress size={22} variant="determinate" value={uploadProgess} />}
      {renderButton && (
        <div onClick={disabled ? null : selectImage} className={className}>
          {renderButton()}
        </div>
      )}
      {!renderButton && <Button onClick={disabled ? null : selectImage}>업로드</Button>}
    </>
  );
};
export default VideoUploadButton;
