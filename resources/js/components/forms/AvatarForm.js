import React, { Component } from 'react';
import { Avatar } from 'antd';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getProfile, removeAvatar, addAvatar } from '../../actions/profileActions';

class AvatarForm extends Component {
    componentWillMount() {
        this.props.getProfile();
    }

    constructor(props) {
        super(props);

        this.renderAvatar = this.renderAvatar.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.renderPhotoAction = this.renderPhotoAction.bind(this);
    }

    render() {

        return (
            <div className='profile-pic-tools'>
                { this.renderAvatar() }
                <div>
                    { this.renderPhotoAction() }
                    <p>Recommended size: 200x200 (px)</p>
                </div>
            </div>
        )
    }

    renderAvatar() {
        const avatarProps = {
            size: 90,
            style: {
                marginRight: '20px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        };

        if (this.props.avatar) {
            return <Avatar {...avatarProps} src={this.props.avatar} />
        }

        return <Avatar {...avatarProps} icon="user" />
    }

    renderPhotoAction() {
        if (this.props.avatar) {
            return <a href='#' onClick={this.props.removeAvatar}>Remove Photo</a>
        }

        return (
            <Dropzone
                style={{}}
                multiple={false}
                maxSize={256000} // 250 KB
                name={this.props.name}
                onDropAccepted={this.handleUpload}
                onDropRejected={this.handleRejection}
                accept={'image/jpeg, image/png, image/gif'}
                className={`avatar-input`}
            >
                { this.props.avatar
                    ? <a href='#'>Remove Photo</a>
                    : <a href='#'>Add Photo</a> }
            </Dropzone>
        )
    }

    handleUpload(files) {
        this.props.addAvatar(files[0]);
    }

    handleRejection() {

    }
}

const mapStateToProps = state => ({
	avatar: state.settings.profile.photo
});

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(getProfile()),
    removeAvatar: () => dispatch(removeAvatar()),
    addAvatar: file => dispatch(addAvatar(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarForm);
