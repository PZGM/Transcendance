import { Grid, Stack } from '@mui/material';
import { ChangeEvent, Component, Fragment } from 'react';
import { UserAPI } from '../../api/Users.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import '../../style/buttons.css';
import { ButtonUnstyled } from '@mui/core';

type AvatarSettingsProps = {
  avatar: string;
  updateDisplay: any;
  updateParentState: any;
  editing: boolean;
};

interface AvatarSettingsState {
  fileSelected?: File;
  scale: number;
  editing: boolean;
  isIntra: boolean;
}

export class AvatarSettings extends Component<
  AvatarSettingsProps,
  AvatarSettingsState
> {
  editor: any; // Window editing

  constructor(props: AvatarSettingsProps) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkAvatar = this.checkAvatar.bind(this);
    this.state = {
      fileSelected: undefined,
      scale: 1,
      editing: this.props.editing,
      isIntra: false,
    };
  }

  checkAvatar() {
    if (this.props.avatar.startsWith('https://cdn.intra.42.fr/users/')) {
      this.setState({
        isIntra: true,
      });
      return true;
    }
    return false;
  }

  async getImage(u: string): Promise<File> {
    const myBlob = await fetch(u, {
      credentials: 'include',
    })
      .then((res) => res.blob()) // Gets the response and returns it as a blob
      .then((blob) => {
        return blob;
      });
    return new File([myBlob], 'name');
  }

  async componentDidMount() {
    if (!this.checkAvatar())
      this.setState({ fileSelected: await this.getImage(this.props.avatar) });
  }

  handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    this.setState({
      fileSelected: fileList[0],
      isIntra: false,
    });
  };

  zoomIn = () => {
    this.setState({
      scale: this.state.scale * 1.1 < 8 ? this.state.scale * 1.1 : 8,
    });
  };

  zoomOut = () => {
    this.setState({
      scale: this.state.scale * 0.9 > 1 ? this.state.scale * 0.9 : 1,
    });
  };

  updateImage = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (this.editor) {
      // if image is selected
      const canvas = this.editor.getImageScaledToCanvas();
      var blob: Blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const formData = new FormData(); // file type creator
      formData.append('file', blob, 'name.jpg');
      // Send image to backend (response = url image)
      const response = await axios.post(
        `${process.env.REACT_APP_UPLOAD_AVATAR}`,
        formData,
        { withCredentials: true },
      );
      await UserAPI.updateAvatar(response.data);
      this.props.updateParentState({ avatar: response.data });
      this.setState({
        fileSelected: undefined,
        editing: false,
      });
      toast.success('Avatar successfuly updated', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        closeOnClick: true,
      });
    }
    this.props.updateDisplay(0);
  };

  setEditorRef = (editor: any) => (this.editor = editor);

  render() {
    const PlusMinStyle = {
      color: 'white',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'backto1982',
      fontSize: 'calc(30px + 1vw)',
      width: '100%',
      cursor: 'pointer',
    };

    return (
      <Fragment>
        {!this.state.editing && (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: '33%' }}
          >
            <Grid item xs={4} className="grid_item_style">
              {' '}
              AVATAR{' '}
            </Grid>
            <Grid item xs={4} className="grid_item_style">
              <img
                src={this.props.avatar}
                className="avatar_round"
                alt="avatar"
              />
            </Grid>
            <Grid item xs={4} className="grid_item_style">
              <div
                className="settings_button but_blue"
                onClick={() => {
                  this.props.updateDisplay(1);
                }}
              >
                EDIT
              </div>
            </Grid>
          </Grid>
        )}
        {this.state.editing && (
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: '100%', width: '100%' }}
            flexWrap="nowrap"
          >
            <Grid item xs={2} className="grid_item_style">
              {' '}
              AVATAR{' '}
            </Grid>
            {this.state.isIntra && (
              <Grid item xs={10} className="grid_item_style">
                <ButtonUnstyled
                  className="settings_edit_button but_blue"
                  component="label"
                >
                  CHOOSE FILE
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={this.handleImageChange}
                  />
                </ButtonUnstyled>
              </Grid>
            )}
            {!this.state.isIntra && (
              <>
                <Grid item xs={6} className="grid_item_style">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ width: '100%' }}
                  >
                    <div
                      style={PlusMinStyle}
                      onClick={() => {
                        this.zoomOut();
                      }}
                    >
                      -
                    </div>
                    <AvatarEditor
                      ref={this.setEditorRef}
                      image={
                        this.state.fileSelected
                          ? this.state.fileSelected
                          : 'null'
                      }
                      width={225}
                      height={225}
                      border={50}
                      borderRadius={1000}
                      color={[0, 0, 0]} // RGBA
                      scale={this.state.scale}
                      rotate={0}
                    />
                    <div
                      style={PlusMinStyle}
                      onClick={() => {
                        this.zoomIn();
                      }}
                    >
                      +
                    </div>
                  </Stack>
                </Grid>
                <Grid item xs={2} className="grid_item_style">
                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ width: '100%' }}
                  >
                    <div
                      className="settings_edit_button but_green"
                      onClick={this.updateImage}
                    >
                      SAVE
                    </div>
                    <div
                      className="settings_edit_button but_red"
                      onClick={() => {
                        this.props.updateDisplay(0);
                      }}
                    >
                      CANCEL
                    </div>
                  </Stack>
                </Grid>
                <Grid item xs={2} className="grid_item_style">
                  <ButtonUnstyled
                    className="settings_edit_button but_blue"
                    component="label"
                  >
                    CHOOSE FILE
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={this.handleImageChange}
                    />
                  </ButtonUnstyled>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Fragment>
    );
  }
}
