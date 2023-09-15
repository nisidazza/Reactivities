import "cropperjs/dist/cropper.css";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import Cropper from "react-cropper";

export const PhotoWidgetCropper: FC<{
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
}> = observer(({ imagePreview, setCropper }) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
});
