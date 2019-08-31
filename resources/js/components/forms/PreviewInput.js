import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Upload from '../icons/Upload';

class PreviewInput extends Component {
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
                    maxSize={256000} // 250 KB
                    name={this.props.name}
                    onDropAccepted={this.handleUpload}
                    onDropRejected={this.handleRejection}
                    accept={'image/jpeg, image/png, image/bmp, image/gif'}
                    className={`file-input${this.state.error ? ' has-error' : '' }`}
                >
                    { hasUploadedFile
                        ? <div className='file-input-title'>{files[0].name}</div>
                        : <div className='file-input-title'><Upload/>Upload Image</div>
                    }
                </Dropzone>
                { this.state.error && <div className='input-error'>{this.state.error}</div> }
                { hasUploadedFile && (
                    <div className='listing-preview-uploaded-img' style={{ backgroundImage: `url('${files[0].preview}')`}}></div>
                )}
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

export default PreviewInput;
