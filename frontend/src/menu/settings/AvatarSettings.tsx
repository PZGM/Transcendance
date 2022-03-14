import { Avatar, Button, Grid, IconButton, Input, InputBase, Stack, Typography } from "@mui/material";
import { ChangeEvent, Component } from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarEditor from "react-avatar-editor";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";

type AvatarSettingsProps = {
    avatar: string,
	updateParentState: any,
};

interface AvatarSettingsState {
	fileSelected?: File;
	scale: number;
    edit: boolean,
}

export class AvatarSettings extends Component<AvatarSettingsProps, AvatarSettingsState> {
	editor: any

	constructor(props: AvatarSettingsProps) {
		super(props);
        this.edit = this.edit.bind(this);
		this.cancel = this.cancel.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this);
		this.state = {
            fileSelected: undefined,
            scale: 1,
            edit: false
        }
	}

    handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (!fileList) return;

		this.setState({
			fileSelected: fileList[0]
		})
	}

    edit() {
        this.setState({
            edit: ! this.state.edit,
        })
    }

	cancel() {
		this.setState({
			edit: false,
			fileSelected: undefined, 
		})
	}

	zoomIn = () => {
		this.setState({
			scale: (this.state.scale * 1.1 < 8) ? this.state.scale * 1.1 : 8
		})
	}

	zoomOut = () => {
		this.setState({
			scale: (this.state.scale * 0.9 > 1) ? this.state.scale * 0.9 : 1
		})
	}

    updateImage = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		if (this.editor) {
			const canvas = this.editor.getImageScaledToCanvas();
			var blob: Blob = await new Promise(resolve => canvas.toBlob(resolve));
			const formData = new FormData();
			formData.append("file", blob, 'name.jpg');
			const response = await axios.post(`${process.env.REACT_APP_UPLOAD_AVATAR}`, formData, { withCredentials: true });
			UserAPI.updateAvatar(response.data);
			this.props.updateParentState({ avatar: response.data });
            this.setState({
                fileSelected: undefined,
                edit: false,
            })
		}
	};

	setEditorRef = (editor: any) => (this.editor = editor)

    render() {
        return (
			<Stack direction="column" justifyContent="space-between" alignItems="baseline">
				<Stack direction="row" justifyContent="space-between" alignItems="baseline">
					{ !this.state.edit && <Avatar  src={this.props.avatar} /> }
					{ !this.state.edit && <Button onClick={this.edit} variant="contained" style={{borderRadius: 0}} >Edit</Button>}
				</Stack>
				<Stack direction="row" justifyContent="space-between" alignItems="baseline" width='100%'>
					{ this.state.edit && <Input type="file" hidden onChange={this.handleImageChange}></Input>}
					{(this.state.fileSelected) &&
							<>
							<AvatarEditor
								ref={this.setEditorRef}
								image={(this.state.fileSelected) ? this.state.fileSelected : 'null'}
								width={175}
								height={175}
								border={50}
								borderRadius={1000}
								color={[0, 0, 0, 0.5]} // RGBA
								scale={this.state.scale}
								rotate={0} />
							<IconButton color="primary" onClick={this.zoomIn}><AddCircleOutlineIcon /></IconButton>
							<IconButton color="primary" onClick={this.zoomOut}><RemoveCircleOutlineIcon /></IconButton>
							<IconButton color="primary" onClick={this.updateImage}><CheckCircleOutlineIcon /></IconButton>
							</>
					}
					{this.state.edit && <IconButton color="primary" onClick={this.cancel}><HighlightOffIcon /></IconButton>}
				</Stack>
			</Stack>
        )
    }
}
