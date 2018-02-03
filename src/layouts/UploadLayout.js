import React from 'react'
import {
    Button,
    Grid,
    Icon,
    Popup,
    Segment,
} from 'semantic-ui-react'

const UploadButton = ({ onFileAdd }) => {
    const button = (
        <Button
            color='teal'
            size='small'
            as='label'
        >
            Upload
            <input
                onChange={e => Array.from(e.target.files).map(f => onFileAdd(f))}
                id='photoinput'
                name='photoinput'
                accept='image/*'
                type='file'
                multiple
                style={{display: 'none'}}
            />
        </Button>
    )
    return (
        <Popup
            trigger={button}
            content='select files to upload'
            position='bottom center'
            size='tiny'
        />
    )
}

const FilterSelector = ({ filters, floated }) => {
    const buildButton = (filter) => (
        <Button
            content={filter.name}
            active={filter.active}
            onClick={filter.onClick}
        />
    )
    const buildPopupText = (filter) => {
        const action = filter.active ? 'hide' : 'show'
        return 'click to ' + action + ' ' + filter.subject
    }
    return (
        <Button.Group size='tiny' floated={floated}>
        {filters.map(f => (
            <Popup
                content={buildPopupText(f)}
                trigger={buildButton(f)}
                position='bottom center'
                size='mini'
            />
        ))}
        </Button.Group>
    )
}

const UploaderHeader = (props) => {
    const filters = [
        {
            name: 'In Progress',
            subject: 'ongoing uploads',
            active: props.showInProgress,
            onClick: props.inProgressListToggle,
        },
        {
            name: 'Succeeded',
            subject: 'successful uploads',
            active: props.showUploaded,
            onClick: props.uploadedListToggle,
        },
        {
            name: 'Failed',
            subject: 'failed uploads',
            active: props.showFailed,
            onClick: props.failedListToggle,
        },
    ]
    return (
        <Segment clearing textAlign='left'>
            <UploadButton onFileAdd={props.onFileAdd}/>
            <FilterSelector filters={filters} floated='right'/>
        </Segment>
    )
}

const File = ({ file, action }) => (
    <Segment key={file.id} textAlign='left' clearing>
        <Icon name='image' circular color='teal'/>
        <span style={{marginLeft: '13px'}}>
            {file.filename}
        </span>
        <Popup
            trigger={action}
            content='delete this file'
            size='tiny'
            position='left center'
        />
    </Segment>
)

const FileList = (props) => {
    const button = <Button floated='right' icon='trash' size='tiny'/>
    const fileList = props.files.map(f => <File file={f} action={button} /> )
    const defaultContent = (
        <Segment textAlign='center' secondary>
            No files to show. Select files for upload or modify filters.
        </Segment>
    )
    return (
        <Segment.Group>
            <UploaderHeader {...props}/>
            { fileList.length > 0
              ? fileList
              : defaultContent }
        </Segment.Group>
    )
}
const UploadLayout = (props) => {
    const containerStyle = {
        padding: '20px',
        height: '100%',
        width: '100%',
    }
    return (
        <div className='uploader' style={containerStyle}>
            <Grid textAlign='center' verticalAlign='top'>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <FileList {...props}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default UploadLayout
