import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { PhotoUploadWidget } from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export const ProfilePhotos: FC<{ profile: Profile }> = observer(
  ({ profile }) => {
    const {
      profileStore: {
        isCurrentUser,
        uploadPhoto,
        uploading,
        loading,
        setMainPhoto,
        deletePhoto,
      },
    } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState("");

    const handlePhotoUpload = (file: Blob) => {
      uploadPhoto(file).then(() => setAddPhotoMode(false));
    };

    const handleSetMainPhoto = (
      photo: Photo,
      e: SyntheticEvent<HTMLButtonElement>
    ) => {
      setTarget(e.currentTarget.name);
      setMainPhoto(photo);
    };

    const handleDeletePhoto = (
      photo: Photo,
      e: SyntheticEvent<HTMLButtonElement>
    ) => {
      setTarget(e.currentTarget.name);
      deletePhoto(photo);
    };

    return (
      <Tab.Pane>
        <Grid>
          <Grid.Column width={16}>
            <Header icon="image" content="Photos" floated="left" />
            {isCurrentUser && (
              <Button
                floated="right"
                basic
                content={addPhotoMode ? "Cancel" : "Add photo"}
                onClick={() => setAddPhotoMode(!addPhotoMode)}
              />
            )}
          </Grid.Column>
          <Grid.Column width={16}>
            {addPhotoMode ? (
              <PhotoUploadWidget
                uploadPhoto={handlePhotoUpload}
                loading={uploading}
              />
            ) : (
              <Card.Group itemsPerRow={5}>
                {profile.photos?.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          basic
                          color="green"
                          content="Main"
                          disabled={photo.isMain}
                          loading={target === "main" + photo.id && loading}
                          name={"main" + photo.id}
                          onClick={(e) => handleSetMainPhoto(photo, e)}
                        />
                        <Button
                          basic
                          color="red"
                          disabled={photo.isMain}
                          icon="trash"
                          loading={target === photo.id && loading}
                          name={photo.id}
                          onClick={(e) => handleDeletePhoto(photo, e)}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
              </Card.Group>
            )}
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    );
  }
);
