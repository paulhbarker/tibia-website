import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Upload from '../icons/Upload';

class ListingInfoInput extends Component {
    constructor(props) {
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
        this.handleRejection = this.handleRejection.bind(this);

        this.state = {
            error: null,
            files: this.props.input.value,
        }
    }

    render() {
        const { files } = this.state;

        const hasUploadedFile = _.isArray(this.state.files) && !_.isEmpty(this.state.files);

        return (
            <div>
                <Dropzone
                    style={{}}
                    multiple={false}
                    maxSize={5242880} // 5 MB
                    name={this.props.name}
                    onDropAccepted={this.handleUpload}
                    onDropRejected={this.handleRejection}
                    accept={'image/jpeg, image/png, application/pdf'}
                    className={`file-input${this.state.error ? ' has-error' : '' }`}
                >
                    { hasUploadedFile
                        ? <div className='file-input-title'>{files[0].name}</div>
                        : <div className='file-input-title'><Upload/>Upload File</div>
                    }
                </Dropzone>
                { this.state.error && <div className='input-error'>{this.state.error}</div> }
            </div>
        );
    }

    handleUpload(files) {
        const { input: { onChange } } = this.props

        this.setState({ ...this.state, files, error: null });

        onChange(files[0]);
    }

    handleRejection() {
        this.setState({ ...this.state, error: 'Invalid size or file type.'})
    }

}

export default ListingInfoInput;
